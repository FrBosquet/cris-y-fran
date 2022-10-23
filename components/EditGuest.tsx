import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spacer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { BsDash, BsPlus } from 'react-icons/bs'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useFormik } from 'formik'
import { ChangeEvent, useEffect } from 'react'
import { Guest } from '../types'

type Props = {
  guest: Guest
  children: React.ReactNode
  onSuccess: () => void
}

const toNames = (raw: string): string[] => raw.split(',').map((s) => s.trim())
const toAmount = (raw: string): number => raw.split(',').length

export const EditGuest: React.FC<Props> = ({ children, guest, onSuccess }) => {
  const toast = useToast({
    position: 'bottom-right',
  })
  const client = useSupabaseClient()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const formik = useFormik({
    initialValues: {
      rawNames: guest.name.join(', '),
      isFamily: guest.isFamily,
      maxAmount: guest.maxAmount,
    },
    onSubmit: async (values) => {
      try {
        const { error } = await client
          .from('guests')
          .update({
            isFamily: values.isFamily,
            name: toNames(values.rawNames),
            maxAmount: values.maxAmount,
          })
          .match({ id: guest.id })

        if (error) {
          if ((error.code = '23505')) {
            // TODO: This error is not unique for duplicated slug
            formik.setFieldError('slug', 'Este enlace ya existe')
            throw new Error('El enlace ya existe, utiliza uno distinto: ')
          }

          throw new Error('Error creando la invitación: ')
        }

        toast({
          title: 'Invitado actualizado!',
          status: 'success',
        })

        onClose()
        formik.resetForm()
        onSuccess()
      } catch (e: any) {
        toast({
          title: e.message,
          status: 'error',
        })
      }
    },
  })

  useEffect(() => {
    formik.setValues({
      rawNames: guest.name.join(', '),
      isFamily: guest.isFamily,
      maxAmount: guest.maxAmount,
    })
  }, [guest])

  const handleWriteName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    formik.setFieldValue('rawNames', value)
  }

  const { maxAmount, isFamily, rawNames } = formik.values

  return (
    <>
      <Button onClick={onOpen} variant="ghost">
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="gray.700" color="gray.100" mx={4}>
          <ModalHeader>Actualizar invitado</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap={3}>
            <FormControl>
              <FormLabel>Nombre/s</FormLabel>
              <Input
                required
                name="rawNames"
                onChange={handleWriteName}
                value={formik.values.rawNames}
              />
              <FormHelperText>Separados por comas</FormHelperText>
            </FormControl>

            <FormControl>
              <Checkbox
                name="isFamily"
                onChange={formik.handleChange}
                isChecked={formik.values.isFamily}
              >
                Es una familia
              </Checkbox>
              <FormHelperText>
                Marcar si van mas miembros a parte de los nombrados
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Invitados</FormLabel>
              <HStack>
                <IconButton
                  disabled={!isFamily || maxAmount <= toAmount(rawNames)}
                  onClick={() => {
                    formik.setFieldValue('maxAmount', +maxAmount - 1)
                  }}
                  colorScheme="blue"
                  size="xs"
                  aria-label="menos"
                  icon={<BsDash />}
                />
                <Input
                  disabled={!isFamily}
                  required
                  min={1}
                  type="number"
                  name="maxAmount"
                  onChange={formik.handleChange}
                  value={formik.values.maxAmount}
                />
                <IconButton
                  disabled={!isFamily}
                  onClick={() => {
                    formik.setFieldValue('maxAmount', +maxAmount + 1)
                  }}
                  colorScheme="blue"
                  size="xs"
                  aria-label="menos"
                  icon={<BsPlus />}
                />
              </HStack>
              <FormHelperText>
                Cuantas personas incluye, máximo, esta invitacion
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => formik.resetForm()}
              isLoading={formik.isSubmitting}
            >
              Limpiar
            </Button>
            <Spacer />
            <Button
              colorScheme="blue"
              onClick={() => formik.handleSubmit()}
              isLoading={formik.isSubmitting}
            >
              Actualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
