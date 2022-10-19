import { LockIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useSessionContext } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsFillPersonPlusFill,
} from 'react-icons/bs'
import { getGuests } from '../../lib/supabase'
import { Guest } from '../../types'

type Props = {
  guests: Guest[]
}

const Home: NextPage<Props> = ({ guests: serverGuests }) => {
  const [guests, setGuests] = useState(serverGuests)
  const { replace } = useRouter()
  const { supabaseClient, isLoading, session } = useSessionContext()
  const toast = useToast({
    position: 'bottom-right',
  })

  const logout = useCallback(async () => {
    await supabaseClient.auth.signOut()
    replace('/admin')
  }, [])

  console.log({ guests })

  return (
    <Box minH="100vh" bg="gray.700" color="white">
      <HStack p={4} bg="gray.900" shadow="base">
        <Tooltip label="salir">
          <IconButton
            size="sm"
            aria-label="salir"
            colorScheme="red"
            onClick={logout}
            icon={<LockIcon />}
          />
        </Tooltip>
        <Heading variant="panel">Panel de control</Heading>

        <Spacer />
        <Tooltip label="añadir">
          <IconButton
            size="sm"
            aria-label="añadir"
            colorScheme="blue"
            onClick={logout}
            icon={<BsFillPersonPlusFill />}
          />
        </Tooltip>
      </HStack>

      <HStack p={2} bg="gray.800" shadow="base">
        <Tooltip label="pagina anterior">
          <IconButton
            size="xs"
            aria-label="pagina anterior"
            colorScheme="blue"
            onClick={logout}
            icon={<BsArrowBarLeft />}
          />
        </Tooltip>
        <Text>1/10</Text>
        <Tooltip label="pagina siguiente">
          <IconButton
            size="xs"
            aria-label="pagina siguiente"
            colorScheme="blue"
            onClick={logout}
            icon={<BsArrowBarRight />}
          />
        </Tooltip>

        <Spacer />

        <Text>100 invitados</Text>
        <Tooltip label="pendientes">
          <Button size="xs" colorScheme="yellow" variant="solid">
            <Text>60</Text>
          </Button>
        </Tooltip>

        <Tooltip label="aceptados">
          <Button size="xs" colorScheme="green" variant="solid">
            <Text>30</Text>
          </Button>
        </Tooltip>

        <Tooltip label="rechazados">
          <Button size="xs" colorScheme="red" variant="solid">
            <Text>10</Text>
          </Button>
        </Tooltip>
      </HStack>

      <VStack p={2}>
        {guests.map((guest) => {
          return (
            <HStack p={2} w="100%" key={guest.id} bg="gray.800">
              <Text>{guest.name.join(', ')}</Text>
            </HStack>
          )
        })}
      </VStack>
    </Box>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/admin',
  getServerSideProps: async (context, client) => {
    const { guests } = await getGuests(10)

    console.log({ guests })

    return {
      props: {
        guests,
      },
    }
  },
})

export default Home
