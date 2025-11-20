import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { classIds, getClassStructure, subjectId } from '../data/curriculum'
import { getSyllabus } from '../data/syllabus'

function buildContextualPrompt(userQuestion, classId, subject, syllabusData) {
  const trimmedQuestion = userQuestion.trim()
  let contextPrompt = 'You are a warm, helpful tutor who explains concepts clearly and engagingly.'
  
  if (classId) {
    contextPrompt += ` The student is in Class ${classId}.`
    if (subject) {
      contextPrompt += ` They are studying ${subject}.`
      if (syllabusData) {
        contextPrompt += ` Key topics for this class include: ${syllabusData.topics.slice(0, 3).join(', ')}.`
      }
    }
    contextPrompt += ` Please tailor your explanation to be appropriate for Class ${classId} level - use age-appropriate language, examples, and depth of explanation.`
  }
  
  contextPrompt += ` User question: ${trimmedQuestion}`
  return contextPrompt
}

const QUICK_QUESTIONS = {
  'Explain this concept': 'Can you explain this concept in simple terms?',
  'Give an example': 'Can you give me a real-world example?',
  'Solve this problem': 'Can you help me solve this step by step?',
  'Practice question': 'Can you give me a practice question?',
}

export default function AskAI({ classId: propClassId, subject: propSubject }) {
  const [query, setQuery] = React.useState('')
  const [answer, setAnswer] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [listening, setListening] = React.useState(false)
  const [selectedClass, setSelectedClass] = React.useState(propClassId || '')
  const [selectedSubject, setSelectedSubject] = React.useState(propSubject || '')
  const [recentQuestions, setRecentQuestions] = React.useState([])
  const [copied, setCopied] = React.useState(false)
  const errorTimeoutRef = React.useRef(null)
  
  // Get available subjects for selected class
  const classStructure = React.useMemo(() => {
    return selectedClass ? getClassStructure(selectedClass) : null
  }, [selectedClass])
  
  const availableSubjects = React.useMemo(() => {
    if (!classStructure) return []
    if (classStructure.type === 'subjects') return classStructure.subjects
    // For streams, flatten all subjects
    const allSubjects = new Set()
    classStructure.streams?.forEach(stream => {
      stream.subjects.forEach(subj => allSubjects.add(subj))
    })
    return Array.from(allSubjects).sort()
  }, [classStructure])
  
  // Get syllabus data for context
  const syllabusData = React.useMemo(() => {
    if (!selectedClass || !selectedSubject) return null
    return getSyllabus(selectedClass, subjectId(selectedSubject))
  }, [selectedClass, selectedSubject])
  
  // Load recent questions from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem('thinkSync_recentQuestions')
    if (stored) {
      try {
        setRecentQuestions(JSON.parse(stored))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])
  
  // Sync props with state
  React.useEffect(() => {
    if (propClassId) setSelectedClass(propClassId)
    if (propSubject) setSelectedSubject(propSubject)
  }, [propClassId, propSubject])
  
  // Auto-dismiss error messages after 5 seconds
  React.useEffect(() => {
    if (error) {
      // Clear any existing timeout
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
      // Set new timeout to clear error
      errorTimeoutRef.current = setTimeout(() => {
        setError('')
      }, 5000)
    }
    
    // Cleanup on unmount
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
    }
  }, [error])

  async function handleAsk(e) {
    e.preventDefault()
    setError('')
    if (!query.trim()) return
    try {
      setLoading(true)
      setAnswer('')
      const contextualPrompt = buildContextualPrompt(query, selectedClass, selectedSubject, syllabusData)
      
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: contextualPrompt, 
          subject: selectedSubject || null, 
          grade: selectedClass || null 
        }),
      })
      
      const text = await res.text()
      let data
      try {
        data = text ? JSON.parse(text) : null
      } catch (_) {
        data = null
      }

      if (!res.ok) {
        let errorMsg = 'Unable to get response from AI'
        
        if (data && data.error) {
          errorMsg = data.error
        } else if (data && data.message) {
          errorMsg = data.message
        } else if (res.status === 400) {
          errorMsg = 'Invalid request. Please check your question and try again.'
        } else if (res.status === 500) {
          errorMsg = 'Server error. Please try again in a moment.'
        } else if (res.status === 502) {
          errorMsg = 'AI service is temporarily unavailable. Please try again later.'
        } else if (res.status === 503) {
          errorMsg = 'Service is temporarily unavailable. Please try again in a moment.'
        } else {
          errorMsg = `Request failed (${res.status}). Please try again.`
        }
        
        throw new Error(errorMsg)
      }

      if (!data || typeof data !== 'object') {
        throw new Error('Received an invalid response. Please try again.')
      }

      const answerText = data.answer || ''
      if (!answerText.trim()) {
        throw new Error('Received an empty response. Please try asking your question again.')
      }
      
      setAnswer(answerText)
      
      // Save to recent questions
      const newQuestion = {
        question: query,
        answer: answerText,
        class: selectedClass,
        subject: selectedSubject,
        timestamp: Date.now()
      }
      const updated = [newQuestion, ...recentQuestions.filter(q => q.question !== query)].slice(0, 5)
      setRecentQuestions(updated)
      localStorage.setItem('thinkSync_recentQuestions', JSON.stringify(updated))
    } catch (err) {
      // Provide user-friendly error messages
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (err.message) {
        errorMessage = err.message
      } else if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.'
      } else if (err instanceof SyntaxError) {
        errorMessage = 'Invalid response received. Please try again.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  function handleQuickQuestion(type) {
    if (!query.trim()) {
      setQuery(QUICK_QUESTIONS[type])
    } else {
      setQuery(prev => `${prev} ${QUICK_QUESTIONS[type]}`)
    }
  }
  
  function handleCopyAnswer() {
    if (answer) {
      navigator.clipboard.writeText(answer)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  function handleLoadRecent(question) {
    setQuery(question.question)
    setAnswer(question.answer)
    if (question.class) setSelectedClass(question.class)
    if (question.subject) setSelectedSubject(question.subject)
  }
  
  function handleClearRecent() {
    setRecentQuestions([])
    localStorage.removeItem('thinkSync_recentQuestions')
  }

  function handleMic() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        setError('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.')
        return
      }
      
      const recog = new SpeechRecognition()
      recog.lang = 'en-US'
      recog.interimResults = false
      recog.maxAlternatives = 1
      setListening(true)
      setError('') // Clear any previous errors
      
      recog.onresult = (e) => {
        const transcript = e.results?.[0]?.[0]?.transcript || ''
        if (transcript.trim()) {
          setQuery((prev) => (prev ? prev + ' ' + transcript : transcript))
        }
        setListening(false)
      }
      
      recog.onerror = (e) => {
        setListening(false)
        let errorMessage = 'Voice recognition error occurred'
        
        switch (e.error) {
          case 'not-allowed':
          case 'PermissionDeniedError':
            errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings and try again.'
            break
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.'
            break
          case 'audio-capture':
            errorMessage = 'No microphone found. Please check your microphone connection.'
            break
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.'
            break
          case 'aborted':
            errorMessage = 'Voice recognition was interrupted.'
            break
          case 'service-not-allowed':
            errorMessage = 'Speech recognition service is not allowed. Please check your browser settings.'
            break
          default:
            errorMessage = `Voice recognition error: ${e.error || 'Unknown error'}. Please try again.`
        }
        
        setError(errorMessage)
      }
      
      recog.onend = () => {
        setListening(false)
      }
      
      recog.start()
    } catch (e) {
      setListening(false)
      setError('Unable to start voice input. Please check your browser permissions and try again.')
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Class and Subject Selectors */}
      {!propClassId && (
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-slate-700 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value)
                setSelectedSubject('')
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            >
              <option value="">Select Class</option>
              {classIds.map(id => (
                <option key={id} value={id}>Class {id}</option>
              ))}
            </select>
          </div>
          {selectedClass && availableSubjects.length > 0 && (
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-slate-700 mb-1">Subject (Optional)</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              >
                <option value="">All Subjects</option>
                {availableSubjects.map(subj => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      
      {/* Context Badge */}
      {(selectedClass || propClassId) && (
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.67-1.34l.041-.022ZM12 9a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 1.5 0v.5A.75.75 0 0 1 12 9Z" clipRule="evenodd" />
            </svg>
            {propClassId || selectedClass ? `Class ${propClassId || selectedClass}` : ''}
            {propSubject || selectedSubject ? ` • ${propSubject || selectedSubject}` : ''}
          </span>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(QUICK_QUESTIONS).map(type => (
          <button
            key={type}
            type="button"
            onClick={() => handleQuickQuestion(type)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 hover:bg-slate-50 hover:border-primary-300 transition"
          >
            {type}
          </button>
        ))}
      </div>

      {/* Recent Questions */}
      {recentQuestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-600">Recent Questions</p>
            <button
              type="button"
              onClick={handleClearRecent}
              className="text-xs text-slate-500 hover:text-slate-700 transition"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentQuestions.slice(0, 3).map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadRecent(q)}
                className="text-xs px-2 py-1 rounded border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-primary-300 transition truncate max-w-[200px]"
                title={q.question}
              >
                {q.question.length > 30 ? q.question.substring(0, 30) + '...' : q.question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleAsk} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-primary-500/40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-400">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.258 12.063l4.214 4.215a.75.75 0 1 0 1.06-1.061l-4.213-4.215A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            className="flex-1 outline-none text-slate-800 placeholder-slate-400"
            placeholder={selectedClass ? `Ask about ${selectedSubject || 'Class ' + selectedClass}...` : "Ask me anything… e.g., Explain Newton's Laws"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={handleMic} className={`p-2 rounded-lg hover:bg-slate-100 ${listening ? 'text-primary-700 animate-pulse' : 'text-slate-500'}`} title="Voice input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.25a3.75 3.75 0 0 0-3.75 3.75v6a3.75 3.75 0 1 0 7.5 0v-6A3.75 3.75 0 0 0 12 2.25Z" />
              <path d="M6.75 10.5a.75.75 0 0 0-1.5 0 6.75 6.75 0 0 0 6 6.708v2.292H7.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-3.75V17.208a6.75 6.75 0 0 0 6-6.708.75.75 0 0 0-1.5 0 5.25 5.25 0 1 1-10.5 0Z" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-white font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-4 w-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
              Thinking...
            </span>
          ) : (
            'Ask'
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setError('')}
            className="flex-shrink-0 text-red-700 hover:text-red-900 transition"
            aria-label="Dismiss error"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 min-h-[120px] relative">
        {answer ? (
          <>
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={handleCopyAnswer}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition"
                title="Copy answer"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="prose prose-slate max-w-none prose-p:my-3 prose-pre:my-3 pr-12">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {answer}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <p className="text-slate-500">Your AI-powered answer will appear here.</p>
        )}
      </div>
    </div>
  )
}
