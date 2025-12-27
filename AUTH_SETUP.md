# Authentication Setup

## ✅ What's Been Created

1. **Sign In Page** - `/auth/signin`
2. **Sign Up Page** - `/auth/signup`
3. **API Routes** - `/api/auth/signin` and `/api/auth/signup`
4. **Navigation** - Shows Sign In/Sign Out buttons
5. **Database Schema** - Updated to include `password_hash` column

---

## 📋 Setup Steps

### 1. Update Database Schema

Run this SQL in your Neon database console:

```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;
```

Or run the migration file:
- `lib/migration-add-password.sql`

### 2. Install Required Packages

```bash
npm install bcryptjs @types/bcryptjs
```

**Note:** The auth system currently works without bcryptjs, but passwords are stored in plain text (NOT SECURE for production). Install bcryptjs and update the auth routes to hash passwords.

### 3. Update Auth Routes (After Installing bcryptjs)

In `app/api/auth/signup/route.ts`:
- Uncomment: `const hashedPassword = await bcrypt.hash(password, 10)`
- Remove: `const hashedPassword = password`

In `app/api/auth/signin/route.ts`:
- Uncomment: `const isValid = await bcrypt.compare(password, user.password_hash)`
- Remove: `const isValid = password === user.password_hash`

---

## 🧪 Testing

1. **Create Account:**
   - Go to `/auth/signup`
   - Fill in name, email, password
   - Click "Create Account"
   - Should redirect to dashboard

2. **Sign In:**
   - Go to `/auth/signin`
   - Enter email and password
   - Click "Sign In"
   - Should redirect to dashboard

3. **Sign Out:**
   - Click "Sign Out" in navigation
   - Should redirect to sign in page

---

## 🔒 Security Notes

**Current Implementation:**
- ⚠️ Passwords stored in plain text (NOT SECURE)
- ✅ User sessions stored in localStorage
- ✅ Basic email validation
- ✅ Password length validation (min 6 characters)

**For Production:**
- ✅ Install bcryptjs and hash passwords
- ✅ Use JWT tokens instead of simple base64
- ✅ Add HTTPS
- ✅ Add rate limiting
- ✅ Add password reset functionality
- ✅ Add email verification

---

## 📝 How It Works

1. **Sign Up:**
   - User creates account → Password stored in database
   - User object + token stored in localStorage
   - Redirects to dashboard

2. **Sign In:**
   - User enters credentials → Validated against database
   - User object + token stored in localStorage
   - Redirects to dashboard

3. **Session:**
   - User data stored in `localStorage.getItem('careconnect-user')`
   - Token stored in `localStorage.getItem('careconnect-token')`
   - Navigation checks localStorage to show Sign In/Out

4. **API Routes:**
   - Currently use `getDefaultUserId()` (fallback)
   - Should be updated to read token from request headers
   - Filter data by authenticated user ID

---

## 🎯 Next Steps

1. ✅ Run database migration
2. ✅ Install bcryptjs
3. ✅ Update auth routes to hash passwords
4. ⏳ Update API routes to use authenticated user ID
5. ⏳ Add password reset functionality
6. ⏳ Add email verification

---

**Status:** ✅ Basic authentication system ready - needs bcryptjs for production security


