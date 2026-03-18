import { NextRequest, NextResponse } from "next/server";
import { getAuthType, normalizePhone } from "@/lib/auth";
import { getStoredCode, deleteStoredCode } from "@/lib/codes";
import { SignJWT } from "jose";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function POST(request: NextRequest) {
  try {
    const { phoneOrEmail, code } = await request.json();

    if (!phoneOrEmail || !code) {
      return NextResponse.json(
        { error: "Телефон/email и код обязательны" },
        { status: 400 }
      );
    }

    const authType = getAuthType(phoneOrEmail);
    const normalized = authType === "phone" ? normalizePhone(phoneOrEmail) : phoneOrEmail.toLowerCase();

    // Проверка кода
    const stored = getStoredCode(phoneOrEmail, authType);
    
    if (!stored) {
      return NextResponse.json(
        { error: "Код не найден или истек. Запросите новый код." },
        { status: 400 }
      );
    }

    if (stored.code !== code) {
      return NextResponse.json(
        { error: "Неверный код" },
        { status: 400 }
      );
    }

    // Удаление использованного кода
    deleteStoredCode(phoneOrEmail, authType);

    // Создание/поиск профиля в Supabase
    let profileId: string | null = null;
    if (supabase) {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          { phone_or_email: normalized },
          { onConflict: "phone_or_email" }
        )
        .select("id")
        .single();

      if (!error && data?.id) {
        profileId = data.id;
      } else if (error) {
        console.error("Supabase profile upsert error:", error);
      }
    }

    // Создание JWT токена
    const token = await new SignJWT({ 
      phoneOrEmail: normalized,
      authType,
      profileId,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(JWT_SECRET);

    // Установка cookie
    const response = NextResponse.json({ 
      success: true,
      user: { phoneOrEmail: normalized, authType, profileId }
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 дней
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { error: "Ошибка при проверке кода" },
      { status: 500 }
    );
  }
}
