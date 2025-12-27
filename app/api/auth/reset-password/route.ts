import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
// Note: Install bcryptjs: npm install bcryptjs @types/bcryptjs
// For now using simple storage - should hash passwords in production

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    try {
      // Decode token to get user ID and reset token
      const decoded = Buffer.from(token, 'base64').toString('utf-8')
      const [userId, resetToken, expiresAtStr] = decoded.split(':')
      
      if (!userId || !resetToken) {
        throw new Error('Invalid token format')
      }

      // Try to find token in database first (preferred method)
      let tokenRecord
      try {
        const tokens = await sql`
          SELECT user_id, expires_at, used
          FROM password_reset_tokens
          WHERE token = ${resetToken}
          AND expires_at > CURRENT_TIMESTAMP
          AND used = FALSE
          LIMIT 1
        `

        if (tokens.length > 0) {
          tokenRecord = tokens[0]
          // Verify user ID matches
          if (tokenRecord.user_id.toString() !== userId) {
            return NextResponse.json(
              { error: 'Invalid reset token' },
              { status: 400 }
            )
          }
        }
      } catch (dbError: any) {
        // If table doesn't exist, fall back to timestamp-based validation
        if (dbError.message?.includes('password_reset_tokens')) {
          console.warn('password_reset_tokens table missing. Using fallback validation.')
          // Fall through to timestamp validation
        } else {
          throw dbError
        }
      }

      // If no database record, validate using timestamp (fallback)
      if (!tokenRecord) {
        const expiresAt = parseInt(expiresAtStr)
        const now = Date.now()
        if (isNaN(expiresAt) || now > expiresAt) {
          return NextResponse.json(
            { error: 'Reset token has expired. Please request a new one.' },
            { status: 400 }
          )
        }
      }

      // Hash password (TODO: Use bcryptjs in production)
      const hashedPassword = password // TODO: await bcrypt.hash(password, 10)

      // Update user's password
      const result = await sql`
        UPDATE users
        SET password_hash = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${userId}::uuid
        RETURNING id, email, name
      `

      if (result.length === 0) {
        return NextResponse.json(
          { error: 'Invalid or expired reset token' },
          { status: 400 }
        )
      }

      // Mark token as used (if table exists)
      try {
        await sql`
          UPDATE password_reset_tokens
          SET used = TRUE
          WHERE token = ${resetToken}
        `
      } catch {
        // Table might not exist, ignore
      }

      return NextResponse.json({
        message: 'Password reset successfully',
      })
    } catch (decodeError) {
      console.error('Token decode error:', decodeError)
      return NextResponse.json(
        { error: 'Invalid reset token' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in POST /api/auth/reset-password:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}

