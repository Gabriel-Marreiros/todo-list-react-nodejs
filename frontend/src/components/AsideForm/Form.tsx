import { DrawerBody } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"

interface FormProps {
    children: ReactNode | ReactNode[];
    onSubmit(): unknown;
}

export function Form({ children, onSubmit }: FormProps) {

    const { handleSubmit } = useFormContext()

    return (
        <DrawerBody className="mt-5">
            <form className="space-y-5" id="form" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </DrawerBody>
    )
}