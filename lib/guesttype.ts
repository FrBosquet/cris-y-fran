import { Guest, GuestType } from '../types'

export const getGuestType = ({ isFamily, name }: Guest): GuestType => {
  if (isFamily) return GuestType.family
  if (!isFamily && name.length === 1) return GuestType.single

  return GuestType.couple
}
