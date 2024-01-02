import { Poppins } from 'next/font/google'
import { Icons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/app/(auth)/_components/login-button'

const poppins = Poppins({ subsets: ['latin'], weight: ['600'] })

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-600 to-blue-950">
            <div className="space-y-6">
                <h1
                    className={cn(
                        'flex items-center justify-center text-4xl font-semibold text-white drop-shadow-md',
                        poppins.className
                    )}
                >
                    Autenticação <Icons.shieldIcon className="h-10 w-10" />
                </h1>
                <LoginButton>
                    <Button variant="secondary" className="w-full text-lg">
                        Entrar
                    </Button>
                </LoginButton>
            </div>
        </main>
    )
}