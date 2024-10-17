import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorPage } from './pages/error'
import { MainLayout } from './layout/main-layout'
import { CartProvider } from './context/cart-context'
import { Resuman } from './pages/resuman'
import { Home } from './pages/home'

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/resuman" element={<Resuman />} />
                        <Route path="*" element={<ErrorPage mensaje='Ruta no encontrada' />} />
                    </Routes>
                </MainLayout>
            </BrowserRouter>
        </CartProvider>
    )
}

export default App
