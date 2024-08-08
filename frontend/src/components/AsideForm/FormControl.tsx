import { FormControl as ChakraFormControl } from "@chakra-ui/react";
import { ReactNode } from "react";

type FormControProps = {
    children: ReactNode | ReactNode[]
}

export function FormControl({children}: FormControProps){
    return (
        <ChakraFormControl>
            {children}
        </ChakraFormControl>
    )
}