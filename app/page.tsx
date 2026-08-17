import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Arrow, Badge, CountryPill, Footer, Header, MiniDashboard } from "./ui";
import { euCountries } from "./country-data";
import { pageMetadata } from "./seo";

export const metadata: Metadata = pageMetadata({
  title: "EU Product & Packaging Compliance for Global Sellers",
  description: "Understand PPWR, packaging EPR and EU market requirements with free checks, packaging calculations and country-by-country guidance.",
  path: "/",
});

export default function Home() {
  return <>
    <Header />
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <Badge>EU compliance, without the guesswork</Badge>
          <h1>Sell to Europe.<br/><span>We handle the compliance.</span></h1>
          <p className="hero-lede">Subscription compliance management software for global online sellers. Check potential requirements, track country actions and keep packaging evidence in one workspace.</p>
          <div className="actions">
            <Link className="button primary" href="/checker">Check my EU requirements <Arrow /></Link>
            <Link className="button secondary" href="/pricing">View pricing</Link>
          </div>
          <div className="trust-row"><span>Built for global sellers</span><span>Official sources</span><span>Human-reviewed rules</span></div>
        </div>
        <MiniDashboard />
      </section>

      <section className="proof-strip">
        <div className="shell proof-grid"><div><b>27</b><span>EU destinations in one workspace</span></div><div><b>1×</b><span>enter company details once</span></div><div><b>4</b><span>interface languages</span></div><div><b>∞</b><span>versioned rule history</span></div></div>
      </section>

      <section className="section shell center">
        <Badge>A clear path to market</Badge>
        <h2>Selling to the EU shouldn’t require reading hundreds of pages of regulation.</h2>
        <p className="section-lede">Answer a few practical questions. We translate verified regulatory data into a country-by-country action plan.</p>
        <div className="steps">
          {[['01','Tell us where you sell.','Choose your business location, channels, products and EU destinations.'],['02','See what rules apply.','Get an assessment based on current, versioned country rules and official sources.'],['03','Complete your next steps.','Track registrations, documents, partners, quantities and deadlines in one place.']].map(x=><article className="step-card" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
        </div>
      </section>

      <section className="section product-section">
        <div className="shell">
          <div className="section-heading split-heading"><div><Badge>Your route to the EU</Badge><h2>Not another regulation library. A working compliance route.</h2></div><p>Start with a free check, create one reusable business profile, then work through country actions, evidence, reporting and renewals.</p></div>
          <div className="product-flow" aria-label="EU compliance workflow">
            {[
              ["01","Check","Answer practical questions about your business, products, marketplaces and packaging.","/checker"],
              ["02","Passport","Reuse verified company and product information across every EU destination.","/login"],
              ["03","Country actions","See registrations, EPR steps and partner needs without unsupported conclusions.","/countries"],
              ["04","Report & renew","Track packaging quantities, evidence, deadlines and annual renewals.","/dashboard"],
            ].map(item=><article className="flow-card" key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><Link href={item[3]}>Explore <Arrow/></Link></article>)}
          </div>
        </div>
      </section>

      <section className="passport-section shell">
        <div className="passport-preview" aria-label="Compliance Passport preview">
          <div className="passport-bar"><span>EU COMPLIANCE PASSPORT</span><b>Profile 68% complete</b></div>
          <div className="passport-company"><div className="passport-logo">LB</div><div><small>BUSINESS PROFILE</small><h3>Leyla Studio</h3><p>Azerbaijan · Etsy + Shopify · Jewellery</p></div><span className="tag review">3 details to verify</span></div>
          <div className="passport-data"><div><small>Markets</small><b>Germany, France, Italy</b></div><div><small>Packaging profiles</small><b>2 saved</b></div><div><small>Evidence</small><b>4 documents</b></div><div><small>Next deadline</small><b>Verification required</b></div></div>
          <div className="passport-progress"><i style={{width:"68%"}}/></div>
        </div>
        <div className="passport-copy"><Badge>Compliance Passport</Badge><h2>Enter your business once. Reuse it everywhere.</h2><p>Keep company details, tax information, products, sales channels, destinations, packaging profiles and evidence in one structured record.</p><ul><li>Prepare country onboarding without starting from zero</li><li>Connect every result to a rule version and official source</li><li>Share only the information required with an eligible partner</li></ul><Link className="button secondary" href="/login">Create my passport <Arrow/></Link></div>
      </section>

      <section className="visual-story shell">
        <div className="visual-copy"><Badge>From parcel to proof</Badge><h2>Every shipment creates a compliance trail.</h2><p>Map destinations, separate packaging types, track material weights and keep country-specific evidence connected to the rule version that applied.</p><div className="visual-points"><span><i>01</i> Packaging profile</span><span><i>02</i> Country requirements</span><span><i>03</i> Verified records</span></div></div>
        <div className="visual-art"><Image src="/eu-compliance-network.png" alt="Parcels connected to a European compliance checklist and verification shield" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 56vw"/></div>
      </section>

      <section className="section soft">
        <div className="shell country-section">
          <div><Badge>European coverage</Badge><h2>All 27 EU markets.<br/>One clear overview.</h2><p className="section-lede left">Germany, France and Italy have detailed launch guidance. Every other EU country is available with a clear verification status.</p><Link className="text-link" href="/countries">Explore all EU countries <Arrow /></Link></div>
          <div className="country-list featured-countries"><CountryPill flag="🇩🇪" name="Germany" detail="Detailed guidance · LUCID" href="/countries/germany"/><CountryPill flag="🇫🇷" name="France" detail="Detailed guidance · Packaging EPR" href="/countries/france"/><CountryPill flag="🇮🇹" name="Italy" detail="Detailed guidance · CONAI" href="/countries/italy"/><div className="eu-chip-cloud">{euCountries.filter(x=>!["germany","france","italy"].includes(x[1])).map(x=><Link href={`/countries/${x[1]}`} key={x[1]}><span>{x[2]}</span>{x[0]}</Link>)}</div></div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading"><div><Badge>One account, broader coverage</Badge><h2>Start with packaging. Expand as your business grows.</h2></div><p>PPWR and packaging EPR are the first workflow—not the limit of the platform. New compliance areas can be added to the same company passport.</p></div>
        <div className="compliance-modules">
          {[['Packaging','PPWR · Packaging EPR','Available now','active'],['Product safety','GPSR','Planned',''],['Electronics','WEEE','Planned',''],['Batteries','Battery EPR','Planned',''],['Textiles','Textile EPR','Planned',''],['Tax guidance','VAT · OSS · IOSS','Informational','']].map(x=><article className={x[3]} key={x[0]}><span aria-hidden>◇</span><div><h3>{x[0]}</h3><p>{x[1]}</p></div><b>{x[2]}</b></article>)}
        </div>
      </section>

      <section className="section shell center">
        <Badge>Designed around your business</Badge><h2>Built for small sellers with global ambition.</h2>
        <div className="audience-grid">{[['◈','Etsy sellers'],['▣','Shopify stores'],['✦','Handmade brands'],['◇','Jewellery businesses'],['⌂','Small manufacturers']].map(x=><div className="audience" key={x[1]}><i>{x[0]}</i><span>{x[1]}</span></div>)}</div>
      </section>

      <section className="cta shell"><div><Badge>Start with clarity</Badge><h2>Find out what you need before your next EU sale.</h2></div><Link className="button light" href="/checker">Start free check <Arrow /></Link></section>
    </main>
    <Footer />
  </>
}
