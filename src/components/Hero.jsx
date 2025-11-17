import React from 'react'
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-purple-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
              Learn Smarter.<br />Think Sharper.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl">
              Get instant answers, visual explanations, and AI-powered learning tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#ask-ai"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-white font-medium shadow-lg shadow-primary-500/30 transition hover:shadow-xl hover:shadow-primary-500/40 hover:from-primary-700 hover:to-primary-800 transform hover:-translate-y-0.5"
              >
                Ask a Question
              </a>
              <a
                href="#classes"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white/60 px-6 py-3 text-slate-700 font-medium transition hover:bg-white hover:border-primary-300 hover:text-primary-700 shadow-sm hover:shadow-md"
              >
                Browse Subjects
              </a>
            </div>
          </div>
          <div id="visualize" className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 p-1 shadow-xl shadow-blue-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white/80 backdrop-blur-sm">
                <div className="flex h-full w-full items-center justify-center p-4">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 shadow-inner">
                    <div className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L2 22" />
                          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L22 22" />
                          <circle cx="12" cy="12" r="1.5" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-700">AI-Powered Learning</p>
                      <p className="text-xs text-slate-500 mt-1">Visual explanations coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        className="absolute left-1/2 -bottom-24 w-[120%] -translate-x-1/2 max-w-none"
        viewBox="0 0 1200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d="M0 100 C 150 150 350 50 600 100 C 850 150 1050 50 1200 100 L 1200 200 L 0 200 Z" fill="url(#g)" />
      </svg>
    </section>
  )
}
