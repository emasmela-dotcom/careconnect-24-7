# Paste Your Connection String

You have the connection string copied! Now paste it into `.env.local`.

---

## Quick Method: Using Terminal

**Run this command** (it will prompt you to paste):

```bash
cd /Users/ericmasmela/Documents/careconnect-24-7
echo 'DATABASE_URL=' > .env.local
```

Then paste your connection string after `DATABASE_URL=` in the file.

---

## Easier Method: Using Text Editor

1. **Open the file:**
   ```bash
   open -a "TextEdit" .env.local
   ```
   
   Or use VS Code:
   ```bash
   code .env.local
   ```

2. **Replace the entire content** with:
   ```
   DATABASE_URL=your-pasted-connection-string-here
   ```
   
   (Paste your connection string after the `=` sign)

3. **Save the file**

---

## Or Use This Command (One Line)

**Paste your connection string and run:**

```bash
echo 'DATABASE_URL=YOUR_PASTED_CONNECTION_STRING' > .env.local
```

Replace `YOUR_PASTED_CONNECTION_STRING` with what you copied from Neon.

---

## After Pasting, Test It:

```bash
npx tsx scripts/test-neon-connection.ts
```

---

**The easiest way: Open .env.local in a text editor and paste your connection string!**



