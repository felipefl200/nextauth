'use client'

import { Icons } from '@/components/icons'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import { FormSuccess } from '../form-success'
import { FormError } from '../form-error'

export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {
        if (success || error) return

        if (!token) return setError('Token inválido')

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError('Erro ao verificar o token')
            })
    }, [token, error, success])

    useEffect(() => {
        onSubmit()
    }, [token])

    return (
        <CardWrapper
            headerLabel="Confirmando sua solicitação"
            backButtonLabel="Voltar ao login"
            backButtonHref="/login"
        >
            <div className="item-center flex w-full justify-center">
                {!error && !success && (
                    <Icons.spinner className="animate-spin" />
                )}

                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    )
}
