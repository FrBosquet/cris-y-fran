import { LockIcon } from '@chakra-ui/icons'
import {
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Spacer,
  Text,
  Tooltip,
  VStack
} from '@chakra-ui/react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useSessionContext } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
  useState
} from 'react'
import { BsSearch } from 'react-icons/bs'
import { AddGuest } from '../../components/AddGuest'
import { GuestRow } from '../../components/GuestRow'
import { FilterActions, initialState, reducer, EMPTY_HOST } from '../../lib/filterReducer'
import { getGuests } from '../../lib/supabase'
import { Guest, States } from '../../types'

type Props = {
  guests: Guest[]
}

const count = (prop: keyof Guest) => (acc: number, guest: Guest) =>
  acc + Number(guest[prop])

const onlyDesktop = {
  base: 'none',
  md: 'flex',
}
const onlyPhone = {
  base: 'flex',
  md: 'none',
}

const Home: NextPage<Props> = ({ guests: serverGuests }) => {
  const [filterState, dispatch] = useReducer(reducer, initialState)
  const [guests, setGuests] = useState(serverGuests)

  const { replace } = useRouter()
  const { supabaseClient } = useSessionContext()

  const logout = useCallback(async () => {
    await supabaseClient.auth.signOut()
    sessionStorage.removeItem('host_id')
    replace('/admin')
  }, [])

  const filteredList = useMemo(() => {
    return guests
      .sort((a, b) => (a.slug > b.slug ? 1 : -1))
      .filter(({ state, slug, host }) => {
        if (filterState.state && state !== filterState.state) return false
        if (filterState.host !== EMPTY_HOST && host.name !== filterState.host) return false
        if (filterState.name && !slug.includes(filterState.name.toLowerCase()))
          return false

        return true
      })
  }, [guests, filterState])

  const refresh = useCallback(async () => {
    const refreshedGuests = await getGuests()

    setGuests(refreshedGuests)
  }, [setGuests])

  const hosts = useMemo(() => {
    return guests.reduce<string[]>((acc, el) => {
      if (acc.includes(el.host.name)) return acc

      return [...acc, el.host.name]
    }, [EMPTY_HOST])
  }, [guests])

  useLayoutEffect(() => {
    const ls = localStorage.getItem('adminFilter')
    if (!ls) return
    const adminFilter = JSON.parse(ls)

    dispatch({ type: FilterActions.setFilters, payload: adminFilter })
  }, [])

  const invited = useMemo(
    () =>
      filteredList
        .filter(({ state }) => state === States.pending)
        .reduce(count('maxAmount'), 0),
    [filteredList]
  )
  const accepted = useMemo(
    () =>
      filteredList
        .filter(({ state }) => state === States.accepted)
        .reduce(count('amount'), 0),
    [filteredList]
  )
  const declined = useMemo(
    () =>
      filteredList
        .filter(({ state }) => state === States.declined)
        .reduce(count('maxAmount'), 0),
    [filteredList]
  )

  return (
    <VStack h="100vh" bg="gray.1000" color="white" p={4} spacing={3}>
      <HStack p={4} bg="gray.900" shadow="base" w="100%" borderRadius="md">
        <Tooltip label="salir">
          <IconButton
            variant="admin"
            size="sm"
            aria-label="salir"
            colorScheme="red"
            onClick={logout}
            icon={<LockIcon />}
          />
        </Tooltip>
        <Heading variant="sans" size="sm" color="white">
          Administrador
        </Heading>

        <Spacer />

        <AddGuest onSuccess={refresh} />
      </HStack>

      <HStack p={2} bg="gray.800" shadow="base" w="100%" borderRadius="md">
        <HStack display={onlyDesktop}>
          <BsSearch />
          <Input
            w="15ch"
            value={filterState.name}
            onChange={(e) => {
              dispatch({
                type: FilterActions.setFilter,
                payload: { field: 'name', value: e.currentTarget.value },
              })
            }}
          />

          <Select
            w="auto"
            color={'gray'}
            value={filterState.host}
            onChange={(e) => {
              dispatch({
                type: FilterActions.setFilter,
                payload: { field: 'host', value: e.currentTarget.value },
              })
            }}
          >
            {hosts.map((host: string) => (
              <option key={host} value={host}>
                {host === EMPTY_HOST ? 'Todos' : host}
              </option>
            ))}
          </Select>
        </HStack>

        <Text fontSize="xs" color="white">
          {filteredList.length} invitaciones /
        </Text>
        <Text fontSize="xs" color="white">
          {filteredList.reduce((acc, guest) => acc + (guest.amount ?? guest.maxAmount), 0)}{' '}
          invitados
        </Text>

        <Spacer />

        <Tooltip label="pendientes">
          <Button
            variant={filterState.state === States.pending ? 'outline' : 'solid'}
            onClick={() =>
              dispatch({
                type: FilterActions.toggleFilter,
                payload: { field: 'state', value: States.pending },
              })
            }
            size="xs"
            colorScheme="yellow"
          >
            <Text>{invited}</Text>
          </Button>
        </Tooltip>

        <Tooltip label="aceptados">
          <Button
            variant={
              filterState.state === States.accepted ? 'outline' : 'solid'
            }
            onClick={() =>
              dispatch({
                type: FilterActions.toggleFilter,
                payload: { field: 'state', value: States.accepted },
              })
            }
            size="xs"
            colorScheme="green"
          >
            <Text>{accepted}</Text>
          </Button>
        </Tooltip>

        <Tooltip placement="bottom-start" label="rechazados">
          <Button
            variant={
              filterState.state === States.declined ? 'outline' : 'solid'
            }
            onClick={() =>
              dispatch({
                type: FilterActions.toggleFilter,
                payload: { field: 'state', value: States.declined },
              })
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
        overflowY={'auto'}
      >
        {filteredList.map((guest) => {
          return (
            <GuestRow onEditSuccess={refresh} key={guest.slug} guest={guest} />
          )
        })}
      </VStack>

      <HStack display={onlyPhone}>
        <BsSearch />
        <Input
          w="15ch"
          value={filterState.name}
          onChange={(e) => {
            dispatch({
              type: FilterActions.setFilter,
              payload: { field: 'name', value: e.currentTarget.value },
            })
          }}
        />

        <Select
          w="auto"
          placeholder="Todos"
          color={'gray'}
          onChange={(e) => {
            dispatch({
              type: FilterActions.setFilter,
              payload: { field: 'host', value: e.currentTarget.value },
            })
          }}
        >
          {hosts.map((host) => (
            <option key={host} value={host}>
              {host}
            </option>
          ))}
        </Select>
      </HStack>
    </VStack>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/admin',
  getServerSideProps: async () => {
    const guests = await getGuests()

    return {
      props: {
        guests,
      },
    }
  },
})

export default Home
