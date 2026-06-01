import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stallion Advertising",
    template: "%s | Stallion Advertising",
  },
  description: "A 360° agency empowering businesses to thrive in the digital landscape through innovative marketing, development and advertising solutions.",
  keywords: ["advertising", "marketing", "web development", "lead generation", "Casablanca", "Morocco"],
  authors: [{ name: "Stallion Advertising" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Stallion Advertising",
    title: "Stallion Advertising — Brands that refuse to slow down.",
    description: "A 360° creative & performance studio building brands, sites and campaigns that move.",
    images: [{ url: "/assets/logo-color.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stallion Advertising",
    description: "A 360° creative & performance studio building brands, sites and campaigns that move.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
