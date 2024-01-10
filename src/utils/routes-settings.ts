/**
 * Any route public
 * These routes do not require authentication
 * and can be accessed by any user
 *
 * @type {string[]}
 */
export const publicRoutes = ['/', '/new-verification']

/**
 * Array of routes used for authentication purposes
 * These routes will redirect logged in users to the /settings
 * and can be accessed by any user
 *
 * @type {string[]}
 */
export const authRoutes = [
    '/login',
    '/register',
    '/error',
    '/reset-password',
    '/new-password',
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix will be used for API authentication purposes
 *
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The efault redirect path after loggin
 *
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
