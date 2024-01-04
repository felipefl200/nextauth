// export const exclude = <User, Key extends keyof User>(
//     user: User,
//     ...keys: Key[]
// ): Omit<User, Key> => {
//     for (let key of keys) {
//         delete user[key]
//     }
//     return user
// }

export const exclude = <
    User extends Record<string, any>,
    Key extends keyof User,
>(
    user: User | null,
    ...keys: Key[]
): User | null => {
    if (user === null) return null

    const clonedUser = { ...user }
    for (let key of keys) {
        delete clonedUser[key]
    }
    return clonedUser
}
