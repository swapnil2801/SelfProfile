// Vercel Serverless Function — POST /api/contact
import pkg from 'pg'
const { Pool } = pkg

let pool

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  }
  return pool
}

async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id           SERIAL PRIMARY KEY,
      name         VARCHAR(255) NOT NULL,
      email        VARCHAR(255) NOT NULL,
      subject      VARCHAR(255),
      message      TEXT NOT NULL,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Guard: DATABASE_URL must be set in Vercel environment variables
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set')
    return res.status(500).json({ error: 'Server misconfiguration: DATABASE_URL missing.' })
  }

  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' })
  }

  let client
  try {
    client = await getPool().connect()
    await ensureTable(client)
    await client.query(
      `INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)`,
      [name, email, subject || '', message]
    )
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('DB error:', err.message)
    return res.status(500).json({ error: 'Database error: ' + err.message })
  } finally {
    if (client) client.release()
  }
}
