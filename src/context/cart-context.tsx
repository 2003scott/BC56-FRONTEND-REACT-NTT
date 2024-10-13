import { createContext, useContext, useState } from "react"

interface CardContextType {
    cartItems: number
    addToCart: () => void
}

const createCartContext = createContext<CardContextType | null>(null)

export const CartContext = ({ children }: { children: React.ReactNode }) => {

    const [cartItems, setCartItems] = useState<number>(0)

    const addToCart = () => {
        setCartItems(cartItems + 1)
    }

    return (
        <createCartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </createCartContext.Provider>
    )
}

export const useCart = () : CardContextType => {

    const context = useContext(createCartContext)

    if (!context) {
        throw new Error("useCart debe usarse dentro de un CarContext")
    }

    return context

}


