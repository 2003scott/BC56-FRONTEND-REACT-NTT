import { Inputform } from "@/components/custom/input-form"
import "./modal.css"
import toast from "react-hot-toast"
import { useState } from "react"
import { Button } from "../button"

export const Modal = ({ children }: { children: React.ReactNode }) => {

    const [modal, setModal] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")

    const toggleModal = () => {
        setModal(!modal)
        console.log(modal)
    }

    const sendEmail = async () => {
        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast.error("Por favor, ingresa un correo válido.")
            return
        }

        console.log("Enviando correo a:", email)
        toast.success(`Se envió la información al correo ${email}`)

        toggleModal()
    }

    return (
        <div className="wrapper">
            <div onClick={toggleModal}>
                {children}
            </div>

            {modal && (
                <div className="modal">
                    <div className="modal__content">
                        <h3>Resetea tu Contraseña</h3>

                        <div className="form-modal">
                            <Inputform
                                title="Correo Electronico"
                                type="email"
                                placeholder="Correo Electronico"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="content-buttons">
                                <Button type="button" onClick={sendEmail}>
                                    Enviar
                                </Button>
                                <Button
                                    type="button"
                                    className="cancel"
                                    onClick={toggleModal}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>

                        <button
                            onClick={toggleModal}
                            className="modal__close"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
