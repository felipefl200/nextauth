'use server'

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFileds = RegisterSchema.safeParse(values)

    if (!validatedFileds.success) {
        return { error: validatedFileds.error.message }
    }

    return { success: 'Email foi enviado!' }
}
