import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Header } from './header'
import { BackButton } from './back-button'
import { Icons } from '../icons'

export function ErrorCard() {
    return (
        <Card className="w-[300px]">
            <CardHeader>
                <Header label="Ops! Ocorreu um erro." />
            </CardHeader>           
            <CardFooter>
                <BackButton label="Voltar" href="/login" />
            </CardFooter>
        </Card>
    )
}
