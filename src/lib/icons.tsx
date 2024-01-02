type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    shieldIcon: (props: IconProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m-2-6h4q.425 0 .713-.288T15 15v-3q0-.425-.288-.712T14 11v-1q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10v1q-.425 0-.712.288T9 12v3q0 .425.288.713T10 16m1-5v-1q0-.425.288-.712T12 9q.425 0 .713.288T13 10v1z"
            />
        </svg>
    ),
}
