import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { supabase } from "@/lib/supabase";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ orders: [] });
    }

    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ orders: [] });
    }

    let profileId: string | null = null;
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.profileId && typeof payload.profileId === "string") {
        profileId = payload.profileId;
      }
    } catch (err) {
      console.error("JWT decode error in orders route:", err);
      return NextResponse.json({ orders: [] });
    }

    if (!profileId) {
      return NextResponse.json({ orders: [] });
    }

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        total_amount,
        delivery_method,
        order_items (
          id,
          product_id,
          name,
          brand,
          size,
          price,
          quantity
        )
      `
      )
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase orders fetch error:", error);
      return NextResponse.json({ orders: [] });
    }

    return NextResponse.json({ orders: data ?? [] });
  } catch (error) {
    console.error("Orders route error:", error);
    return NextResponse.json({ orders: [] });
  }
}

