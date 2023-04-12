import { ChatIcon, EmailIcon } from '@chakra-ui/icons'
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

export const Hotel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="calc(100vw - 2rem)" pb={4} bg="white">
          <ModalHeader color="black">Alojamiento</ModalHeader>
          <ModalCloseButton color="black"/>
          <ModalBody gridGap={4} display="flex" flexDir={'column'}>
            <Text variant="soft" textAlign="left">
              El hotel Castellón Center es un hotel de cuatro estrellas afiliado
              al grupo Melia situado en el centro de la ciudad. Ofrece unas
              instalaciones cómodas para pasar el fin de semana asi como una
              ubicación ideal tanto para conocer la ciudad como para reunir a
              los invitados e ir a la masia en los autobuses que habilitaremos.
            </Text>
            <Text
              color="blue.600"
              fontWeight={600}
              as="a"
              href="https://www.melia.com/es/hoteles/espana/castellon/hotel-castellon-center-by-melia"
            >
              Hotel Castellón Center
            </Text>
            <Text variant="soft" textAlign="left">
              Hemos negociado unas condiciones ventajosas con la gerencia del
              establecimiento para que os alojeis en el. Las tarifas acordadas <strong>por noche</strong> son:
            </Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Habitación</Th>
                    <Th>SA*</Th>
                    <Th>AD*</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Doble, 1 persona</Td>
                    <Td>58€</Td>
                    <Td>68€</Td>
                  </Tr>
                  <Tr>
                    <Td>Doble</Td>
                    <Td>58€</Td>
                    <Td>78€</Td>
                  </Tr>
                  <Tr>
                    <Td>Triple</Td>
                    <Td>78€</Td>
                    <Td>108€</Td>
                  </Tr>
                  <Tr>
                    <Td>Familiar**</Td>
                    <Td>85€</Td>
                    <Td>115€</Td>
                  </Tr>
                  <Tr>
                    <Td>Premium</Td>
                    <Td>78€</Td>
                    <Td>98€</Td>
                  </Tr>
                  <Tr>
                    <Td>Suplemento niño</Td>
                    <Td>12€</Td>
                    <Td>17€</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Text variant="soft" size="sm" textAlign="left">
              *SA = Solo Alojamiento;<br />
              *AD = Alojamiento y Desayuno;<br />
              **Familiar = 2 adultos y 2 niños<br />
              Niños menores de 2 años sin cargo
            </Text>
            <Text variant="soft" textAlign="left">
              Para beneficiarte de estas tarifas, debes ponerte en contacto con
              el hotel por medio de:
            </Text>
            <Text
              as="a"
              href="https://wa.link/gclkje"
              size="md"
              textAlign="left"
            >
              <ChatIcon mr={2} /> Whatsapp
            </Text>
            <Text
              textAlign="left"
              as="a"
              href="mailto:reservas@hotelcastelloncenter.com?Subject=Reserva%20alojamiento%20boda%20Cris%20y%20Fran"
              size="md"
            >
              <EmailIcon mr={2} /> EMail
            </Text>
            <Text variant="soft" textAlign="left">
              Indicando el código <strong>Boda Cris y Fran</strong>. Las
              reservas no tienen penalización por cancelación hasta el 1 de mayo
              de 2023. Tras esa fecha, se convertiran en no reembolsables. Los
              precios ofertados y su disponibilidad (Hasta 40 habitaciones) se
              garantizan hasta el 1 de Mayo o cobertura de plazas, tras ello
              quedaran sujetos a disponibilidad.
            </Text>
            <Text variant="soft" textAlign="left">
              Si prefieres alojarte en otro establecimiento, encontraras
              multitud de opciones en Castellón. Consultanos si tienes dudas.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack w="100%" alignItems="start" spacing={[2]}>
        <Text variant="soft" size="sm">
          La finca se encuentra en Almazora, a apenas 15 minutos de Castellón.
          Dispondremos de autobuses para ir y volver. Hemos negociado con el
          Hotel Castellon Center precios para nuestros invitados
        </Text>
        <Button p={4} w="100%" variant="base" onClick={onOpen}>
          Más información
        </Button>
      </VStack>
    </>
  )
}
