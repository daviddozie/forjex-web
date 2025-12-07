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
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Downloads from "@/components/downloads"

interface User {
    id: string
    username: string | null
    email: string | null
    os: any
    command: string | null
    usage_count: number
    last_used: string
    created_at: string
}

const USERS_PER_PAGE = 6

export default function Analytics() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

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
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Pagination logic
    const totalPages = Math.ceil(users.length / USERS_PER_PAGE)
    const startIndex = (currentPage - 1) * USERS_PER_PAGE
    const endIndex = startIndex + USERS_PER_PAGE
    const currentUsers = users.slice(startIndex, endIndex)

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    return (
        <>
            <Navbar />
            <div className="pt-20">
                <div className="w-[90%] max-w-7xl mx-auto py-10">
                    <Downloads userCount={users.length}/>
                    <div className="mb-8 mt-15">
                        <h1 className="text-4xl font-bold text-foreground">Forjex Users</h1>
                        <p className="text-muted-foreground mt-2">
                            Developers using Forjex to automate their workflows
                        </p>
                    </div>

                    <div className="w-full border rounded-lg overflow-hidden">
                        <Table className="w-full">
                            <TableCaption>
                                {users.length > 0
                                    ? `Showing ${startIndex + 1}-${Math.min(endIndex, users.length)} of ${users.length} developers`
                                    : 'No users yet. Be the first to use Forjex!'}
                            </TableCaption>

                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Usage Count</TableHead>
                                    <TableHead>Last Used</TableHead>
                                    <TableHead className="text-right">GitHub</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    Array.from({ length: USERS_PER_PAGE }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                    <Skeleton className="h-4 w-32" />
                                                </div>
                                            </TableCell>
                                            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : currentUsers.length > 0 ? (
                                    currentUsers.map((user) => {
                                        const displayName = user.username || user.email?.split('@')[0] || 'Anonymous'
                                        const avatarUrl = user.username
                                            ? `https://github.com/${user.username}.png`
                                            : `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`
                                        const profileUrl = user.username
                                            ? `https://github.com/${user.username}`
                                            : "#"
                                        const initials = displayName.slice(0, 2).toUpperCase()

                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={avatarUrl}
                                                                alt={displayName}
                                                            />
                                                            <AvatarFallback>
                                                                {initials}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{displayName}</span>
                                                            {user.email && user.username && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    {user.email}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <span className="font-mono font-semibold">
                                                        {user.usage_count}x
                                                    </span>
                                                </TableCell>

                                                <TableCell className="text-muted-foreground text-sm">
                                                    {formatDate(user.last_used)}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    {user.username ? (
                                                        <a
                                                            href={profileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-primary hover:underline"
                                                        >
                                                            View <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm">N/A</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                            No users yet. Install Forjex and be the first!
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination Controls */}
                        {!loading && users.length > USERS_PER_PAGE && (
                            <div className="flex items-center justify-between px-6 py-4 border-t">
                                <div className="text-sm text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1" />
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}