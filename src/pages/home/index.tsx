import { Loader } from "@/components/ui/loader"
import { useFetch } from "@/hooks/useFecth"
import { IProducts, Products } from "@/interface/products"
import { ProductCard } from "@/components/custom/product-card"
import { Inputform } from "@/components/custom/input-form"
import { useState } from "react"
import { ICategories } from "@/interface/categories"
import "@/styles/products.css"
import { ErrorPage } from "../error"


export const Home = () => {

    const { data: products, isLoading, error } = useFetch<IProducts>("/products")
    const { data: categories } = useFetch<ICategories[]>("/products/categories")
    const [searchProduct, setsearchProduct] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const filteredProducts = products?.products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchProduct.toLowerCase())
        const matchesCategory = selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase()
        return matchesSearch && matchesCategory
    })

    if (isLoading) return <Loader />

    if (error) return <ErrorPage mensaje="Error al Cargar los Producto" />

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="search-container ">
                <Inputform
                    placeholder="Buscar por nombre"
                    title=""
                    onChange={(e) => setsearchProduct(e.target.value)}
                />
                <select className="select-category" onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Todos</option>
                    {categories?.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="product-container">
                <ProductCard data={filteredProducts as Products[]} />
            </div>
        </div>
    )
}
