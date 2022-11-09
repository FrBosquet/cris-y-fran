import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'
import { theme } from '../styles/theme'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  )
}

export default MyApp
