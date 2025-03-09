import { Modal, ModalBody, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";

export interface LoadingModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export function LoadingModal({ openModal, setOpenModal}: LoadingModalProps) {

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={handleCloseModal}
            size={"xl"}>

            <ModalOverlay />

            <ModalContent className="p-10">

                <ModalBody className="text-center">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}