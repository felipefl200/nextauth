import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { LoginSchema } from '@/schemas'

import { getUserByEmail } from '@/actions/user'
import { verifyPassword } from '@/lib/handle-crypt'
import { exclude } from '@/utils/userWithoutPassword'

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Credentials({
            name: 'credentials',
            async authorize(credentials) {
                const validatedFiles = LoginSchema.safeParse(credentials)
                if (validatedFiles.success) {
                    const { email, password } = validatedFiles.data

                    const user = await getUserByEmail(email)

                    if (!user || !user.password) return null

                    const passwordMatch = await verifyPassword(
                        password,
                        user.password
                    )

                    if (!passwordMatch) return null

                    const userWithoutPassword = exclude(user, 'password')

                    return userWithoutPassword
                }
                return null
            },
        }),
    ],
} satisfies NextAuthConfig
