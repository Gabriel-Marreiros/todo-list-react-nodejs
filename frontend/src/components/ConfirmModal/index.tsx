import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useRef } from "react";

export interface ConfirmModalProps {
    callback: any;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    headerText: string;
    bodyText: string;
}

export function ConfirmModal({isOpen, setIsOpen, headerText, bodyText, callback}: ConfirmModalProps) {

    const cancelRef = useRef(null);

    const handleCloseModel = () => {
        console.log("Fechou a modal");
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={handleCloseModel}>

            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {headerText}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {bodyText}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={() => setIsOpen(false)}>Não</Button>
                        <Button onClick={callback}>Sim</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}