import { sql } from './db'
import { NextRequest } from 'next/server'

// Default user email for development (fallback)
const DEFAULT_USER_EMAIL = 'default@careconnect.local'

/**
 * Get the authenticated user ID from request
 * Checks localStorage token or falls back to default user
 */
export async function getUserId(request?: NextRequest): Promise<string> {
  try {
    // Try to get user from request headers (if available)
    if (request) {
      const authHeader = request.headers.get('authorization')
      if (authHeader) {
        // Parse token (simple implementation)
        try {
          const token = authHeader.replace('Bearer ', '')
          const decoded = Buffer.from(token, 'base64').toString('utf-8')
          const [userId] = decoded.split(':')
          if (userId) {
            return userId
          }
        } catch {
          // Invalid token, continue to fallback
        }
      }
    }

    // Fallback: Get or create default user
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

/**
 * Get or create the default user and return their UUID
 * @deprecated Use getUserId() instead
 */
export async function getDefaultUserId(): Promise<string> {
  return getUserId()
}

