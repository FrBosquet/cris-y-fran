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
import { getFromSlug, updateGuest } from '../lib/supabase'
import { Guest, States } from '../types'

type Props = {
  guest: Guest
}

const Home: NextPage<Props> = ({ guest }) => {
  const { name, isFamily } = guest

  const [isLoading, loading] = useBoolean(false)
  const [isFlipped, flipped] = useBoolean(false)
  const [isModalOpen, modalOpen] = useBoolean(false)
  const isSingle = !isFamily && name.length === 1

  const [localGuest, setLocalGuest] = useState(guest)
  const [counter, setCounter] = useState(guest.maxAmount)

  const handleClickYes = async () => {
    loading.on()

    if (isSingle || isModalOpen) {
      const updatedGuest = await updateGuest(guest.event, guest.slug, {
        state: States.accepted,
        amount: counter,
      })
      setLocalGuest(updatedGuest)

      modalOpen.off()
    } else {
      modalOpen.on()
    }

    loading.off()
  }

  const handleClickNo = async () => {
    loading.on()
    const updatedGuest = await updateGuest(guest.event, guest.slug, {
      state: States.declined,
      amount: counter,
    })
    setLocalGuest(updatedGuest)
    loading.off()
  }

  return (
    <Box bg="green.100">
      <Head>
        <title>Boda de Cris y Fran</title>
        <meta name="description" content="Invitacion a nuestra boda" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh" sx={{ perspective: '1600px' }}>
        <Frontface
          guest={localGuest}
          isFlipped={isFlipped}
          onClick={flipped.on}
        />
        <Backface
          isLoading={isLoading}
          guest={localGuest}
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
                disabled={counter === guest.maxAmount}
                onClick={() => setCounter((v) => v + 1)}
              />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleClickYes}
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
  const guest = await getFromSlug(slug)

  if (!guest) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      guest,
    },
  }
}

export default Home
