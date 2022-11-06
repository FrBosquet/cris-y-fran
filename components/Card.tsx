import { Center } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  rotation: number
  onClick?: () => void
  width?: string
}

export const Card = ({ rotation, onClick, children }: Props) => {
  return (
    <Center
      cursor={onClick ? 'pointer' : 'unset'}
      onClick={onClick}
      position="absolute"
      shadow="lg"
      transition="1s"
      h="90vh"
      sx={{
        aspectRatio: `3 / 5`,
        transformStyle: 'preserve-3d',
        transform: `rotateY(${rotation}deg)`,
        backfaceVisibility: 'hidden',
      }}
      bg="blue.800"
    >
      {children}
    </Center>
  )
}
