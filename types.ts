export enum States {
  pending,
  accepted,
  declined,
}

export type Guest = {
  name: string[]
  isFamily: boolean
  state: States
  amount: number
}

export enum GuestType {
  single,
  couple,
  family,
}
