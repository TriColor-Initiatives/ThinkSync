import { spawn } from 'node:child_process'

function run(cmd, args, opts = {}) {
  const p = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts })
  p.on('exit', (code) => {
    if (code !== 0) process.exitCode = code
  })
  return p
}

// Start API server and Vite dev server in parallel
const api = run('node', ['server/index.js'])
const web = run('npm', ['run', 'dev:web'])

const shutdown = () => {
  try { api.kill('SIGTERM') } catch {}
  try { web.kill('SIGTERM') } catch {}
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

// Keep process alive while children run
;[api, web].forEach((p) => p.on('close', () => {}))

