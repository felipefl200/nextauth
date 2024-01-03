import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['600'],
})

interface HeaderProps {
    label: string
}

export function Header({ label }: HeaderProps) {
    return (
        <div
            className={cn(
                poppins.className,
                'flex w-full flex-col items-center justify-center gap-y-4'
            )}
        >
            <h1
                className={cn(
                    'flex items-center text-3xl font-semibold',
                    poppins.className
                )}
            >
                Auth <Icons.shieldIcon />
            </h1>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    )
}
