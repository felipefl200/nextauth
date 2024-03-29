import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
    message?: string
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return null
    return (
        <div className="flex items-center justify-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive dark:bg-destructive/70 dark:text-secondary-foreground">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span>{message}</span>
        </div>
    )
}
