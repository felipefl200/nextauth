'use server'

import { z } from 'zod'
import { ResetPasswordSchema } from '@/schemas'
import { getUserByEmail } from './user'
import { generatePasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/mail'

export const resetPassword = async (
    values: z.infer<typeof ResetPasswordSchema>
) => {
    const validateFields = ResetPasswordSchema.safeParse(values)

    if (!validateFields.success) return { error: validateFields.error.message }

    const { email } = validateFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) return { error: 'Email não cadastrado' }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: 'O email foi enviado' }
}
