import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Quiz } from './pages/Quiz'
import { Technicals } from './pages/Technicals'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/technicals" element={<Technicals />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
