'use server'

import { z } from 'zod'
import { currentUser } from '@/lib/authUtils'
import { db } from '@/lib/db'
import { SettingsSchema } from '@/schemas'
import { getUserByEmail, getUserByIdWithPassword } from './user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { hashPassword, verifyPassword } from '@/lib/handle-crypt'

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser()

    if (!user) return { error: 'Unauthorized' }

    const dbUser = await getUserByIdWithPassword(user.id)
    if (!user) return { error: 'Unauthorized' }

    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactor = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id) return { error: 'O email já está em uso' }

        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: 'Email de verificação foi enviado' }
    }    

    if (values.password && values.newPassword && dbUser?.password) {
        const validPass = await verifyPassword(values.password, dbUser.password)
        if (!validPass) return { error: 'A senha inválida' }
        
        values.newPassword = undefined
        values.password = await hashPassword(values.password)
    }

    await db.user.update({
        where: { id: dbUser?.id },
        data: {
            ...values
        }
    })
    return { success: 'Configurações atualizadas' }
}