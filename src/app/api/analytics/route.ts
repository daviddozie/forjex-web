import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

let supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
    if (supabase) return supabase;

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false }
    });

    return supabase;
}

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
    return NextResponse.json({}, { headers: CORS_HEADERS });
}

interface User {
    id: string;
    username: string | null;
    email: string | null;
    os: any;
    command: string | null;
    usage_count: number;
    last_used: string;
    created_at: string;
}

interface NPMDownloads {
    downloads: number;
    start: string;
    end: string;
    package: string;
}

// Fetch NPM download stats
async function fetchNPMDownloads(period: 'last-week' | 'last-month' | 'last-year') {
    try {
        const response = await fetch(
            `https://api.npmjs.org/downloads/point/${period}/forjex`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        
        if (!response.ok) {
            console.error('NPM API error:', response.status);
            return null;
        }
        
        const data: NPMDownloads = await response.json();
        return data.downloads;
    } catch (error) {
        console.error('Error fetching NPM stats:', error);
        return null;
    }
}

async function fetchDailyNPMDownloads() {
    try {
        const response = await fetch(
            `https://api.npmjs.org/downloads/range/last-week/forjex`,
            { next: { revalidate: 3600 } }
        );
        
        if (!response.ok) return null;
        
        const data = await response.json();
        return data.downloads || [];
    } catch (error) {
        console.error('Error fetching daily NPM stats:', error);
        return null;
    }
}

export async function GET() {
    try {
        const supabase = getSupabase();

        const { data: allUsers, error: usersError } = await supabase
            .from("cli_tracking")
            .select("*")
            .returns<User[]>();

        if (usersError) throw usersError;

        const [weeklyDownloads, monthlyDownloads, yearlyDownloads, dailyDownloads] = await Promise.all([
            fetchNPMDownloads('last-week'),
            fetchNPMDownloads('last-month'),
            fetchNPMDownloads('last-year'),
            fetchDailyNPMDownloads()
        ]);

        const weeklyData = dailyDownloads?.map((item: any) => {
            const date = new Date(item.day);
            return {
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                value: item.downloads
            };
        }) || Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return {
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                value: 0
            };
        });

        
        const previousMonthDownloads = (monthlyDownloads || 0) - (weeklyDownloads || 0);
        const growthPercentage = previousMonthDownloads > 0 
            ? (((weeklyDownloads || 0) / previousMonthDownloads - 1) * 100).toFixed(1)
            : "100.0";

        return NextResponse.json({
            totalUsers: allUsers?.length || 0,
            totalDownloads: yearlyDownloads || 0,
            weeklyDownloads: weeklyDownloads || 0,
            monthlyDownloads: monthlyDownloads || 0,
            weeklyData,
            growthPercentage: `+${Math.abs(parseFloat(growthPercentage))}%`
        }, { headers: CORS_HEADERS });

    } catch (err: any) {
        console.error("Analytics API Error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}