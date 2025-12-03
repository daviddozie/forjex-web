'use client'
import { useState } from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function Guides() {

    const packageManagers = {
        npm: "npm install -g forjex",
        yarn: "yarn global add forjex",
        pnpm: "pnpm add -g forjex",
        bun: "bun add -g forjex"
    };
    const [selected, setSelected] = useState<keyof typeof packageManagers>("npm");
    const [copied, setCopied] = useState(false);

    const runCopy = async () => {
        await navigator.clipboard.writeText("npm install -g forjex");

        setCopied(true);

        setTimeout(() => setCopied(false), 3000);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(packageManagers[selected]);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };


    return (
        <>
            <Navbar />
            <div className="mt-10 md:w-[70%] mx-auto md:border-l md:border-r w-[90%]">
                <div className="md:p-20 pt-20">
                    <div>
                        <h1 className="text-foreground md:text-4xl font-bold text-2xl">Package Manager Support</h1>
                        <p className="text-[#848484] pt-4 md:text-[18px] text-sm">
                            Forjex is designed to work seamlessly across multiple JavaScript package managers, giving developers the freedom to use the ecosystem they’re most comfortable with. Whether you're working on a lightweight project or a large-scale application, Forjex automatically detects and adapts to the package manager you prefer.
                        </p>
                    </div>
                    <div className="border-t border-b py-10 my-6">
                        <h1 className="text-foreground text-2xl font-bold">Install Forjex</h1>
                        <div className="flex gap-4 mt-6">
                            {Object.keys(packageManagers).map((pm) => (
                                <button
                                    key={pm}
                                    onClick={() => setSelected(pm as keyof typeof packageManagers)}
                                    className={`px-4 lowercase py-2 rounded-md border text-sm ${selected === pm
                                        ? "dark:bg-zinc-50/40 text-white bg-primary"
                                        : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {pm}
                                </button>
                            ))}
                        </div>

                        <div className="rounded-md flex mt-8 justify-between items-center text-[#848484] border px-4 py-4 font-mono text-sm mx-auto">
                            <p className="text-[#848484]">
                                <span className="text-[#585858] pr-4">$</span>
                                {packageManagers[selected]}
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
                    <div>
                        <h1 className="text-foreground text-2xl font-bold">Run Forjex</h1>
                        <div className="rounded-md flex mt-10 justify-between items-center text-[#848484] border px-4 py-4 font-mono text-sm mx-auto">
                            <p className="text-[#848484]">
                                <span className="text-[#585858] pr-4">$</span>
                                forjex forge
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
                </div>
            </div>
            <Footer />
        </>
    )
}