"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { Header, Logo } from "../ui";

export default function LoginPage() {
  const supabase = useMemo(() => createClient(), []);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [status, setStatus] = useState<"idle" | "working" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("working");
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const result = mode === "signup"
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` } })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setError(result.error.message);
      setStatus("idle");
      return;
    }
    if (mode === "signup") {
      setStatus("sent");
      return;
    }
    window.location.assign("/dashboard");
  }

  async function signInWithGoogle() {
    setStatus("working");
    setError("");
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
    });
    if (authError) {
      setError(authError.message);
      setStatus("idle");
    }
  }

  return <><Header/><main className="login-page">
    <div className="login-visual"><Image src="/eu-compliance-network.png" alt="Parcels connected to a European compliance network" width={1536} height={1024} priority sizes="(max-width: 900px) 100vw, 55vw"/><div className="login-visual-copy"><span>COMPLISERA</span><h2>One workspace for your route into the EU.</h2><p>Create a reusable company passport, track country actions, packaging records, evidence and deadlines.</p><div><b>✓</b> Source-linked country rules</div><div><b>✓</b> Packaging and document tracking</div><div><b>✓</b> Evidence-based statuses</div></div></div>
    <section className="login-card"><div className="login-brand"><Logo/></div><span className="login-kicker">SECURE CLIENT ACCESS</span><h1>{mode === "signin" ? "Open your compliance workspace" : "Create your Complisera account"}</h1><p>{mode === "signin" ? "Sign in with your business email or Google account." : "Create an account to save checks, packaging profiles and country actions."}</p>
      {status === "sent" ? <div className="support-success" role="status"><b>Check your inbox</b><p>Confirm your email address to activate the account.</p></div> : <>
        <form onSubmit={submit} className="login-form">
          <div className="field"><label htmlFor="login-email">Business email</label><input id="login-email" name="email" type="email" autoComplete="email" required/></div>
          <div className="field"><label htmlFor="login-password">Password</label><input id="login-password" name="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={8} required/></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button primary" disabled={status === "working"}>{status === "working" ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</button>
        </form>
        <button className="button secondary login-google" type="button" onClick={signInWithGoogle} disabled={status === "working"}>Continue with Google</button>
        <button className="login-mode" type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}>{mode === "signin" ? "New to Complisera? Create an account" : "Already have an account? Sign in"}</button>
      </>}
      <div className="login-assurance"><b>Software access</b><span>Country tracking, packaging calculations, reminders and evidence management.</span></div><small>By continuing, you agree to the <Link href="/legal/terms">Terms of Service</Link> and acknowledge the <Link href="/legal/privacy">Privacy Policy</Link>. Complisera provides software and regulatory information, not legal advice.</small></section>
  </main></>;
}
