import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DemoPage from './pages/DemoPage'
import PrintingUseCase from './pages/PrintingUseCase'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/use-cases/printing" element={<PrintingUseCase />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
