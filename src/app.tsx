import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { ErrorPage } from './pages/error'
import { MainLayout } from './layout/main-layout'
import { CartContext } from './context/cart-context'

function App() {
    return (
        <CartContext>
            <BrowserRouter>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<ErrorPage mensaje='Ruta no encontrada' />} />
                    </Routes>
                </MainLayout>
            </BrowserRouter>
        </CartContext>
    )
}

export default App
