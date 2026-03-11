import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { supabase } from "@/lib/supabase";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase не настроен" },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
    });

    if (error) {
      console.error("Supabase signUp error:", error);
      return NextResponse.json(
        { error: error.message || "Не удалось зарегистрировать пользователя" },
        { status: 400 }
      );
    }

    // Создание/поиск профиля в Supabase
    let profileId: string | null = null;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert(
        { phone_or_email: normalizedEmail },
        { onConflict: "phone_or_email" }
      )
      .select("id")
      .single();

    if (!profileError && profile?.id) {
      profileId = profile.id;
    } else if (profileError) {
      console.error("Supabase profile upsert error:", profileError);
    }

    const token = await new SignJWT({
      phoneOrEmail: normalizedEmail,
      authType: "email",
      profileId,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      user: { phoneOrEmail: normalizedEmail, authType: "email", profileId },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in register-password:", error);
    return NextResponse.json(
      { error: "Ошибка при регистрации" },
      { status: 500 }
    );
  }
}

