import { Button } from '@/components/ui/button'
import './productCard.css'
import { useCart } from '@/hooks/useCart'
import { Products } from '@/interface/products'

export const ProductCard = ({ data } : { data : Products[]}) => {

    const { addToCart } = useCart()

    console.log(data)

    return (
        <>
            {data?.map((item , index : number) => (
                <div className="card-product" key={index}>
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
                    <Button onClick={() => addToCart}>Agregar al Carrito</Button>
                </article>
            </div>
            ))}
        </>

    )
}
