import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Navbar } from ".."
import { CartProvider } from "@/context/cart-context"

describe("Navbar Component", () => {
    test("Navbar Render", () => {
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
})
