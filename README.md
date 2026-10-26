# KGS public website

Public marketing website for Krishi Global Solutions, built with Next.js App Router and TypeScript. It includes the Home, About, Financial Solutions, Apply for Finance and Contact pages. Contact and finance enquiries are saved to the configured Google spreadsheet; no database or admin dashboard is part of this version.

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

## Google Sheets enquiry delivery

The contact and finance forms append successful submissions to the `Contact Enquiries` and `Finance Enquiries` tabs in the configured Google spreadsheet. Missing tabs are created with their column headers automatically.

1. Open [script.google.com](https://script.google.com/) while signed in to the Google account that can edit the spreadsheet. No Google Cloud Console project or service-account key is needed.
2. Create a project, replace its starter code with [`scripts/google-sheets-web-app.gs`](./scripts/google-sheets-web-app.gs), and save. In **Project Settings → Script Properties**, add `KGS_SHEETS_WEBHOOK_SECRET`; use the same secret as the website's `.env.local`. Never put the secret in the script source.
3. In Apps Script, choose **Deploy → New deployment → Web app**, set **Execute as** to yourself and **Who has access** to **Anyone**, then deploy and authorize access to the spreadsheet. The website's server calls the URL without signing in, so access restricted to your account will fail with HTTP 401/403. The script checks a shared webhook secret before it can write. Copy the deployed URL ending in `/exec`.
4. Create `.env.local` from `.env.example` and set the deployment URL and the same random secret used in the script:

   ```env
   KGS_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/12GY0BECOyodL-vocHhM41T7ZkuegN133IME7_aW-77s/edit
   KGS_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/your-deployment-id/exec
   KGS_SHEETS_WEBHOOK_SECRET=your-long-random-secret
   ```

   Generate a secret with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Add that value to Apps Script **Project Settings → Script Properties** with the property name `KGS_SHEETS_WEBHOOK_SECRET`. Never expose or commit the secret.
5. Restart the website and submit a test enquiry through its form. The script creates the `Contact Enquiries` and `Finance Enquiries` tabs with headers if missing. To update an existing deployment after changing its access or script, choose **Deploy → Manage deployments → Edit → New version → Deploy**, and keep using that deployment's `/exec` URL. Do not click **Run** for `doPost` in the Apps Script editor; the editor does not supply the HTTP event, so the function can only be tested by submitting the website form.

The spreadsheet link identifies the destination only; the Apps Script web app provides the authorization to write to it. Do not set the web app access to anyone unless the shared webhook secret is configured.

The finance form collects initial enquiry details only; it does not collect PAN, Aadhaar, bank statements, salary slips or other identity and financial documents. Restrict spreadsheet access to authorized staff because submissions contain personal information. The blank [enquiry workbook template](./templates/kgs-enquiry-template.xlsx) is for setting up the spreadsheet; do not store real customer submissions in the repository.

Regenerate the blank workbook after changing its columns with `npm run generate:enquiry-template`.

## Before launch

Confirm the approved company history, office addresses, official contact details, email sender domain, privacy and terms copy, and production hosting. The digital finance project is presented as coming soon.
