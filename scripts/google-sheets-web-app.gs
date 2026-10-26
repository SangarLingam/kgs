const WEBHOOK_SECRET_PROPERTY = "KGS_SHEETS_WEBHOOK_SECRET";

const SHEET_HEADERS = {
  "Contact Enquiries": ["Timestamp", "Name", "Mobile", "Email", "Enquiry Type", "Message"],
  "Finance Enquiries": [
    "Timestamp",
    "Name",
    "Mobile",
    "Email",
    "City",
    "Applicant Type",
    "Finance Type",
    "Business Name",
    "Requested Amount (INR)",
    "Preferred Tenure",
    "Purpose",
  ],
};

function doPost(event) {
  try {
    const request = JSON.parse(event.postData.contents);
    const webhookSecret = PropertiesService.getScriptProperties().getProperty(WEBHOOK_SECRET_PROPERTY);
    if (
      !webhookSecret ||
      !request ||
      request.secret !== webhookSecret
    ) {
      return jsonResponse({ ok: false, error: "Unauthorized." });
    }

    const headers = SHEET_HEADERS[request.sheetName];
    if (!headers || !Array.isArray(request.row) || request.row.length !== headers.length) {
      return jsonResponse({ ok: false, error: "Invalid sheet or row." });
    }

    const match = String(request.spreadsheetUrl || "").match(
      /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,
    );
    if (!match) {
      return jsonResponse({ ok: false, error: "Invalid spreadsheet URL." });
    }

    const spreadsheet = SpreadsheetApp.openById(match[1]);
    const sheet = spreadsheet.getSheetByName(request.sheetName) || spreadsheet.insertSheet(request.sheetName);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
    } else {
      const existingHeaders = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
      if (headers.some((header, index) => existingHeaders[index] !== header)) {
        return jsonResponse({ ok: false, error: "Sheet headers do not match the expected columns." });
      }
    }

    const safeRow = request.row.map((value) => {
      if (typeof value === "number" && Number.isFinite(value)) return value;
      const text = String(value ?? "");
      return /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
    });
    sheet.appendRow(safeRow);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: "Could not save the enquiry." });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
