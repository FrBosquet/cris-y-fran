import { createClient } from '@supabase/supabase-js'
import { Guest } from '../types'

export const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {}
)

export const updateGuest = async (
  { event, slug }: Guest,
  update: Partial<Guest>
): Promise<Guest> => {
  const { data } = await client
    .from('guests')
    .update(update)
    .eq('event', event)
    .eq('slug', slug)
    .select()
    .order('slug')
    .limit(1)
    .single()

  return data as Guest
}

export const deleteGuest = async ({ event, slug }: Guest): Promise<void> => {
  await client.from('guests').delete().eq('event', event).eq('slug', slug)
}

export const getFromSlug = async (slug: string): Promise<Guest> => {
  const { data } = await client
    .from('guests')
    .select()
    .match({ slug, event: process.env.NEXT_PUBLIC_EVENT_ID })
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
    .match({ event: process.env.NEXT_PUBLIC_EVENT_ID })
    .order('slug', { ascending: true })

  return data as Guest[]
}
