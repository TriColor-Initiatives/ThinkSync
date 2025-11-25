import React from 'react'
import { Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import ClassGrid from './components/ClassGrid'
import AskAI from './components/AskAI'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ClassPage from './components/ClassPage'
import SubjectDetail from './components/SubjectDetail'

function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (location.state?.scrollTo) {
      const target = document.getElementById(location.state.scrollTo)
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
      navigate(location.pathname, { replace: true })
    }
  }, [location, navigate])

  return (
    <>
      <Hero />
      <section id="classes" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Explore Classes</h2>
          <ClassGrid />
        </div>
      </section>
      <section id="ask-ai" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">Ask AI</h2>
          <AskAI />
        </div>
      </section>
      <section id="how-it-works" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
          <HowItWorks />
        </div>
      </section>
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">What Students Say</h2>
          <Testimonials />
        </div>
      </section>
    </>
  )
}

function NotFoundPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you are looking for doesn&apos;t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700 transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <div className="flex-1 bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/class/:id" element={<ClassPage />} />
          <Route path="/class/:id/stream/:streamId/subject/:subjectId" element={<SubjectDetail />} />
          <Route path="/class/:id/subject/:subjectId" element={<SubjectDetail />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
