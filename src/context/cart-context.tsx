import { cartInitialState, CartItem, cartReducer } from '@/redurcers/cart-reducer'
import { useReducer, createContext, ReactNode } from 'react'

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  clearCart: (product: CartItem) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product: CartItem) => dispatch({
    type: 'ADD_TO_CART',
    payload: product,
  })

  const removeFromCart = (product: CartItem) => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product,
  });

  const clearCart = (product : CartItem) => dispatch({
      type: 'CLEAR_CART',
      payload: product
  })

  return { state, addToCart, removeFromCart, clearCart }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}
