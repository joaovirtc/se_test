import { NextResponse } from 'next/server';

const VALID_TOKENS = [
  process.env.FULL_ACCESS_TOKEN_USD24K,
  process.env.FULL_ACCESS_TOKEN_FOR_PRESIDENT_USD24K,
].filter(Boolean);

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid payload' },
        { status: 400 }
      );
    }

    if (!VALID_TOKENS.includes(token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
