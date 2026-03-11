import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    return NextResponse.json({
      user: {
        phoneOrEmail: payload.phoneOrEmail,
        authType: payload.authType,
        profileId: payload.profileId ?? null,
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
