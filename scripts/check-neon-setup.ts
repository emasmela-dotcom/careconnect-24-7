// Check Neon Setup
// Run with: npx tsx scripts/check-neon-setup.ts

import * as dotenv from 'dotenv'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

console.log('🔍 Checking Neon Setup...\n')

// Check for .env.local
const envPath = join(process.cwd(), '.env.local')
if (existsSync(envPath)) {
  console.log('✅ Found .env.local file')
  
  const envContent = readFileSync(envPath, 'utf-8')
  if (envContent.includes('DATABASE_URL')) {
    console.log('✅ DATABASE_URL found in .env.local')
    
    // Load and check connection string
    dotenv.config({ path: envPath })
    const dbUrl = process.env.DATABASE_URL
    
    if (dbUrl) {
      console.log('✅ DATABASE_URL is set')
      
      // Check if it's a Neon URL
      if (dbUrl.includes('neon.tech') || dbUrl.includes('neon')) {
        console.log('✅ Connection string appears to be Neon')
        console.log(`   Host: ${dbUrl.match(/@([^/]+)/)?.[1] || 'unknown'}`)
      } else {
        console.log('⚠️  Connection string doesn\'t look like Neon')
      }
      
      // Mask password for display
      const masked = dbUrl.replace(/:([^:@]+)@/, ':****@')
      console.log(`   Connection: ${masked.substring(0, 50)}...`)
    } else {
      console.log('❌ DATABASE_URL is empty')
    }
  } else {
    console.log('❌ DATABASE_URL not found in .env.local')
    console.log('   Add: DATABASE_URL=postgresql://...')
  }
} else {
  console.log('❌ .env.local file not found')
  console.log('   Create it with: DATABASE_URL=your-neon-connection-string')
}

console.log('\n📋 Next Steps:')
console.log('1. Make sure .env.local has your Neon connection string')
console.log('2. Run: npx tsx scripts/test-neon-connection.ts')
console.log('3. If tables are missing, run lib/schema.sql in Neon SQL Editor')



