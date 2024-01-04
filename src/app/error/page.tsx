import { ErrorCard } from '@/components/auth/error-card'

export default function Error() {
    return (
        <div className='flex h-full flex-col justify-center items-center gap-4'>
            <h2 className='text-2xl font-semibold'>Error Page</h2>
            <ErrorCard />
        </div>
    )
}
