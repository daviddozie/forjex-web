import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
async function ensureDataDir() {
    const dir = path.join(process.cwd(), 'data');
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Read users
async function getUsers() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Save users
async function saveUsers(users: any[]) {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

// POST - Add new user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, username, avatar, profileUrl, timestamp } = body;

        console.log('Received user data:', { name, username, avatar }); // Debug log

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }

        const users = await getUsers();

        // Check if user already exists
        const existingIndex = users.findIndex((u: any) => u.username === username);

        const userData = {
            name,
            username,
            avatar,
            profileUrl,
            lastUsed: timestamp || new Date().toISOString(),
            usageCount: existingIndex >= 0 ? users[existingIndex].usageCount + 1 : 1
        };

        if (existingIndex >= 0) {
            // Update existing user
            users[existingIndex] = userData;
        } else {
            // Add new user
            users.push(userData);
        }

        await saveUsers(users);

        console.log('User saved successfully:', userData); // Debug log

        return NextResponse.json({ success: true, user: userData });
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json(
            { error: 'Failed to save user' },
            { status: 500 }
        );
    }
}

// GET - Fetch all users
export async function GET() {
    try {
        const users = await getUsers();
        console.log('Fetching users:', users.length); // Debug log
        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}