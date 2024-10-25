import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { Button } from '..'

describe("Test Button Component", () => {
    test("Button Render", () => {
        const mensaje = "Hola"
        render(<Button>{mensaje}</Button>)
        expect(screen.getByText("Hola")).toBeInTheDocument()
    })

    test("Button Render with onClick", () => {
        const mensaje = "click"
        const onClick = jest.fn()
        render(<Button onClick={onClick}>{mensaje}</Button>)
        const button = screen.getByText("click")
        button.click()
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
