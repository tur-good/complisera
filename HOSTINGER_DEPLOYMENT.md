# Complisera production deployment

## Architecture

- Next.js 16 on Node.js 22
- Supabase PostgreSQL and Auth
- Private Supabase Storage bucket: `compliance-documents`
- Hostinger managed Node.js Web App
- GitHub private repository as the deployment source

## Hostinger build settings

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Node.js | 22.x |
| Install | `npm ci` |
| Build | `npm run build` |
| Start | `npm start` |
| Production branch | `main` |

## Required environment variables

```text
NEXT_PUBLIC_SITE_URL=https://complisera.com
NEXT_PUBLIC_SUPABASE_URL=https://ugeqcegfukjszrznaabu.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase publishable key>
SUPABASE_SECRET_KEY=<Supabase server-only secret key>
```

Add these only when the related providers are activated:

```text
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
RESEND_API_KEY=
SUPPORT_EMAIL=
```

Never commit secret values to GitHub. Store them in Hostinger's Environment Variables.
The legacy `SUPABASE_SERVICE_ROLE_KEY` name remains supported as a temporary fallback,
but new deployments should use a revocable `sb_secret_...` key.

## Supabase configuration

Add these allowed redirect URLs in Authentication settings:

```text
https://complisera.com/auth/callback
https://www.complisera.com/auth/callback
http://localhost:3000/auth/callback
```

Set the primary Site URL to:

```text
https://complisera.com
```

Email/password authentication works after email templates and SMTP are configured. Google login additionally requires a Google OAuth client and secret in Supabase.

## Domain cutover

Do not change DNS until the Hostinger deployment passes the production smoke test. The earlier A and TXT records for ChatGPT Sites are not Hostinger records. Replace them only with the DNS values shown by hPanel after the Node.js app has been created.

## Release checks

```bash
npm ci
npm run typecheck
npm run build
```

Verify `/`, `/checker`, `/calculator`, `/countries`, `/pricing`, `/login`, `/support`, `/robots.txt` and `/sitemap.xml`. Confirm that `/dashboard`, `/admin` and `/partner-portal` redirect anonymous visitors to `/login`.
