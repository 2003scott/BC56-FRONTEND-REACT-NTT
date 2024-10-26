import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useCart } from '@/context/cart-context'
import { ProductCard } from '..'
import { mockProductsResponse } from '@/mocks/products/product.mock'

jest.mock('@/context/cart-context', () => ({
    useCart: jest.fn()
}))

describe('Test ProductCard Component', () => {
    beforeEach(() => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [],
            addToCart: jest.fn(),
            removeFromCart: jest.fn()
        })
    })

    test('Test render Product Card', () => {
        render(<ProductCard data={mockProductsResponse.products} />)
        mockProductsResponse.products.forEach((product) => {
            expect(screen.getByText(product.title)).toBeInTheDocument()
            expect(screen.getByText(product.category)).toBeInTheDocument()
            expect(screen.getByText(`S/ ${product.price}`)).toBeInTheDocument()
            expect(screen.getByText(product.description)).toBeInTheDocument()

            const productImage = screen.getByAltText(product.title) as HTMLImageElement
            expect(productImage).toBeInTheDocument()
            expect(productImage.src).toBe(product.images[0])
        })
    })

    test('Test add to cart', () => {
        render(<ProductCard data={mockProductsResponse.products} />)
        const button = screen.getAllByRole('button')[0]
        button.click()
        expect(useCart().addToCart).toHaveBeenCalledTimes(1)
    })

    test('Test remove from cart', () => {
        render(<ProductCard data={mockProductsResponse.products} />)
        const button = screen.getAllByRole('button')[0]
        button.click()
        button.click()
    })

    test('Test render Product Card - not data', () => {
        render(<ProductCard data={[]} />)
        const message = screen.getByText("No hay productos para Mostrar")
        expect(message).toBeInTheDocument()
    })
})
