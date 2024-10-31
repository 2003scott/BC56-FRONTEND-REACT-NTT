import { Inputform } from "@/components/custom/input-form"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import "@/styles/resuman.css"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { LuTrash } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import distritos from "@/data/distritos.json"

interface FormData {
    nombres: string;
    apellidos: string;
    direccion: string;
    referencia: number;
    celular: number;
    distrito: string;
}

export const Resuman = () => {

    const { cart, removeFromCart, addToCart, removeToCart, clearCart } = useCart()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const navigate = useNavigate()

    const onSubmit = (data: FormData) => {
        console.log(data, cart)
        clearCart()
        navigate('/')
        toast.success('Compra realizada con éxito')
    }

    return (
        <>
            <div className="resumen-container">
                <h2 className="resumen-title">Resumen de la compra</h2>
                <div>
                    <table className="resumen-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center' }}>
                                        No hay productos en el carrito
                                    </td>
                                </tr>
                            ) : (
                                cart.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <img src={product.images[0]} alt={product.title} width="50" className="resumen-product-image" />
                                        </td>
                                        <td>{product.title}</td>
                                        <td>
                                            <Button onClick={() => removeToCart(product)} disabled={product.quantity <= 1} >
                                                -
                                            </Button>
                                            <span className="resume-quantity">{product.quantity}</span>
                                            <Button onClick={() => addToCart(product)}>
                                                +
                                            </Button>
                                        </td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Button onClick={() => removeFromCart(product)} className="btn-in-cart">
                                                <LuTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            <tr className="resumen-footer">
                                <td colSpan={4} style={{ textAlign: "end" }}>Total a Pagar : </td>
                                <td colSpan={1}>
                                    {cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2 className="resumen-title">Información de Envio</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="resume-form">
                    <Inputform
                        title="Nombres"
                        placeholder="Ingrese su nombre"
                        {...register("nombres", { required: true })}
                        error={errors.nombres && "El nombre es requerido"}
                    />
                    <Inputform
                        title="Apellidos"
                        placeholder="Ingrese su apellido"
                        {...register("apellidos", { required: true })}
                        error={errors.apellidos && "El apellido es requerido"}
                    />
                    <div className="resuman-content-select">
                        <label>Distrito</label>
                        <select {...register("distrito", { required: true })} className="resuman-select">
                            <option value="">Seleccione un distrito</option>
                            {distritos.distritos.map((item) => (
                                <option key={item.nombre} value={item.nombre}>
                                    {item.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.distrito && <p className="resuman-error">El distrito es requerido</p>}
                    </div>
                    <Inputform
                        title="Dirección"
                        placeholder="Ingrese su dirección"
                        {...register("direccion", { required: true })}
                        error={errors.direccion && "La dirección es requerida"}
                    />
                    <Inputform
                        title="Referencia"
                        placeholder="Referencia de su dirección"
                        {...register("referencia", { required: true })}
                        error={errors.referencia && "La referencia es requerida"}
                    />
                    <Inputform
                        title="Celular"
                        placeholder="Ingrese su Celular"
                        type="number"
                        {...register("celular", { required: true })}
                        error={errors.celular && "El celular es requerido"}
                    />
                    <Button style={{ width: "100%" }} type="submit" disabled={cart.length <= 0}>
                        Completar Compra
                    </Button>
                </form>
            </div>

        </>
    )
}
