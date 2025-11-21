import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * POST /api/auth/session
 * Creates a secure httpOnly session cookie after Firebase authentication
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, name } = body;

    // Validate required fields
    if (!uid || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: uid and email' },
        { status: 400 }
      );
    }

    const userData = { uid, email, name };
    const cookieStore = await cookies();

    // Set httpOnly secure cookie
    cookieStore.set('user', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/session
 * Removes the session cookie (logout)
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('user');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/session
 * Retrieves the current session data
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return NextResponse.json({ user: null });
    }

    const userData = JSON.parse(userCookie.value);
    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
