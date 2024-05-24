import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

function ModalComponent({ title, isOpen, onClose, footer, children }) {
  return (
    <Modal size='sm' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title && title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            { children }
          </ModalBody>
          <ModalFooter>
            { footer }
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ModalComponent
