'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/lib/icons'

export function Social() {
    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                onClick={() => {}}
                size="lg"
                className="w-full"
                variant="outline"
            >
                <Icons.googleIcon />
            </Button>

            <Button
                onClick={() => {}}
                size="lg"
                className="w-full"
                variant="outline"
            >
                <Icons.githubIcon />
            </Button>
        </div>
    )
}
