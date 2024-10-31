import { IUser } from "@/interface/user"
import { FormData } from "@/pages/login";
import { createContext, useContext, useState } from "react"

interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    error: string;
    loading: boolean;
    signin: (user: FormData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    const signin = async (credentials: FormData): Promise<void> => {
        try {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error en la autenticación')
            }
            setUser(data.user || credentials)
            setIsAuthenticated(true)
            localStorage.setItem('user', JSON.stringify(data.user || credentials))
        } catch (error) {
            throw new Error("error")
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        setIsAuthenticated(false)
        setError('')
    }

    const value = {
        user,
        isAuthenticated,
        error,
        loading,
        signin,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
