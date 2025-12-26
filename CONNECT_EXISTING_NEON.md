# Connect Existing Neon Database

Since you already have Neon set up, let's connect this project to it!

---

## ✅ Quick Connection Steps

### Step 1: Get Your Connection String

1. Go to your **Neon dashboard**: https://console.neon.tech
2. Select your existing project
3. Click **"Connection Details"** or **"Connection String"**
4. Copy the connection string

### Step 2: Create .env.local

In your project root, create `.env.local`:

```bash
# Create the file
touch .env.local
```

Then add your connection string:
```
DATABASE_URL=postgresql://username:password@hostname.neon.tech/dbname?sslmode=require
```

**Replace with your actual connection string from Neon dashboard**

### Step 3: Check if Tables Exist

1. Go to Neon dashboard → **"SQL Editor"**
2. Run this query to check existing tables:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```

### Step 4: Create Tables (If Needed)

If you don't see these tables, you need to create them:

- `users`
- `residents`
- `caregivers`
- `medications`
- `vitals`
- `appointments`
- `symptoms`
- `completed_reminders`

**To create tables:**
1. Open `lib/schema.sql` from this project
2. Copy all the SQL
3. Paste into Neon SQL Editor
4. Click "Run"

**Note:** The schema uses `CREATE TABLE IF NOT EXISTS`, so it's safe to run even if some tables exist.

### Step 5: Test Connection

After creating `.env.local`, test the connection:

```bash
npm run dev
```

Then:
1. Open `http://localhost:3001`
2. Try adding a medication or resident
3. Check Neon dashboard → "Tables" → see your data!

---

## 🔍 Verify Setup

### Check .env.local exists:
```bash
ls -la .env.local
```

### Check DATABASE_URL is set:
```bash
grep DATABASE_URL .env.local
```

### Test in browser:
1. Open browser console (F12)
2. Go to Network tab
3. Try adding data
4. Look for API calls to `/api/residents`, `/api/medications`, etc.

---

## 🚀 Switch to API (Optional)

Once connected, you can switch from localStorage to API:

**In `app/layout.tsx`, change:**
```typescript
// From:
import { DataProvider } from '@/components/DataContext'

// To:
import { DataProvider } from '@/components/DataContextAPI'
```

This will make the app use Neon instead of localStorage.

---

## ✅ You're Done!

Your app is now connected to your existing Neon database!

### What Works:
- ✅ Data stored in Neon
- ✅ Syncs across devices
- ✅ No localStorage limits
- ✅ Data persists

---

## 🐛 Troubleshooting

**"DATABASE_URL not found"**
- Make sure `.env.local` exists in project root
- Check it has `DATABASE_URL=...` (no spaces)

**"Connection refused"**
- Verify connection string is correct
- Check Neon project is active
- Try regenerating connection string

**"Tables missing"**
- Run `lib/schema.sql` in Neon SQL Editor
- Check for any SQL errors

---

*Ready to connect! Just add your connection string to .env.local*

