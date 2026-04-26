#!/usr/bin/env node
/**
 * Fetches the GraphQL schema from Supabase pg_graphql via introspection
 * and writes it as SDL to schema.graphql for the Relay compiler.
 *
 * Usage: npm run fetch-schema
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

const fs = require('fs')
const path = require('path')
const { buildClientSchema, printSchema, getIntrospectionQuery } = require('graphql')

// Load .env.local manually — no dotenv dependency needed
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    process.env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim()
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    'Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local',
  )
  process.exit(1)
}

const GRAPHQL_ENDPOINT = `${SUPABASE_URL}/graphql/v1`

async function fetchSchema() {
  console.log(`Fetching schema from ${GRAPHQL_ENDPOINT} ...`)

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })

  if (!response.ok) {
    const text = await response.text()
    console.error(`HTTP error ${response.status}:`, text)
    process.exit(1)
  }

  const result = await response.json()

  if (result.errors) {
    console.error('GraphQL errors:', JSON.stringify(result.errors, null, 2))
    process.exit(1)
  }

  const schema = buildClientSchema(result.data)
  const sdl = printSchema(schema)

  const outputPath = path.join(__dirname, '..', 'schema.graphql')
  fs.writeFileSync(outputPath, sdl)
  console.log(`schema.graphql written (${sdl.length} chars)`)
  console.log('Run `npm run relay` to recompile Relay artifacts.')
}

fetchSchema().catch((err) => {
  console.error('Failed:', err.message)
  process.exit(1)
})
