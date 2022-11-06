import { Heading, VStack } from '@chakra-ui/react'
import bg from 'public/bg.png'
import { Card } from '../components/Card'
import { getGuestTypes } from '../lib/guesttype'
import { Guest } from '../types'

type CoverProps = { guest: Guest }
type Props = CoverProps & {
  isFlipped: boolean
  onClick: () => void
}

const SingleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <VStack w="100%" pb={'10vh'}>
      <Heading lineHeight={1} fontSize={'8vmin'}>
        {name[0]}
      </Heading>
    </VStack>
  )
}
const CoupleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <VStack w="100%" pb={'10vh'}>
      <Heading lineHeight={1} fontSize={'6vh'}>
        {name[0]}
      </Heading>
      <Heading lineHeight={1} fontSize={'4vh'} color="orange.500">
        +
      </Heading>
      <Heading lineHeight={1} fontSize={'6vh'}>
        {name[1]}
      </Heading>
    </VStack>
  )
}
const FamilyCover = ({ guest: { name } }: CoverProps) => {
  const fullName = `${name[0]} y ${name[1]}`

  return (
    <VStack w="100%" pb={'10vh'}>
      <Heading lineHeight={1} fontSize={'3vh'} color="pink.300">
        Familia de
      </Heading>
      <Heading lineHeight={1} fontSize={'6vh'}>
        {fullName}
      </Heading>
    </VStack>
  )
}

export const Frontface = ({ guest, isFlipped, onClick }: Props) => {
  const { isSingle, isFamily, isCouple } = getGuestTypes(guest)

  return (
    <Card onClick={onClick} rotation={isFlipped ? 180 : 360} width="80%">
      {isSingle && <SingleCover guest={guest} />}
      {isFamily && <FamilyCover guest={guest} />}
      {isCouple && <CoupleCover guest={guest} />}
    </Card>
  )
}
