import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToogleTheme } from '@/components/toggle-theme'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/providers/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'NextJS 14 - Auth v5',
    description: 'Created by Felipe França',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    return (
        <html lang="pt-br" suppressHydrationWarning>
            <SessionProvider session={session}>
                <body className={inter.className}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <ToogleTheme className="absolute bottom-6 right-6 md:top-6" />
                        {children}
                    </ThemeProvider>
                </body>
            </SessionProvider>
        </html>
    )
}
