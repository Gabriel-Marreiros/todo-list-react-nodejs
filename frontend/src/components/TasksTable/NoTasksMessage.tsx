interface NoTasksMessageProps {
    message: string
    className?: string
}

export function NoTasksMessage({ message, className }: NoTasksMessageProps) {

    return (
        <span className={`m-9 block text-lg italic text-center text text-neutral-600 ${className}`}>{message}</span>
    )
}