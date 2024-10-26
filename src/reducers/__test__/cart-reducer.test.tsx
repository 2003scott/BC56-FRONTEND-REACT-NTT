import { Products } from '@/interface/products'
import { cartReducer, CART_ACTION_TYPES, updateLocalStorage, CartAction } from '../cart-reducer'

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
}

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
})

describe('cartReducer', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    const mockProduct: Products = {
        id: 1,
        title: 'Test Product',
        price: 100,
        quantity: 1,
        description: '',
        category: '',
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        tags: [],
        brand: '',
        sku: '',
        weight: 0,
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: '',
        reviews: [],
        returnPolicy: '',
        minimumOrderQuantity: 0,
        images: [],
        thumbnail: '',
    }

    describe('ADD_TO_CART', () => {
        test('should add a new product to empty cart', () => {
            const initialState: Products[] = []
            const action: CartAction = {
                type: CART_ACTION_TYPES.ADD_TO_CART,
                payload: mockProduct
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toHaveLength(1)
            expect(newState[0]).toEqual({ ...mockProduct, quantity: 1 })
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(newState)
            )
        })

        test('should increment quantity if product already exists', () => {
            const initialState: Products[] = [{ ...mockProduct, quantity: 1 }]
            const action: CartAction = {
                type: CART_ACTION_TYPES.ADD_TO_CART,
                payload: mockProduct
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toHaveLength(1)
            expect(newState[0].quantity).toBe(2)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(newState)
            )
        })
    })

    describe('REMOVE_TO_CART', () => {
        test('should decrement quantity of existing product', () => {
            const initialState: Products[] = [{ ...mockProduct, quantity: 2 }]
            const action: CartAction = {
                type: CART_ACTION_TYPES.REMOVE_TO_CART,
                payload: mockProduct
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toHaveLength(1)
            expect(newState[0].quantity).toBe(1)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(newState)
            )
        })

        it('should not modify state if product does not exist', () => {
            const initialState: Products[] = []
            const action: CartAction = {
                type: CART_ACTION_TYPES.REMOVE_TO_CART,
                payload: mockProduct
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toEqual(initialState)
        })
    })

    describe('REMOVE_FROM_CART', () => {
        test('should remove product completely from cart', () => {
            const initialState: Products[] = [{ ...mockProduct, quantity: 2 }]
            const action: CartAction = {
                type: CART_ACTION_TYPES.REMOVE_FROM_CART,
                payload: mockProduct
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toHaveLength(0)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(newState)
            )
        })

        it('should not modify state if product does not exist', () => {
            const initialState: Products[] = []
            const action: CartAction = {
                type: CART_ACTION_TYPES.REMOVE_FROM_CART,
                payload: mockProduct
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toEqual(initialState)
        })
    })

    describe('CLEAR_CART', () => {
        test('should remove all products from cart', () => {
            const initialState: Products[] = [
                { ...mockProduct, quantity: 2 },
                { ...mockProduct, id: 2, quantity: 1 }
            ]
            const action: CartAction = {
                type: CART_ACTION_TYPES.CLEAR_CART,
                payload: mockProduct // payload is not used in this action
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toHaveLength(0)
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify([])
            )
        })
    })

    describe('Invalid action', () => {
        test('should return current state for invalid action type', () => {
            const initialState: Products[] = [{ ...mockProduct, quantity: 1 }]
            const action: CartAction = {
                type: 'INVALID_ACTION' as any,
                payload: mockProduct
            }

            const newState = cartReducer(initialState, action)

            expect(newState).toEqual(initialState)
        })
    })

    describe('updateLocalStorage', () => {
        test('should update localStorage with current cart state', () => {
            const state: Products[] = [mockProduct]
            updateLocalStorage(state)

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(state)
            )
        })
    })
})
