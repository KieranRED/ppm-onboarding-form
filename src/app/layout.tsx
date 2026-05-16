import type { Metadata } from "next";
import "./globals.css";
import { Lexend_Mega, Public_Sans } from "next/font/google";

const lexendMega = Lexend_Mega({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PPM — Client Onboarding",
  description: "Power Performance Marketing — let's build your marketing machine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexendMega.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
