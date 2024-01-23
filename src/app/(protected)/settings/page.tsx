'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { settings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { SettingsSchema } from '@/schemas'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/hooks/use-current-user'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserRole } from '@prisma/client'
import { Switch } from '@/components/ui/switch'

export default function SettingPage() {
    const user = useCurrentUser()
    const [error, setError] = useState<undefined | string>()
    const [success, setSuccess] = useState<undefined | string>()
    const { update } = useSession()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || UserRole.USER,
            password: undefined,
            passwordConfirmation: undefined,
            isTwoFactor: user?.isTwoFactor,
        },
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        setError(undefined)
        setSuccess(undefined)
        startTransition(() => {
            settings(values).then((data) => {
                if (data.error) setError(data.error)
                if (data.success) {
                    setSuccess(data.success)
                    update()
                }
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} placeholder="Seu nome" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending || user?.isOAuth}
                                                placeholder="Seu email"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de usuário</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo de usuário" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="USER">USER</SelectItem>
                                                <SelectItem value="ADMIN">ADMIN</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending || user?.isOAuth}
                                                placeholder="******"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirme a senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending || user?.isOAuth}
                                                placeholder="******"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isTwoFactor"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Habilitar 2FA</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" disabled={isPending}>
                            Atualizar {isPending && <Icons.spinner className="ml-2 animate-spin" />}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
