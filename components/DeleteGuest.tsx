import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { deleteGuest } from '../lib/supabase'
import { Guest } from '../types'

type Props = {
  guest: Guest
  isLoading: boolean
  onDelete: () => void
}

export const DeleteGuest: React.FC<Props> = ({
  guest,
  isLoading,
  onDelete,
}) => {
  const cancelRef = useRef(null)
  const [isDeleting, deleting] = useBoolean(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    deleting.on()
    await deleteGuest(guest)
    onDelete()
  }

  return (
    <>
      <IconButton
        aria-label="borrar"
        icon={<BsFillTrashFill />}
        colorScheme="red"
        onClick={onOpen}
        isLoading={isLoading}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={2}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Borrar invitación
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Seguro que quieres borrar esta invitación? Esta accion no puede
              ser deshecha
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button isLoading={isDeleting} ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                isLoading={isDeleting}
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
              >
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
