import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useFormik } from 'formik'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

const Home: NextPage = () => {
  const { replace } = useRouter()
  const { supabaseClient, isLoading, session } = useSessionContext()
  const toast = useToast({
    position: 'bottom-right',
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      toast({
        title: 'Registrando cuenta...',
        status: 'info',
      })

      const response = await supabaseClient
        .from('admin_inv')
        .select('email, redeemed')
        .match({ email: values.email })
        .limit(1)
        .single()

      if (response.error) {
        toast({
          title: 'Error conectando a la base de datos',
          status: 'error',
        })
        return
      }

      const { data } = response

      if (data.redeemed) {
        toast({
          title: 'Este usuario ya ha sido registrado',
          status: 'error',
        })
        return
      }

      try {
        await supabaseClient.auth.signUp(values)
        await supabaseClient
          .from('admin_inv')
          .update({ redeemed: true })
          .match({ email: values.email })
        toast({
          title: 'Usuario registrado!',
          status: 'success',
        })
      } catch (e) {
        toast({
          title: 'Error realizando el registro',
          status: 'error',
        })
      }
    },
  })

  useEffect(() => {
    if (!isLoading && session) {
      replace('/admin/panel')
    }
  }, [isLoading, session])

  const login = useCallback(() => {
    supabaseClient.auth.signInWithPassword(formik.values)
  }, [formik.values])

  return (
    <Center minH="100vh" bg="green.800" color="white">
      <VStack>
        <Heading>Acceso novios</Heading>
        <VStack
          as="form"
          bg="pink.50"
          color="black"
          p={4}
          onSubmit={formik.handleSubmit as any}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              required
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              required
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
            />
          </FormControl>
          <HStack>
            <Button isLoading={isLoading || formik.isSubmitting} type="submit">
              Registrar
            </Button>
            <Button
              onClick={login}
              isLoading={isLoading || formik.isSubmitting}
            >
              Entrar
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  )
}

export default Home
