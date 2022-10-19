import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react'
import {
  BsCheckCircleFill,
  BsFillPeopleFill,
  BsFillPersonPlusFill,
  BsFillXCircleFill,
  BsPersonFill,
  BsQuestionCircle
} from 'react-icons/bs'
import { getGuestType } from '../lib/guesttype'
import { Guest, GuestType, States } from '../types'

type Props = {
  guest: Guest
}

const stateIcons = {
  [States.pending]: BsQuestionCircle,
  [States.accepted]: BsCheckCircleFill,
  [States.declined]: BsFillXCircleFill
}

const stateLabels = {
  [States.pending]: 'Pendiente',
  [States.accepted]: 'Aceptado',
  [States.declined]: 'Rehusado'
}
const stateColors = {
  [States.pending]: 'yellow.300',
  [States.accepted]: 'green.300',
  [States.declined]: 'red.300'
}

const typeIcons = {
  [GuestType.single]: BsPersonFill,
  [GuestType.couple]: BsFillPeopleFill,
  [GuestType.family]: BsFillPersonPlusFill
}

const typeLabels = {
  [GuestType.single]: 'Soltero',
  [GuestType.couple]: 'Pareja',
  [GuestType.family]: 'Familia'
}

export const GuestRow: React.FC<Props> = ({ guest }) => {
  const type = getGuestType(guest)
  const { state } = guest
  return (
    <HStack p={2} w="100%" position="relative">
      <Tooltip hasArrow label={stateLabels[state]}>
        <span>
          <Icon color={stateColors[state]} as={stateIcons[state]} />
        </span>
      </Tooltip>
      <Tooltip hasArrow label={typeLabels[type]}>
        <span>
          <Icon as={typeIcons[type]} />
        </span>
      </Tooltip>
      <Text>{guest.name.join(', ')}</Text>
    </HStack>
  )
}
