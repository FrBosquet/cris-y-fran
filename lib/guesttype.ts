import { Guest, GuestType } from '../types'

export const getGuestType = ({ isFamily, name }: Guest): GuestType => {
  if (isFamily) return GuestType.family
  if (!isFamily && name.length === 1) return GuestType.single

  return GuestType.couple
}

export const getGuestTypes = (
  guest: Guest
): {
  isSingle: boolean
  isFamily: boolean
  isCouple: boolean
} => {
  const guestType = getGuestType(guest)

  const isSingle = guestType == GuestType.single
  const isFamily = guestType == GuestType.family
  const isCouple = guestType == GuestType.couple

  return { isSingle, isFamily, isCouple }
}
