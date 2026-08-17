import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "./ui";
import { pageMetadata } from "./seo";

export const metadata: Metadata = pageMetadata({
  title: "Page Not Found",
  description: "The requested Complisera page could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return <PageShell><section className="page-hero"><div className="shell"><div className="eyebrow"><i/> Error 404</div><h1>This page could not be found.</h1><p>The address may have changed. Continue with the compliance checker or browse all EU country guidance.</p><div className="actions" style={{justifyContent:"center"}}><Link className="button primary" href="/checker">Start free check</Link><Link className="button secondary" href="/countries">Browse countries</Link></div></div></section></PageShell>;
}
