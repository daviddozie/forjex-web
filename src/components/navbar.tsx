"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "./ui/button";
import { Logo } from "./svg";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Docs", href: "/docs" },
        { name: "Guides", href: "/guides" },
        { name: "features", href: "features" },
        { name: "API", href: "#" },
    ];

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!headerRef.current) return;
        gsap.from(headerRef.current, {
            y: -40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!menuRef.current) return;
        gsap.to(menuRef.current, {
            x: isOpen ? 0 : "100%",
            opacity: isOpen ? 1 : 0,
            duration: 0.5,
            ease: "power2.out",
        });
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <header
            ref={headerRef}
            className={`header fixed top-0 left-0 w-full z-50 transition-all border-b ${scrolled
                ? "backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 shadow-sm dark:border-[#2a2a2a]"
                : "bg-white dark:bg-black "
                }`}
        >
            <div className="max-w-[95%] mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex gap-2">

                    <div className="flex items-center gap-2">
                        <a href="/" className="text-foreground flex items-center gap-2 font-bold text-2xl">
                            <Logo />
                            Forjex
                        </a>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex text-sm items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`transition-colors duration-300 font-medium ${isActive
                                    ? "text-black dark:text-white"
                                    : "text-[#848484] hover:text-black dark:hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Button onClick={() => router.push('/guides')}>
                        Get Started
                    </Button>
                </div>
                <button
                    className="hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
                    onClick={() => setIsOpen(!isOpen)}
                >

                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >

                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        ref={menuRef}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        className="md:hidden fixed top-15 left-0 w-full h-screen bg-white dark:bg-black flex flex-col p-8 space-y-6 z-40"
                    >
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <>
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`transition-colors duration-300 text-sm font-medium ${isActive
                                            ? "text-black dark:text-white"
                                            : "text-[#848484] hover:text-black dark:hover:text-white"
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                </>
                            );
                        })}
                        <Button onClick={() => router.push('/guides')}>
                            Get Started
                        </Button>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};