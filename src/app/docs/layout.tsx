
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <SidebarProvider>
                    <AppSidebar />
                    <ThemeProvider>
                        <main className="flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </ThemeProvider>
                </SidebarProvider>
            </body>
        </html>
    )
}
