import React from 'react'

export default function Hero() {
  const [rotation, setRotation] = React.useState(0)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered Learning Platform</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Turn Tough Subjects into{' '}
              <span className="gradient-text">Visual Stories</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl leading-relaxed">
              Ask any question from Class 6-12 and get instant answers, 3D models, and AI-powered animations tailored to your learning level.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#ask-ai"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-white font-medium shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl hover:scale-105"
              >
                <span>Ask a Question</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06l3.97-3.97H3a.75.75 0 0 1 0-1.5h17.69l-3.97-3.97a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#classes"
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-slate-300 px-6 py-3 text-slate-700 font-medium transition-all hover:bg-slate-50 hover:border-primary-300 hover:text-primary-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Browse Classes</span>
              </a>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600">6-12</div>
                <div className="text-sm text-slate-600 mt-1">Classes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">AI</div>
                <div className="text-sm text-slate-600 mt-1">Powered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">24/7</div>
                <div className="text-sm text-slate-600 mt-1">Available</div>
              </div>
            </div>
          </div>
          
          <div id="visualize" className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-slate-900 via-primary-700 to-primary-400 p-[2px] shadow-2xl animate-pulse-glow">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
                <div className="flex h-full w-full items-center justify-center p-4">
                  <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
                    {/* Animated 3D visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="relative w-32 h-32"
                        style={{ 
                          transform: `perspective(1000px) rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg)`,
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* 3D Cube */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-80 rounded-lg" style={{ transform: 'translateZ(30px)' }} />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-80 rounded-lg" style={{ transform: 'rotateY(90deg) translateZ(30px)' }} />
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 opacity-80 rounded-lg" style={{ transform: 'rotateX(90deg) translateZ(30px)' }} />
                      </div>
                    </div>
                    
                    {/* Floating particles */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-40"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      />
                    ))}
                    
                    {/* Center content */}
                    <div className="relative z-10 text-center p-6">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-xl animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
                          <path d="M11.7 2.042a.75.75 0 0 1 .6 0l8.25 3.75a.75.75 0 0 1 0 1.376l-8.25 3.75a.75.75 0 0 1-.6 0L3.45 7.168a.75.75 0 0 1 0-1.376l8.25-3.75Z" />
                          <path d="M3 10.5a.75.75 0 0 1 1.05-.69l7.65 3.474a.75.75 0 0 0 .6 0l7.65-3.473A.75.75 0 0 1 21 10.5v6.75a.75.75 0 0 1-.45.69l-8.25 3.75a.75.75 0 0 1-.6 0L3.45 17.94A.75.75 0 0 1 3 17.25V10.5Z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">Interactive 3D Models</p>
                      <p className="text-xs text-slate-500 mt-1">Visualize complex concepts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated wave */}
      <svg
        className="absolute left-1/2 -bottom-24 w-[120%] -translate-x-1/2 max-w-none"
        viewBox="0 0 1200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path 
          d="M0 100 C 150 150 350 50 600 100 C 850 150 1050 50 1200 100 L 1200 200 L 0 200 Z" 
          fill="url(#waveGradient)"
          className="animate-pulse"
        />
      </svg>
    </section>
  )
}
