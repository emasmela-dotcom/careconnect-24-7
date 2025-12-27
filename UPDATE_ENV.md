# Update .env.local - Quick Command

**Run this command in your terminal** (replace with YOUR actual connection string from Neon):

```bash
echo 'DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' > .env.local
```

**Important:** Replace `YOUR_PASSWORD` with the actual password from Neon (click "Show password" in the modal to see it).

---

## Or Use Text Editor (Easier)

1. Open `.env.local` in your text editor
2. Replace the entire content with:
   ```
   DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-crimson-dew-a4x50rh1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
3. Replace `YOUR_PASSWORD` with the actual password
4. Save the file

---

## After Updating

Test the connection:
```bash
npx tsx scripts/test-neon-connection.ts
```



