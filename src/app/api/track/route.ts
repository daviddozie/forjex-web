import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Force Node.js runtime (VERY IMPORTANT for service role key)
export const runtime = "nodejs";

// Singleton supabase client
let supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
    if (supabase) return supabase;

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        console.error("ENV VALUES:", {
            SUPABASE_URL,
            SUPABASE_SERVICE_ROLE_KEY: SUPABASE_SERVICE_ROLE_KEY ? "EXISTS" : "MISSING",
        });
        throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false }
    });

    return supabase;
}

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// OPTIONS
export function OPTIONS() {
    return NextResponse.json({}, { headers: CORS_HEADERS });
}

// POST - Track CLI usage via RPC
export async function POST(req: NextRequest) {
    try {
        const supabase = getSupabase();
        const body = await req.json();

        const { username, email, os, command, timestamp } = body;

        if (!username && !email) {
            return NextResponse.json(
                { error: "username or email required" },
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const now = timestamp || new Date().toISOString();

       const { error } = await (supabase as any).rpc("increment_cli_usage", {
    p_username: username || null,
    p_email: email || null,
    p_os: os || {},
    p_command: command || null,
    p_timestamp: now
});


        if (error) {
            console.error("RPC ERROR:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500, headers: CORS_HEADERS }
            );
        }

        return NextResponse.json(
            { success: true },
            { headers: CORS_HEADERS }
        );
    } catch (err: any) {
        console.error("API POST /track ERROR:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}

// GET - Fetch dashboard data
export async function GET() {
    try {
        const supabase = getSupabase();

        const { data, error } = await supabase
            .from("cli_tracking")
            .select("*")
            .order("last_used", { ascending: false });

        if (error) {
            console.error("GET ERROR:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500, headers: CORS_HEADERS }
            );
        }

        return NextResponse.json(
            { users: data },
            { headers: CORS_HEADERS }
        );
    } catch (err: any) {
        console.error("GET API ERROR:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
