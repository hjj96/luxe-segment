import { NextRequest, NextResponse } from "next/server";
import { generateCode, getAuthType, isValidEmail, isValidPhone, normalizePhone } from "@/lib/auth";
import { saveCode } from "@/lib/codes";

export async function POST(request: NextRequest) {
  try {
    const { phoneOrEmail } = await request.json();

    if (!phoneOrEmail || typeof phoneOrEmail !== "string") {
      return NextResponse.json(
        { error: "Телефон или email обязательны" },
        { status: 400 }
      );
    }

    const authType = getAuthType(phoneOrEmail);
    const normalized = authType === "phone" ? normalizePhone(phoneOrEmail) : phoneOrEmail.toLowerCase();

    // Валидация
    if (authType === "phone" && !isValidPhone(normalized)) {
      return NextResponse.json(
        { error: "Неверный формат телефона" },
        { status: 400 }
      );
    }
    if (authType === "email" && !isValidEmail(normalized)) {
      return NextResponse.json(
        { error: "Неверный формат email" },
        { status: 400 }
      );
    }

    // Генерация кода
    const code = generateCode();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 минут

    // Сохранение кода
    saveCode(phoneOrEmail, authType, code, expiresAt);

    // Отправка кода
    if (authType === "email") {
      await sendEmailCode(normalized, code);
    } else {
      await sendSMSCode(normalized, code);
    }

    return NextResponse.json({ 
      success: true,
      message: `Код отправлен на ${authType === "email" ? "email" : "телефон"}` 
    });
  } catch (error) {
    console.error("Error sending code:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке кода" },
      { status: 500 }
    );
  }
}

// Отправка email через Resend (или другой сервис)
async function sendEmailCode(email: string, code: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    // В режиме разработки просто логируем
    console.log(`[DEV] Email code for ${email}: ${code}`);
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "noreply@luxesegment.com",
        to: email,
        subject: "Код для входа в Luxe Segment",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #000;">Код для входа</h2>
            <p>Ваш код для входа в личный кабинет:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #000; margin: 20px 0;">
              ${code}
            </div>
            <p style="color: #666; font-size: 14px;">Код действителен в течение 10 минут.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Email sending error:", error);
    // В режиме разработки не падаем, просто логируем
    if (!RESEND_API_KEY) {
      console.log(`[DEV] Email code for ${email}: ${code}`);
    } else {
      throw error;
    }
  }
}

// Отправка SMS через SMS.ru (или другой сервис)
async function sendSMSCode(phone: string, code: string) {
  const SMSRU_API_ID = process.env.SMSRU_API_ID;
  
  if (!SMSRU_API_ID) {
    // В режиме разработки просто логируем
    console.log(`[DEV] SMS code for ${phone}: ${code}`);
    return;
  }

  try {
    const response = await fetch("https://sms.ru/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        api_id: SMSRU_API_ID,
        to: phone,
        msg: `Код для входа в Luxe Segment: ${code}. Действителен 10 минут.`,
        json: "1",
      }),
    });

    const data = await response.json();
    
    if (data.status !== "OK" && data.status_code !== 100) {
      console.error("SMS.ru API error:", data);
      throw new Error("Failed to send SMS");
    }
  } catch (error) {
    console.error("SMS sending error:", error);
    // В режиме разработки не падаем, просто логируем
    if (!SMSRU_API_ID) {
      console.log(`[DEV] SMS code for ${phone}: ${code}`);
    } else {
      throw error;
    }
  }
}

