import * as argon2 from 'argon2'

export async function hashPassword(password: string): Promise<string> {
    try {
        const hash = await argon2.hash(password)
        return hash
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function verifyPassword(
    password: string,
    hash: string
): Promise<boolean> {
    try {
        const verified = await argon2.verify(hash, password)
        return verified
    } catch (error) {
        console.log(error)
        throw error
    }
}
