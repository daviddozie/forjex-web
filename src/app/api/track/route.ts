import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Lazy initialization to avoid build-time errors
let supabase: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
    if (supabase) return supabase;

    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.SUPERBASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables");
    }

    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
    });

    return supabase;
}

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// OPTIONS
export async function OPTIONS() {
    return NextResponse.json({}, { headers: CORS_HEADERS });
}

// POST - track CLI usage using the PostgreSQL function
export async function POST(req: NextRequest) {
    try {
        const supabase = getSupabaseClient();
        const body = await req.json();
        const { username, email, os, command, timestamp } = body;

        // Validate input
        if (!username && !email) {
            return NextResponse.json(
                { error: "username or email required" },
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const now = timestamp || new Date().toISOString();

        // Call the PostgreSQL function to handle upsert with increment
        const { data, error } = await supabase.rpc('increment_cli_usage', {
            p_username: username || null,
            p_email: email || null,
            p_command: command || null,
            p_timestamp: now,
            p_os: os || {}
        }as any);

        if (error) {
            console.error("Supabase RPC error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500, headers: CORS_HEADERS }
            );
        }

        return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    } catch (err: any) {
        console.error("API /api/track POST error:", err);
        return NextResponse.json(
            { error: err.message || "unknown" },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}

// GET - fetch all users for dashboard
export async function GET() {
    try {
        const supabase = getSupabaseClient();
        const { data: users, error } = await supabase
            .from("cli_tracking")
            .select("id, username, email, os, command, usage_count, last_used, timestamp, created_at")
            .order("last_used", { ascending: false });

        if (error) {
            console.error("Supabase GET error:", error);
            throw error;
        }

        return NextResponse.json({ users: users || [] }, { headers: CORS_HEADERS });
    } catch (err: any) {
        console.error("API /api/track GET error:", err);
        return NextResponse.json(
            { error: err.message || "unknown" },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}