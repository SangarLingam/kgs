import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KGS | Financial Solutions. Structured for Growth.",
  description:
    "Krishi Global Solutions connects customers and businesses with structured financial solutions and professional partner networks.",
  applicationName: "Krishi Global Solutions",
  openGraph: {
    title: "Krishi Global Solutions | Financial solutions, structured for growth",
    description: "Explore financial options and understand your next steps with KGS.",
    siteName: "Krishi Global Solutions",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
