// Email Service
// Supports SendGrid, AWS SES, and other email providers

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send email using configured email service
 * Supports SendGrid, AWS SES, or SMTP
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const emailService = process.env.EMAIL_SERVICE || 'sendgrid' // 'sendgrid', 'ses', 'smtp'

  try {
    switch (emailService) {
      case 'sendgrid':
        return await sendWithSendGrid(options)
      case 'ses':
        return await sendWithSES(options)
      case 'smtp':
        return await sendWithSMTP(options)
      default:
        console.warn(`Email service ${emailService} not configured. Email not sent.`)
        // In development, log the email instead
        console.log('Email would be sent:', options)
        return true // Return true in dev mode
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

/**
 * Send email using SendGrid
 * Requires: SENDGRID_API_KEY environment variable
 */
async function sendWithSendGrid(options: EmailOptions): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.EMAIL_FROM || 'noreply@careconnect.local'

  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY not set. Email not sent.')
    console.error('   Check your .env.local file and restart the server.')
    return false
  }

  console.log('📧 Attempting to send email via SendGrid...')
  console.log('   To:', options.to)
  console.log('   From:', fromEmail)
  console.log('   Subject:', options.subject)

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: options.to }],
        }],
        from: {
          email: fromEmail,
          name: 'CareConnect 24/7',
        },
        subject: options.subject,
        content: [
          {
            type: 'text/html',
            value: options.html,
          },
          {
            type: 'text/plain',
            value: options.text || options.html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim(),
          },
        ],
      }),
    })

    if (response.ok) {
      console.log('✅ Email sent successfully via SendGrid')
      return true
    } else {
      const errorText = await response.text()
      let errorMessage = 'Unknown error'
      
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.errors?.[0]?.message || errorText
      } catch {
        errorMessage = errorText
      }
      
      console.error('❌ SendGrid API error:', response.status, response.statusText)
      console.error('   Error details:', errorMessage)
      
      // Provide specific guidance based on error
      if (response.status === 401) {
        console.error('   → Invalid API key. Check SENDGRID_API_KEY in .env.local')
      } else if (response.status === 403) {
        console.error('   → Sender email not verified. Go to SendGrid → Settings → Sender Authentication')
        console.error('   → Make sure EMAIL_FROM matches your verified sender email')
      } else if (response.status === 400) {
        console.error('   → Bad request. Check email format and SendGrid API requirements')
      }
      
      return false
    }
  } catch (error) {
    console.error('❌ SendGrid network error:', error)
    return false
  }
}

/**
 * Send email using AWS SES
 * Requires: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
 */
async function sendWithSES(options: EmailOptions): Promise<boolean> {
  // AWS SES implementation would go here
  // For now, return false (not implemented)
  console.warn('AWS SES not yet implemented')
  return false
}

/**
 * Send email using SMTP
 * Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
 */
async function sendWithSMTP(options: EmailOptions): Promise<boolean> {
  // SMTP implementation would go here
  // For now, return false (not implemented)
  console.warn('SMTP not yet implemented')
  return false
}

/**
 * Generate password reset email HTML
 */
export function generatePasswordResetEmail(resetLink: string, userName?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(to right, #3b82f6, #8b5cf6, #10b981); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">CareConnect 24/7</h1>
      </div>
      <div style="background: #ffffff; padding: 30px; border: 2px solid #3b82f6; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Reset Your Password</h2>
        ${userName ? `<p>Hi ${userName},</p>` : '<p>Hello,</p>'}
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="display: inline-block; background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; border: 4px solid #2563eb;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
        <p style="color: #3b82f6; font-size: 12px; word-break: break-all;">${resetLink}</p>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          <strong>This link will expire in 1 hour.</strong>
        </p>
        <p style="color: #666; font-size: 14px;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">
          © ${new Date().getFullYear()} CareConnect 24/7. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `
}


