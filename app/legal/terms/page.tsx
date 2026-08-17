import type { Metadata } from "next";
import { LegalPage } from "../legal-ui";
import { pageMetadata } from "../../seo";

export const metadata:Metadata=pageMetadata({title:"Terms of Service",description:"Terms governing access to and use of the Complisera compliance management software platform.",path:"/legal/terms"});

export default function Page(){return <LegalPage title="Terms of Service" summary="Terms governing access to the Complisera software platform.">
  <h2>1. Service</h2><p>Complisera provides subscription software for organising business profiles, packaging data, potential country requirements, regulatory sources, documents, tasks, reports and reminders. Features may vary by plan and supported country.</p>
  <h2>2. Account responsibilities</h2><p>You must provide accurate information, protect your account access and use the platform only for lawful business purposes. You remain responsible for reviewing the accuracy of your business, product, shipment and packaging data.</p>
  <h2>3. Regulatory information</h2><p>Platform outputs are informational. They are generated from dated and versioned rule records and may require human verification. You are responsible for obtaining professional advice where your circumstances require it.</p>
  <h2>4. Subscriptions</h2><p>Paid plans renew automatically at the billing interval shown during checkout until cancelled. Prices, billing frequency, included features and applicable taxes are disclosed before payment. Cancellation does not retroactively reverse charges already incurred.</p>
  <h2>5. Separate professional services</h2><p>Registration assistance, authorised representative services, PRO participation, legal advice, government charges and recycling scheme fees are not included in the software subscription unless expressly stated in a separate written agreement. Independent partners contract and invoice separately.</p>
  <h2>6. Acceptable use</h2><p>You may not misuse the platform, attempt unauthorised access, upload unlawful material, interfere with security, scrape protected content or use generated documents to misrepresent an unverified compliance status.</p>
  <h2>7. Intellectual property</h2><p>The platform, interface, software and original content are protected by applicable intellectual property laws. You retain rights in data and documents you upload and grant the limited permissions required to store and process them for the service.</p>
  <h2>8. Availability and changes</h2><p>We may modify features to improve security, accuracy or regulatory coverage. Material changes affecting paid access will be communicated through the platform or account contact details.</p>
  <h2>9. Liability</h2><p>To the extent permitted by law, the platform is provided without a guarantee that every regulatory issue will be identified. Nothing in these terms excludes rights or liabilities that cannot lawfully be limited.</p>
  <h2>10. Termination and contact</h2><p>You may cancel a subscription according to the Subscriptions & Cancellation Policy and request account deletion through Customer Support. We may restrict accounts used unlawfully or in material breach of these terms.</p>
</LegalPage>}
