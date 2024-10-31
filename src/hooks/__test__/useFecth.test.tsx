import { renderHook, waitFor } from '@testing-library/react'
import { mockProductsResponse } from '@/mocks/products/product.mock'
import { IProducts } from '@/interface/products'
import { useFetch } from '../useFecth';

global.fetch = jest.fn();

describe('Test Custom Hook useFetch', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("Test correctly", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockProductsResponse),
        })

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

        expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products')
    })

    test("Test for error", async () => {
        const mockError = new Error("Network Error");
        (fetch as jest.Mock).mockRejectedValueOnce(mockError)

        const { result } = renderHook(() => useFetch<IProducts>('/products'))

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.error).toEqual(mockError)
    });

    test("Test state of charge", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce(mockProductsResponse),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce({ products: [] }),
            });

        const { result, rerender } = renderHook(() => useFetch<IProducts>('/products'));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const initialData = result.current.data;

        rerender()
        expect(result.current.data).toEqual(initialData);
    })
})
