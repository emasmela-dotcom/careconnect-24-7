# How to Get Your Neon Connection String

You need to replace `YOUR_CONNECTION_STRING` with your actual connection string from Neon.

---

## Step 1: Get Connection String from Neon

1. Go to **https://console.neon.tech**
2. Make sure you're signed in
3. Click on your **project** (or create one if you don't have one)
4. Look for one of these:
   - **"Connection Details"** button
   - **"Connection String"** button  
   - **"Connect"** button
   - A section showing connection info

5. You'll see a connection string that looks like:
   ```
   postgresql://username:password@ep-xxxxx-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

6. **Click "Copy"** to copy the entire string

---

## Step 2: Update .env.local

**Option A: Using Terminal**

```bash
cd /Users/ericmasmela/Documents/careconnect-24-7

# Replace YOUR_ACTUAL_CONNECTION_STRING with the one you copied from Neon
echo 'DATABASE_URL=YOUR_ACTUAL_CONNECTION_STRING' > .env.local
```

**Option B: Using Text Editor**

1. Open `.env.local` in your text editor
2. Replace `YOUR_CONNECTION_STRING` with your actual connection string
3. Save the file

**Example of what it should look like:**
```
DATABASE_URL=postgresql://myuser:mypassword@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Important:**
- No spaces around the `=`
- No quotes needed
- Keep it all on one line
- Use the EXACT string from Neon (don't modify it)

---

## Step 3: Verify It's Correct

Check your file:

```bash
cat .env.local
```

You should see:
```
DATABASE_URL=postgresql://something@something.neon.tech/something?sslmode=require
```

If you still see `YOUR_CONNECTION_STRING`, you need to replace it!

---

## Step 4: Test Again

```bash
npx tsx scripts/test-neon-connection.ts
```

Now it should work! ✅

---

*Get your connection string from Neon dashboard and replace the placeholder!*



