import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

interface NotificationModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    headerText?: string;
    bodyText: string;

}

export function NotificationModal({ openModal, setOpenModal, headerText, bodyText }: NotificationModalProps) {

    const handleCloseModal = () => {
        setOpenModal(false);
    }
    
    return (
        <Modal isOpen={openModal} onClose={handleCloseModal} size={"xl"}>
            <ModalOverlay />

            <ModalContent>
                <ModalCloseButton />

                <ModalHeader>
                    {headerText || "Todo List React & Node.js"}
                </ModalHeader>

                <ModalBody>
                    {bodyText}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleCloseModal}>
                        Ok
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}