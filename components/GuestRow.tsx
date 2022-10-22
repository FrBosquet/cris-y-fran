import {
  Avatar,
  Center,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import {
  BsBack,
  BsCheckCircleFill,
  BsFillPeopleFill,
  BsFillPersonPlusFill,
  BsFillXCircleFill,
  BsPersonFill,
  BsQuestionCircle,
} from 'react-icons/bs'
import { getGuestType } from '../lib/guesttype'
import { Guest, GuestType, States } from '../types'
import { EditGuest } from './EditGuest'

type Props = {
  guest: Guest
}

const stateIcons = {
  [States.pending]: BsQuestionCircle,
  [States.accepted]: BsCheckCircleFill,
  [States.declined]: BsFillXCircleFill,
}

const stateLabels = {
  [States.pending]: 'Pendiente',
  [States.accepted]: 'Aceptado',
  [States.declined]: 'Rehusado',
}
const stateColors = {
  [States.pending]: 'yellow.300',
  [States.accepted]: 'green.300',
  [States.declined]: 'red.300',
}

const typeIcons = {
  [GuestType.single]: BsPersonFill,
  [GuestType.couple]: BsFillPeopleFill,
  [GuestType.family]: BsFillPersonPlusFill,
}

const typeLabels = {
  [GuestType.single]: 'Soltero',
  [GuestType.couple]: 'Pareja',
  [GuestType.family]: 'Familia',
}

export const GuestRow: React.FC<Props> = ({ guest }) => {
  const { state, amount, slug } = guest
  const type = getGuestType(guest)

  const copy = () => {
    navigator.clipboard.writeText(`${window.location.host}/${slug}`)
  }

  const visibleAmount =
    state === States.accepted ? amount : state === States.declined ? 0 : '...'
  return (
    <HStack p={2} w="100%" position="relative" alignItems="center">
      <EditGuest guest={guest} />
      <Tooltip hasArrow label={stateLabels[state]}>
        <Center>
          <Icon color={stateColors[state]} as={stateIcons[state]} />
        </Center>
      </Tooltip>
      <Tooltip hasArrow label={typeLabels[type]}>
        <Center>
          <Icon as={typeIcons[type]} />
        </Center>
      </Tooltip>
      <Tooltip hasArrow label={guest.host.name}>
        <Avatar size="xs" name={guest.host.name} />
      </Tooltip>
      <VStack alignItems="start" flex={1} spacing={0}>
        <Text noOfLines={1}>{guest.name.join(', ')}</Text>
        <HStack>
          <Link href={`/${slug}`} passHref>
            <Text
              flex={1}
              fontSize="xs"
              target="_blank"
              variant="monospace"
              as="a"
              color="yellow.200"
            >
              /{slug}
            </Text>
          </Link>
        </HStack>
      </VStack>
      <Text>
        {visibleAmount}/{guest.maxAmount}
      </Text>
      <Tooltip hasArrow label={'Copiar'}>
        <IconButton
          onClick={copy}
          colorScheme="green"
          aria-label="copiar"
          size="xs"
          icon={<BsBack />}
        />
      </Tooltip>
    </HStack>
  )
}
