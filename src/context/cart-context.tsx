import { Products } from '@/interface/products';
import { cartInitialState, cartReducer } from '@/reducers/cart-reducer'
import { useReducer, createContext, ReactNode, useContext } from 'react'

interface CartContextType {
    cart: Products[];
    addToCart: (product: Products) => void;
    removeToCart: (product: Products) => void;
    removeFromCart: (product: Products) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = (product: Products) => dispatch({
        type: 'ADD_TO_CART',
        payload: product,
    })

    const removeToCart = (product: Products) => dispatch({
        type: 'REMOVE_TO_CART',
        payload: product,
    })

    const removeFromCart = (product: Products) => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product,
    })

    const clearCart = () => dispatch({
        type: 'CLEAR_CART',
        payload: JSON.parse(localStorage.getItem('cart') || '[]'),
    })

    return { state, addToCart, removeToCart, removeFromCart, clearCart }
}

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const { state, addToCart, removeToCart, removeFromCart, clearCart } = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeToCart,
            removeFromCart,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return context
}
