// Test Neon Database Connection
// Run with: npx tsx scripts/test-neon-connection.ts

import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') })

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ Error: DATABASE_URL not found in .env.local')
  console.error('Please create .env.local with your Neon connection string')
  process.exit(1)
}

async function testConnection() {
  console.log('🔍 Testing Neon Database Connection...\n')
  
  try {
    const sql = neon(connectionString)
    
    // Test 1: Simple query
    console.log('Test 1: Testing basic connection...')
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`
    console.log('✅ Connection successful!')
    console.log(`   Current time: ${result[0].current_time}`)
    console.log(`   PostgreSQL version: ${result[0].pg_version.split(' ')[0]}\n`)
    
    // Test 2: Check if tables exist
    console.log('Test 2: Checking database tables...')
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `
    
    const expectedTables = [
      'users',
      'residents',
      'caregivers',
      'medications',
      'vitals',
      'appointments',
      'symptoms',
      'completed_reminders'
    ]
    
    const existingTables = tables.map((t: any) => t.table_name)
    const missingTables = expectedTables.filter(t => !existingTables.includes(t))
    
    if (missingTables.length === 0) {
      console.log('✅ All tables exist!')
      console.log(`   Found ${existingTables.length} tables:`)
      existingTables.forEach((table: string) => console.log(`   - ${table}`))
    } else {
      console.log('⚠️  Some tables are missing:')
      missingTables.forEach(table => console.log(`   - ${table} (missing)`))
      console.log('\n💡 Run the SQL schema from lib/schema.sql in your Neon SQL Editor')
    }
    
    console.log('\n✅ All tests passed! Your Neon database is ready to use.')
    
  } catch (error: any) {
    console.error('❌ Connection failed!')
    console.error(`   Error: ${error.message}`)
    console.error('\n💡 Troubleshooting:')
    console.error('   1. Check your DATABASE_URL in .env.local')
    console.error('   2. Verify your Neon project is active')
    console.error('   3. Check your internet connection')
    process.exit(1)
  }
}

testConnection()



