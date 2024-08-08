import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

interface NotificationModalProps {
    openModal: boolean;
    headerText: string;
    bodyText: string;

}

export function NotificationModal({ openModal, headerText, bodyText }: NotificationModalProps) {
    const { onClose } = useDisclosure();
    
    return (
        <Modal isOpen={openModal} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalCloseButton />

                <ModalHeader>{headerText}</ModalHeader>

                <ModalBody>
                    {bodyText}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}