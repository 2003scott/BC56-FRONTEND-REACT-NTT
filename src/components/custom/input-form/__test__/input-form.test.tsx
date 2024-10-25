import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { Inputform } from ".."
import { useState } from 'react'

describe("Test InputForm Component", () => {
    test("InputForm Render", () => {
        const mensaje = "Mensaje"
        render(<Inputform title={mensaje} placeholder="Hola ingresa un texto" type="text"/>)
            expect(document.querySelector("input")).toBeInTheDocument()
            expect(document.querySelector("label")).toBeInTheDocument()
    })

    test("InputForm Render with value", () => {
        const ComponentWithState = () => {
            const [mensaje, setMensaje] = useState<string>("")
            return (
                <Inputform
                    title="Mensaje"
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
            )
        }

        render(<ComponentWithState />)
        expect(document.querySelector("input")).toBeInTheDocument()
        expect(document.querySelector("label")).toBeInTheDocument()
    })
})
