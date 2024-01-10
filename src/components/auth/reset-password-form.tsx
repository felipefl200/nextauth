'use client'

import { useState, useTransition } from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordSchema } from '@/schemas'
import { z } from 'zod'
import { resetPassword } from '@/actions/reset-password'
import { Icons } from '@/components/icons'

export function ResetPasswordForm() {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            resetPassword(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Esqueceu sua senha ?"
            backButtonLabel="Voltar ao login"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="email@email.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Informe o email de sua conta cadastrada
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button disabled={isPending} type="submit">
                        Enviar{' '}
                        {isPending && (
                            <Icons.spinner className="ml-2 h-6 w-6 animate-spin" />
                        )}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
