import ExcelJS from "exceljs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "templates");
const outputPath = path.join(outputDirectory, "kgs-enquiry-template.xlsx");

const workbook = new ExcelJS.Workbook();
workbook.creator = "Krishi Global Solutions";
workbook.subject = "Blank template for KGS enquiry tracking";
workbook.title = "KGS Enquiry Tracking Template";
workbook.created = new Date("2026-01-01T00:00:00Z");
workbook.modified = new Date("2026-01-01T00:00:00Z");

const sheets = [
  {
    name: "Contact Enquiries",
    columns: [
      ["Timestamp", 24],
      ["Name", 28],
      ["Mobile", 20],
      ["Email", 32],
      ["Enquiry Type", 24],
      ["Message", 60],
    ],
  },
  {
    name: "Finance Enquiries",
    columns: [
      ["Timestamp", 24],
      ["Name", 28],
      ["Mobile", 20],
      ["Email", 32],
      ["City", 22],
      ["Applicant Type", 22],
      ["Finance Type", 24],
      ["Business Name", 30],
      ["Requested Amount (INR)", 24],
      ["Preferred Tenure", 24],
      ["Purpose", 60],
    ],
  },
];

for (const definition of sheets) {
  const sheet = workbook.addWorksheet(definition.name);
  sheet.columns = definition.columns.map(([header, width]) => ({
    header,
    key: header,
    width,
  }));
  sheet.getRow(1).height = 28;
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF18211D" },
  };
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: definition.columns.length },
  };
}

await mkdir(outputDirectory, { recursive: true });
await workbook.xlsx.writeFile(outputPath);
console.log(`Created ${path.relative(root, outputPath)}`);
