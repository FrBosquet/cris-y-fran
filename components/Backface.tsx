import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import bgi from 'public/bgi.png'
import { Card } from '../components/Card'
import { getGuestTypes } from '../lib/guesttype'
import { Guest, States } from '../types'

type Props = {
  isLoading: boolean
  guest: Guest
  isFlipped: boolean
  onClickYes: () => void
  onClickNo: () => void
  step: number
}

export const Backface = ({
  isLoading,
  guest,
  isFlipped,
  onClickYes,
  onClickNo,
  step,
}: Props) => {
  const { isSingle } = getGuestTypes(guest)
  const { state } = guest

  console.log({ step })

  return (
    <Card rotation={isFlipped ? 0 : 180}>
      {/* first layover */}
      <VStack
        p={6}
        shadow="lg"
        position="absolute"
        inset={0}
        top="15%"
        left="1rem"
        bg="white"
        transition="700ms ease-in-out"
        borderTopLeftRadius={'60vw'}
        transformOrigin="50% 180%"
        transform={step > 1 ? 'rotate(35deg)' : undefined}
        alignItems="end"
        spacing={0.7}
      >
        <Heading textAlign={'right'} pt={2} fontSize="3rem" color="blue.500">
          Cris y Fran
        </Heading>

        <Text
          pt={4}
          textTransform="uppercase"
          fontFamily="Dosis"
          textAlign={'right'}
          fontWeight="600"
          w="100%"
        >
          Cuando
        </Text>
        <Text fontFamily="Dosis" textAlign={'right'} w="100%">
          Sabado, 10 de Junio de 2023
        </Text>

        <Text
          pt={4}
          textTransform="uppercase"
          fontFamily="Dosis"
          textAlign={'right'}
          fontWeight="600"
          w="100%"
        >
          Hora
        </Text>
        <Text fontFamily="Dosis" textAlign={'right'} w="100%">
          A partir de las 17:00
        </Text>

        <Text
          pt={4}
          textTransform="uppercase"
          fontFamily="Dosis"
          textAlign={'right'}
          fontWeight="600"
          w="100%"
        >
          Donde
        </Text>
        <Text fontFamily="Dosis" textAlign={'right'} w="100%">
          Mas dels Doblons
        </Text>
        <Text fontFamily="Dosis" textAlign={'right'} w="100%">
          Camí Vora Rambla, s/n, Almassora, Castellón
        </Text>

        <Text
          pt={6}
          textTransform="uppercase"
          fontFamily="Dosis"
          textAlign={'center'}
          fontWeight="600"
          w="100%"
        >
          Te vienes?
        </Text>
        <Center>
          <Text
            pt={6}
            textTransform="uppercase"
            fontFamily="Dosis"
            textAlign={'center'}
            fontWeight="600"
            w="100%"
          >
            Si
          </Text>
          <Text
            pt={6}
            textTransform="uppercase"
            fontFamily="Dosis"
            textAlign={'center'}
            fontWeight="600"
            w="100%"
          >
            No
          </Text>
        </Center>
      </VStack>

      {/* second layover */}
      <VStack
        shadow="lg"
        position="absolute"
        bottom={0}
        w="100%"
        style={{
          aspectRatio: 1,
        }}
        left="1rem"
        bg="blue.200"
        transition="700ms ease-in-out"
        borderRadius={'50%'}
        transformOrigin="50% 180%"
        transform={step > 0 ? 'rotate(45deg)' : undefined}
        justifyContent="center"
        alignItems="end"
        p={8}
        pr={14}
      >
        <Heading
          fontSize="4rem"
          color="blue.800"
          textAlign={'right'}
          fontFamily="script"
        >
          Nos casamos!
        </Heading>
        <Text textAlign="right" w="70%">
          Y hemos pensado en ti para que nos acompañes en nuestro día mas
          especial
        </Text>
      </VStack>
    </Card>
  )
}
