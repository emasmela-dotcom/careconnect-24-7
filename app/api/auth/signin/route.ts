import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
// Note: Install bcryptjs: npm install bcryptjs @types/bcryptjs
// For now using simple comparison - should hash passwords in production

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const users = await sql`
      SELECT id, email, name, password_hash
      FROM users
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const user = users[0]

    // Check password
    if (!user.password_hash) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Compare password (TODO: Use bcryptjs in production)
    const isValid = password === user.password_hash // TODO: await bcrypt.compare(password, user.password_hash)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    console.error('Error in POST /api/auth/signin:', error)
    return NextResponse.json(
      { error: 'Failed to sign in' },
      { status: 500 }
    )
  }
}

