import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY
// Allow configuring the Perplexity model via PERPLEXITY_MODEL; keep older PPLX_MODEL env as fallback
const MODEL = process.env.PERPLEXITY_MODEL || process.env.PPLX_MODEL || 'sonar'

app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(PERPLEXITY_API_KEY), model: MODEL })
})

app.post('/api/ask', async (req, res) => {
  try {
    if (!PERPLEXITY_API_KEY) {
      return res.status(500).json({ error: 'Server misconfiguration: missing PERPLEXITY_API_KEY' })
    }

    const { question, subject, grade } = req.body || {}
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'Invalid request: "question" is required' })
    }

    const body = {
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful tutor. Explain clearly and concisely.' },
        { role: 'user', content: question },
      ],
      temperature: 0.2,
    }

    let r
    try {
      r = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        },
        body: JSON.stringify(body),
      })
    } catch (networkErr) {
      console.error('Fetch to Perplexity failed:', networkErr)
      return res.status(502).json({ error: `Network error to Perplexity: ${networkErr.message || 'unknown'}` })
    }

    const data = await r.json().catch(() => ({}))

    if (!r.ok) {
      const msg = data?.error?.message || r.statusText || 'Upstream error'
      return res.status(502).json({ error: `Perplexity error: ${msg}` })
    }

    const answer = data?.choices?.[0]?.message?.content || ''
    if (!answer) {
      return res.status(500).json({ error: 'Malformed response from Perplexity' })
    }

    res.json({ answer })
  } catch (err) {
    console.error('Ask API error:', err)
    const message = err?.message || 'Internal server error'
    res.status(500).json({ error: message })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
  console.log(`Using Perplexity model: ${MODEL}`)
})

