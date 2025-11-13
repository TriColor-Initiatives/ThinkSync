import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getClassStructure, subjectId } from '../data/curriculum'

const subjectIcons = {
  Math: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm.75 4.5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
    </svg>
  ),
  Maths: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm.75 4.5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
    </svg>
  ),
  Physics: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l7.63 7.62a.75.75 0 0 1 0 1.06l-7.63 7.64a.75.75 0 0 1-1.06 0L3.84 12.52a.75.75 0 0 1 0-1.06l7.63-7.62Z" />
    </svg>
  ),
  Chemistry: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M9.75 3a.75.75 0 0 1 .75.75V9l6.62 8.27a2.25 2.25 0 0 1-1.77 3.73H6.65a2.25 2.25 0 0 1-1.77-3.73L11.5 9V3.75a.75.75 0 0 1 .75-.75h-2.5Z" />
    </svg>
  ),
  Science: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M9 3.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75V9l3.82 5.16A2.25 2.25 0 0 1 16.9 18.6H7.1a2.25 2.25 0 0 1-1.92-4.44L9 9V3.75Z" />
    </svg>
  ),
  Biology: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.25a.75.75 0 0 1 .75.75v17.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Z" />
    </svg>
  ),
  History: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25A8.26 8.26 0 0 0 12 3.75Zm.75 4.5a.75.75 0 0 0-1.5 0V12c0 .2.08.39.22.53l3 3a.75.75 0 1 0 1.06-1.06l-2.78-2.78V8.25Z" />
    </svg>
  ),
  Geography: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm-3 6 2.25 1.5L12 12l1.5-1.5 3 2.25-1.5 3.75H9l-1.5-6Z" />
    </svg>
  ),
  Hindi: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.5 4.5A.75.75 0 0 1 5.25 3.75h13.5a.75.75 0 0 1 0 1.5H13.5v8.25h2.25a2.25 2.25 0 1 1-2.25 2.25h-1.5a3.75 3.75 0 1 0 3.75-3.75H12v-6H5.25A.75.75 0 0 1 4.5 4.5Z" />
    </svg>
  ),
  English: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.5 3.75A.75.75 0 0 0 3.75 4.5v15a.75.75 0 0 0 .75.75h10.5a.75.75 0 0 0 .75-.75V9.75L12 3.75H4.5Z" />
    </svg>
  ),
  Economics: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.5 5.25A.75.75 0 0 1 5.25 4.5h13.5a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 5.25ZM3 9.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V18h2.25v-5.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V18h1.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 18.75V9.75Z" />
    </svg>
  ),
  Accountancy: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6.75 3A2.25 2.25 0 0 0 4.5 5.25v13.5A2.25 2.25 0 0 0 6.75 21h10.5A2.25 2.25 0 0 0 19.5 18.75V8.25L14.25 3H6.75ZM7.5 9h9v1.5h-9V9Zm0 3h9v1.5h-9V12Zm0 3h7.5v1.5H7.5V15Z" />
    </svg>
  ),
  'Business Studies': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.5 4.5A.75.75 0 0 1 5.25 3.75h13.5a.75.75 0 0 1 .75.75V9h-15V4.5ZM4.5 10.5h15v6.75a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V10.5Zm4.5 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
    </svg>
  ),
  'Computer Science': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9A2.25 2.25 0 0 0 5.25 16.5h13.5A2.25 2.25 0 0 0 21 14.25v-9A2.25 2.25 0 0 0 18.75 3H5.25Zm.75 12.75h12a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75v-.75a.75.75 0 0 1 .75-.75Z" />
    </svg>
  ),
  Sociology: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm4.5 12.75a.75.75 0 0 0 .75-.75 5.25 5.25 0 0 0-10.5 0 .75.75 0 0 0 .75.75h9Zm-13.5-.75a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75 4.5 4.5 0 0 1 4.04-4.46 7.46 7.46 0 0 1 1.03 2.71 5.25 5.25 0 0 0-2.82 1.75Z" />
    </svg>
  ),
  'Political Science': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.25a.75.75 0 0 1 .7.48l2.28 6.09H20.1a.75.75 0 0 1 .46 1.35l-4.83 3.52 1.84 6.16a.75.75 0 0 1-1.16.84L12 17.86l-4.41 2.83a.75.75 0 0 1-1.16-.83l1.84-6.16-4.83-3.52A.75.75 0 0 1 4.08 8.4h5.12l2.1-5.62a.75.75 0 0 1 .7-.48Z" />
    </svg>
  ),
  'Social Science': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 3a6 6 0 1 1-6 6H4.5a7.5 7.5 0 1 0 7.82-7.497A6.01 6.01 0 0 1 12 3ZM6 14.25A3.75 3.75 0 0 1 9.75 18h4.5a3.75 3.75 0 0 1 3.75 3.75.75.75 0 0 1-.75.75h-10.5a.75.75 0 0 1-.75-.75A3.75 3.75 0 0 1 6 14.25Z" />
    </svg>
  ),
  Default: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6 4.5A2.25 2.25 0 0 1 8.25 2.25h7.5A2.25 2.25 0 0 1 18 4.5v15a.75.75 0 0 1-1.03.69L12 18.777 7.03 20.19A.75.75 0 0 1 6 19.5v-15Z" />
    </svg>
  ),
}

function getSubjectIcon(subject) {
  return subjectIcons[subject] || subjectIcons.Default
}

export default function ClassPage() {
  const { id } = useParams()
  const classStructure = getClassStructure(id)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/', { state: { scrollTo: 'classes' } })
  }

  if (classStructure.type === 'unknown') {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Back to Classes
          </button>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Class Not Found</h1>
          <p className="mt-2 text-slate-600">Sorry, we could not find the class you were looking for.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800"
        >
          Back to Classes
        </button>
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Class {id}</h1>
          <p className="mt-2 text-slate-600">
            {classStructure.type === 'streams'
              ? 'Pick a stream to see the core subjects and start exploring personalised lessons.'
              : 'Choose a subject to explore interactive lessons and visualizations.'}
          </p>
        </div>
        {classStructure.type === 'subjects' ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {classStructure.subjects.map((subject) => (
              <Link
                key={subject}
                to={`/class/${id}/subject/${subjectId(subject)}`}
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  {getSubjectIcon(subject)}
                </div>
                <span className="text-sm font-medium text-slate-800 group-hover:text-primary-700">{subject}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {classStructure.streams.map((stream) => (
              <div key={stream.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Stream</p>
                    <h2 className="text-xl font-semibold text-slate-900">{stream.name}</h2>
                    <p className="text-sm text-slate-600">
                      Core subjects for the {stream.name.toLowerCase()} stream.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                    {stream.subjects.map((subject) => (
                      <Link
                        key={subject}
                        to={`/class/${id}/stream/${stream.id}/subject/${subjectId(subject)}`}
                        className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                          {getSubjectIcon(subject)}
                        </div>
                        <span className="text-sm font-medium text-slate-800 group-hover:text-primary-700">{subject}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
