import { renderHook, waitFor } from '@testing-library/react'
import { FETCH } from '@/lib/fetch-custom'
import { useFetch } from '../useFecth'
import { mockProductsResponse } from '@/mocks/products/product.mock'
import { IProducts } from '@/interface/products'

jest.mock('@/lib/fetch-custom', () => ({
    FETCH: {
        get: jest.fn()
    }
}))

describe('Test Cumstom Hook UseFecth', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("Test correctly", async () => {
        (FETCH.get as jest.Mock).mockResolvedValueOnce(mockProductsResponse)

        const { result } = renderHook(() => useFetch<IProducts>('/products'))

        expect(result.current.isLoading).toBe(true)
        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toBeUndefined()

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.data).toEqual(mockProductsResponse)
        expect(result.current.data?.products).toHaveLength(mockProductsResponse.products.length)

        const firstProduct = result.current.data?.products[0]
        expect(firstProduct).toHaveProperty('id')
        expect(firstProduct).toHaveProperty('title')
        expect(firstProduct).toHaveProperty('description')
        expect(firstProduct).toHaveProperty('price')
        expect(firstProduct).toHaveProperty('reviews')
        expect(Array.isArray(firstProduct?.reviews)).toBe(true)
    })

    test("Test for error", async () => {
        const mockError = new Error('Failed to fetch products');
        (FETCH.get as jest.Mock).mockRejectedValueOnce(mockError)

        const { result } = renderHook(() => useFetch<IProducts>('/products'))

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.error).toBe(mockError)
        expect(result.current.data).toBeUndefined()
    })

    test("Test state of charge" , async () => {
        (FETCH.get as jest.Mock)
            .mockResolvedValueOnce(mockProductsResponse)
            .mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({ products: [] }), 100)))

        const { result, rerender } = renderHook(() => useFetch<IProducts>('/products'))

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        const initialData = result.current.data

        rerender()
        expect(result.current.data).toEqual(initialData)
    })
})
