# Create .env.local File

You need to create a `.env.local` file with your Neon connection string.

---

## Quick Steps

### Option 1: Using Terminal

1. **Navigate to project directory:**
   ```bash
   cd /Users/ericmasmela/Documents/careconnect-24-7
   ```

2. **Create the file:**
   ```bash
   touch .env.local
   ```

3. **Add your connection string:**
   ```bash
   echo 'DATABASE_URL=your-connection-string-here' > .env.local
   ```
   
   **Replace `your-connection-string-here` with your actual Neon connection string**

### Option 2: Using Text Editor

1. Open your project in a text editor
2. Create a new file called `.env.local` in the root directory
3. Add this line (replace with your actual connection string):
   ```
   DATABASE_URL=postgresql://username:password@hostname.neon.tech/dbname?sslmode=require
   ```

---

## Get Your Connection String

1. Go to **Neon Dashboard**: https://console.neon.tech
2. Select your project
3. Click **"Connection Details"** or **"Connection String"**
4. Copy the connection string
5. Paste it into `.env.local` after `DATABASE_URL=`

---

## Example .env.local

```
DATABASE_URL=postgresql://myuser:mypassword@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Important:** 
- No spaces around the `=`
- No quotes needed
- Keep it on one line

---

## Verify It Works

After creating `.env.local`, test it:

```bash
cd /Users/ericmasmela/Documents/careconnect-24-7
npx tsx scripts/test-neon-connection.ts
```

You should see:
- ✅ Connection successful
- ✅ Tables checked

---

*Once you create .env.local with your connection string, the app will connect to Neon!*

