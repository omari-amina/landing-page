import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DemoPage from './pages/DemoPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DemoPage />} />
                <Route path="/demo" element={<DemoPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
