import { CheckCircledIcon } from '@radix-ui/react-icons'

interface FormSuccessProps {
    message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
    if (!message) return null
    return (
        <div className="flex items-center justify-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
            <CheckCircledIcon className="h-5 w-5" />
            <span>{message}</span>
        </div>
    )
}
