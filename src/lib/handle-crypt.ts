import cryto from 'crypto'
import { hashSync, compareSync } from 'bcryptjs'

const numSaltRounds = 12

export async function hashPassword(password: string): Promise<string> {
    try {
        const hash = hashSync(password)
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
        const verifyPassword = compareSync(password, hash)
        return verifyPassword
    } catch (error) {
        console.log(error)
        throw error
    }
}

/**
 * This function generate random numbers for Two Factor Autentication
 */
export const generateTwoFactorCode = async () => {
    return cryto.randomInt(100_000, 1_000_000).toString()
}
