export enum States {
  pending = 'pending',
  accepted = 'accepted',
  declined = 'declined',
}

export type Guest = {
  event: number
  name: string[]
  slug: string
  isFamily: boolean
  state: States
  amount: number
  maxAmount: number
  host: {
    name: string
  }
  contacted: boolean
}

export enum GuestType {
  single,
  couple,
  family,
}
