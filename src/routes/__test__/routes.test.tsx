import { route } from '@/routes'

describe('Test Routes', () => {

    test('contains the correct routes', () => {
        expect(route).toHaveProperty('home')
        expect(route).toHaveProperty('resuman')
    })

    test('home route is correct', () => {
        expect(route.home).toBe('/')
    })

    test('resuman route is correct', () => {
        expect(route.resuman).toBe('/resuman')
    })

    test('login route is correct', () => {
        expect(route.login).toBe('/login')
    })
})
