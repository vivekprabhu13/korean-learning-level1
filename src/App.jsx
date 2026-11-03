import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Hangeul from './pages/Hangeul'
import Numbers from './pages/Numbers'
import Directions from './pages/Directions'
import Verbs from './pages/Verbs'
import Grammar from './pages/Grammar'
import Vocabulary from './pages/Vocabulary'
import Conversations from './pages/Conversations'
import Quiz, { QuizHub } from './pages/Quiz'

function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="kr text-7xl font-black text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-extrabold">Page not found</h1>
      <p className="muted mt-2 mb-6">That page does not exist.</p>
      <Link to="/" className="btn btn-primary">Back to dashboard</Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="hangeul" element={<Hangeul />} />
          <Route path="numbers" element={<Numbers />} />
          <Route path="directions" element={<Directions />} />
          <Route path="verbs" element={<Verbs />} />
          <Route path="grammar/:level" element={<Grammar />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="quiz" element={<QuizHub />} />
          <Route path="quiz/:section" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
