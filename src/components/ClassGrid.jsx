import React from 'react'
import { Link } from 'react-router-dom'
import { classIds } from '../data/curriculum'

export default function ClassGrid() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-7 md:overflow-visible md:pb-0 scrollbar-hide">
      {classIds.map((classId, index) => (
        <Link
          key={classId}
          to={`/class/${classId}`}
          className="group relative min-w-[160px] rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-50 hover:to-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:min-w-0 animate-slide-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
          
          {/* Icon */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.7 2.042a.75.75 0 0 1 .6 0l8.25 3.75a.75.75 0 0 1 0 1.376l-8.25 3.75a.75.75 0 0 1-.6 0L3.45 7.168a.75.75 0 0 1 0-1.376l8.25-3.75Z" />
                <path d="M3 10.5a.75.75 0 0 1 1.05-.69l7.65 3.474a.75.75 0 0 0 .6 0l7.65-3.473A.75.75 0 0 1 21 10.5v6.75a.75.75 0 0 1-.45.69l-8.25 3.75a.75.75 0 0 1-.6 0L3.45 17.94A.75.75 0 0 1 3 17.25V10.5Z" />
              </svg>
            </div>
          </div>
          
          <p className="relative text-xs font-semibold uppercase tracking-wide text-primary-600">Class</p>
          <p className="relative mt-2 text-2xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
            Class {classId}
          </p>
          <span className="relative mt-4 inline-flex items-center text-sm font-medium text-primary-700 group-hover:text-primary-800 transition-colors">
            View subjects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 6 6 6-6 6" />
            </svg>
          </span>
          
          {/* Hover effect indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl" />
        </Link>
      ))}
    </div>
  )
}
