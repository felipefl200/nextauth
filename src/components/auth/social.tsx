'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/lib/icons'

interface SocialProps {
    isLoading: boolean
}

export function Social({ isLoading }: SocialProps) {
    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                onClick={() => {}}
                disabled={isLoading}
                size="lg"
                className="w-full"
                variant="outline"
            >
                <Icons.googleIcon />
            </Button>

            <Button
                onClick={() => {}}
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
