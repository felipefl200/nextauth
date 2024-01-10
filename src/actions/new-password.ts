'use server'

import { ChangePasswordSchema } from '@/schemas'
import { z } from 'zod'
import { getPasswordResetTokenByToken } from './password-reset-token'
import { getUserByEmail } from './user'
import { hashPassword } from '@/lib/handle-crypt'
import { db } from '@/lib/db'

export const newPassword = async (
    values: z.infer<typeof ChangePasswordSchema>,
    token?: string | null
) => {
    if (!token) return { error: 'Token inválido' }

    const validatedFields = ChangePasswordSchema.safeParse(values)
    if (!validatedFields.success) return { error: 'Verifique a senha' }

    const { password } = validatedFields.data

    const existindToken = await getPasswordResetTokenByToken(token)
    if (!existindToken) return { error: 'Token inválido' }

    const hasExpired = new Date(existindToken.expires) < new Date()
    if (hasExpired) return { error: 'Token expirado' }

    const existingUser = await getUserByEmail(existindToken.email)
    if (!existingUser) return { error: 'Usuário não encontrado' }

    const hashedPassword = await hashPassword(password)

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    })

    await db.passwordResetToken.delete({
        where: { id: existindToken.id },
    })

    return { success: 'Senha alterada com sucesso' }
}
