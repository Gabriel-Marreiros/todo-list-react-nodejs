import { FormErrorMessage } from "@chakra-ui/react";

interface ErrorMessageProps {
    message: string
}

export function ErrorMessage({ message }: ErrorMessageProps){
    return (
        <FormErrorMessage>{message}</FormErrorMessage>
    )
}