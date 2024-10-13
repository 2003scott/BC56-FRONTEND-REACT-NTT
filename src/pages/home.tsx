import { Loader } from "@/components/ui/loader"
import { useFetch } from "@/hooks/useFecth"
import { IProducts } from "@/interface/products"
import { ErrorPage } from "./error"
import { ProductCard } from "@/components/custom/ProductCard"
import "@/styles/products.css"

export const Home = () => {

    const { data : products , isLoading, error } = useFetch<IProducts>("/products")

    if (isLoading) return <Loader />

    if (error) return <ErrorPage mensaje="Error al Cargar los Producto"/>

    return (
        <div className="product-container">
            {products?.products.map((item) => (
                <ProductCard key={item.id}
                    title={item.title}
                    image={item.images[0]}
                    price={item.price}
                    category={item.category}
                    discription={item.description}
                />
            ))}
        </div>
    )
}
