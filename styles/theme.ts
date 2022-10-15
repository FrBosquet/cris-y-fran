import { extendTheme, ThemeConfig } from '@chakra-ui/react'

export const colors = {
  gray: {
    '50': '#F2F2F2',
    '100': '#DBDBDB',
    '200': '#C4C4C4',
    '300': '#ADADAD',
    '400': '#969696',
    '500': '#808080',
    '600': '#666666',
    '700': '#4D4D4D',
    '800': '#333333',
    '900': '#1A1A1A',
  },
  red: {
    '50': '#FBE9EE',
    '100': '#F4C2CF',
    '200': '#EE9BB1',
    '300': '#E77492',
    '400': '#E04D73',
    '500': '#D92654',
    '600': '#AE1E44',
    '700': '#821733',
    '800': '#570F22',
    '900': '#2B0811',
  },
  orange: {
    '50': '#F9EDEB',
    '100': '#EFCDC8',
    '200': '#E4ADA5',
    '300': '#D98E81',
    '400': '#CF6E5E',
    '500': '#C44E3B',
    '600': '#9D3E2F',
    '700': '#762F23',
    '800': '#4F1F17',
    '900': '#27100C',
  },
  pink: {
    '50': '#F8ECEC',
    '100': '#ECCBCB',
    '200': '#DFAAAA',
    '300': '#D28888',
    '400': '#C66767',
    '500': '#B94646',
    '600': '#943838',
    '700': '#6F2A2A',
    '800': '#4A1C1C',
    '900': '#250E0E',
  },
  yellow: {
    '50': '#F8F2EC',
    '100': '#ECD9CA',
    '200': '#E0C1A9',
    '300': '#D4A987',
    '400': '#C89165',
    '500': '#BC7943',
    '600': '#966136',
    '700': '#714828',
    '800': '#4B301B',
    '900': '#26180D',
  },
  green: {
    '50': '#F2F5F0',
    '100': '#DBE2D4',
    '200': '#C4D0B9',
    '300': '#ADBD9E',
    '400': '#96AB82',
    '500': '#7F9867',
    '600': '#657A52',
    '700': '#4C5B3E',
    '800': '#333D29',
    '900': '#191E15',
  },
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  global: {
    'html, body': {
      fontFamily: 'Josefin Slab',
    },
  },
  colors,
  fonts: {
    heading: 'Fidra',
    script: `'Mrs Saint Delafield', script`,
    body: `'Josefin Slab', serif`,
  },
  config,
  components: {
    Text: {
      baseStyle: {
        textAlign: 'center',
      },
      variants: {
        date: {
          color: 'green.600',
          fontFamily: 'heading',

          border: '2px solid',
          borderColor: 'orange.200',
          borderLeft: 'none',
          borderRight: 'none',
          pt: '0.2rem',
          lineHeight: 2,
        },
      },
    },
    Button: {
      baseStyle: {
        shadow: 'base',
        lineHeight: 1,
        pt: '0.4rem',
        minW: '4rem',
        colorScheme: 'green',
      },
    },
    Heading: {
      baseStyle: {
        maxW: '90%',
        color: 'green.600',
        fontFamily: 'script',
        fontSize: '4vh !important',
        textAlign: 'center',
      },
    },
  },
})
