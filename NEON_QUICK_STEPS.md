# Neon Setup - Quick Steps (You're Signed In!)

Since you're already signed into Neon, follow these steps:

---

## Step 1: Get Your Connection String (2 minutes)

1. In your Neon dashboard, you should see your projects
2. **Click on your project** (or create a new one if needed)
3. Look for **"Connection Details"** or **"Connection String"** button
4. Click it - you'll see a connection string like:
   ```
   postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. **Click "Copy"** to copy the entire connection string

---

## Step 2: Create .env.local File (1 minute)

**In your terminal, run:**

```bash
cd /Users/ericmasmela/Documents/careconnect-24-7
```

Then create the file with your connection string:

```bash
# Replace the connection string below with YOUR actual connection string from Neon
echo 'DATABASE_URL=postgresql://username:password@hostname.neon.tech/dbname?sslmode=require' > .env.local
```

**Or use a text editor:**
1. Open the project in your editor
2. Create a new file called `.env.local` in the root directory
3. Paste this line (replace with your actual connection string):
   ```
   DATABASE_URL=your-connection-string-from-neon
   ```

---

## Step 3: Create Database Tables (2 minutes)

1. In Neon dashboard, click **"SQL Editor"** (usually in the left sidebar)
2. Open the file `lib/schema.sql` from this project
3. **Copy ALL the SQL code** from that file
4. **Paste it** into the Neon SQL Editor
5. Click **"Run"** or press `Ctrl+Enter` (or `Cmd+Enter` on Mac)
6. You should see "Success" or "Query executed successfully"

---

## Step 4: Test Connection (1 minute)

**In your terminal:**

```bash
cd /Users/ericmasmela/Documents/careconnect-24-7
npx tsx scripts/test-neon-connection.ts
```

You should see:
- ✅ Connection successful!
- ✅ All tables exist!

---

## Step 5: Test the App

```bash
npm run dev
```

Then:
1. Open `http://localhost:3001`
2. Try adding a medication or resident
3. Check Neon dashboard → "Tables" → see your data!

---

## 🎯 That's It!

Your app is now connected to Neon and will sync data across devices!

---

## 🐛 Troubleshooting

**Can't find Connection String?**
- Look for "Connection Details", "Connection String", or "Connect" button
- It might be in the project overview or settings

**SQL Editor not working?**
- Make sure you're in the correct project
- Try refreshing the page
- Check if you have permission to run SQL

**Connection test fails?**
- Double-check your connection string in `.env.local`
- Make sure there are no extra spaces
- Verify your Neon project is active (not paused)

---

*Follow these steps and you'll be connected in ~5 minutes!*



