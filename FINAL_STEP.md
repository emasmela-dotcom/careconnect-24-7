# Final Step - Add Your Password

You now have `.env.local` file created! You just need to add your actual password.

---

## What to Do:

1. **In Neon Dashboard:**
   - Click **"Show password"** (eye icon) in the connection modal
   - You'll see the full password

2. **Open `.env.local` in your text editor:**
   ```bash
   # In terminal:
   open -a "TextEdit" .env.local
   
   # Or use VS Code:
   code .env.local
   ```

3. **Replace `YOUR_PASSWORD` with your actual password:**
   
   **Before:**
   ```
   DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
   
   **After** (example):
   ```
   DATABASE_URL=postgresql://neondb_owner:abc123xyz456@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```

4. **Save the file**

5. **Test the connection:**
   ```bash
   npx tsx scripts/test-neon-connection.ts
   ```

---

## Quick Command (If you know the password):

```bash
# Replace YOUR_PASSWORD with actual password
sed -i '' 's/YOUR_PASSWORD/your-actual-password/g' .env.local
```

---

**Once you update the password, test it!** 🚀



