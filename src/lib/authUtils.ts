import { auth } from "@/providers/auth"

export const currentUser = async () => {
    const session = await auth()

    return session?.user
}