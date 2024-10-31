import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "@/context/cart-context"
import { Navbar } from ".."
import { useAuth } from "@/context/auth-context"

jest.mock("@/context/auth-context", () => ({
    ...jest.requireActual("@/context/auth-context"),
    useAuth: jest.fn(),
}))

describe("Navbar Component", () => {
    beforeEach(() => {

        (useAuth as jest.Mock).mockReturnValue({ user: null, logout: jest.fn() })
    })

    test("Debería renderizar el logo y el nombre de la aplicación", () => {
        render(
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </CartProvider>
        )

        expect(screen.getByText("NTT market")).toBeInTheDocument()
        expect(screen.getByAltText("logo")).toBeInTheDocument()
    })

    test("Debería mostrar el saludo y el botón de cerrar sesión cuando el usuario está autenticado", () => {
        const mockLogout = jest.fn();

        (useAuth as jest.Mock).mockReturnValue({
            user: { username: "Diego" },
            logout: mockLogout,
        })

        render(
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </CartProvider>
        )

        expect(screen.getByText("Hola, Diego")).toBeInTheDocument()
        expect(screen.getByText("Cerrar sesión")).toBeInTheDocument()
    })

    test("Debería mostrar la cantidad de productos en el carrito", () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, logout: jest.fn() })
        render(
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </CartProvider>
        );

        const cartIcon = screen.getByText("0")
        expect(cartIcon).toBeInTheDocument()
    })
})
