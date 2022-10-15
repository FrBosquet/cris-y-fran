import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

enum States {
  pending,
  accepted,
  declined,
}

const Home: NextPage = () => {
  return (
    <Box bg="green.100">
      No tenemos a esa persona en la lista de invitados. Podrias revisar tu
      enalce
    </Box>
  )
}

export default Home
