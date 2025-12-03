import { Logo } from "./svg"

export const Footer = () => {

    const navbar = [
        {
            title: "Product",
            navList: ["Docs", "Guides", "API Reference", "Features"]
        },
        {
            title: "Community",
            navList: ["Github", "Twitter"]
        },
        {
            title: "Company",
            navList: ["About", "Blog", "Contact"]
        },
        {
            title: "Legal",
            navList: ["Privacy Policy", "Terms of Services"]
        },
    ]

    return (
        <footer className="w-full border-t mt-30">
            <div className="w-[90%] mx-auto my-20 flex gap-8 flex-wrap justify-between items-start">
                {navbar.map((nav, index) => (
                    <ul className="text-foreground font-semibold text-[18px]" key={index}>
                        <p className="pb-4">{nav.title}</p>
                        {nav.navList.map((list, idx) => (
                            <li className="text-[#848484] py-2 text-sm font-normal hover:text-black dark:hover:text-white transition-all duration-300" key={idx}>
                                <a href="">
                                    {list}
                                </a>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="w-[90%] mx-auto pb-20">
                <div className="flex items-center gap-2">
                    <div className="text-foreground">
                        <Logo />
                    </div>
                    <p className="text-[#848484] text-sm">
                        © {new Date().getFullYear()} Forjex, Inc. All rights reserved.
                    </p>
                </div>
                <div>

                </div>
            </div>
        </footer>
    )
}