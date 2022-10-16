import { Button, Center, Heading, useToast, VStack } from '@chakra-ui/react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useSessionContext } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const Home: NextPage = () => {
  const { replace } = useRouter()
  const { supabaseClient, isLoading, session } = useSessionContext()
  const toast = useToast({
    position: 'bottom-right',
  })

  const logout = useCallback(async () => {
    await supabaseClient.auth.signOut()
    replace('/admin')
  }, [])

  return (
    <Center minH="100vh" bg="green.800" color="white">
      <VStack>
        <Heading>Panel de control</Heading>
        <Button onClick={logout}>Salit</Button>
      </VStack>
    </Center>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/admin',
})

export default Home
