import { NextResponse } from "next/server";
import { createServiceClient } from "../../../lib/supabase/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { email?: string };
    const email = (payload.email ?? "").trim().toLowerCase().slice(0, 200);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const { error } = await createServiceClient()
      .from("login_waitlist")
      .upsert({ email, source: "login" }, { onConflict: "email", ignoreDuplicates: true });
    if (error) throw error;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save email." }, { status: 500 });
  }
}
