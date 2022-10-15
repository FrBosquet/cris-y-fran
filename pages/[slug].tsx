import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react'
import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import bg from 'public/bg.png'
import bgi from 'public/bgi.png'
import { useState } from 'react'
import { Card } from '../components/card'

enum States {
  pending,
  accepted,
  declined,
}

type Props = {
  name: string[]
  isFamily: boolean
  state: States
  amount: number
}

const db: Record<string, Props> = {
  inmaculadajoseramon: {
    name: ['Inmaculada', 'Jose Ramón'],
    isFamily: false,
    state: States.pending,
    amount: 2,
  },
  maticristobal: {
    name: ['Mati', 'Cristobal'],
    isFamily: false,
    state: States.pending,
    amount: 2,
  },
  lidiadiego: {
    name: ['Lidia', 'Diego'],
    isFamily: true,
    state: States.pending,
    amount: 3,
  },
  mostri: {
    name: ['Diego Minolas'],
    isFamily: false,
    state: States.pending,
    amount: 1,
  },
}

const SingleCover = ({ name }: { name: string[] }) => {
  return (
    <VStack w="100%" pb={'10vh'}>
      <Heading lineHeight={1} fontSize={'8vh'}>
        {name[0]}
      </Heading>
    </VStack>
  )
}
const CoupleCover = ({ name }: { name: string[] }) => {
  return (
    <VStack w="100%" pb={'10vh'}>
      <Heading lineHeight={1} fontSize={'6vh'}>
        {name[0]}
      </Heading>
      <Heading lineHeight={1} fontSize={'4vh'} color="orange.500">
        +
      </Heading>
      <Heading lineHeight={1} fontSize={'6vh'}>
        {name[1]}
      </Heading>
    </VStack>
  )
}
const FamilyCover = ({ name }: { name: string[] }) => {
  const fullName = `${name[0]} y ${name[1]}`

  return (
    <VStack w="100%" pb={'10vh'}>
      <Heading lineHeight={1} fontSize={'3vh'} color="pink.300">
        Familia de
      </Heading>
      <Heading lineHeight={1} fontSize={'6vh'}>
        {fullName}
      </Heading>
    </VStack>
  )
}

const Home: NextPage<Props> = ({
  name,
  isFamily,
  state: serverState,
  amount,
}) => {
  const [isFlipped, flipped] = useBoolean(false)
  const [isModalOpen, modalOpen] = useBoolean(false)
  const isSingle = !isFamily && name.length === 1
  const isCouple = !isSingle && !isFamily
  const [state, setState] = useState(serverState)
  const [counter, setCounter] = useState(amount)

  return (
    <Box bg="green.100">
      <Head>
        <title>Boda de Cris y Fran</title>
        <meta name="description" content="Invitacion a nuestra boda" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh" sx={{ perspective: '1600px' }}>
        <Card
          bg={bg}
          onClick={flipped.toggle}
          rotation={isFlipped ? 180 : 360}
          width="80%"
        >
          {isSingle && <SingleCover name={name} />}
          {isFamily && <FamilyCover name={name} />}
          {isCouple && <CoupleCover name={name} />}
        </Card>
        <Card bg={bgi} rotation={isFlipped ? 0 : 180}>
          <VStack
            // style={{ backdropFilter: 'saturate(0.5) blur(5px)' }}
            p={'2rem'}
            borderRadius={'2rem'}
            h="100%"
          >
            <Spacer />
            <Heading color="orange.500" fontSize="4rem" fontFamily="script">
              Cris + Fran
            </Heading>
            <Text color="yellow.500">
              Quieren {isSingle ? 'invitarte' : 'invitaros'} a su boda
            </Text>

            <HStack>
              <Text variant="date" fontSize={18}>
                JULIO
              </Text>
              <Text
                color="green.700"
                fontFamily="heading"
                fontSize="3rem"
                pt="0.7rem"
                lineHeight={1}
              >
                22
              </Text>
              <Text variant="date" fontSize={18}>
                2023
              </Text>
            </HStack>
            <Text color="orange.500">A las 12:00</Text>

            <Text color="yellow.500">Que tendrá lugar en:</Text>
            <Text
              variant="date"
              as="a"
              href="https://goo.gl/maps/wikTZ7xSKfxhwMJ98"
            >
              Finca El Pozo del Chanchito
            </Text>
            <Text color="pink.800" fontSize="0.8rem">
              Carretera de la buena suerte S/N, Alicante
            </Text>
            <Spacer />

            {state === States.pending && (
              <>
                <Text pt={4} color="yellow.500">
                  {isSingle ? '¿Contamos contigo?' : '¿Contamos con vosotros?'}
                </Text>
                <HStack spacing="1rem">
                  <Button
                    fontSize={24}
                    colorScheme="green"
                    onClick={() => {
                      if (isSingle) {
                        setState(States.accepted)
                      } else {
                        modalOpen.on()
                      }
                    }}
                  >
                    Sí
                  </Button>
                  <Button
                    fontSize={24}
                    colorScheme="orange"
                    onClick={() => setState(States.declined)}
                  >
                    No
                  </Button>
                </HStack>
                <Spacer />
              </>
            )}

            {state === States.accepted && (
              <>
                <Text pt={8} color="green.500" fontSize={32}>
                  ¡Fantástico! Allí nos veremos
                </Text>
                <Text color="orange.500">
                  {isSingle
                    ? '¿Quieres echarnos una mano? Este es nuestro IBAN'
                    : '¿Queréis echarnos una mano? Este es nuestro IBAN'}
                </Text>
                <Text size="xs" variant="date">
                  ES5420958788194951189394
                </Text>
                <Spacer />
              </>
            )}

            {state === States.declined && (
              <>
                <Text fontSize={32} pt={8} color="orange.500">
                  ¡Nos da mucha pena!
                </Text>
                <Text color="pink.500">
                  {isSingle
                    ? 'Si cambias de opinión, solo tienes que hacer click aquí'
                    : 'Si cambiais de opinión, solo teneis que hacer click aquí'}
                </Text>
                <HStack spacing="1rem">
                  <Button
                    fontSize={18}
                    colorScheme="green"
                    onClick={() => modalOpen.on}
                  >
                    {isSingle
                      ? '¡He cambiado de opinión, me apunto!'
                      : '¡Hemos cambiado de opinión, nos apuntamos!'}
                  </Button>
                </HStack>
                <Spacer />
              </>
            )}
          </VStack>
        </Card>
      </Center>

      <Modal isCentered isOpen={isModalOpen} onClose={modalOpen.off}>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={22} py={6}>
              ¿Cuantas personas asistireis?
            </Text>
            <Center>
              <IconButton
                size="lg"
                shadow="none"
                bg="none"
                aria-label="menos"
                icon={<MinusIcon />}
                disabled={counter === 1}
                onClick={() => setCounter((v) => v - 1)}
              />
              <Text fontSize={50} px={8} color="pink.300" fontFamily="heading">
                {counter}
              </Text>
              <IconButton
                size="lg"
                shadow="none"
                bg="none"
                aria-label="menos"
                icon={<AddIcon />}
                disabled={counter === amount}
                onClick={() => setCounter((v) => v + 1)}
              />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={() => {
                setState(States.accepted)
                modalOpen.off()
              }}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  // @ts-ignore
  const slug = context.params.slug
  const record = db[slug]

  if (!record) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: record,
  }
}

export default Home
