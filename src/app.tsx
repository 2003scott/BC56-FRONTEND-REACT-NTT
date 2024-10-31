import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorPage } from './pages/error'
import { MainLayout } from './layout/main-layout'
import { CartProvider } from './context/cart-context'
import { Resuman } from './pages/resuman'
import { Home } from './pages/home'
import { Toaster } from 'react-hot-toast'
import { route } from './routes'
import { AuthProvider } from './context/auth-context'
import { ProtectedRoute } from './routes/routes'
import { Login } from './pages/login'

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Toaster position="top-center" reverseOrder={false} />
                <BrowserRouter>
                    <MainLayout>
                        <Routes>
                            <Route path={route.login} element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path={route.home} element={<Home />} />
                                <Route path={route.resuman} element={<Resuman />} />
                                <Route path="*" element={<ErrorPage mensaje='Ruta no encontrada' />} />
                            </Route>
                        </Routes>
                    </MainLayout>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
