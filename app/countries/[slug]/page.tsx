import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { euCountries } from "../../country-data";
import { Badge, PageShell, PageVisual } from "../../ui";
import { JsonLd, absoluteUrl, breadcrumbSchema, pageMetadata } from "../../seo";

export function generateStaticParams(){return euCountries.map(([,slug])=>({slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const c=euCountries.find(x=>x[1]===slug);
  if(!c)return pageMetadata({title:"Country Compliance Overview",description:"EU country packaging compliance overview.",path:`/countries/${slug}`,noIndex:true});
  return pageMetadata({title:`${c[0]} Packaging Compliance for International Sellers`,description:`Review ${c[0]} packaging EPR, producer responsibility and market-entry topics using dated rules and official-source verification.`,path:`/countries/${slug}`});
}

export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=euCountries.find(x=>x[1]===slug);if(!c)notFound();const path=`/countries/${slug}`;return <PageShell>
  <JsonLd data={[breadcrumbSchema([{name:"Home",path:"/"},{name:"Countries",path:"/countries"},{name:c[0],path}]),{"@context":"https://schema.org","@type":"WebPage","name":`${c[0]} Packaging Compliance for International Sellers`,"url":absoluteUrl(path),"description":`Overview of packaging EPR and producer responsibility topics for international sellers entering ${c[0]}.`}]} />
  <section className="page-hero country-hero"><div className="shell"><div><div className="crumb"><Link href="/countries">Countries</Link> / {c[0]}</div><Badge>Country compliance overview</Badge><h1>{c[0]} Packaging Compliance for International Sellers</h1><p>Assess packaging, producer responsibility and market-entry requirements using dated rules and official sources.</p><div className="actions"><Link className="button primary" href="/checker">Check my requirements →</Link><span className="tag verify">Verification required</span></div></div><div className="country-flag">{c[2]}</div></div></section>
  <PageVisual label={`${c[0].toUpperCase()} MARKET`} title="Connect packaging data, country rules and compliance evidence."/>
  <div className="content-shell article-layout"><article className="article"><div className="notice">A current country-specific legal conclusion has not been published on this page. The platform will show a conclusion only after the relevant official rule version has been verified.</div><h2>What the assessment covers</h2><div className="steps country-topic-grid"><div className="step-card"><span>◎</span><h3>Producer status</h3><p>Who may be treated as the producer under the rule effective on the assessment date.</p></div><div className="step-card"><span>▦</span><h3>Registration</h3><p>Whether a national register or identifier may apply to the specific sales model.</p></div><div className="step-card"><span>♻</span><h3>EPR participation</h3><p>Potential scheme or PRO participation and packaging material categories.</p></div><div className="step-card"><span>◇</span><h3>Local partner route</h3><p>AR, PRO or eligible local support only where the verified rule requires it.</p></div></div><h2>Next step</h2><p>Run the checker with your business establishment, platform, product type, shipment volume and packaging profile. The result remains informational until sufficient source verification and evidence are available.</p></article><aside><div className="panel info-card sticky"><h3>Regulatory status</h3><p><b>Country</b><br/>{c[0]}</p><p><b>Last verified</b><br/>Verification required</p><p><b>Legal review</b><br/><span className="tag verify">Pending</span></p><Link className="button primary" style={{width:'100%'}} href="/checker">Start free check</Link></div></aside></div>
</PageShell>}
