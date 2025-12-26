import { sql } from './db'
import { auth } from '@clerk/nextjs/server'

// Default user email for development (fallback if Clerk not configured)
const DEFAULT_USER_EMAIL = 'default@careconnect.local'

/**
 * Get or create the authenticated user and return their UUID
 * Uses Clerk authentication if available, falls back to default user for development
 */
export async function getDefaultUserId(): Promise<string> {
  try {
    // Try to get authenticated user from Clerk
    const { userId } = await auth()
    
    if (userId) {
      // User is authenticated - get or create user in database
      const existing = await sql`
        SELECT id::text as id
        FROM users
        WHERE id = ${userId}::uuid
        LIMIT 1
      `
      
      if (existing.length > 0) {
        return existing[0].id
      }
      
      // Create user record for authenticated Clerk user
      // Note: We'll need to get email/name from Clerk user object
      // For now, create with Clerk user ID
      const newUser = await sql`
        INSERT INTO users (id, email, name)
        VALUES (${userId}::uuid, ${`user-${userId}@careconnect.local`}, 'User')
        RETURNING id::text as id
      `
      
      return newUser[0].id
    }
    
    // Fallback: No authentication - use default user (development only)
    const existing = await sql`
      SELECT id::text as id
      FROM users
      WHERE email = ${DEFAULT_USER_EMAIL}
      LIMIT 1
    `
    
    if (existing.length > 0) {
      return existing[0].id
    }
    
    // Create default user if it doesn't exist
    const newUser = await sql`
      INSERT INTO users (email, name)
      VALUES (${DEFAULT_USER_EMAIL}, 'Default User')
      RETURNING id::text as id
    `
    
    return newUser[0].id
  } catch (error) {
    console.error('Error getting user ID:', error)
    throw error
  }
}

