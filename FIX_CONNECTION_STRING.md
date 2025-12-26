# Fix Connection String Format

The connection string has extra text that needs to be removed!

---

## The Problem:

Neon's "Copy snippet" copied it like this:
```
psql 'postgresql://neondb_owner:password@host.neon.tech/neondb?sslmode=require&channel_binding=require'
```

But we need just the connection string part (without `psql '` and the trailing `'`).

---

## The Fix:

**In TextEdit:**

1. Your file probably looks like:
   ```
   DATABASE_URL=psql 'postgresql://neondb_owner:password@host.neon.tech/neondb?sslmode=require&channel_binding=require'
   ```

2. **Remove** `psql '` from the beginning
3. **Remove** the trailing `'` at the end

3. It should look like:
   ```
   DATABASE_URL=postgresql://neondb_owner:password@host.neon.tech/neondb?sslmode=require&channel_binding=require
   ```

4. **Save** the file

---

## Quick Fix:

**In TextEdit:**
- Find: `psql '` and delete it
- Find: `'` at the very end and delete it
- Make sure it starts with `DATABASE_URL=postgresql://`
- Save!

---

*Remove the `psql '` and trailing `'` - that's all!*

