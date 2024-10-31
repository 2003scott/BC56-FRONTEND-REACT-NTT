import { Loader } from "@/components/ui/loader"
import { useFetch } from "@/hooks/useFecth"
import { IProducts } from "@/interface/products"
import { ProductCard } from "@/components/custom/product-card"
import { Inputform } from "@/components/custom/input-form"
import { useState } from "react"
import { ICategories } from "@/interface/categories"
import "@/styles/products.css"
import { ErrorPage } from "../error"
import { DataPagination } from "@/components/shared/pagination"

export const Home = () => {
    const { data: products, isLoading, error } = useFetch<IProducts>("/products")
    const { data: categories } = useFetch<ICategories[]>("/products/categories")
    const [searchProduct, setSearchProduct] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 8

    const filteredProducts = products?.products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchProduct.toLowerCase())
        const matchesCategory = selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase()
        return matchesSearch && matchesCategory
    }) || []

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

    const getCurrentPageProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredProducts.slice(startIndex, endIndex)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchProduct(e.target.value)
        setCurrentPage(1)
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value)
        setCurrentPage(1)
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    if (isLoading) return <Loader />
    if (error) return <ErrorPage mensaje="Error al Cargar los Producto" />

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="search-container">
                <Inputform
                    placeholder="Buscar por nombre"
                    title=""
                    value={searchProduct}
                    onChange={handleSearch}
                />
                <select
                    className="select-category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Todos</option>
                    {categories?.map((item, index) => (
                        <option key={index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="product-container">
                <ProductCard data={getCurrentPageProducts()} />
            </div>
            {filteredProducts.length > 0 && (
                <div className="pagination-container">
                    <DataPagination
                        currentPage={currentPage}
                        setPage={handlePageChange}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    )
}
