'use client'
import { useForm } from 'react-hook-form'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordSchema } from '@/schemas'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { Icons } from '@/components/icons'

export function NewPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            password: '',
            passwordConfirmation: '',
        },
    })

    const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }

    return (
        <div>
            <CardWrapper
                headerLabel="Insira sua nova senha"
                backButtonHref="/login"
                backButtonLabel="Voltar ao login"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nova senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="******"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmação de senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="******"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button disabled={isPending} type="submit">
                            Nova senha{' '}
                            {isPending && (
                                <Icons.spinner className="ml-2 h-6 w-6 animate-spin" />
                            )}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}
