import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Import logos
import tricolorLogo from '../assets/tricolor_logo.png'

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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-blue-50/80 supports-[backdrop-filter]:via-purple-50/80 supports-[backdrop-filter]:to-blue-50/80">
      <div className="w-full pl-4 pr-1 sm:pl-6 sm:pr-2 lg:pl-8 lg:pr-4">
        <div className="relative flex h-16 items-center justify-between gap-4">
          {/* Left column: Think Sync brand */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => handleSectionNav('home')}>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white font-bold text-lg shadow-md shadow-primary-500/30">
              TS
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Think Sync
            </span>
          </Link>

          {/* Center column: navigation links */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            {navItems.map((item) => renderNavItem(item))}
          </nav>

          {/* Right column: TriColor Initiatives logo */}
          <div className="hidden md:flex justify-end flex-shrink-0 -mr-2 sm:-mr-3 lg:-mr-4">
            <img src={tricolorLogo} alt="TriColor Initiatives" className="h-14 w-auto object-contain" />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
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
              <div className="flex items-center justify-end pt-3 border-t border-slate-200">
                <img src={tricolorLogo} alt="TriColor Initiatives" className="h-10 w-auto object-contain" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
