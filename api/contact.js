// Vercel Serverless Function — POST /api/contact
// Saves contact form submissions to PostgreSQL
//
// Setup on Vercel:
//   Dashboard → Your Project → Settings → Environment Variables
//   Add:  DATABASE_URL = your_postgres_connection_string

import { Pool } from 'pg'

let pool

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for most hosted Postgres (Supabase, Neon, Railway etc.)
    })
  }
  return pool
}

// Creates the table on first run if it doesn't exist yet
async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(255) NOT NULL,
      email       VARCHAR(255) NOT NULL,
      subject     VARCHAR(255),
      message     TEXT NOT NULL,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // CORS headers (for local dev)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  const { name, email, subject, message } = req.body

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' })
  }

  const client = await getPool().connect()
  try {
    await ensureTable(client)

    await client.query(
      `INSERT INTO contact_submissions (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject || '', message]
    )

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('DB error:', err)
    return res.status(500).json({ error: 'Failed to save. Please try again.' })
  } finally {
    client.release()
  }
}
