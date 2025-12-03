'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Copy, Check } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const Hero = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText("npm install -g forjex");

        setCopied(true);

        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="w-[90%] mx-auto mt-40">
            <h1 className="font-bold text-foreground lg:text-7xl md:text-5xl text-2xl text-center lg:leading-24">The Modern CLI For Instant Project Scaffolding</h1>
            <div className="md:max-w-[55%] mx-auto text-center">
                <p className="text-gray-400 mt-6 md:text-[20px]">
                    Generate, configure, and deploy your next project in seconds, not hours. Forjex helps developers generate new repositories, automate setups, and streamline project creation.
                </p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-10">
                <Button className="md:w-[200px] h-11 w-full flex-1 md:flex-none">
                    Get Started
                </Button>
                <Button variant="outline" className="md:w-[200px] h-11 w-full flex-1 md:flex-none">
                    Read Docs
                </Button>
            </div>
            <div className="rounded-md flex mt-10 justify-between items-center text-[#848484] border max-w-lg px-4 py-4 font-mono text-sm mx-auto">
                <p className="text-[#848484]">
                    <span className="text-[#585858] pr-4">$</span>
                    npm install -g forjex
                </p>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="link" onClick={handleCopy} className="p-0 hover:dark:bg-[#535353] hover:bg-gray-200">
                            {copied ? (
                                <Check className="dark:text-white transition-all duration-200" />
                            ) : (
                                <Copy className="text-[#848484] transition-all duration-200" />
                            )}
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent className="transition-all duration-200">
                        <p>{copied ? "Copied!" : "Copy to Clipboard"}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}