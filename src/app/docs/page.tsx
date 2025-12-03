import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function Docs() {
    return (
        <>
            <Navbar />
            <div className="mt-10 md:w-[70%] mx-auto md:border-l md:border-r w-[90%]">
                <div className="md:p-20 pt-20">
                    <div>
                        <h1 className="text-foreground md:text-4xl font-bold text-2xl">Introduction</h1>
                        <p className="text-gray-400 pt-4 md:text-[18px] text-sm">
                            Welcome to the Forjex documentation. Learn how to generate, configure, and deploy your projects in seconds.  <Link href="/guides" className="border font-mono text-xs text-foreground bg-zinc-50/10 blur-1xl py-1 px-2 rounded-sm hover:bg-zinc-50/20 transition-all duration-300">
                                check guide to install
                            </Link>
                        </p>
                    </div>
                    <div className="border-t border-b py-10 my-6">
                        <p className="text-[#848484] md:text-[18px] text-sm md:leading-10">
                            Forjex is a command-line tool that helps developers generate new repositories, automate setups, and streamline project creation. It's designed to eliminate boilerplate and automate repetitive tasks, letting you focus on what truly matters: building great software.
                        </p>
                    </div>
                    <div>
                        <h1 className="text-foreground text-2xl md:text-4xl font-bold">Why Forjex?</h1>
                        <h1 className="text-foreground text-[18px] md:text-2xl font-bold mt-4 md:mt-6">Automatic Github repository Setup</h1>
                        <p className="text-gray-400 pt-2 md:pt-4 text-sm md:text-[18px]">Forjex creates a new GitHub repository for your project and pushes your local codebase automatically. No manual setup—your project is version-controlled and ready to go instantly.</p>
                        <h1 className="text-foreground text-[18px] md:text-2xl font-bold mt-4 md:mt-6">Auto-Generated CI/CD Pipeline</h1>
                        <p className="text-gray-400 pt-2 md:pt-4 text-sm md:text-[18px]">Forjex builds a ready-to-use GitHub Actions workflow for your project. It handles building, testing, and preparing deployments automatically with every commit.</p>
                        <h1 className="text-foreground text-[18px] md:text-2xl font-bold mt-4 md:mt-6">Deployment to Vercel</h1>
                        <p className="text-gray-400 pt-2 md:pt-4 text-sm md:text-[18px]">Forjex connects your repo to Vercel and deploys your project automatically. Future commits trigger instant redeploys, giving you a smooth continuous delivery workflow.    <Link href="/guides" className="border font-mono text-xs text-foreground bg-zinc-50/10 blur-1xl py-1 px-2 rounded-sm hover:bg-zinc-50/20 transition-all duration-300">
                        check guide to install
                    </Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}