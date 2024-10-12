import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { useFetch } from "@/hooks/useFecth"
import { IProducts } from "@/interface/products"
import { ErrorPage } from "./error"

export const Home = () => {

    const { data : products , isLoading, error } = useFetch<IProducts>("/products")

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <ErrorPage mensaje="Error al Cargar los Producto"/>
    }

    return (
        <div>
            <Button>
                mi mka
            </Button>
            asd
            {JSON.stringify(products?.products)}
        </div>
    )
}
