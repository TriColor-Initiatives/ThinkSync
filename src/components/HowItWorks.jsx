import React from 'react'

const steps = [
  {
    title: 'Ask',
    desc: 'Type your question.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M6.75 4.5a2.25 2.25 0 0 0-2.25 2.25V18a.75.75 0 0 0 1.125.65l3.9-2.34a2.25 2.25 0 0 1 1.17-.33h5.55A2.25 2.25 0 0 0 18 13.725V6.75A2.25 2.25 0 0 0 15.75 4.5H6.75Z" />
      </svg>
    )
  },
  {
    title: 'Learn',
    desc: 'Get instant step-by-step answers.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.75 5.25A2.25 2.25 0 0 1 6 3h12a2.25 2.25 0 0 1 2.25 2.25V18A3.75 3.75 0 0 1 16.5 21h-9A3.75 3.75 0 0 1 3.75 17.25V5.25Z" />
      </svg>
    )
  },
  {
    title: 'Visualize',
    desc: 'Watch animations & 3D models.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm6.75 3.75v4.5a.75.75 0 0 0 1.13.65l4.5-2.25a.75.75 0 0 0 0-1.34l-4.5-2.25a.75.75 0 0 0-1.13.69Z" />
      </svg>
    )
  }
]

export default function HowItWorks() {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {steps.map((s) => (
        <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
            {s.icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
          <p className="mt-2 text-slate-600">{s.desc}</p>
        </div>
      ))}
    </div>
  )
}

