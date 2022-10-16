export enum States {
  pending,
  accepted,
  declined,
}

export type Guest = {
  id: number
  name: string[]
  isFamily: boolean
  state: States
  amount: number
  maxAmount: number
}

export enum GuestType {
  single,
  couple,
  family,
}
