# SendGrid API Key Setup - Step by Step

## 📧 How to Get Your SendGrid API Key

---

## Step 1: Sign Up for SendGrid

1. **Go to:** https://sendgrid.com
2. **Click** "Start for Free" or "Sign Up"
3. **Fill out the form:**
   - Email address
   - Password
   - Company name (optional)
4. **Verify your email** - Check your inbox and click the verification link

---

## Step 2: Complete Initial Setup

1. **Answer a few questions** (optional - you can skip)
2. **Choose a plan** - Select "Free" plan (100 emails/day)
3. **You'll be taken to the SendGrid dashboard**

---

## Step 3: Create API Key

1. **In SendGrid Dashboard:**
   - Click on your **profile/account menu** (top right)
   - Go to **Settings** → **API Keys**
   - OR click directly: https://app.sendgrid.com/settings/api_keys

2. **Create New API Key:**
   - Click the **"Create API Key"** button (top right)
   - **Name your key:** "CareConnect Password Reset" (or any name you like)
   - **Choose permissions:**
     - Select **"Full Access"** (easiest)
     - OR **"Restricted Access"** → Enable only "Mail Send" permission
   - Click **"Create & View"**

3. **Copy Your API Key:**
   - ⚠️ **IMPORTANT:** You'll see the API key ONCE
   - It starts with `SG.` followed by a long string
   - **Copy it immediately** - You won't be able to see it again!
   - Example: `SG.abc123xyz789...` (much longer in reality)

---

## Step 4: Verify Sender Email (Required)

Before you can send emails, you need to verify a sender:

1. **Go to:** Settings → **Sender Authentication**
2. **Click:** "Verify a Single Sender"
3. **Fill out the form:**
   - **From Email:** your-email@domain.com
   - **From Name:** CareConnect 24/7
   - **Reply To:** (same as from email)
   - **Company Address:** (your address)
   - **Website:** (your website URL)
4. **Click "Create"**
5. **Check your email** - SendGrid will send a verification email
6. **Click the verification link** in the email
7. **Status will change to "Verified"** ✅

---

## Step 5: Add API Key to Your Project

1. **Open your project's `.env.local` file**
   - Location: `/Users/ericmasmela/Documents/careconnect-24-7/.env.local`

2. **Add these lines:**
   ```bash
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=SG.your-actual-api-key-here
   EMAIL_FROM=your-verified-email@domain.com
   NEXT_PUBLIC_APP_URL=http://10.0.0.85:3001
   ```

3. **Replace:**
   - `SG.your-actual-api-key-here` with your actual API key from Step 3
   - `your-verified-email@domain.com` with the email you verified in Step 4
   - Keep `http://10.0.0.85:3001` or change to your production URL

4. **Save the file**

---

## Step 6: Restart Your Dev Server

After adding the API key, restart your Next.js server:

1. **Stop the current server** (Ctrl+C in terminal)
2. **Start it again:**
   ```bash
   npm run dev
   ```

---

## ✅ Test It

1. **Go to:** `http://10.0.0.85:3001/auth/signin`
2. **Click:** "Forgot Password?"
3. **Enter:** An email address that exists in your database
4. **Click:** "Send Reset Instructions"
5. **Check the email inbox** - You should receive a password reset email!

---

## 🔍 Where to Find Things in SendGrid

### Dashboard Navigation:
- **Settings** → **API Keys** - Create/manage API keys
- **Settings** → **Sender Authentication** - Verify email addresses
- **Activity** → **Email Activity** - See sent emails
- **Stats** → **Overview** - See email statistics

### API Key Location:
- Direct link: https://app.sendgrid.com/settings/api_keys
- Or: Dashboard → Settings (gear icon) → API Keys

---

## 🆘 Troubleshooting

### "API Key Invalid"
- Make sure you copied the ENTIRE key (it's very long)
- Check for extra spaces before/after the key
- Verify the key starts with `SG.`

### "Email Not Sending"
- Check that sender email is verified (Settings → Sender Authentication)
- Check SendGrid Activity page to see if email was attempted
- Check spam folder
- Verify `EMAIL_FROM` matches verified sender email

### "Can't Find API Keys"
- Make sure you're logged into SendGrid
- Go to: https://app.sendgrid.com/settings/api_keys
- If you don't see "Create API Key" button, you may need to verify your account first

---

## 📝 Quick Reference

**SendGrid Dashboard:** https://app.sendgrid.com  
**API Keys Page:** https://app.sendgrid.com/settings/api_keys  
**Sender Authentication:** https://app.sendgrid.com/settings/sender_auth  

**Free Plan Limits:**
- 100 emails per day
- Unlimited contacts
- Email API access
- Perfect for development/testing

---

## 🎯 Summary

1. ✅ Sign up at sendgrid.com
2. ✅ Verify your email
3. ✅ Create API key (Settings → API Keys)
4. ✅ Verify sender email (Settings → Sender Authentication)
5. ✅ Add to `.env.local` file
6. ✅ Restart dev server
7. ✅ Test password reset!

**That's it!** Your password reset emails will now be sent automatically. 🎉


