import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Backface } from '../components/Backface'
import { Frontface } from '../components/Frontface'
import { Guest } from '../types'

enum States {
  pending,
  accepted,
  declined,
}

type Props = {
  guest: Guest
}

const db: Record<string, Guest> = {
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

const Home: NextPage<Props> = ({ guest }) => {
  const { name, isFamily } = guest

  const [isFlipped, flipped] = useBoolean(false)
  const [isModalOpen, modalOpen] = useBoolean(false)
  const isSingle = !isFamily && name.length === 1

  const [state, setState] = useState(guest.state)
  const [counter, setCounter] = useState(guest.amount)

  const handleClickYes = () => {
    if (isSingle) {
      setState(States.accepted)
    } else {
      modalOpen.on()
    }
  }

  const handleClickNo = () => {
    setState(States.declined)
  }

  return (
    <Box bg="green.100">
      <Head>
        <title>Boda de Cris y Fran</title>
        <meta name="description" content="Invitacion a nuestra boda" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh" sx={{ perspective: '1600px' }}>
        <Frontface guest={guest} isFlipped={isFlipped} onClick={flipped.on} />
        <Backface
          guest={guest}
          isFlipped={isFlipped}
          onClickNo={handleClickNo}
          onClickYes={handleClickYes}
        />
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
                disabled={counter === guest.amount}
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
    props: {
      guest: record,
    },
  }
}

export default Home
