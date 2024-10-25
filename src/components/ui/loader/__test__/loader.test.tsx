import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Loader } from ".."

describe("Test Loader Component", () => {
    test("Loader Render", () => {
        render(<Loader />)
        expect(screen.getByText("Cargando...")).toBeInTheDocument()
    })
})
