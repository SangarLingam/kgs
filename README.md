# KGS public website

Public marketing website for Krishi Global Solutions, built with Next.js App Router and TypeScript. It includes the Home, About, Financial Solutions, Apply for Finance and Contact pages. Contact and finance enquiries are sent by email; no database or admin dashboard is part of this version.

Brand palette is matched to the supplied logo reference: lime green (`#B0D252`), cyan (`#00A7DE`) and near-black. The supplied logo artwork is included as optimized assets in `public/` and used in the header, footer and favicon.

## Run locally

Requires Node.js 20.9 or later and npm. A verified Node.js 24 LTS runtime and npm are included locally under `.tools` in this workspace.

```powershell
$nodeHome = (Resolve-Path '.tools/node-v24.20.0-win-x64').Path
$env:PATH = "$nodeHome;$env:PATH"
npm.cmd install --cache .npm-cache
npm.cmd run dev
```

The project includes optimized full-logo and transparent wordmark PNGs under `public/`.

## Contact enquiry delivery

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` to the API key for the email delivery account.
- `KGS_INBOX` to the approved KGS inbox that should receive enquiries.
- `KGS_FROM_EMAIL` to a sender address verified with that email provider.

Without these values the forms show a delivery error and do not claim that an enquiry was sent. The finance form collects initial enquiry details only; it does not collect PAN, Aadhaar, bank statements, salary slips or other identity and financial documents.

## Before launch

Confirm the approved company history, office address, official contact details, email sender domain, privacy and terms copy, and production hosting. The 2027 digital finance project is presented only as a future roadmap item.
