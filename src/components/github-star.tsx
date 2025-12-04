"use client"

import { useEffect, useState } from "react"
import { Github } from "lucide-react"
import { Button } from "./ui/button"
import { Star } from "lucide-react"

export default function GitHubStars() {
    const [stars, setStars] = useState<number | null>(null)

    useEffect(() => {
        async function fetchStars() {
            const res = await fetch("https://api.github.com/repos/daviddozie/forjex")
            const data = await res.json()
            setStars(data.stargazers_count)
        }
        fetchStars()
    }, [])

    return (
        <Button variant="outline" asChild>
            <a
                href="https://github.com/daviddozie/forjex"
                target="_blank"
                className="flex items-center gap-2"
            >
                <Github className="w-4 h-4" />
                <span className="flex items-center">{stars}</span>
            </a>
        </Button>
    )
}
