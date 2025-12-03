'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import type { EmblaCarouselType } from "embla-carousel"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card,
    CardDescription,
} from "@/components/ui/card"

export const WorkFlow = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const carouselApi = React.useRef<EmblaCarouselType | null>(null)

    const onSelect = React.useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap())
    }, [])

    const handleApi = (api?: EmblaCarouselType) => {
        if (!api) return

        carouselApi.current = api
        api.on("select", () => onSelect(api))
    }

    const workflows = [
        {
            stipet1: "Create a new Repository",
            stipet2: "and push",
            title: "Instant Scaffolding",
            des: "Create new Repository in a single command. Choose What you would like to add and push to that Repository"
        },
        {
            stipet1: "Automatically Configure",
            stipet2: "CI/CD pipeline",
            title: "Automated Setup",
            des: "Automatically configure linters, formatters, CI/CD pipelines with Github Actions, and environment variables without manual intervention."
        },
        {
            stipet1: "Deploy the Project",
            stipet2: "to vercel",
            title: "Deploy Automation",
            des: " Deploy your projects directly to Vercel with a simple command, integrating seamlessly with your development workflow."
        },
    ]

    return (
        <div className="w-[90%] mx-auto mt-25">
            <div className="md:max-w-[55%] mx-auto">
                <h1 className="font-bold md:text-5xl text-2xl text-foreground text-center md:leading-15">
                    Streamline Your Workflow from Start to Finish
                </h1>
                <p className="text-gray-400 mt-6 md:text-[18px] text-center">Forjex is designed to eliminate boilerplate and automate repetitive tasks, letting you focus on what truly matters: building.</p>
            </div>
            {/* Desktop */}
            <div className="hidden md:block">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-10">
                    {workflows.map((workflow, index) => (
                        <div className="w-full" key={index}>
                            <Card className="w-full p-6 bg-transparent">
                                <CardDescription>
                                    <div className="text-gray-400 font-mono">
                                        <p>//{workflow.stipet1}</p>
                                        <p className="text-[#848484] py-3">$ forjex forge --</p>
                                        <p>{workflow.stipet2}</p>
                                    </div>
                                </CardDescription>
                            </Card>
                            <div className="mt-5">
                                <h3 className="text-foreground font-semibold text-[18px] mb-1">{workflow.title}</h3>
                                <p className="text-gray-400">{workflow.des}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Mobile */}
            <Carousel
                plugins={[plugin.current]}
                className="w-full mt-10 md:hidden"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                setApi={handleApi}
            >
                <CarouselContent>
                    {workflows.map((workflow, index) => (
                        <CarouselItem className="w-full" key={index}>
                            <Card className="w-full p-6 bg-transparent">
                                <CardDescription>
                                    <div className="text-gray-400 font-mono">
                                        <p>//{workflow.stipet1}</p>
                                        <p className="text-[#848484] py-3">$ forjex forge --</p>
                                        <p>{workflow.stipet2}</p>
                                    </div>
                                </CardDescription>
                            </Card>
                            <div className="mt-5">
                                <h3 className="text-foreground font-semibold text-[18px] mb-1">{workflow.title}</h3>
                                <p className="text-gray-400">{workflow.des}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {workflows.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => carouselApi.current?.scrollTo(i)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${selectedIndex === i ? "bg-foreground w-4" : "bg-gray-400"}`}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    )
}