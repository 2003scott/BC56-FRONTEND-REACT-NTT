import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth-context'
import { FormData } from '@/pages/login'

const TestComponent = () => {
    const { user, signin, logout, isAuthenticated, loading } = useAuth()

    return (
        <div>
            {loading && <p>Loading...</p>}
            {isAuthenticated ? (
                <>
                    <p>Welcome, {user?.username}</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <button onClick={() => signin({ username: 'test', password: 'password' } as FormData)}>Login</button>
            )}
        </div>
    )
}

describe('AuthProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    test('renders loading state initially', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )
        expect(screen.getByText(/Loading.../)).toBeInTheDocument()
    })

    test('can log in a user', async () => {
        // Mock de la respuesta del fetch
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ user: { username: 'test' } }),
        })

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )

        fireEvent.click(screen.getByText('Login'))

        await waitFor(() => {
            expect(screen.getByText('Welcome, test')).toBeInTheDocument()
        })
    })

    test('can log out a user', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ user: { username: 'test' } }),
        })

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )


        fireEvent.click(screen.getByText('Login'))

        await waitFor(() => {
            expect(screen.getByText('Welcome, test')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Logout'))

        await waitFor(() => {
            expect(screen.queryByText('Welcome, test')).not.toBeInTheDocument()
            expect(screen.getByText('Login')).toBeInTheDocument()
        })
    })
})
