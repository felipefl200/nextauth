import { z } from 'zod'

export const LoginSchema = z.object({
    email: z
        .string({ required_error: 'O campo email deve ser preenchido' })
        .email({ message: 'Verifique o email inserido' }),
    password: z.string({ required_error: 'O campo senha deve ser preechido' }).min(1, {message: 'O campo senha deve ser preechido'}),
})
