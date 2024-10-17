export interface CartItem {
    id: string
    quantity: number
  }

export interface CartAction {
    type: string
    payload: CartItem
  }

  export const cartInitialState: CartItem[] = JSON.parse(window.localStorage.getItem('cart') || '[]')

  export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
  }

  export const updateLocalStorage = (state: CartItem[]) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
  }

  const UPDATE_STATE_BY_ACTION: {
    [key in typeof CART_ACTION_TYPES[keyof typeof CART_ACTION_TYPES]]: (
      state: CartItem[],
      action: CartAction
    ) => CartItem[]
  } = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
      const { id } = action.payload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = [
          ...state.slice(0, productInCartIndex),
          { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
          ...state.slice(productInCartIndex + 1)
        ]

        updateLocalStorage(newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...action.payload,
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
      const { id } = action.payload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
      updateLocalStorage([])
      return []
    }
  }


  export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    const { type: actionType } = action
    const updateState = UPDATE_STATE_BY_ACTION[actionType as keyof typeof CART_ACTION_TYPES]
    return updateState ? updateState(state, action) : state
  }
