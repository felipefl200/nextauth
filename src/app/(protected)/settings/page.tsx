'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { settings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { useSession } from 'next-auth/react'

export default function SettingPage() {
    const { update } = useSession()
    const [isPending, startTransition] = useTransition()
    const onClick = () => {
        startTransition(() => {
            settings({
                name: 'Felipe França',
            }).then(() => {
                update()
            })
        })
    }
    return (
        <Card className="w-600px">
            <CardHeader>
                <p className="flex items-center justify-center gap-2 text-center text-2xl font-semibold">
                    <Icons.settingsIcon /> Configurações
                </p>
            </CardHeader>
            <CardContent>
                <Button onClick={onClick}>Atualizar</Button>
            </CardContent>
        </Card>
    )
}
