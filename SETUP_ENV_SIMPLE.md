# Simple .env.local Setup

You're in the right directory! Now create your `.env.local` file.

---

## Option 1: Using Text Editor (Easiest)

1. **Open your text editor** (VS Code, TextEdit, etc.)
2. **Create a new file** called `.env.local` in the project root
3. **Paste this line** (replace `YOUR_PASSWORD` with the actual password from Neon):

```
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

4. **Save the file**

---

## Option 2: Using Terminal

**In Neon dashboard:**
1. Click "Show password" to see the full password
2. Click "Copy snippet" to copy the entire connection string

**Then in terminal, run:**
```bash
# Replace everything after DATABASE_URL= with your copied connection string
echo 'DATABASE_URL=YOUR_COPIED_CONNECTION_STRING_HERE' > .env.local
```

**Example** (with actual values):
```bash
echo 'DATABASE_URL=postgresql://neondb_owner:abc123xyz@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' > .env.local
```

---

## Verify It Worked

```bash
# Check if file was created
ls -la .env.local

# Test the connection
npx tsx scripts/test-neon-connection.ts
```

---

**The easiest way is using a text editor!** Just create `.env.local` and paste your connection string.



