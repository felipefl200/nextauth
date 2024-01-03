import NextAuth from 'next-auth'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/providers/auth.config'

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})
