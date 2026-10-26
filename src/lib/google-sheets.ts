export class GoogleSheetsConfigurationError extends Error {}

export type SheetCell = string | number;

const defaultSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/12GY0BECOyodL-vocHhM41T7ZkuegN133IME7_aW-77s/edit";

export async function appendEnquiryToSheet(
  sheetName: "Contact Enquiries" | "Finance Enquiries",
  row: readonly SheetCell[],
) {
  const webAppUrl = process.env.KGS_SHEETS_WEB_APP_URL;
  const secret = process.env.KGS_SHEETS_WEBHOOK_SECRET;
  const spreadsheetUrl = process.env.KGS_GOOGLE_SHEET_URL || defaultSpreadsheetUrl;

  if (!webAppUrl || !secret) {
    throw new GoogleSheetsConfigurationError(
      "Set KGS_SHEETS_WEB_APP_URL and KGS_SHEETS_WEBHOOK_SECRET to enable Google Sheets submissions.",
    );
  }

  let parsedSheetUrl: URL;
  let parsedWebAppUrl: URL;
  try {
    parsedSheetUrl = new URL(spreadsheetUrl);
    parsedWebAppUrl = new URL(webAppUrl);
  } catch {
    throw new GoogleSheetsConfigurationError("The Google Sheet and Apps Script web app URLs must be valid URLs.");
  }
  if (
    parsedSheetUrl.protocol !== "https:" ||
    parsedSheetUrl.hostname !== "docs.google.com" ||
    !parsedSheetUrl.pathname.startsWith("/spreadsheets/d/") ||
    parsedWebAppUrl.protocol !== "https:" ||
    parsedWebAppUrl.hostname !== "script.google.com" ||
    !parsedWebAppUrl.pathname.startsWith("/macros/s/")
  ) {
    throw new GoogleSheetsConfigurationError("Configure a Google Sheets URL and a deployed Google Apps Script web app URL.");
  }

  let response: Response;
  try {
    response = await fetch(parsedWebAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, spreadsheetUrl, sheetName, row }),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("Could not connect to the Google Sheets web app.");
  }
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `Google Apps Script denied access (HTTP ${response.status}). In the web app deployment, set "Execute as" to yourself and "Who has access" to anyone, then deploy a new version.`,
      );
    }
    throw new Error(`Google Sheets web app returned HTTP ${response.status}.`);
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("Google Sheets web app returned an invalid response.");
  }
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    const remoteError =
      result &&
      typeof result === "object" &&
      "error" in result &&
      typeof result.error === "string"
        ? result.error.replace(/[\r\n\t]/g, " ").slice(0, 200)
        : "";
    throw new Error(
      remoteError
        ? `Google Sheets web app rejected the enquiry: ${remoteError}`
        : "Google Sheets web app did not confirm the enquiry was saved.",
    );
  }
}
