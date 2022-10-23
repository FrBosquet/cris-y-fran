import { createClient } from '@supabase/supabase-js'
import { Guest } from '../types'

export const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {}
)

export const updateGuest = async (
  id: number,
  update: Partial<Guest>
): Promise<Guest> => {
  const { data } = await client
    .from('guests')
    .update(update)
    .eq('id', id)
    .select()
    .order('id')
    .limit(1)
    .single()

  return data as Guest
}

export const getFromSlug = async (slug: string): Promise<Guest> => {
  const { data } = await client
    .from('guests')
    .select()
    .match({ slug })
    .limit(1)
    .single()

  return data
}

export const getGuests = async (): Promise<Guest[]> => {
  const { data } = await client
    .from('guests')
    .select(
      `
      *,
      host (name)
    `
    )
    .order('slug', { ascending: true })

  console.log({ data })

  return data as Guest[]
}
