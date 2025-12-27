import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import crypto from 'crypto'
import { sendEmail, generatePasswordResetEmail } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const users = await sql`
      SELECT id, email, name FROM users WHERE email = ${email}
    `

    // Always return success (security best practice - don't reveal if email exists)
    let resetLink: string | null = null
    
    if (users.length > 0) {
      const user = users[0]
      
      // Generate secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1) // Token expires in 1 hour

      // Store reset token in database
      try {
        await sql`
          INSERT INTO password_reset_tokens (user_id, token, expires_at)
          VALUES (${user.id}::uuid, ${resetToken}, ${expiresAt})
        `
      } catch (dbError: any) {
        // If table doesn't exist, log error but continue
        if (dbError.message?.includes('password_reset_tokens')) {
          console.error('password_reset_tokens table missing. Run migration to create it.')
        } else {
          throw dbError
        }
      }

      // Generate reset link
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                     process.env.VERCEL_URL || 
                     'http://localhost:3001'
      resetLink = `${baseUrl}/auth/reset-password?token=${Buffer.from(`${user.id}:${resetToken}:${expiresAt.getTime()}`).toString('base64')}`

      // Send email with reset link
      console.log('\n' + '='.repeat(60))
      console.log('📧 PASSWORD RESET REQUEST')
      console.log('='.repeat(60))
      console.log('Email:', user.email)
      console.log('Reset Link:', resetLink)
      console.log('='.repeat(60) + '\n')
      
      // Try to send email
      const emailSent = await sendEmail({
        to: user.email,
        subject: 'Reset Your CareConnect 24/7 Password',
        html: generatePasswordResetEmail(resetLink, user.name || undefined),
        text: `Reset your password by clicking this link: ${resetLink}\n\nThis link expires in 1 hour.`,
      })

      if (!emailSent) {
        console.error('❌ Email sending failed, but reset link is shown above')
        console.error('   ⚠️  COPY THE LINK ABOVE AND PASTE IT IN YOUR BROWSER')
        console.error('   Or check your spam folder - email might still arrive')
      } else {
        console.log('✅ Password reset email sent successfully!')
        console.log('   Check your inbox (and spam folder) at:', user.email)
      }
    }

    // Always return success (don't reveal if email exists)
    const response: any = {
      message: 'If an account exists with this email, password reset instructions have been sent.',
    }
    
    // In development, always include the reset link so user can use it if email fails
    if (resetLink && process.env.NODE_ENV === 'development') {
      response.debugLink = resetLink
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in POST /api/auth/forgot-password:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

