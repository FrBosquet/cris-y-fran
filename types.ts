export enum States {
  pending = 'pending',
  accepted = 'accepted',
  declined = 'declined',
}

export type Guest = {
  id: number
  name: string[]
  isFamily: boolean
  state: States
  amount: number
  maxAmount: number
  host: {
    name: string
  }
}

export enum GuestType {
  single,
  couple,
  family,
}
