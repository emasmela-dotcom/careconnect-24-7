# Neon Database Setup Guide

This guide will help you set up the Neon database backend for CareConnect 24/7.

---

## 📋 Prerequisites

1. A Neon account (sign up at https://neon.tech)
2. Node.js and npm installed
3. Your CareConnect 24/7 project

---

## 🚀 Step-by-Step Setup

### Step 1: Create Neon Account & Database

1. Go to https://neon.tech and sign up (free tier available)
2. Create a new project
3. Choose a name for your project (e.g., "careconnect-24-7")
4. Select a region closest to you
5. Click "Create Project"

### Step 2: Get Connection String

1. In your Neon dashboard, go to your project
2. Click on "Connection Details" or "Connection String"
3. Copy the connection string (it looks like):
   ```
   postgresql://username:password@hostname.neon.tech/dbname?sslmode=require
   ```

### Step 3: Set Up Environment Variables

1. In your project root, create a `.env.local` file (if it doesn't exist)
2. Add your connection string:
   ```
   DATABASE_URL=postgresql://username:password@hostname.neon.tech/dbname?sslmode=require
   ```
3. **Important:** Never commit `.env.local` to git (it's already in `.gitignore`)

### Step 4: Create Database Tables

1. In your Neon dashboard, go to "SQL Editor"
2. Open the file `lib/schema.sql` from this project
3. Copy all the SQL code
4. Paste it into the Neon SQL Editor
5. Click "Run" to execute the SQL
6. You should see "Success" message

**Alternative:** You can also use the Neon CLI or connect via psql:
```bash
psql "your-connection-string" -f lib/schema.sql
```

### Step 5: Verify Installation

1. Start your development server:
   ```bash
   npm run dev
   ```
2. The app should work normally
3. Data will now be stored in Neon instead of localStorage

---

## 🔍 Verifying It Works

### Test the API

1. Open your browser's developer console
2. Navigate to `http://localhost:3001`
3. Try adding a medication or resident
4. Check the Network tab to see API calls
5. Check your Neon dashboard → "Tables" to see data

### Check Database

1. Go to Neon dashboard → "Tables"
2. You should see tables:
   - `users`
   - `residents`
   - `caregivers`
   - `medications`
   - `vitals`
   - `appointments`
   - `symptoms`
   - `completed_reminders`

---

## 🔄 Switching from localStorage to API

The project currently uses `DataContext` (localStorage). To switch to the API:

1. **Update `app/layout.tsx`:**
   ```typescript
   // Change from:
   import { DataProvider } from '@/components/DataContext'
   
   // To:
   import { DataProvider } from '@/components/DataContextAPI'
   ```

2. **The API context has the same interface**, so no other changes needed!

---

## 🐛 Troubleshooting

### Error: "DATABASE_URL environment variable is not set"

**Solution:** Make sure `.env.local` exists and has `DATABASE_URL` set

### Error: "Connection refused" or "Connection timeout"

**Solutions:**
- Check your connection string is correct
- Verify your Neon project is active (not paused)
- Check your internet connection
- Try regenerating the connection string in Neon dashboard

### Error: "relation does not exist"

**Solution:** Run the SQL schema file (`lib/schema.sql`) in your Neon database

### Data not appearing

**Solutions:**
- Check browser console for errors
- Verify API routes are working (check Network tab)
- Check Neon dashboard to see if data is being saved
- Make sure you're using `DataContextAPI` instead of `DataContext`

---

## 📊 Database Schema Overview

### Tables Created:

- **users** - User accounts (for future authentication)
- **residents** - User profiles
- **caregivers** - Care team members
- **medications** - Medication records
- **vitals** - Vital sign readings
- **appointments** - Doctor appointments
- **symptoms** - Symptom logs
- **completed_reminders** - Reminder completion tracking

### Indexes:

All tables have indexes on `user_id` for fast queries. Additional indexes on dates for sorting.

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It contains your database password
2. **Use environment variables** in production
3. **Connection strings** should use SSL (`sslmode=require`)
4. **User isolation** - All queries filter by `user_id` for security

---

## 🚀 Next Steps

After setup:

1. ✅ Test adding/editing/deleting data
2. ✅ Verify data persists across page refreshes
3. ✅ Check data appears in Neon dashboard
4. ✅ Test on multiple devices (data should sync!)

---

## 💡 Tips

- **Neon Free Tier:** Includes 0.5GB storage, perfect for development
- **Auto-scaling:** Neon handles connection pooling automatically
- **Backups:** Neon provides automatic backups
- **Monitoring:** Check Neon dashboard for query performance

---

## 📞 Need Help?

- Neon Documentation: https://neon.tech/docs
- Neon Discord: https://discord.gg/neon
- Check project issues or create a new one

---

*Last Updated: January 2025*

