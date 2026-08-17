import type { Metadata } from "next";
import { Calculator } from "../tools";
import { PageShell, PageVisual } from "../ui";
import { pageMetadata } from "../seo";
export const metadata:Metadata=pageMetadata({title:"EU Packaging Weight Calculator",description:"Calculate annual cardboard, paper, plastic and other packaging weights by product profile, shipment volume and EU destination.",path:"/calculator"});
export default function Page(){return <PageShell><section className="page-hero"><div className="shell"><div className="eyebrow"><i/> Free calculator</div><h1>Know your annual packaging weight.</h1><p>Calculate quantities by material, product profile and destination—with no spreadsheets required.</p></div></section><PageVisual label="PACKAGING DATA" title="Turn every box, mailer and insert into report-ready totals."/><Calculator/></PageShell>}
