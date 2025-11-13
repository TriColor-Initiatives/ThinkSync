import React from 'react'
import { Link } from 'react-router-dom'
import { classIds } from '../data/curriculum'

export default function ClassGrid() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-7 md:overflow-visible md:pb-0">
      {classIds.map((classId) => (
        <Link
          key={classId}
          to={`/class/${classId}`}
          className="min-w-[160px] rounded-lg border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:bg-blue-100/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:min-w-0"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Class</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">Class {classId}</p>
          <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-700">
            View subjects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="ml-2 h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 6 6 6-6 6" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  )
}
