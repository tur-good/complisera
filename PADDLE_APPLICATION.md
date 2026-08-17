# Paddle live-account application pack

## Product classification

Complisera is a B2B SaaS compliance management platform. Paddle will be used only for recurring access to software features. It will not process payments for legal advice, consulting, registrations, authorised representatives, PROs, government fees or recycling schemes.

## Application description

Complisera is a subscription-based compliance management software platform for small online sellers entering European markets. Customers subscribe to software that provides a reusable company compliance profile, packaging weight calculations, country action tracking, versioned regulatory records, deadline reminders, document storage and reporting exports. The platform provides informational technology tools and does not provide legal advice. Optional registration, authorised representative, producer responsibility organisation and professional services are supplied under separate contracts by eligible independent providers and are not sold through Paddle.

## Products to create in Paddle

| Paddle product | Billing | Software entitlement |
| --- | --- | --- |
| Complisera Starter | EUR 9.90 monthly | One business, up to 3 EU countries, dashboard, packaging tracking, reminders and document storage |
| Complisera EU Seller | EUR 19.90 monthly | Up to 10 EU countries, reporting assistant, marketplace evidence data, documents and country action checklists |
| Complisera EU Unlimited | EUR 39 monthly | All EU countries, multiple marketplaces, extended reporting, evidence vault and priority software support |

Create annual prices only after the final commercial decision. Do not create Paddle products for registration assistance, AR/PRO coordination or third-party fees.

## Domain-review routes

- `/` — public product description
- `/pricing` — software products and pricing
- `/demo` — public dashboard demo using sample data
- `/login` — secure account access
- `/legal/terms` — Terms of Service
- `/legal/privacy` — Privacy Policy
- `/legal/subscriptions` — renewal and cancellation rules
- `/legal/refunds` — Refund Policy
- `/legal` — professional disclaimer
- `/support` — working customer-support form

## Reviewer note

The public `/demo` route demonstrates the software without requiring credentials. All data shown there is clearly marked as sample data. Registered customer workspaces are private. Regulatory statuses do not constitute legal advice, and “compliant” is shown only when configured evidence requirements are satisfied.

## Information that must be inserted before submission

- Domain: `complisera.com` — DNS validation and SSL must be active
- Registered sole-trader or company legal name
- VÖEN / registration number
- Registered business address
- Support and billing email on the new domain
- Bank beneficiary name matching the Paddle account
- Bank SWIFT/IBAN payout details
- Final monthly and annual prices
- Final governing-law and dispute wording reviewed for the operator

## Final go-live checks

1. Make the marketing site public and keep the dashboard protected.
2. Complete DNS validation and confirm HTTPS for `complisera.com`.
3. Confirm canonical URLs resolve to `https://complisera.com`.
4. Insert the operator details in the footer and legal documents.
5. Create a Paddle sandbox and mirror the three software products.
6. Add the live domain in Paddle Website Approval.
7. Set the default payment link to a page on the approved domain.
8. Connect checkout buttons only to Paddle software products.
9. Verify webhook signatures and handle subscription created, updated, cancelled and past-due events.
10. Confirm that successful payment activates software access and cancellation stops future renewal.
