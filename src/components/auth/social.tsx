'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/utils/routes-settings'

interface SocialProps {
    isLoading?: boolean
}

export function Social({ isLoading }: SocialProps) {
    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
    }
    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                onClick={() => onClick('google')}
                disabled={isLoading}
                size="lg"
                className="w-full"
                variant="outline"
            >
                <Icons.googleIcon />
            </Button>

            <Button
                onClick={() => onClick('github')}
                disabled={isLoading}
                size="lg"
                className="w-full"
                variant="outline"
            >
                <Icons.githubIcon />
            </Button>
        </div>
    )
}
