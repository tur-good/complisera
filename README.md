# Complisera

Complisera is a multilingual EU product and packaging compliance SaaS for global online sellers.

## Local development

1. Copy `.env.example` to `.env.local` and add Supabase credentials.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.

## Quality gates

```bash
npm run typecheck
npm run build
```

Database migrations are stored in `supabase/migrations`. Production deployment details are documented in `HOSTINGER_DEPLOYMENT.md`.
