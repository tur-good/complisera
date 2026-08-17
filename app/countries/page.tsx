import Link from "next/link";
import type { Metadata } from "next";
import { euCountries } from "../country-data";
import { Badge, PageShell, PageVisual } from "../ui";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "EU Packaging Compliance by Country",
  description: "Browse packaging EPR and market-entry guidance for all 27 EU Member States, with detailed pages for Germany, France and Italy.",
  path: "/countries",
});

export default function Page(){return <PageShell>
  <section className="page-hero"><div className="shell"><Badge>EU country coverage</Badge><h1>Packaging compliance across all 27 EU countries.</h1><p>Choose a destination to view its current data status. Detailed launch guidance is available for Germany, France and Italy; other markets show verification-first country pages.</p></div></section>
  <PageVisual label="EU-WIDE COVERAGE" title="One platform for every EU destination."/>
  <div className="content-shell countries-directory"><div className="directory-head"><div><h2>European Union</h2><p>27 Member States</p></div><span className="tag review">Rules continuously reviewed</span></div><div className="country-directory-grid">{euCountries.map(c=><Link className="directory-country" href={`/countries/${c[1]}`} key={c[1]}><span>{c[2]}</span><div><b>{c[0]}</b><small>{["germany","france","italy"].includes(c[1])?'✓ Detailed guidance':'◷ Verification-first overview'}</small></div><i>→</i></Link>)}</div><div className="notice">The presence of a country in this directory does not imply a fixed legal outcome. The checker uses the applicable versioned rule and shows “Verification required” where current official-source review is incomplete.</div></div>
</PageShell>}
