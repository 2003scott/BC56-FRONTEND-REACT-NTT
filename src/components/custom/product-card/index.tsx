import { Button } from '@/components/ui/button'
import './productCard.css'
import { Products } from '@/interface/products'
import { useCart } from '@/context/cart-context'

export const ProductCard = ({ data }: { data: Products[] }) => {

    const { cart, addToCart, removeFromCart } = useCart()

    const checkProductInCart = (product: Products) => {
        return cart.some(item => item.id === product.id)
    }

    return (
        <>
            {data?.map((item) => {
                const isProductInCart = checkProductInCart(item)
                return (
                    <div className="card-product" key={item.id}>
                        <div className="card-image-container">
                            <img className="card-product-image" src={item.images[0]} alt={item.title} />
                        </div>
                        <article className="card-container-article">
                            <div className="card-article">
                                <h2 className="card-product-title">{item.title}</h2>
                                <span className="card-product-badged">{item.category}</span>
                            </div>
                            <div>
                                <p>S/ {item.price}</p>
                            </div>
                            <p className="card-product-description">{item.description}</p>
                            <Button
                                className={isProductInCart ? 'btn-in-cart' : 'button'}
                                onClick={() => {
                                    isProductInCart
                                        ? removeFromCart(item)
                                        : addToCart(item)
                                }}
                            >
                                {isProductInCart ? 'Eliminar del carrito' : 'Agregar al carrito'}
                            </Button>
                        </article>
                    </div>
                )
            })}
        </>

    )
}
