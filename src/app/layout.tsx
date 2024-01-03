import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToogleTheme } from '@/components/toggle-theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'NextJS 14 - Auth v5',
    description: 'Created by Felipe França',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ToogleTheme className="absolute right-6 top-6" />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
