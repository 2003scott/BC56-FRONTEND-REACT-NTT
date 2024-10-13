import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { ErrorPage } from './pages/error'
import { MainLayout } from './layout/main-layout'

function App() {
    return (
        <>
            <BrowserRouter>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<ErrorPage mensaje='Ruta no encontrada' />} />
                    </Routes>
                </MainLayout>
            </BrowserRouter>
        </>
    )
}

export default App
