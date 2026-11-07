import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Cases } from './pages/Cases'
import { Coach } from './pages/Coach'
import { Curriculum } from './pages/Curriculum'
import { Dashboard } from './pages/Dashboard'
import { Deals } from './pages/Deals'
import { Firms } from './pages/Firms'
import { FitPractice } from './pages/FitPractice'
import { Flashcards } from './pages/Flashcards'
import { Headhunters } from './pages/Headhunters'
import { Home } from './pages/Home'
import { Integrations } from './pages/Integrations'
import { Judgment } from './pages/Judgment'
import { MockInterview } from './pages/MockInterview'
import { Modeling } from './pages/Modeling'
import { Outreach } from './pages/Outreach'
import { Quiz } from './pages/Quiz'
import { Settings } from './pages/Settings'
import { Story } from './pages/Story'
import { Technicals } from './pages/Technicals'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/technicals" element={<Technicals />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/fit" element={<FitPractice />} />
        <Route path="/judgment" element={<Judgment />} />
        <Route path="/story" element={<Story />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mock" element={<MockInterview />} />
        <Route path="/modeling" element={<Modeling />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/firms" element={<Firms />} />
        <Route path="/headhunters" element={<Headhunters />} />
        <Route path="/outreach" element={<Outreach />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
