import { useAuth } from "@/context/auth-context"
import { Navigate, Outlet } from "react-router-dom"
import { route } from "."

export const ProtectedRoute = () => {

    const { isAuthenticated  }  = useAuth()

    if (!isAuthenticated) return <Navigate to={route.login} replace />

    return <Outlet />
}
