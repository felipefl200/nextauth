'use client'

import { FormSuccess } from '@/components/form-success'
import { Icons } from '@/components/icons'
import { RoleGate } from '@/components/role-gate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'
import { admin } from '@/actions/admin'

export default function AdminPage() {
    const onServerClick = () => {
        admin().then((response) => {
            if (response.success) {
                toast.success('Acesso Concedido', {
                    description: 'O acesso a Server Actions foi feito e obteve sucesso',
                })
            }
            if (response.error) {
                toast.error('Acesso restrito', { description: 'Você não tem acesso para acessar esse recurso' })
            }
        })
    }
    const onApiClick = () => {
        fetch('/api/admin').then((response) => {
            if (response.ok) {
                toast.success('Acesso Concedido', { description: 'O acesso a API foi feito e o retorno foi status OK' })
            } else {
                toast.error('Acesso restrito', { description: 'Você não tem acesso para acessar esse recurso' })
            }
        })
    }
    return (
        <Card>
            <CardHeader>
                <div className="flex space-x-1">
                    <h1>Apenas administradores</h1>
                    <Icons.keyIcon className="h-6 w-6 rotate-45 text-yellow-500 dark:text-yellow-400" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="Essa é uma mesangem que apenas administradores podem ver" />
                </RoleGate>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Apenas Admin API</p>
                    <Button onClick={onApiClick}>Testar</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Apenas Admin Server Actions</p>
                    <Button onClick={onServerClick}>Testar</Button>
                </div>
            </CardContent>
            <p></p>
        </Card>
    )
}
