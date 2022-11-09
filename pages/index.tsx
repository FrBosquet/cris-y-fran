import { Center, Heading, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'

enum States {
  pending,
  accepted,
  declined,
}

const Home: NextPage = () => {
  return (
    <Center h="100vh" bg="green.100">
      <VStack>
        <Heading fontSize={112}>¡Oopsie!</Heading>
        <Text color="green.600" p={4}>
          No te hemos encontrado entre la lista de invitados. ¿Podrias revisar
          tu enlace?
        </Text>
      </VStack>
    </Center>
  )
}

export default Home
