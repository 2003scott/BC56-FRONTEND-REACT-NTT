import { Button } from '@/components/ui/button';
import './productCard.css';

interface IProductCard {
    title: string;
    price: number;
    image: string;
    category: string;
    discription: string;
}

export const ProductCard = ({ title, price, image, category, discription }: IProductCard) => {
    return (
        <>
            <div className="card-product">
                <div className="card-image-container">
                    <img className="card-product-image" src={image} alt={title} />
                </div>
                <article className="card-container-article">
                    <div className="card-article">
                        <h2 className="card-product-title">{title}</h2>
                        <span className="card-product-badged">{category}</span>
                    </div>
                    <div>
                        <p>{price}</p>
                    </div>
                    <p className="card-product-description">{discription}</p>
                    <Button>Agregar al Carrito</Button>
                </article>
            </div>
        </>
    );
};
