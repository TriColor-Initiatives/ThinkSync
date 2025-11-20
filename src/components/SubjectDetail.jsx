import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AskAI from './AskAI'
import PDFViewer from './PDFViewer'
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

        {/* PDF Resources Section */}
        {syllabusData?.pdfs && syllabusData.pdfs.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Textbook PDFs</h2>
              <p className="text-slate-600">Access NCERT textbooks and study materials for this subject.</p>
            </div>
            
            {/* Chapters */}
            {syllabusData.pdfs.filter(pdf => !pdf.isAnswers).length > 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Chapters</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {syllabusData.pdfs
                      .filter(pdf => !pdf.isAnswers)
                      .map((pdf, index) => (
                        <div
                          key={index}
                          className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-primary-300 cursor-pointer"
                          onClick={() => {
                            const element = document.getElementById(`pdf-section-${pdf.chapter}`)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-bold text-sm">
                              {pdf.chapter}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                                {pdf.title.replace(/^Chapter \d+: /, '')}
                              </h4>
                              {pdf.description && (
                                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{pdf.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Full PDF Viewers */}
                <div className="space-y-6 mt-8">
                  {syllabusData.pdfs
                    .filter(pdf => !pdf.isAnswers)
                    .map((pdf, index) => (
                      <div key={index} id={`pdf-section-${pdf.chapter}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <PDFViewer pdf={pdf} classId={classId} />
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {/* Answers Section */}
            {syllabusData.pdfs.filter(pdf => pdf.isAnswers).length > 0 && (
              <div className="space-y-6 mt-8 pt-8 border-t border-slate-200">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    Answers & Solutions
                  </h3>
                  <div className="space-y-6">
                    {syllabusData.pdfs
                      .filter(pdf => pdf.isAnswers)
                      .map((pdf, index) => (
                        <div key={index} className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 shadow-sm">
                          <PDFViewer pdf={pdf} classId={classId} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Ask AI</h2>
            <p className="text-slate-600">
              Need help with {subjectName.toLowerCase()}? Ask a question or upload your problem to get instant explanations tailored for Class {classId}.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <AskAI classId={classId} subject={subjectName} />
          </div>
        </section>
      </div>
    </main>
  )
}
