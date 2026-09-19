import { createServer } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import { handle } from './src/handler.js'

if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (match) {
      process.env[match[1]] ??= match[2].trim()
    }
  }
}

const PORT = process.env.PORT ?? 8787

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

createServer(async (req, res) => {
  const url = `http://localhost:${PORT}${req.url}`
  const body = req.method === 'POST' ? await readBody(req) : undefined

  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body,
  })

  const response = await handle(request)

  res.writeHead(
    response.status,
    Object.fromEntries(response.headers.entries())
  )
  res.end(await response.text())
}).listen(PORT, () => {
  console.log(`backend dev server listening on http://localhost:${PORT}`)
})
