import React from 'react'

const testimonials = [
  {
    quote: 'I finally understood Pythagoras theorem in 2 minutes!',
    author: 'Grade 9 Student',
  },
  {
    quote: 'The animations make history super fun!',
    author: 'Grade 7 Student',
  },
]

export default function Testimonials() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {testimonials.map((t, i) => (
        <figure key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <blockquote className="text-slate-800 text-lg">“{t.quote}”</blockquote>
          <figcaption className="mt-4 text-sm text-slate-500">— {t.author}</figcaption>
        </figure>
      ))}
    </div>
  )
}

