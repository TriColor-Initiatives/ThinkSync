import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

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

    // Build context-aware system message
    let systemMessage = 'You are a warm, helpful, and engaging tutor who explains concepts clearly and in an age-appropriate manner.'
    
    if (grade) {
      systemMessage += ` The student is in Class ${grade}.`
      // Adjust explanation depth based on class level
      const classNum = parseInt(grade)
      if (classNum <= 8) {
        systemMessage += ' Use simple language, concrete examples, and avoid complex jargon. Make explanations fun and relatable.'
      } else if (classNum <= 10) {
        systemMessage += ' Use clear language with some technical terms where appropriate. Provide practical examples and real-world connections.'
      } else {
        systemMessage += ' You can use more advanced terminology and deeper explanations. Include analytical perspectives and detailed examples.'
      }
    }
    
    if (subject) {
      systemMessage += ` The question is related to ${subject}.`
      if (grade) {
        systemMessage += ` Tailor your explanation to Class ${grade} ${subject} curriculum level.`
      }
    }
    
    systemMessage += ' Always be encouraging, break down complex ideas into digestible parts, and use examples that students can relate to.'

    const body = {
      model: MODEL,
      messages: [
        { role: 'system', content: systemMessage },
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

