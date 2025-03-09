import { ReactNode } from "react"

interface NavGroupProps {
    title: string
    children: ReactNode | ReactNode[]
}

export function NavGroup({title, children}: NavGroupProps) {
    return (
        <nav>
            <h4 className="text-lg font-semibold mb-2">{title}</h4>

            <ul className="space-y-2 max-h-60 overflow-auto">
                {children}
            </ul>
        </nav>
    )
}