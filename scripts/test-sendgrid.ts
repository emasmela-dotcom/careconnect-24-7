// Test SendGrid email sending
import 'dotenv/config'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@careconnect.local'
const TEST_EMAIL = process.env.TEST_EMAIL || 'emasmela1976@gmail.com'

console.log('🧪 Testing SendGrid Configuration...\n')
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE)
console.log('EMAIL_FROM:', EMAIL_FROM)
console.log('SENDGRID_API_KEY:', SENDGRID_API_KEY ? `${SENDGRID_API_KEY.substring(0, 10)}...` : 'NOT SET')
console.log('TEST_EMAIL:', TEST_EMAIL)
console.log('')

if (!SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY is not set in .env.local')
  console.error('   Make sure you:')
  console.error('   1. Added SENDGRID_API_KEY to .env.local')
  console.error('   2. Restarted your dev server')
  process.exit(1)
}

console.log('📧 Sending test email...\n')

try {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: TEST_EMAIL }],
      }],
      from: {
        email: EMAIL_FROM,
        name: 'CareConnect 24/7 Test',
      },
      subject: 'Test Email from CareConnect 24/7',
      content: [
        {
          type: 'text/html',
          value: '<h1>Test Email</h1><p>If you received this, SendGrid is working!</p>',
        },
        {
          type: 'text/plain',
          value: 'Test Email - If you received this, SendGrid is working!',
        },
      ],
    }),
  })

  if (response.ok) {
    console.log('✅ Test email sent successfully!')
    console.log(`   Check your inbox at: ${TEST_EMAIL}`)
    console.log('   (Also check spam/junk folder)')
  } else {
    const errorText = await response.text()
    console.error('❌ SendGrid API Error:')
    console.error('   Status:', response.status, response.statusText)
    console.error('   Response:', errorText)
    
    if (response.status === 401) {
      console.error('\n   This usually means:')
      console.error('   - Invalid API key')
      console.error('   - API key doesn\'t have permission to send emails')
    } else if (response.status === 403) {
      console.error('\n   This usually means:')
      console.error('   - Sender email not verified in SendGrid')
      console.error('   - Check your SendGrid dashboard → Sender Authentication')
    }
  }
} catch (error: any) {
  console.error('❌ Network Error:', error.message)
}

