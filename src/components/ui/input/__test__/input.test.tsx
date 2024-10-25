import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { Input } from ".."
import { useState } from "react"

describe("Test Input Component", () => {
    test("Input Render" , () => {
        render(<Input type="text" placeholder="Mensaje de prueba"/>)
        expect(document.querySelector("input")).toBeInTheDocument()
    })

    test("Input Render with value", () => {
        const ComponentWithState = () => {
            const [mensaje, setMensaje] = useState<string>("")
            return (
                <Input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
            )
        }

        render(<ComponentWithState />)
        const input = document.querySelector("input")
        expect(input).toBeInTheDocument()
    })
})
