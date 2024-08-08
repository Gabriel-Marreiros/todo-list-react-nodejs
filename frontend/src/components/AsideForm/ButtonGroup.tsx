import { DrawerFooter } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonGroupProps {
    children: ReactNode | ReactNode[];
}

export function ButtonGroup({children}: ButtonGroupProps) {
    return (
        <DrawerFooter>
            <ButtonGroup>
                {children}
            </ButtonGroup>
        </DrawerFooter>
    )
}