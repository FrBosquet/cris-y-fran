import { ChatIcon, CopyIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import signature from 'public/cyf negro.png'
import bgi from 'public/paper.webp'
import { IoIosGift } from 'react-icons/io'
import { MdCancel, MdHotel, MdMessage } from 'react-icons/md'
import { Card } from '../components/Card'
import { getGuestTypes } from '../lib/guesttype'
import { Guest, States } from '../types'

type Props = {
  isLoading: boolean
  guest: Guest
  isFlipped: boolean
  onClickYes: () => void
  onClickNo: () => void
}

const line = '0.15rem solid black'

export const Backface = ({
  isLoading,
  guest,
  isFlipped,
  onClickYes,
  onClickNo,
}: Props) => {
  const isMobile =
    useBreakpointValue({
      base: true,
      sm: false,
    }) || false
  const { isSingle } = getGuestTypes(guest)
  const { state } = guest

  return (
    <Card bg={bgi} rotation={isFlipped ? 0 : 180}>
      <VStack p={['2rem', '4rem']} w="100%" h="100%">
        <Center w="100%" borderBottom={line} flex={1.2}>
          <Image src={signature} />
        </Center>
        <Center
          w="100%"
          borderBottom={line}
          flexDirection="column"
          p={4}
          flex={1}
          gap={'1rem'}
        >
          <Heading variant="sans">
            Cris Tena + <br /> Fran Bosquet
          </Heading>
          <Text>
            Queremos que nos {isSingle ? 'acompañes' : 'acompañeis'} el día de
            nuestra boda
          </Text>
        </Center>
        <HStack w="100%" p={4} borderBottom={line}>
          <VStack px={6} spacing={0}>
            <Text fontWeight={400}>Sábado</Text>
            <Text size="xxl" fontWeight={600}>
              10
            </Text>
            <Text fontWeight={400}>Junio</Text>
            <Text fontWeight={200}>2023</Text>
          </VStack>
          <VStack
            flex={1}
            borderLeft={line}
            px={4}
            h="100%"
            justifyContent="space-around"
          >
            <Text size="sm">En</Text>
            <Text fontWeight={600} as="a" href="https://masdoblons.com/">
              Mas dels Doblons
            </Text>
            <Text size="sm">Camí vora rambla s/n, Almassora, Castellón</Text>
            <Text size="sm" fontWeight={600}>
              Hora por determinar
            </Text>
          </VStack>
        </HStack>
        {state === States.pending && (
          <VStack flex={2} w="100%" p={4} spacing={4} justifyContent="end">
            <Heading size="sm" variant="sans">
              {isSingle ? '¿Te vienes?' : '¿Os venis?'}
            </Heading>
            <HStack w="100%">
              <Button variant="base" isLoading={isLoading} onClick={onClickNo}>
                No
              </Button>
              <Button variant="base" isLoading={isLoading} onClick={onClickYes}>
                Si
              </Button>
            </HStack>
          </VStack>
        )}
        {state === States.accepted && (
          <VStack flex={2} w="100%" py={4} spacing={4}>
            <Heading size="sm" variant="sans">
              ¡Contamos {isSingle ? 'contigo' : 'con vosotros'}!
            </Heading>
            <Text size="sm">
              {isSingle ? 'puedes' : 'podeis'} consultar esta tarjeta siempre{' '}
              {isSingle ? 'que quieras informarte' : 'que querais informaros'}{' '}
              de las novedades
            </Text>
            <Tabs w="100%" colorScheme="blackAlpha" flex={1}>
              <TabList maxW="100%">
                <Tab color="black">
                  {isMobile ? <Icon as={MdMessage} /> : 'Contacto'}
                </Tab>
                <Tab color="black">
                  {isMobile ? <Icon as={MdHotel} /> : 'Alojamiento'}
                </Tab>
                <Tab color="black">
                  {isMobile ? <Icon as={IoIosGift} /> : 'Regalo'}
                </Tab>
                <Tab color="black">
                  {isMobile ? <Icon as={MdCancel} /> : 'Asistencia'}
                </Tab>
              </TabList>

              <TabPanels flex={1} h="100%">
                {/* Contacto */}
                <TabPanel>
                  <VStack w="100%" alignItems="start" spacing={2}>
                    <Text
                      as="a"
                      href="https://wa.link/j40ow3"
                      size="md"
                      variant="soft"
                    >
                      <ChatIcon mr={2} /> Whatsapp a Cris
                    </Text>
                    <Text
                      as="a"
                      href="https://wa.link/53q2hl"
                      size="md"
                      variant="soft"
                    >
                      <ChatIcon mr={2} /> Whatsapp a Fran
                    </Text>
                  </VStack>
                </TabPanel>

                {/* Alojamiento */}
                <TabPanel>
                  <VStack w="100%" alignItems="start" spacing={[2]}>
                    <Text variant="soft" size="xs">
                      Mas dels doblons no cuenta con habitaciones. La finca se
                      encuentra en Almazora, a apenas 15 minutos de Castellón.
                      Dispondremos de autobuses para ir y volver.
                    </Text>
                    <Text variant="soft" size="xs">
                      Estamos negociando con varios establecimientos para
                      facilitaros encontrar una habitación de hotel. Podrás
                      consultarlos aquí tan pronto como los tengamos disponibles
                    </Text>
                  </VStack>
                </TabPanel>

                {/* Regalo */}
                <TabPanel>
                  <VStack w="100%" alignItems="start" spacing={[2]}>
                    <Text variant="soft" size="xs">
                      {isSingle
                        ? 'Si te hemos invitado a nuestra boda es porque eres importante'
                        : 'Si os hemos invitado a nuesta boda es porque sois importantes'}{' '}
                      para nosostros. No esperamos nada a cambio ni creemos en
                      la costumbre de que los invitados financien nuestro día.
                    </Text>
                    <Text variant="soft" size="xs">
                      Si aun así {isSingle ? 'te' : 'os'} apetece tener un
                      detalle con nosotros, puedes hacerlo en este número de
                      cuenta:
                    </Text>
                    <Text
                      w="100%"
                      textAlign="center"
                      cursor="pointer"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          'ES43 1465 0100 94 2055346756'
                        )
                      }
                      size="md"
                      variant="soft"
                    >
                      <CopyIcon mr={2} /> ES43 1465 0100 94 2055346756
                    </Text>
                  </VStack>
                </TabPanel>

                <TabPanel h="100%">
                  <VStack w="100%" alignItems="start" justifyContent="end">
                    <Text variant="soft" size="xs">
                      {isSingle
                        ? 'Si te ha surgido algo y no vas a poder venir, te agradeceremos que nos lo hagas saber por aquí.'
                        : 'Si os ha surgido algo y no vais a poder venir, os agradeceremos que nos lo hagais saber por aquí'}
                      . Podemos cambiar el numero de invitados sin coste hasta
                      el 24 de Mayo de 2023.
                    </Text>
                    <HStack w="100%">
                      <Button
                        variant="base"
                        isLoading={isLoading}
                        onClick={onClickNo}
                      >
                        {isSingle ? 'No voy a poder ir' : 'No vamos a poder ir'}
                      </Button>
                    </HStack>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        )}

        {state === States.declined && (
          <VStack flex={2} w="100%" p={4} spacing={4} justifyContent="end">
            <Heading fontWeight={600} size="sm" variant="sans">
              ¡Sentimos mucho que no puedas venir!
            </Heading>

            <Text size="sm">Pero aun puedes cambiar de opinión</Text>

            <HStack w="100%">
              <Button variant="base" isLoading={isLoading} onClick={onClickYes}>
                Venga, va. ¡Me apunto!
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Card>
  )
}
