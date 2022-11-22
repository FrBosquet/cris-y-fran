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
  const { name, isFamily, slug } = guest

  const [isLoading, loading] = useBoolean(false)
  const [isFlipped, flipped] = useBoolean(false)
  const [isModalOpen, modalOpen] = useBoolean(false)
  const isSingle = !isFamily && name.length === 1

  const [localGuest, setLocalGuest] = useState(guest)
  const [counter, setCounter] = useState(guest.maxAmount)

  const handleClickYes = async () => {
    loading.on()

    if (isSingle || isModalOpen) {
      const updatedGuest = await updateGuest(guest, {
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
    const updatedGuest = await updateGuest(guest, {
      state: States.declined,
      amount: counter,
    })
    setLocalGuest(updatedGuest)
    loading.off()
  }

  const pageTitle = `${name.join(', ')}, ${
    isSingle ? 'te invitamos' : 'os invitamos'
  } a nuestra boda`

  return (
    <Box bg="green.100">
      <Head>
        <meta name="description" content={pageTitle} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="¡Nos casamos!" />
        <meta property="og:description" content={pageTitle} />
        <meta
          property="og:url"
          content={`https://cris-y-fran.vercel.app/${slug}`}
        />
        <meta
          property="og:image"
          content="https://cris-y-fran.vercel.app/nosotros.png"
        />
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
                variant="base"
                flex={0}
                bg="black"
                size="lg"
                aria-label="menos"
                icon={<MinusIcon />}
                disabled={counter === 1}
                onClick={() => setCounter((v) => v - 1)}
              />
              <Text fontSize={50} px={8} color="black" fontFamily="heading">
                {counter}
              </Text>
              <IconButton
                variant="base"
                flex={0}
                bg="black"
                size="lg"
                shadow="none"
                aria-label="menos"
                icon={<AddIcon />}
                disabled={counter === guest.maxAmount}
                onClick={() => setCounter((v) => v + 1)}
              />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="base"
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
