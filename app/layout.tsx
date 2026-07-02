import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopify Product Importer",
  description: "Import products, rewrite copy with Claude, build custom pages",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
