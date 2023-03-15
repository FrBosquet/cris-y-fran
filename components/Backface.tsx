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
import { useEffect, useState } from 'react'
import { IoIosGift } from 'react-icons/io'
import { MdCancel, MdHotel, MdMessage } from 'react-icons/md'
import { Card } from '../components/Card'
import { getGuestTypes } from '../lib/guesttype'
import { Guest, States } from '../types'
import { Hotel } from './Hotel'

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
  const [scrollable, setScrollable] = useState('hidden')

  const isMobile =
    useBreakpointValue({
      base: true,
      sm: false,
    }) || false
  const { isSingle } = getGuestTypes(guest)
  const { state } = guest

  useEffect(() => {
    if (isFlipped) {
      setTimeout(() => setScrollable('scroll'), 1000)
    }
  }, [isFlipped])

  return (
    <Card bg={bgi} rotation={isFlipped ? 0 : 180}>
      <VStack p={['2rem', '4rem']} w="100%" h="100%">
        <Center w="100%" borderBottom={line} flex={1.2} maxH={'20%'}>
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
              Mediodía
            </Text>
          </VStack>
        </HStack>
        {state === States.pending && (
          <VStack flex={2} w="100%" p={4} spacing={4} justifyContent="center">
            <Heading size="sm" variant="sans">
              {isSingle ? '¿Te vienes?' : '¿Os venis?'}
            </Heading>
            <HStack w="100%">
              <Button variant="base" isLoading={isLoading} onClick={onClickYes}>
                Si
              </Button>
              <Button variant="base" isLoading={isLoading} onClick={onClickNo}>
                No
              </Button>
            </HStack>
          </VStack>
        )}
        {state === States.accepted && (
          <VStack
            flex={3}
            w="100%"
            py={[0, 4]}
            spacing={2}
            overflow={scrollable}
          >
            <Heading
              size="xs"
              variant="sans"
              display={{
                base: 'none',
                sm: 'block',
              }}
            >
              ¡Contamos {isSingle ? 'contigo' : 'con vosotros'}!
            </Heading>

            <Tabs w="100%" colorScheme="blackAlpha" flex={1}>
              <TabList maxW="100%">
                <Tab color="black">
                  {isMobile ? <Icon as={MdCancel} /> : 'Asistencia'}
                </Tab>
                <Tab color="black">
                  {isMobile ? <Icon as={MdMessage} /> : 'Contacto'}
                </Tab>
                <Tab color="black">
                  {isMobile ? <Icon as={MdHotel} /> : 'Alojamiento'}
                </Tab>
                <Tab color="black">
                  {isMobile ? <Icon as={IoIosGift} /> : 'Regalo'}
                </Tab>
              </TabList>

              <TabPanels flex={1} h="100%">
                {/* Asistencia */}
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

                {/* Contacto */}
                <TabPanel>
                  <VStack w="100%" alignItems="start" spacing={2} h="100%">
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
                  <Hotel />
                </TabPanel>

                {/* Regalo */}
                <TabPanel>
                  <VStack w="100%" alignItems="start" spacing={[2]}>
                    <Text variant="soft" size="sm">
                      {isSingle
                        ? 'Si te hemos invitado a nuestra boda es porque eres importante'
                        : 'Si os hemos invitado a nuesta boda es porque sois importantes'}{' '}
                      para nosostros. No esperamos nada a cambio.
                    </Text>
                    <Text variant="soft" size="sm">
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
              </TabPanels>
            </Tabs>
          </VStack>
        )}

        {state === States.declined && (
          <VStack flex={2} w="100%" p={4} spacing={4} justifyContent="center">
            <Heading fontWeight={600} size="sm" variant="sans">
              ¡Sentimos mucho que no{' '}
              {isSingle ? 'puedas venir' : 'podais venir'}!
            </Heading>

            <Text size="sm">
              Pero aún {isSingle ? 'puedes' : 'podeis'} cambiar de opinión
            </Text>

            <HStack w="100%">
              <Button variant="base" isLoading={isLoading} onClick={onClickYes}>
                {isSingle ? 'Venga, va. ¡Me apunto!' : '¿Cuantos venis?'}
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Card>
  )
}
