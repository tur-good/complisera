import Link from "next/link";
import type { ReactNode } from "react";
import { PageShell } from "../ui";

export const LEGAL_UPDATED="16 August 2026";
export function LegalPage({title,summary,children}:{title:string;summary:string;children:ReactNode}){return <PageShell><section className="page-hero"><div className="shell"><span className="eyebrow"><i/> Legal information</span><h1>{title}</h1><p>{summary}</p></div></section><div className="content-shell legal-layout"><article className="article"><p className="legal-date">Effective and last updated: {LEGAL_UPDATED}</p>{children}</article><aside className="panel info-card legal-nav"><h2>Legal documents</h2><Link href="/legal/terms">Terms of Service</Link><Link href="/legal/privacy">Privacy Policy</Link><Link href="/legal/subscriptions">Subscriptions & cancellation</Link><Link href="/legal/refunds">Refund Policy</Link><Link href="/legal">Professional disclaimer</Link><Link href="/support">Customer support</Link></aside></div></PageShell>}
