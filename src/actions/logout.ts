'use server'

import { signOut } from '@/providers/auth'

export const logout = async () => {
    await signOut()
}
