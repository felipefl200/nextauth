import { z } from 'zod'

export const LoginSchema = z.object({
    email: z
        .string({ required_error: 'O campo email deve ser preenchido' })
        .email({ message: 'Verifique o email inserido' }),
    password: z
        .string({ required_error: 'O campo senha deve ser preechido' })
        .min(1, { message: 'O campo senha deve ser preechido' }),
})

export const RegisterSchema = z.object({
    name: z.string({ required_error: 'O campo nome deve ser preenchido' }).min(1, {message: 'O campo nome deve ser preenchido'}),
    email: z
        .string({ required_error: 'O campo email deve ser preenchido' })
        .email({ message: 'Verifique o email inserido' }),
    password: z
        .string({ required_error: 'O campo senha deve ser preechido' })
        .min(6, { message: 'O campo senha deve ter no mínimo 6 caracteres' }),
})
