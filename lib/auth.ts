import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function requireUser(returnTo = "/dashboard") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }

  return user;
}

export async function requireRole(role: "admin" | "partner") {
  const user = await requireUser(role === "admin" ? "/admin" : "/partner-portal");
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== role && profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return user;
}
