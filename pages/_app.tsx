import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/josefin-slab/700.css'
import '@fontsource/mrs-saint-delafield/400.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
