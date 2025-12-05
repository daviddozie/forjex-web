import 'dotenv/config';
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
});

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// OPTIONS
export async function OPTIONS() {
    return NextResponse.json({}, { headers: CORS_HEADERS });
}

// POST - track CLI usage
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, os, command, timestamp } = body;

        if (!username && !email) {
            return NextResponse.json({ error: "username or email required" }, { status: 400, headers: CORS_HEADERS });
        }

        const now = timestamp || new Date().toISOString();

        const { error } = await supabase
            .from("cli_tracking")
            .upsert(
                {
                    username: username || null,
                    email: email || null,
                    os: os || {},
                    command: command || null,
                    last_used: now,
                    created_at: now
                },
                { onConflict: "username,email" }
            );
        if (error) {
            console.error("Supabase upsert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500, headers: CORS_HEADERS });
        }

        return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    } catch (err: any) {
        console.error("API /api/track POST error:", err);
        return NextResponse.json({ error: err.message || "unknown" }, { status: 500, headers: CORS_HEADERS });
    }
}

// GET - fetch all users for dashboard
export async function GET() {
    try {
        const { data: users, error } = await supabase
            .from("cli_tracking")
            .select("username,email,os,command,usage_count,last_used,timestamp,created_at")
            .order("last_used", { ascending: false });
        if (error) throw error;

        return NextResponse.json({ users: users || [] }, { headers: CORS_HEADERS });
    } catch (err: any) {
        console.error("API /api/track GET error:", err);
        return NextResponse.json({ error: err.message || "unknown" }, { status: 500, headers: CORS_HEADERS });
    }
}
