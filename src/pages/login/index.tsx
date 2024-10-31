import { Inputform } from "@/components/custom/input-form"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { route } from "@/routes"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import "@/styles/login.css"
import { Modal } from "@/components/ui/modal"

export interface FormData {
    username: string;
    password: string;
}

export const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm<FormData>()
    const navigate = useNavigate()
    const { signin } = useAuth()

    const onSubmit = (data: FormData) => {
        signin(data).then(() => {
            navigate(route.home)
            toast.success(`Bienvenido ${data.username}`)
        })
        .catch(() => {
            toast.error('Usuario o contraseña incorrecta')
        })
    }

    return (
        <div className="content-login">
            <form onSubmit={handleSubmit(onSubmit)} className="form-contend">
                <h2>Iniciar Sesion</h2>
                <Inputform
                    title="Usuario"
                    {...register('username', { required: true })}
                    error={errors.username && 'El usuario es requerido'}
                />
                <Inputform
                    title="Contraseña"
                    {...register('password', { required: true })}
                    error={errors.password && 'La Contraseña es requerido'}
                />
                <Modal>
                    <>¿ Olvide mi contraseña ?</>
                </Modal>
                <Button type="submit">
                    Iniciar Sesion
                </Button>

            </form>
        </div>
    )
}
