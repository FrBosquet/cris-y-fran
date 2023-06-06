import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

export const Transportation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="calc(100vw - 2rem)" pb={4} backgroundColor='white'>
          <ModalHeader color="black">Transporte</ModalHeader>
          <ModalCloseButton color='black'/>
          <ModalBody gridGap={4} display="flex" flexDir={'column'}>
            <Text>Autobuses de ida</Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Origen</Th>
                    <Th>Hora</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Hotel Center</Td>
                    <Td>12:30</Td>
                  </Tr>
                  <Tr>
                    <Td>Plz. María Agustina</Td>
                    <Td>12:20</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Text>Autobuses de vuelta</Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Destino</Th>
                    <Th>Hora</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Hotel Center</Td>
                    <Td>19:30</Td>
                  </Tr>
                  <Tr>
                    <Td>Hotel Center</Td>
                    <Td>23:00</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack w="100%" alignItems="start" spacing={[2]}>
        <Text variant="soft" size="sm">
          La finca se encuentra en Almazora, a apenas 15 minutos de Castellón. Hemos dispuesto autobuses para faciliar el traslado desde la ciudad de Castellón de la Plana hasta la finca Mas dels Doblons.
        </Text>
        <Button p={4} w="100%" variant="base" onClick={onOpen}>
          Horarios
        </Button>
      </VStack>
    </>
  )
}
