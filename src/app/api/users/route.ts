import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

interface User {
    name: string;
    username: string;
    avatar: string;
    profileUrl: string;
    lastUsed: string;
    usageCount: number;
}

// Initialize Upstash Redis
const redis = Redis.fromEnv();

const USERS_KEY = 'forjex:users';

// POST - Add new user
export async function POST(request: NextRequest) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const body = await request.json();
        const { name, username, avatar, profileUrl, timestamp } = body;

        console.log('Received user data:', { username, name });

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400, headers }
            );
        }

        // Get existing users from Redis
        const users: User[] = await redis.get(USERS_KEY) || [];
        console.log('Current users count:', users.length);

        // Check if user already exists
        const existingIndex = users.findIndex((u: User) => u.username === username);

        const userData: User = {
            name: name || username,
            username,
            avatar,
            profileUrl,
            lastUsed: timestamp || new Date().toISOString(),
            usageCount: existingIndex >= 0 ? users[existingIndex].usageCount + 1 : 1
        };

        if (existingIndex >= 0) {
            // Update existing user
            users[existingIndex] = userData;
            console.log('Updated existing user:', username);
        } else {
            // Add new user
            users.push(userData);
            console.log('Added new user:', username);
        }

        // Save to Redis
        await redis.set(USERS_KEY, users);
        console.log('Saved to Redis successfully');

        return NextResponse.json({ success: true, user: userData }, { headers });
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json(
            { error: 'Failed to save user', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500, headers }
        );
    }
}

// GET - Fetch all users
export async function GET() {
    const headers = {
        'Access-Control-Allow-Origin': '*',
    };

    try {
        const users: User[] = await redis.get(USERS_KEY) || [];
        console.log('Fetching users, count:', users.length);

        // Sort by last used (most recent first)
        users.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime());

        return NextResponse.json({ users }, { headers });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500, headers }
        );
    }
}

// OPTIONS - Handle preflight
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}