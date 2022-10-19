import { LockIcon } from '@chakra-ui/icons'
import {
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
import { useCallback, useMemo, useState } from 'react'
import { AddGuest } from '../../components/AddGuest'
import { GuestRow } from '../../components/GuestRow'
import { getGuests } from '../../lib/supabase'
import { Guest, States } from '../../types'

type Props = {
  guests: Guest[]
  count: number
}

const count = (prop: keyof Guest) => (acc: number, guest: Guest) =>
  acc + Number(guest[prop])

const Home: NextPage<Props> = ({
  guests: serverGuests,
  count: serverCount,
}) => {
  const [guests, setGuests] = useState(serverGuests)
  const [filter, setFilter] = useState<null | States>(null)
  const { replace } = useRouter()
  const { supabaseClient } = useSessionContext()
  const toast = useToast({
    position: 'bottom-right',
  })

  const logout = useCallback(async () => {
    await supabaseClient.auth.signOut()
    sessionStorage.removeItem('host_id')
    replace('/admin')
  }, [])

  const invited = guests
    .filter(({ state }) => state === States.pending)
    .reduce(count('maxAmount'), 0)
  const accepted = guests
    .filter(({ state }) => state === States.accepted)
    .reduce(count('amount'), 0)
  const declined = guests
    .filter(({ state }) => state === States.declined)
    .reduce(count('maxAmount'), 0)

  const filteredList = useMemo(() => {
    if (filter === null) return guests

    return guests.filter(({ state }) => state === filter)
  }, [guests, filter])

  return (
    <VStack h="100vh" bg="gray.1000" color="white" p={4} spacing={3}>
      <HStack p={4} bg="gray.900" shadow="base" w="100%" borderRadius="md">
        <Tooltip label="salir">
          <IconButton
            size="sm"
            aria-label="salir"
            colorScheme="red"
            onClick={logout}
            icon={<LockIcon />}
          />
        </Tooltip>
        <Heading variant="panel">Administrador</Heading>

        <Spacer />

        <AddGuest />
      </HStack>

      <HStack p={2} bg="gray.800" shadow="base" w="100%" borderRadius="md">
        <Text fontSize="xs">{guests.length} invitaciones /</Text>
        <Text fontSize="xs">
          {guests.reduce((acc, guest) => acc + guest.maxAmount, 0)} invitados
        </Text>
        <Spacer />

        <Tooltip label="pendientes">
          <Button
            variant={filter === States.pending ? 'outline' : 'solid'}
            onClick={() =>
              setFilter((f) => (f === States.pending ? null : States.pending))
            }
            size="xs"
            colorScheme="yellow"
          >
            <Text>{invited}</Text>
          </Button>
        </Tooltip>

        <Tooltip label="aceptados">
          <Button
            variant={filter === States.accepted ? 'outline' : 'solid'}
            onClick={() =>
              setFilter((f) => (f === States.accepted ? null : States.accepted))
            }
            size="xs"
            colorScheme="green"
          >
            <Text>{accepted}</Text>
          </Button>
        </Tooltip>

        <Tooltip placement="bottom-start" label="rechazados">
          <Button
            variant={filter === States.declined ? 'outline' : 'solid'}
            onClick={() =>
              setFilter((f) => (f === States.declined ? null : States.declined))
            }
            size="xs"
            colorScheme="red"
          >
            <Text>{declined}</Text>
          </Button>
        </Tooltip>
      </HStack>

      <VStack
        p={2}
        w="100%"
        borderRadius="md"
        flex={1}
        bg="linear-gradient(to bottom, #333D29, #1A1A1A)"
        overflow={'scroll'}
      >
        {filteredList.map((guest) => {
          return <GuestRow key={guest.id} guest={guest} />
        })}
      </VStack>
    </VStack>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/admin',
  getServerSideProps: async () => {
    const { guests, count } = await getGuests(10)

    return {
      props: {
        guests,
        count,
      },
    }
  },
})

export default Home
