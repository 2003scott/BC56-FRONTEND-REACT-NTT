import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { ErrorPage } from ".."
import { BrowserRouter } from 'react-router-dom'

describe("Test Error Page Component", () => {
    test("Error Render", () => {
        render(
            <BrowserRouter>
                <ErrorPage mensaje={"Error al cargar"}/>
            </BrowserRouter>
        )
        expect(screen.getByText("Error al cargar")).toBeInTheDocument()
    })
})
