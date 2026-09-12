# Contact Form Email Delivery — Vercel + Resend

The contact form on this portfolio posts to a Vercel serverless function
(`api/contact.js`) which delivers the message to your inbox through the
[Resend](https://resend.com) REST API. No database, no SDK, no extra npm
dependencies — the function uses the built-in `fetch`.

Messages are delivered to **sbpatil2801@gmail.com** by default (overridable
via `CONTACT_TO_EMAIL`).

---

## 1. Create a Resend account and API key

1. Sign up at https://resend.com (free tier: 100 emails/day, 3,000/month —
   plenty for a portfolio contact form).
2. Go to **API Keys** → https://resend.com/api-keys → **Create API Key**.
   - Name: `portfolio-contact` (anything works)
   - Permission: **Sending access** is enough (no need for full access)
3. Copy the key (starts with `re_`). It is shown **once** — store it safely.
   Never commit it to the repo.

## 2. Sender address / domain verification

Resend only sends **from** addresses it trusts:

- **Quick start (no domain needed):** the default sender in `api/contact.js`
  is `onboarding@resend.dev`, Resend's shared test sender. It works
  immediately with any API key, but with limits: Resend only allows the
  test sender to deliver **to the email address of your own Resend account**.
  So for quick-start delivery to `sbpatil2801@gmail.com`, sign up for Resend
  with that same Gmail address. Mails may also land in spam.
- **Production (recommended):** verify your own domain:
  1. Resend dashboard → **Domains** → **Add Domain** (e.g. `swapnilpatil.dev`).
  2. Resend shows DNS records (SPF `TXT`, DKIM `TXT`/`CNAME`, optionally an
     MX for the bounce subdomain). Add them at your DNS provider
     (Vercel DNS, IONOS, Cloudflare, …).
  3. Wait for the domain status to become **Verified** (usually minutes,
     up to ~48h depending on DNS propagation).
  4. Set `CONTACT_FROM_EMAIL` to something like `contact@swapnilpatil.dev`.
     The mailbox does not need to exist — it is only a sender identity;
     replies go to the form submitter via the `Reply-To` header anyway.

## 3. Vercel environment variables

In the Vercel dashboard: **Project → Settings → Environment Variables**
(apply to *Production* — add *Preview* too if you test on preview deploys):

| Variable | Required | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | **yes** | the `re_…` key from step 1 (mark as Sensitive) |
| `CONTACT_TO_EMAIL` | no | recipient inbox; defaults to `sbpatil2801@gmail.com` |
| `CONTACT_FROM_EMAIL` | no | verified sender; defaults to `onboarding@resend.dev` |
| `CONTACT_ALLOWED_ORIGINS` | no | comma-separated extra origins allowed via CORS. Usually leave unset — the form is same-origin on Vercel and no wildcard CORS is ever emitted. |

Or via CLI:

```bash
vercel env add RESEND_API_KEY production
vercel env add CONTACT_FROM_EMAIL production   # optional
```

After adding/changing env vars, **redeploy** — env vars are baked in at
deploy time.

## 4. Deploy and verify

1. Deploy the branch (Vercel Git integration or `vercel --prod`).
2. Smoke-test the endpoint directly:

   ```bash
   curl -sS -X POST https://<your-app>.vercel.app/api/contact \
     -H 'Content-Type: application/json' \
     -d '{"name":"Test","email":"you@example.com","message":"Hello from curl"}'
   ```

   Expected: `{"success":true}` and the mail arrives at `CONTACT_TO_EMAIL`
   (check spam on first delivery). The Resend dashboard → **Emails** shows
   every accepted message with delivery status.
3. Negative checks:

   ```bash
   # Missing fields → 400 with a human-readable error
   curl -sS -X POST https://<your-app>.vercel.app/api/contact \
     -H 'Content-Type: application/json' -d '{"name":"x"}'

   # GET → 405
   curl -sS -i https://<your-app>.vercel.app/api/contact | head -1
   ```
4. Finally, submit the real form on the site and confirm the success state.

## 5. Behaviour & security notes

- **POST only**; `OPTIONS` answered for preflight; other methods get 405.
- **Validation:** name ≤ 100 chars, email format + ≤ 254 chars,
  subject ≤ 150 chars, message ≤ 5000 chars. Malformed JSON → 400.
- **Honeypot:** the form includes a hidden `company` field. Humans never see
  it; if it arrives non-empty the API rejects the submission (bots).
- **No secrets or provider errors ever reach the client.** Resend failures
  are logged server-side (visible in Vercel → Functions logs) and the client
  gets a generic 502 with a "email me directly" fallback message.
- `{"success":true}` is returned **only after Resend accepted the message**.
- **CORS:** no `*` wildcard. Same-origin requests need no CORS at all;
  cross-origin callers must be allow-listed via `CONTACT_ALLOWED_ORIGINS`.
- `Reply-To` is set to the submitter's address, so hitting "Reply" in Gmail
  answers the actual sender.

## 6. Local checks

- `npm run check` runs the structural checks **plus** a static exercise of
  `api/contact.js` (`scripts/check-contact-api.mjs`) with mock request/
  response objects and a mocked `fetch` — validation, honeypot, method
  handling, and error-masking are verified without any network or API key.
- Live delivery cannot be tested locally without a key; it requires the
  Vercel env vars above and a deployed endpoint.

## Resume PDF

The resume download links point at `/Swapnil_Patil_Resume.pdf`. Drop the
final PDF at `public/Swapnil_Patil_Resume.pdf` and commit it; until then the
structural check reports it as *pending (expected missing)* rather than a
failure.
