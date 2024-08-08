import { Input as ChakraInput, InputElementProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputElementProps {
    field: string,
    type: string
}

export function Input({field, ...props}: InputProps) {
    const { register } = useFormContext();

    return (
        <ChakraInput {...props} {...register(field)} />
    )
}