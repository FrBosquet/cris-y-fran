import { Center } from '@chakra-ui/react'

import { StaticImageData } from 'next/image'

type Props = {
  bg: StaticImageData
  children: React.ReactNode
  rotation: number
  onClick?: () => void
  width?: string
}

export const Card = ({
  rotation,
  onClick,
  bg,
  children,
  width = '100%',
}: Props) => {
  return (
    <Center
      cursor={onClick ? 'pointer' : 'unset'}
      onClick={onClick}
      position="absolute"
      shadow="lg"
      h="90vh"
      maxW="90vw"
      transition="1s"
      sx={{
        aspectRatio: `${bg.width} / ${bg.height}`,
        transformStyle: 'preserve-3d',
        transform: `rotateY(${rotation}deg)`,
        backfaceVisibility: 'hidden',
      }}
      bgImage={bg.src}
      bgSize="cover"
    >
      {children}
    </Center>
  )
}
