import { FormLabel } from "@chakra-ui/react";

interface LabelProps {
    children: string
}

export function Label({children}: LabelProps){
    return (
        <FormLabel>{children}</FormLabel>
    )
}