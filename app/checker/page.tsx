import type { Metadata } from "next";
import { Checker } from "../tools";
import { PageShell, PageVisual } from "../ui";
import { pageMetadata } from "../seo";
export const metadata:Metadata=pageMetadata({title:"PPWR & EPR Checker for Non-EU Sellers",description:"Check potential PPWR, packaging EPR, producer registration and local partner requirements by EU destination using versioned rules.",path:"/checker"});
export default function Page(){return <PageShell><section className="page-hero"><div className="shell"><div className="eyebrow"><i/> Free assessment</div><h1>Do I need PPWR / EPR registration?</h1><p>Build a practical country-by-country assessment from your business, products, destinations and packaging.</p></div></section><PageVisual label="SMART ASSESSMENT" title="From one shipment to a clear EU action plan."/><Checker/></PageShell>}
