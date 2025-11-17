import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

function buildStoryPrompt(userQuestion) {
  const trimmedQuestion = userQuestion.trim()
  return [
    'You are a warm, imaginative narrator who always answers by crafting a short, engaging story.',
    'Blend factual accuracy about the topic with vivid imagery, include a clear beginning, middle, and end,',
    'and close with a concise takeaway that reinforces the key idea for the learner.',
    `User question: ${trimmedQuestion}`,
  ].join(' ')
}

export default function AskAI() {
  const [query, setQuery] = React.useState('')
  const [answer, setAnswer] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [listening, setListening] = React.useState(false)

  async function handleAsk(e) {
    e.preventDefault()
    setError('')
    if (!query.trim()) return
    try {
      setLoading(true)
      setAnswer('')
      const storyPrompt = buildStoryPrompt(query)
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: storyPrompt, subject: null, grade: null }),
      })
      // Be resilient to empty/non-JSON responses (e.g., proxy/connect errors)
      const text = await res.text()
      let data
      try {
        data = text ? JSON.parse(text) : null
      } catch (_) {
        data = null
      }

      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || text || `Request failed (${res.status})`
        throw new Error(msg)
      }

      if (!data || typeof data !== 'object') {
        throw new Error('Empty response from server')
      }

      setAnswer(data.answer || '')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleMic() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        setError('Voice input not supported in this browser')
        return
      }
      const recog = new SpeechRecognition()
      recog.lang = 'en-US'
      recog.interimResults = false
      recog.maxAlternatives = 1
      setListening(true)
      recog.onresult = (e) => {
        const transcript = e.results?.[0]?.[0]?.transcript || ''
        setQuery((prev) => (prev ? prev + ' ' + transcript : transcript))
      }
      recog.onerror = (e) => {
        setError(e.error || 'Voice recognition error')
      }
      recog.onend = () => setListening(false)
      recog.start()
    } catch (e) {
      setListening(false)
      setError('Unable to start voice input')
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleAsk} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-primary-500/40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-400">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.258 12.063l4.214 4.215a.75.75 0 1 0 1.06-1.061l-4.213-4.215A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            className="flex-1 outline-none text-slate-800 placeholder-slate-400"
            placeholder="Ask me anything… e.g., Explain Newton’s Laws"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={handleMic} className={`p-2 rounded-lg hover:bg-slate-100 ${listening ? 'text-primary-700' : 'text-slate-500'}`} title="Voice input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.25a3.75 3.75 0 0 0-3.75 3.75v6a3.75 3.75 0 1 0 7.5 0v-6A3.75 3.75 0 0 0 12 2.25Z" />
              <path d="M6.75 10.5a.75.75 0 0 0-1.5 0 6.75 6.75 0 0 0 6 6.708v2.292H7.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-3.75V17.208a6.75 6.75 0 0 0 6-6.708.75.75 0 0 0-1.5 0 5.25 5.25 0 1 1-10.5 0Z" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
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
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 min-h-[120px]">
        {answer ? (
          <div className="prose prose-slate max-w-none prose-p:my-3 prose-pre:my-3">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {answer}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-slate-500">Your AI-powered answer will appear here.</p>
        )}
      </div>
    </div>
  )
}
