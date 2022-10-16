import {
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
}

export const Backface = ({
  isLoading,
  guest,
  isFlipped,
  onClickYes,
  onClickNo,
}: Props) => {
  const { isSingle } = getGuestTypes(guest)
  const { state } = guest

  return (
    <Card bg={bgi} rotation={isFlipped ? 0 : 180}>
      <VStack p={'2rem'} borderRadius={'2rem'} h="100%">
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

        <Center flexDirection="column" h="25vh">
          {state === States.pending && (
            <>
              <Text pt={4} color="yellow.500">
                {isSingle ? '¿Contamos contigo?' : '¿Contamos con vosotros?'}
              </Text>
              <HStack spacing="1rem">
                <Button
                  fontSize={24}
                  colorScheme="green"
                  onClick={onClickYes}
                  isLoading={isLoading}
                >
                  Sí
                </Button>
                <Button
                  fontSize={24}
                  colorScheme="orange"
                  onClick={onClickNo}
                  isLoading={isLoading}
                >
                  No
                </Button>
              </HStack>
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
                  onClick={onClickYes}
                  isLoading={isLoading}
                >
                  {isSingle
                    ? '¡He cambiado de opinión, me apunto!'
                    : '¡Hemos cambiado de opinión, nos apuntamos!'}
                </Button>
              </HStack>
            </>
          )}
        </Center>
      </VStack>
    </Card>
  )
}
