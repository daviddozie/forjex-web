"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { ArrowUpRight, Loader2 } from "lucide-react"

interface AnalyticsData {
    totalUsers: number
    totalDownloads: number
    weeklyDownloads: number
    monthlyDownloads: number
    weeklyData: { day: string; value: number }[]
    growthPercentage: string
}

interface DownloadsProps {
    userCount: number
}

export default function Downloads({ userCount }: DownloadsProps) {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all'>('weekly')

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/analytics')
            const data = await res.json()
            setAnalytics(data)
        } catch (error) {
            console.error('Failed to fetch analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    const getDisplayData = () => {
        if (!analytics) return []
        return analytics.weeklyData
    }

    const getDownloadCount = () => {
        if (!analytics) return 0
        
        switch (timeframe) {
            case 'weekly':
                return analytics.weeklyDownloads
            case 'monthly':
                return analytics.monthlyDownloads
            case 'all':
                return analytics.totalDownloads
            default:
                return analytics.weeklyDownloads
        }
    }

    const getTimeframeLabel = () => {
        switch (timeframe) {
            case 'weekly':
                return 'Weekly Downloads'
            case 'monthly':
                return 'Monthly Downloads'
            case 'all':
                return 'All Time Downloads'
            default:
                return 'Weekly Downloads'
        }
    }

    if (loading) {
        return (
            <div className="w-full mt-10 space-y-8">
                <div>
                    <h1 className="text-4xl font-bold">Usage Analytics</h1>
                    <p className="text-muted-foreground mt-1">
                        Insights into Forjex's adoption and growth.
                    </p>
                </div>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-8">
            <div>
                <h1 className="text-4xl font-bold">Usage Analytics</h1>
                <p className="text-muted-foreground mt-1">
                    Insights into Forjex's adoption and growth.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
                {/* Total Users Card */}
                <Card className="bg-card border border-border">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium text-muted-foreground">
                            Total Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6">
                        <div className="text-5xl font-bold tracking-tight mb-3">
                            {(analytics?.totalUsers || userCount).toLocaleString()}
                        </div>
                        <div className="text-emerald-600 dark:text-emerald-500 flex items-center text-sm font-medium">
                            <ArrowUpRight className="h-4 w-4 mr-1" /> 
                            {analytics?.growthPercentage || '+0%'} from last month
                        </div>
                    </CardContent>
                </Card>

                {/* Downloads Chart Card */}
                <Card className="bg-card border border-border">
                    <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <CardTitle className="text-base mb-5 md:mb-0 font-medium text-muted-foreground">
                                {getTimeframeLabel()}
                            </CardTitle>

                            {/* Tabs */}
                            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                                <button
                                    onClick={() => setTimeframe('weekly')}
                                    className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                                        timeframe === 'weekly'
                                            ? 'bg-background text-foreground shadow-sm font-medium'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    Weekly
                                </button>
                                <button
                                    onClick={() => setTimeframe('monthly')}
                                    className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                                        timeframe === 'monthly'
                                            ? 'bg-background text-foreground shadow-sm font-medium'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setTimeframe('all')}
                                    className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                                        timeframe === 'all'
                                            ? 'bg-background text-foreground shadow-sm font-medium'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    All Time
                                </button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pb-6">
                        <div className="text-5xl font-bold tracking-tight mb-3">
                            {getDownloadCount().toLocaleString()}
                        </div>
                        <div className="text-emerald-600 dark:text-emerald-500 flex items-center text-sm font-medium mb-6">
                            <ArrowUpRight className="h-4 w-4 mr-1" /> 
                            +{((getDownloadCount() / (analytics?.totalUsers || 1)) * 100).toFixed(1)}% usage rate
                        </div>

                        {/* Chart */}
                        <div className="h-[280px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart 
                                    data={getDisplayData()}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid 
                                        stroke="gray"
                                        opacity={0.2}
                                        vertical={false}
                                    />

                                    <XAxis 
                                        dataKey="day" 
                                        stroke="currentColor"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis 
                                        stroke="currentColor"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                        labelStyle={{ 
                                            color: "hsl(var(--foreground))",
                                            fontWeight: 600,
                                            marginBottom: 4
                                        }}
                                        itemStyle={{
                                            color: "hsl(var(--muted-foreground))"
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10b981"
                                        strokeWidth={2.5}
                                        fill="url(#colorDownloads)"
                                        dot={false}
                                        activeDot={{ 
                                            r: 5,
                                            fill: "#10b981",
                                            strokeWidth: 2,
                                            stroke: "#fff"
                                        }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}