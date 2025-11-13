import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Home', type: 'home' },
  { label: 'Classes', type: 'section', target: 'classes' },
  { label: 'Ask AI', type: 'section', target: 'ask-ai' },
  { label: 'Visualize', type: 'section', target: 'visualize' },
  { label: 'About', type: 'section', target: 'how-it-works' },
]

export default function NavBar() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const closeMobile = () => setOpen(false)

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSectionNav = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToSection(sectionId), 150)
    } else {
      scrollToSection(sectionId)
    }
    closeMobile()
  }

  const renderNavItem = (item) => {
    if (item.type === 'route') {
      return (
        <Link
          key={item.label}
          to={item.to}
          className="text-slate-700 hover:text-primary-600 transition-colors"
          onClick={closeMobile}
        >
          {item.label}
        </Link>
      )
    }

    const targetId = item.type === 'home' ? 'home' : item.target
    return (
      <button
        key={item.label}
        type="button"
        onClick={() => handleSectionNav(targetId)}
        className="text-left text-slate-700 hover:text-primary-600 transition-colors"
      >
        {item.label}
      </button>
    )
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => handleSectionNav('home')}>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-white font-bold">SB</div>
            <span className="text-lg font-semibold text-slate-900">Study Buddy</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => renderNavItem(item))}
            <a
              href="#login"
              className="rounded-md border border-primary-600 px-4 py-2 text-primary-700 transition hover:bg-primary-50"
            >
              Login / Signup
            </a>
          </nav>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => renderNavItem(item))}
              <a
                href="#login"
                className="rounded-md border border-primary-600 px-4 py-2 text-center text-primary-700"
                onClick={closeMobile}
              >
                Login / Signup
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
