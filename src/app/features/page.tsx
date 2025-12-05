'use client'

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"

interface User {
    name: string
    username: string
    avatar: string
    profileUrl: string
    lastUsed: string
    usageCount: number
}

export default function Features() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/track')
            const data = await res.json()
            setUsers(data.users || [])
        } catch (error) {
            console.error('Failed to fetch users:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <>
            <Navbar />
            <div className="pt-20">
                <div className="w-[90%] max-w-7xl mx-auto py-10">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-foreground">Forjex Users</h1>
                        <p className="text-muted-foreground mt-2">
                            Developers using Forjex to automate their workflows
                        </p>
                    </div>

                    <div className="w-full border rounded-lg overflow-hidden">
                        <Table className="w-full">
                            <TableCaption>
                                {users.length > 0
                                    ? `A list of ${users.length} developers using Forjex`
                                    : 'No users yet. Be the first to use Forjex!'}
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[35%]">User</TableHead>
                                    <TableHead className="w-[20%]">Username</TableHead>
                                    <TableHead className="w-[15%]">Usage Count</TableHead>
                                    <TableHead className="w-[20%]">Last Used</TableHead>
                                    <TableHead className="w-[10%] text-right">Profile</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    // Loading skeletons
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                    <Skeleton className="h-4 w-32" />
                                                </div>
                                            </TableCell>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow key={user.username}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback>
                                                            {user.name.slice(0, 2).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                @{user.username}
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono">{user.usageCount}x</span>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatDate(user.lastUsed)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <a
                                                    href={user.profileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-primary hover:underline"
                                                >
                                                    View <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                            No users yet. Install Forjex and be the first!
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}