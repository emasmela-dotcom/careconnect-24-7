# Fix Password Authentication Error

The connection failed because of a password issue. Let's fix it!

---

## Common Issues:

### 1. Password Has Special Characters

If your password has special characters (like `@`, `#`, `$`, `%`, etc.), they need to be **URL-encoded** in the connection string.

**Special characters that need encoding:**
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `/` becomes `%2F`
- `:` becomes `%3A`
- `?` becomes `%3F`
- `=` becomes `%3D`

### 2. Wrong Password

Double-check that you copied the password correctly from Neon.

### 3. Connection String Format

Make sure your `.env.local` looks like this (one line, no spaces):

```
DATABASE_URL=postgresql://neondb_owner:password@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## How to Fix:

### Option 1: Use Neon's "Copy snippet" Button

1. Go back to Neon dashboard
2. Click **"Connect"** button again
3. Make sure **"Show password"** is clicked (so you can see it)
4. Click **"Copy snippet"** - this copies the correctly formatted connection string
5. Paste it into `.env.local` (replace everything)
6. Save

### Option 2: URL-Encode Special Characters

If your password has special characters, you need to encode them. For example:
- Password: `mypass@123` → Use: `mypass%40123`
- Password: `test#pass` → Use: `test%23pass`

---

## Quick Test:

After updating, test again:

```bash
npx tsx scripts/test-neon-connection.ts
```

---

**Try using Neon's "Copy snippet" button - it formats everything correctly!**



