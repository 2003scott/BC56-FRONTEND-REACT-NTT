import { render, screen, fireEvent } from "@testing-library/react"
import toast from "react-hot-toast"
import { Modal } from ".."

jest.mock("react-hot-toast", () => ({
    success: jest.fn(),
    error: jest.fn(),
}))

describe("Modal Component", () => {
    test("Debería mostrar el modal al hacer clic en el botón de apertura", () => {
        render(
            <Modal>
                <button>Abrir Modal</button>
            </Modal>
        )

        expect(screen.queryByText("Resetea tu Contraseña")).not.toBeInTheDocument()

        fireEvent.click(screen.getByText("Abrir Modal"))

        expect(screen.getByText("Resetea tu Contraseña")).toBeInTheDocument()
    })

    test("Debería cerrar el modal al hacer clic en el botón 'Cancelar'", () => {
        render(
            <Modal>
                <button>Abrir Modal</button>
            </Modal>
        )

        fireEvent.click(screen.getByText("Abrir Modal"))
        expect(screen.getByText("Resetea tu Contraseña")).toBeInTheDocument()

        fireEvent.click(screen.getByText("Cancelar"))
        expect(screen.queryByText("Resetea tu Contraseña")).not.toBeInTheDocument()
    })

    test("Debería mostrar un mensaje de error si el correo no es válido", async () => {
        render(
            <Modal>
                <button>Abrir Modal</button>
            </Modal>
        )

        fireEvent.click(screen.getByText("Abrir Modal"))

        fireEvent.change(screen.getByPlaceholderText("Correo Electronico"), {
            target: { value: "correo_invalido" },
        })
        fireEvent.click(screen.getByText("Enviar"))

        expect(toast.error).toHaveBeenCalledWith("Por favor, ingresa un correo válido.")
    })

    test("Debería mostrar un mensaje de éxito si el correo es válido", async () => {
        render(
            <Modal>
                <button>Abrir Modal</button>
            </Modal>
        )

        fireEvent.click(screen.getByText("Abrir Modal"))

        fireEvent.change(screen.getByPlaceholderText("Correo Electronico"), {
            target: { value: "correo@valido.com" },
        })
        fireEvent.click(screen.getByText("Enviar"))

        expect(toast.success).toHaveBeenCalledWith("Se envió la información al correo correo@valido.com")
    })
})
