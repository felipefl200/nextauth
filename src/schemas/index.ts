import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactor: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string().min(6, { message: "A nova senha deve ter no mínimo 6 caracteres" }))
})
    .refine((data) => {
        if (data.password && !data.newPassword) return false
        return true
    }, {
        message: 'Nova senha é necessária',
        path: ['newPassword']
    })
    .refine((data) => {
        if (data.newPassword && !data.password) return false
        return true
    }, {
        message: 'A senha atual é necessária',
        path: ['password']
    })

export const LoginSchema = z.object({
    email: z
        .string({ required_error: 'O campo email deve ser preenchido' })
        .email({ message: 'Verifique o email inserido' }),
    password: z
        .string({ required_error: 'O campo senha deve ser preechido' })
        .min(1, { message: 'O campo senha deve ser preechido' }),
    code: z.string().optional(),
})

export const RegisterSchema = z.object({
    name: z
        .string({ required_error: 'O campo nome deve ser preenchido' })
        .min(1, { message: 'O campo nome deve ser preenchido' }),
    email: z
        .string({ required_error: 'O campo email deve ser preenchido' })
        .email({ message: 'Verifique o email inserido' }),
    password: z
        .string({ required_error: 'O campo senha deve ser preechido' })
        .min(6, { message: 'O campo senha deve ter no mínimo 6 caracteres' }),
})

export const ResetPasswordSchema = z.object({
    email: z.string().email({ message: 'Verifique o email inserido' }),
})

export const ChangePasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: 'O campo senha deve ter no mínimo 6 caracteres',
        }),
        passwordConfirmation: z.string().min(6, {
            message: 'O campo senha deve ter no mínimo 6 caracteres',
        }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'As senhas não conferem',
        path: ['passwordConfirmation'],
    })
