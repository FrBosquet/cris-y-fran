export type FilterState = {
  host: string
  name: string
  state: string
}

export const initialState = {
  host: '',
  name: '',
  state: '',
}

export enum FilterActions {
  setFilter,
  resetFilter,
  toggleFilter,
  setFilters,
}

type Action = {
  type: FilterActions
  payload: any
}

export const reducer = (state: FilterState, action: Action): FilterState => {
  const { type, payload } = action

  let derivedState

  switch (type) {
    case FilterActions.setFilter:
      derivedState = {
        ...state,
        [payload.field]: payload.value,
      }

      break
    case FilterActions.resetFilter:
      derivedState = {
        ...state,
        [payload.field]: '',
      }
      break
    case FilterActions.toggleFilter:
      derivedState = {
        ...state,
        [payload.field]:
          state[payload.field as keyof FilterState] === payload.value
            ? ''
            : payload.value,
      }
      break
    case FilterActions.setFilters:
      derivedState = payload as FilterState
      break
    default:
      throw new Error(`Unknown action ${type}`)
  }

  try {
    localStorage.setItem('adminFilter', JSON.stringify(derivedState))
  } catch {
    console.error('Failed to serialize filter state')
  }

  return derivedState
}
