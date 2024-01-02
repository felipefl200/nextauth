import { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className='flex flex-col gap-y-4'>
            <nav>
                {children}
            </nav>
        </div>
    )
}