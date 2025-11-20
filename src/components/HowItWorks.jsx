import React from 'react'

const steps = [
  {
    title: 'Ask',
    desc: 'Type your question or use voice input to ask anything.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.258 12.063l4.214 4.215a.75.75 0 1 0 1.06-1.061l-4.213-4.215A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
      </svg>
    ),
    demo: 'AskAI',
    color: 'from-blue-500 to-cyan-500',
    animation: 'animate-pulse'
  },
  {
    title: 'Learn',
    desc: 'Get instant step-by-step answers tailored to your class level.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.7 2.042a.75.75 0 0 1 .6 0l8.25 3.75a.75.75 0 0 1 0 1.376l-8.25 3.75a.75.75 0 0 1-.6 0L3.45 7.168a.75.75 0 0 1 0-1.376l8.25-3.75Z" />
        <path d="M3 10.5a.75.75 0 0 1 1.05-.69l7.65 3.474a.75.75 0 0 0 .6 0l7.65-3.473A.75.75 0 0 1 21 10.5v6.75a.75.75 0 0 1-.45.69l-8.25 3.75a.75.75 0 0 1-.6 0L3.45 17.94A.75.75 0 0 1 3 17.25V10.5Z" />
      </svg>
    ),
    demo: 'StepByStep',
    color: 'from-purple-500 to-pink-500',
    animation: 'animate-bounce'
  },
  {
    title: 'Visualize',
    desc: 'Watch animations & 3D models to understand concepts better.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm6.75 3.75v4.5a.75.75 0 0 0 1.13.65l4.5-2.25a.75.75 0 0 0 0-1.34l-4.5-2.25a.75.75 0 0 0-1.13.69Z" />
      </svg>
    ),
    demo: 'Visual3D',
    color: 'from-green-500 to-emerald-500',
    animation: 'animate-spin-slow'
  }
]

// Animated demo components
function AskAIDemo() {
  const [typing, setTyping] = React.useState('')
  const [showCursor, setShowCursor] = React.useState(true)
  
  React.useEffect(() => {
    const text = "What is photosynthesis?"
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setTyping(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    
    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [])
  
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-400">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.258 12.063l4.214 4.215a.75.75 0 1 0 1.06-1.061l-4.213-4.215A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
        </svg>
        <span className="text-sm text-slate-600 flex-1">
          {typing}
          <span className={`inline-block w-0.5 h-4 bg-primary-600 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
        </span>
        <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
            <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function StepByStepDemo() {
  const steps = [
    'Analyzing your question...',
    'Finding relevant concepts...',
    'Generating explanation...',
    'Ready! ✓'
  ]
  const [currentStep, setCurrentStep] = React.useState(0)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              idx === currentStep 
                ? 'bg-primary-600 scale-110' 
                : idx < currentStep 
                ? 'bg-green-500' 
                : 'bg-slate-200'
            }`}>
              {idx < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                </svg>
              ) : idx === currentStep ? (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
              )}
            </div>
            <span className={`text-sm transition-colors ${
              idx === currentStep ? 'text-primary-700 font-medium' : idx < currentStep ? 'text-green-700' : 'text-slate-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Visual3DDemo() {
  const [rotation, setRotation] = React.useState(0)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg border border-slate-200 p-4 shadow-sm relative overflow-hidden">
      <div className="relative h-32 flex items-center justify-center">
        {/* 3D Cube Animation */}
        <div 
          className="relative w-20 h-20"
          style={{ transform: `rotateX(${rotation}deg) rotateY(${rotation}deg)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-80" style={{ transform: 'translateZ(20px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-80" style={{ transform: 'rotateY(90deg) translateZ(20px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 opacity-80" style={{ transform: 'rotateX(90deg) translateZ(20px)' }} />
        </div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = React.useState(null)
  
  const demos = {
    AskAI: <AskAIDemo />,
    StepByStep: <StepByStepDemo />,
    Visual3D: <Visual3DDemo />
  }
  
  return (
    <div className="space-y-12">
      <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary-300"
          >
            {/* Animated background gradient on hover */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            {/* Icon with animation */}
            <div className={`relative mx-auto mb-4 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-xl group-hover:blur-2xl transition-all" />
              {step.icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">
              {step.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {step.desc}
            </p>
            
            {/* Number badge */}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
              {index + 1}
            </div>
            
            {/* Demo preview on hover */}
            {hoveredIndex === index && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[120%] z-10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-white rounded-lg shadow-2xl border border-slate-200 p-4">
                  {demos[step.demo]}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Feature highlights */}
      <div className="grid md:grid-cols-2 gap-6 mt-16">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v17.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Context-Aware Learning</h4>
              <p className="text-sm text-slate-600">AI responses are tailored to your class level, ensuring age-appropriate explanations.</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border border-purple-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v17.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Interactive Visualizations</h4>
              <p className="text-sm text-slate-600">Complex concepts come to life with 3D models and animated explanations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

