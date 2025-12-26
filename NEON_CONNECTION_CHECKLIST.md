# Neon Connection Checklist

Use this to verify your Neon setup:

---

## ✅ Pre-Setup Checklist

- [ ] I have a Neon account
- [ ] I have a Neon project/database
- [ ] I know where to find my connection string

---

## ✅ Setup Steps

- [ ] Created `.env.local` file in project root
- [ ] Added `DATABASE_URL=...` to `.env.local`
- [ ] Verified connection string is correct
- [ ] Checked Neon dashboard for active project

---

## ✅ Database Tables

Check if these tables exist in your Neon database:

- [ ] `users`
- [ ] `residents`
- [ ] `caregivers`
- [ ] `medications`
- [ ] `vitals`
- [ ] `appointments`
- [ ] `symptoms`
- [ ] `completed_reminders`

**If any are missing:** Run `lib/schema.sql` in Neon SQL Editor

---

## ✅ Testing

- [ ] Started dev server: `npm run dev`
- [ ] Opened `http://localhost:3001`
- [ ] Tried adding a medication/resident
- [ ] Checked browser console for errors
- [ ] Verified data appears in Neon dashboard

---

## ✅ Optional: Switch to API

- [ ] Updated `app/layout.tsx` to use `DataContextAPI`
- [ ] Verified app still works
- [ ] Confirmed data saves to Neon (not localStorage)

---

## 🎯 Quick Commands

**Check if .env.local exists:**
```bash
ls -la .env.local
```

**View connection string (masked):**
```bash
grep DATABASE_URL .env.local | sed 's/:[^:@]*@/:****@/'
```

**Test connection (after installing tsx):**
```bash
npm install -D tsx
npx tsx scripts/test-neon-connection.ts
```

---

*Check off items as you complete them!*

