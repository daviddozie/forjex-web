import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function Feature() {
    return (
        <>
            <Navbar />
            <div className="w-[90%] mx-auto mt-30">
                <h1 className="font-bold text-foreground lg:text-7xl md:text-5xl text-2xl text-center lg:leading-24">The complete toolkit for modern developers.</h1>
                <div className="md:max-w-[55%] mx-auto text-center">
                    <p className="text-gray-400 mt-6 md:text-[20px]">
                        Discover how Forjex accelerates your development workflow, from project creation and local setup to global deployment.
                    </p>
                </div>
                <div className="mt-10">
                    
                    <h1 className="font-bold md:text-5xl text-2xl text-foreground text-center md:leading-15">
                        Features
                    </h1>

                    <div className="min-h-screen w-full text-white md:py-15 py-8 space-y-20">
                        {/* Automated Setup */}
                        <section className="grid md:grid-cols-2 gap-14 items-center">
                            <Card className=" bg-white border-gray-200 dark:bg-[#0A0A0A] dark:border-gray-800  order-2 md:order-1">
                                <div className="px-6 pb-3 text-sm border-b text-gray-700 border-gray-200 dark:text-gray-300 dark:border-gray-800">
                                    Terminal
                                </div>
                                <CardContent className="">
                                    <pre className="font-mono text-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                                        <span className="text-blue-600 dark:text-cyan-400">
                                            $ forjex forge
                                        </span>
                                        {"\n"}? What would you like to do with Forjex?
                                        {"\n\n"} 1) Create a new GitHub repository
                                        {"\n"} 2) Push to an existing GitHub repository
                                    </pre>
                                </CardContent>
                            </Card>
                            <div className="space-y-4 order-1 md:order-2">
                                <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 border dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                    Automated GitHub Repository Setup
                                </span>

                                <h2 className="text-3xl mt-2 font-semibold text-gray-900 dark:text-white">
                                    Forget manual setup
                                </h2>

                                <p className="leading-relaxed mt-6 text-gray-600 dark:text-gray-300">
                                    Forjex automates repository creation, configures tools, and removes all the repetitive setup work—so you can focus on building features, not wrestling with configs.
                                </p>
                            </div>
                        </section>

                        {/* Auto Generate CI/CD Pipeline */}
                        <section className="grid md:grid-cols-2 gap-10 items-center">
                            <div className="space-y-4">
                                <span className="px-4 py-2 border bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300 rounded-full text-purple-700 text-sm font-medium border-purple-200 dark:border-purple-800">Auto Generate CI/CD Pipeline</span>
                                <h2 className="text-3xl font-semibold mt-2 text-foreground">Ship confidently with automated workflows</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-6"> Forjex instantly generates a production-ready CI/CD pipeline using GitHub Actions—
                                    handling build, test, and deployment steps so your code moves from commit to
                                    production with zero manual setup.
                                </p>
                            </div>


                            <Card className="bg-white border-gray-200 dark:bg-[#0A0A0A] dark:border-gray-800  order-2 md:order-1">
                                <div className="px-6 pb-3 text-sm border-b text-gray-700 border-gray-200 dark:text-gray-300 dark:border-gray-800">
                                    Terminal
                                </div>
                                <CardContent className=" font-mono text-sm dark:text-green-400 text-green-600">
                                    <p className="dark:text-cyan-500 text-blue-600">$ forjex forge</p><br />
                                    <p>&gt; Would you like to add a CI/CD pipeline (GitHub Actions)?
                                        <span className="text-[#848484]">(Y/n)</span>
                                    </p>
                                    <p>&gt; Generating CI/CD Pipeline...</p><br />
                                    <p className="dark:text-green-400 mt-2 text-green-600">✔
                                        <span className="dark:text-cyan-500 text-blue-600"> CI/CD Pipeline Generated!</span></p>
                                </CardContent>
                            </Card>
                        </section>


                        {/* Deploy to vercel */}
                        <section className="grid md:grid-cols-2 gap-14 items-center">
                            <Card className=" bg-white border-gray-200 dark:bg-[#0A0A0A] dark:border-gray-800  order-2 md:order-1">
                                <div className="px-6 pb-3 text-sm border-b text-gray-700 border-gray-200 dark:text-gray-300 dark:border-gray-800">
                                    Terminal
                                </div>
                                <CardContent className="">
                                    <pre className="font-mono text-sm text-wrap leading-relaxed text-gray-700 dark:text-gray-400">
                                        <span className="text-blue-600 dark:text-cyan-400">
                                            $ forjex forge
                                        </span><br />
                                        {"\n"}? Would you like to deploy to Vercel? (Y/n)
                                        <p>&gt; Building project...</p>
                                        <p>&gt; Deploying to Vercel...</p><br />
                                        <p className="dark:text-green-400 mt-2 text-green-600">✔ 🎉Deployment complete!</p>
                                        <p className="text-wrap">🚀 Live Deployment:
                                            <span className="dark:text-green-400 text-wrap text-green-600">
                                                https://name.vercel.app
                                            </span>
                                        </p>
                                    </pre>
                                </CardContent>
                            </Card>
                            <div className="space-y-4 order-1 md:order-2">
                                <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 border dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                    One-Command Vercel Deployment
                                </span>

                                <h2 className="text-3xl mt-2 font-semibold text-gray-900 dark:text-white">
                                    From local to global in one command
                                </h2>

                                <p className="leading-relaxed mt-6 text-gray-600 dark:text-gray-300">
                                    Forjex streamlines deployment directly to Vercel, handling configuration and build steps so you don't have to.
                                </p>
                            </div>
                        </section>
                        <section className="grid md:grid-cols-2 gap-14 items-center">
                            {/* Left Content */}
                            <div className="space-y-4">
                                <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                    Auto-Generate Commit Messages
                                </span>

                                <h2 className="text-3xl font-semibold mt-2 text-foreground">
                                    Write clean commits without thinking
                                </h2>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-6">
                                    Forjex helps you maintain consistent, meaningful commit messages by generating
                                    structured commit summaries automatically—saving you time and keeping your
                                    repository history clean and professional.
                                </p>
                            </div>

                            {/* Terminal Block */}
                            <Card className="bg-white border-gray-200 dark:bg-[#0A0A0A] dark:border-gray-800 order-2 md:order-1">
                                <div className="px-6 pb-3 text-sm border-b text-gray-700 border-gray-200 dark:text-gray-300 dark:border-gray-800">
                                    Terminal
                                </div>

                                <CardContent className="font-mono text-sm text-gray-700 dark:text-gray-300">
                                    <p className="text-blue-600 dark:text-cyan-500">$ forjex forge</p>
                                    <br />

                                    <p>&gt; Analyzing changes in your project...</p>
                                    <br />

                                    <p className="text-green-600 dark:text-green-400">
                                        ✔ Suggested commit message:
                                    </p>

                                    <p className="mt-1 text-blue-600 dark:text-cyan-500">
                                        &quot;feat: added automated commit message generation to improve workflow&quot;
                                    </p>
                                </CardContent>
                            </Card>
                        </section>

                    </div>
                </div>
                <Link href='/guides' className="underline font-medium text-foreground">
                    To Quick Start: Visit Giude
                </Link>
            </div>
            <Footer />
        </>
    )
}