'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/actions/user'
import { hashPassword } from '@/lib/handle-crypt'
import { RegisterSchema } from '@/schemas'
import { z } from 'zod'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFileds = RegisterSchema.safeParse(values)

    if (!validatedFileds.success) {
        return { error: validatedFileds.error.message }
    }

    const { name, email, password } = validatedFileds.data

    const hashedPassword = await hashPassword(password)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: 'Email já cadastrado!' }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    //TODO: Send verification email

    return { success: 'Usuário criado com sucesso!' }
}
