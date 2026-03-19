import { NextRequest, NextResponse } from "next/server";
import type { OrderRequest } from "@/lib/types";
import { jwtVerify } from "jose";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ADMIN_EMAIL = "1996zviagintcev1996@gmail.com";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OrderRequest;

    if (!body || !body.name || !body.phone || !body.address || !body.items?.length) {
      return NextResponse.json(
        { error: "Некорректные данные заказа" },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@luxesegment.com";

    const subject = `Новая заявка с сайта Luxe Segment — ${body.name}`;

    const itemsHtml = body.items
      .map(
        (item, index) =>
          `<tr>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;">${index + 1}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;">${item.brand}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;">${item.name}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;">${
              item.options.size ? item.options.size : ""
            }</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;">${item.quantity}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;">${item.price.toLocaleString(
              "ru-RU"
            )} ₽</td>
          </tr>`
      )
      .join("");

    const total = body.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="margin-bottom: 16px;">Новая заявка с сайта</h2>
        <p style="margin: 0 0 8px;"><strong>Имя:</strong> ${body.name}</p>
        <p style="margin: 0 0 8px;"><strong>Телефон:</strong> ${body.phone}</p>
        <p style="margin: 0 0 8px;"><strong>Адрес:</strong> ${body.address}</p>
        <p style="margin: 0 0 8px;"><strong>Доставка:</strong> ${
          body.deliveryMethod === "express" ? "Экспресс" : "Стандартная"
        }</p>
        <p style="margin: 0 0 16px;"><strong>Комментарий:</strong> ${
          body.comment || "—"
        }</p>
        <h3 style="margin: 24px 0 8px;">Товары</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:4px 8px;border-bottom:1px solid #ccc;">#</th>
              <th style="text-align:left;padding:4px 8px;border-bottom:1px solid #ccc;">Бренд</th>
              <th style="text-align:left;padding:4px 8px;border-bottom:1px solid #ccc;">Товар</th>
              <th style="text-align:left;padding:4px 8px;border-bottom:1px solid #ccc;">Размер</th>
              <th style="text-align:left;padding:4px 8px;border-bottom:1px solid #ccc;">Кол-во</th>
              <th style="text-align:left;padding:4px 8px;border-bottom:1px solid #ccc;">Цена</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <p style="margin: 16px 0 0; font-weight: bold;">Итого: ${total.toLocaleString(
          "ru-RU"
        )} ₽</p>
      </div>
    `;

    // Попытаться сохранить заказ в Supabase (если настроен)
    if (supabase) {
      try {
        let profileId: string | null = null;

        // Пытаемся вытащить profileId из JWT, если пользователь авторизован
        const token = request.cookies.get("auth-token")?.value;
        if (token) {
          try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            if (payload.profileId && typeof payload.profileId === "string") {
              profileId = payload.profileId;
            }
          } catch (err) {
            console.error("JWT decode error in order route:", err);
          }
        }

        // Если profileId нет, можно попытаться найти профиль по телефону
        if (!profileId) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("phone_or_email", body.phone)
            .maybeSingle();
          if (profile?.id) profileId = profile.id;
        }

        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            profile_id: profileId,
            name: body.name,
            phone: body.phone,
            address: body.address,
            comment: body.comment,
            delivery_method: body.deliveryMethod,
            total_amount: total,
          })
          .select("id")
          .single();

        if (orderError) {
          console.error("Supabase order insert error:", orderError);
        } else if (order?.id) {
          const itemsPayload = body.items.map((item) => ({
            order_id: order.id,
            product_id: item.productId,
            name: item.name,
            brand: item.brand,
            size: item.options.size ?? null,
            price: item.price,
            quantity: item.quantity,
          }));

          const { error: itemsError } = await supabase
            .from("order_items")
            .insert(itemsPayload);

          if (itemsError) {
            console.error("Supabase order_items insert error:", itemsError);
          }
        }
      } catch (dbError) {
        console.error("Supabase order save error:", dbError);
      }
    }

    if (!RESEND_API_KEY) {
      console.log("[DEV] Новый заказ:", JSON.stringify({ ...body, total }, null, 2));
      return NextResponse.json({ success: true, dev: true });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: ADMIN_EMAIL,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend order email error:", errorText);
      return NextResponse.json(
        { error: "Не удалось отправить заявку. Попробуйте позже." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order submit error:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке заявки" },
      { status: 500 }
    );
  }
}

