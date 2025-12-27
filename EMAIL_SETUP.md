# Email Service Setup Guide

## 📧 Email Service Configuration

The app supports multiple email providers for sending password reset emails.

---

## 🔧 Setup Options

### Option 1: SendGrid (Recommended - Easy Setup)

1. **Create SendGrid Account:**
   - Go to https://sendgrid.com
   - Sign up for free account (100 emails/day free)
   - Verify your email

2. **Create API Key:**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name it "CareConnect Password Reset"
   - Give it "Full Access" or "Mail Send" permissions
   - Copy the API key (you'll only see it once!)

3. **Add to Environment Variables:**
   ```bash
   # .env.local
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=SG.your-api-key-here
   EMAIL_FROM=noreply@yourdomain.com
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```

4. **Verify Sender (Required):**
   - Go to Settings → Sender Authentication
   - Verify a Single Sender or Domain
   - Use verified email in `EMAIL_FROM`

---

### Option 2: AWS SES (For Production)

1. **Set up AWS SES:**
   - Go to AWS Console → SES
   - Verify your email address or domain
   - Get AWS credentials

2. **Add to Environment Variables:**
   ```bash
   # .env.local
   EMAIL_SERVICE=ses
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=us-east-1
   EMAIL_FROM=noreply@yourdomain.com
   ```

---

### Option 3: SMTP (Any Email Provider)

1. **Get SMTP Credentials:**
   - From your email provider (Gmail, Outlook, etc.)
   - Or use a service like Mailgun, Postmark, etc.

2. **Add to Environment Variables:**
   ```bash
   # .env.local
   EMAIL_SERVICE=smtp
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAIL_FROM=noreply@yourdomain.com
   ```

---

## 🗄️ Database Setup

### Run Migration

Run this SQL in your Neon database console:

```sql
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
```

Or use the migration file: `lib/migration-password-reset-tokens.sql`

---

## 🧪 Testing

### Test Without Email Service (Development)

In development, if no email service is configured:
- The system will log the email to console
- Reset tokens are still generated and stored
- You can manually copy the reset link from console logs

### Test With Email Service

1. **Set up SendGrid** (easiest for testing)
2. **Add environment variables** to `.env.local`
3. **Request password reset** from sign-in page
4. **Check your email** for reset link
5. **Click link** and reset password

---

## 📝 Environment Variables Summary

```bash
# Required for email sending
EMAIL_SERVICE=sendgrid  # or 'ses' or 'smtp'
EMAIL_FROM=noreply@yourdomain.com
NEXT_PUBLIC_APP_URL=http://localhost:3001  # or your production URL

# SendGrid
SENDGRID_API_KEY=SG.your-key-here

# AWS SES (if using SES)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1

# SMTP (if using SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

---

## 🔒 Security Notes

1. **Never commit API keys** to git
2. **Use environment variables** for all secrets
3. **Verify sender email** in SendGrid/SES
4. **Tokens expire in 1 hour** for security
5. **Tokens are single-use** (marked as used after reset)

---

## ✅ What's Working Now

- ✅ Password reset token generation
- ✅ Token storage in database
- ✅ Email sending (with SendGrid setup)
- ✅ Token validation and expiration
- ✅ Password reset functionality
- ✅ Token marked as used after reset

---

## 🚀 Quick Start (SendGrid)

1. Sign up at https://sendgrid.com
2. Create API key
3. Verify sender email
4. Add to `.env.local`:
   ```
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=your-key
   EMAIL_FROM=your-verified-email@domain.com
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```
5. Run database migration
6. Test password reset!

---

**Status:** ✅ Email service ready - just needs API keys configured!


