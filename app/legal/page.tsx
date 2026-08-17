import type { Metadata } from "next";
import { LegalPage } from "./legal-ui";
import { pageMetadata } from "../seo";

export const metadata:Metadata=pageMetadata({title:"Professional Disclaimer",description:"Understand the scope and limitations of Complisera compliance management software and regulatory information.",path:"/legal"});

export default function Page(){return <LegalPage title="Professional disclaimer" summary="A clear boundary between compliance software, regulatory information and separately contracted professional services.">
  <h2>Platform scope</h2><p>Complisera is a subscription-based compliance management software platform operated from Azerbaijan. It provides country requirement tracking, packaging calculations, versioned regulatory records, document storage, reporting tools and deadline reminders.</p>
  <h2>Not legal advice</h2><p>Complisera is not a law firm, government authority, producer responsibility organisation, official registry or authorised representative. Platform information and automated assessments are informational and do not constitute legal advice or a binding legal classification.</p>
  <h2>Rule verification</h2><p>Regulatory requirements can change and may depend on facts not captured by an automated workflow. A status of “Verification required” means that the platform does not have sufficient verified information to produce a conclusion. Low sales or packaging volume is not treated as an automatic exemption.</p>
  <h2>Independent services</h2><p>Authorised representatives, producer responsibility organisations, legal advisers and other specialists are independent providers. Their services, eligibility, fees and contractual responsibilities are separate from the Complisera software subscription.</p>
  <h2>No guaranteed outcome</h2><p>Use of the platform does not guarantee registration, acceptance by an authority, marketplace approval or legal compliance. A “compliant” status is shown only where the configured evidence requirements have been satisfied and verified.</p>
</LegalPage>}
