import { CardWrapper } from './card-wrapper'

export function LoginForm() {
    return (
        <CardWrapper
            headerLabel="Seja Bem-vindo!"
            backButtonLabel="Não possui conta ?"
            backButtonHref="/register"
            showSocial
        >
            Login Form!
        </CardWrapper>
    )
}
