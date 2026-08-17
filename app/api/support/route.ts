import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabase/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, string>;
    const name = (payload.name ?? "").trim().slice(0, 100);
    const email = (payload.email ?? "").trim().toLowerCase().slice(0, 200);
    const category = (payload.category ?? "Product question").trim().slice(0, 80);
    const message = (payload.message ?? "").trim().slice(0, 3000);

    if (!name || !emailPattern.test(email) || message.length < 10 || payload.consent !== "yes") {
      return NextResponse.json({ error: "Complete all required fields and confirm consent." }, { status: 400 });
    }

    const { error } = await createServiceClient().from("support_tickets").insert({
      name,
      email,
      category,
      message,
      consent_at: new Date().toISOString(),
    });

    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save your request." }, { status: 500 });
  }
}
