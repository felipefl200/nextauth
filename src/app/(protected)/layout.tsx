import { NavbarMenu } from '@/components/navbar-menu'

type ProtectedLayoutProps = {
    children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <div className='pt-6'>
            <NavbarMenu />
            </div>
            {children}
        </div>
    )
}
