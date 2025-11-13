import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AskAI from './AskAI'
import { findSubjectName, findStream, subjectId as toSubjectId } from '../data/curriculum'
import { getSyllabus } from '../data/syllabus'

export default function SubjectDetail() {
  const navigate = useNavigate()
  const { id: classId, subjectId, streamId } = useParams()

  const subjectName = React.useMemo(
    () => findSubjectName(classId, subjectId, streamId),
    [classId, subjectId, streamId]
  )
  const stream = React.useMemo(() => findStream(classId, streamId), [classId, streamId])
  const syllabus = React.useMemo(() => getSyllabus(classId, subjectId), [classId, subjectId])

  const handleBack = () => {
    navigate(`/class/${classId}`)
  }

  if (!subjectName) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Back to Subjects
          </button>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Subject Not Found</h1>
          <p className="mt-2 text-slate-600">We could not find that subject for Class {classId}. Try selecting a different subject.</p>
        </div>
      </main>
    )
  }

  const normalizedSubjectId = toSubjectId(subjectName)
  const syllabusData = syllabus || getSyllabus(classId, normalizedSubjectId)

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Back to Subjects
          </button>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Class {classId}</p>
            {stream && (
              <p className="text-xs font-medium uppercase tracking-wide text-primary-500">
                Stream: {stream.name}
              </p>
            )}
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{subjectName}</h1>
            <p className="mt-2 text-slate-600 max-w-3xl">
              Explore the curriculum, recommended topics, and get instant help from AI for {subjectName.toLowerCase()} queries.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Syllabus</h2>
            <p className="text-slate-600">Stay on track with the key units and learning goals for this subject.</p>
          </div>
          {syllabusData ? (
            <div className="space-y-5">
              {syllabusData.summary && (
                <div className="rounded-xl border border-primary-100 bg-primary-50 px-5 py-4 text-sm text-primary-800">
                  {syllabusData.summary}
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {syllabusData.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="text-sm font-semibold text-slate-900">Unit {index + 1}</h3>
                    <p className="mt-2 text-sm text-slate-600">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
              Syllabus details are coming soon for this subject.
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Ask AI</h2>
            <p className="text-slate-600">
              Need help with {subjectName.toLowerCase()}? Ask a question or upload your problem to get instant explanations.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <AskAI />
          </div>
        </section>
      </div>
    </main>
  )
}
