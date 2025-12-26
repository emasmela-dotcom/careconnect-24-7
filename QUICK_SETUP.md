# 🚀 Quick Neon Setup - 5 Minutes

Follow these steps to get your Neon database running:

---

## Step 1: Create Neon Account (2 minutes)

1. Go to **https://neon.tech**
2. Click **"Sign Up"** (free tier available)
3. Create a new project:
   - Name: `careconnect-24-7`
   - Region: Choose closest to you
   - Click **"Create Project"**

---

## Step 2: Get Connection String (1 minute)

1. In your Neon dashboard, find **"Connection Details"** or **"Connection String"**
2. Click **"Copy"** to copy the connection string
   - It looks like: `postgresql://user:pass@host.neon.tech/dbname?sslmode=require`

---

## Step 3: Create .env.local File (30 seconds)

**Option A: Use the setup script**
```bash
chmod +x setup-neon.sh
./setup-neon.sh
```

**Option B: Manual**
1. Create `.env.local` in project root
2. Add this line (replace with your connection string):
   ```
   DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require
   ```

---

## Step 4: Create Database Tables (1 minute)

1. In Neon dashboard, click **"SQL Editor"**
2. Open `lib/schema.sql` from this project
3. **Copy ALL the SQL code**
4. **Paste** into Neon SQL Editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see **"Success"** message

---

## Step 5: Test Connection (30 seconds)

**Option A: Use test script**
```bash
npm install -D tsx
npx tsx scripts/test-neon-connection.ts
```

**Option B: Manual test**
1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:3001`
3. Try adding a medication or resident
4. Check Neon dashboard → "Tables" → see your data!

---

## ✅ You're Done!

Your app now uses Neon database instead of localStorage!

### What Changed:
- ✅ Data stored in Neon (cloud database)
- ✅ Syncs across devices automatically
- ✅ No localStorage limits
- ✅ Data persists forever

### Next Steps:
- Switch to API context (optional): Update `app/layout.tsx` to use `DataContextAPI`
- Test adding/editing/deleting data
- Check Neon dashboard to see your data

---

## 🐛 Troubleshooting

**"DATABASE_URL not found"**
- Make sure `.env.local` exists in project root
- Check the file has `DATABASE_URL=...` (no spaces around `=`)

**"Connection refused"**
- Verify connection string is correct
- Check Neon project is active (not paused)
- Try regenerating connection string in Neon

**"relation does not exist"**
- Run the SQL schema (`lib/schema.sql`) in Neon SQL Editor
- Make sure all tables were created

**"Tables missing"**
- Run the test script: `npx tsx scripts/test-neon-connection.ts`
- It will tell you which tables are missing

---

## 📞 Need Help?

- Check `NEON_SETUP_GUIDE.md` for detailed instructions
- Neon Docs: https://neon.tech/docs
- Neon Discord: https://discord.gg/neon

---

*Setup time: ~5 minutes*  
*Difficulty: Easy*

