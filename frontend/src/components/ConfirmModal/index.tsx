import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useRef } from "react";

export interface ConfirmModalProps {
    callback: () => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    headerText: string;
    bodyText: string;
}

export function ConfirmModal({isOpen, setIsOpen, headerText, bodyText, callback}: ConfirmModalProps) {

    const cancelRef = useRef(null);

    const handleCloseModal = (): void => {
        setIsOpen(false);
    }

    const handleCallback = (): void => {
        callback();
        handleCloseModal();
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={handleCloseModal}
            size="xl">

            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        {headerText}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {bodyText}
                    </AlertDialogBody>

                    <AlertDialogFooter className="space-x-3">
                        <Button ref={cancelRef} onClick={handleCloseModal}>Não</Button>
                        <Button colorScheme='blue' onClick={handleCallback}>Sim</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}