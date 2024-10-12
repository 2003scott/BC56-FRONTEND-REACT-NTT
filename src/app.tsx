import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { ErrorPage } from './pages/error'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<ErrorPage mensaje='Ruta no encontrada'/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
