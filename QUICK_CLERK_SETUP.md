# Quick Clerk Setup - Step by Step

## 🎯 What You Need (5 minutes)

### Step 1: Create Clerk Account
1. Go to **https://clerk.com**
2. Click **"Sign Up"** or **"Start building"**
3. Sign up with:
   - Email address
   - Password
   - Or use Google/GitHub (faster)

### Step 2: Create Application
1. After signing in, click **"Create Application"**
2. Name it: **"CareConnect 24/7"** (or any name)
3. Choose authentication methods:
   - ✅ **Email** (recommended - easiest)
   - ✅ **Google** (optional - nice to have)
   - Skip others for now
4. Click **"Create"**

### Step 3: Get Your API Keys
1. In Clerk Dashboard, you'll see:
   - **Publishable Key** (starts with `pk_test_...`)
   - **Secret Key** (starts with `sk_test_...`)
2. Click **"Copy"** next to each key

### Step 4: Add Keys to Your Project
1. Open `.env.local` in your project
2. Add these lines (replace with your actual keys):

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_key_here
```

3. Save the file

### Step 5: Restart Dev Server
```bash
# Stop the server (Ctrl+C if running)
npm run dev
```

### Step 6: Test It
1. Visit `http://localhost:3001`
2. Click **"Sign In"** button
3. Create an account or sign in
4. You're authenticated! 🎉

---

## 📝 Example `.env.local` File

```bash
# Database (you already have this)
DATABASE_URL=postgresql://neondb_owner:your-password@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Clerk Authentication (add these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_51AbC123...
CLERK_SECRET_KEY=sk_test_xyz789...
```

---

## ✅ That's It!

Once you add the keys and restart:
- ✅ Authentication will work
- ✅ Each user will have their own data
- ✅ Sign-in/sign-up pages will work
- ✅ All routes will be protected

---

## 🆘 Troubleshooting

**"Sign In button doesn't work"**
- Make sure you added both keys to `.env.local`
- Restart the dev server after adding keys

**"Can't see the keys in Clerk dashboard"**
- Look for "API Keys" section
- Or go to: Dashboard → Your App → API Keys

**"Still using default user"**
- Check that keys are in `.env.local` (not `.env`)
- Make sure keys start with `pk_test_` and `sk_test_`
- Restart dev server

---

*Takes about 5 minutes total!*



