import "./globals.css";
import { Poppins, Roboto, Rajdhani } from "next/font/google";
import { SITE } from "../lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.description,
  keywords: [
    "plastic moulding",
    "mould design",
    "tooling South Africa",
    "SolidCAM reseller",
    "CNC CAM programming",
    "Pretoria East engineering",
    "Rosslyn toolmakers",
    "PTSA qualified toolmakers",
    "precision machining",
    "injection moulding Pretoria"
  ],
  authors: [{ name: SITE.brand }],
  creator: SITE.brand,
  publisher: SITE.brand,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "32x32", type: "image/png" },
      "/favicon.ico",
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#0ea5e9" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.brand,
    images: [
      {
        url: "/images/brandmark-light-avatar.png",
        width: 512,
        height: 512,
        alt: `${SITE.brand} Logo`,
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/brandmark-light-avatar.png"],
  },
};

const poppins = Poppins({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-poppins" });
const roboto = Roboto({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-roboto" });
const raj = Rajdhani({ weight: ["500"], subsets: ["latin"], variable: "--font-rajdhani" });

import { generateLocalBusinessSchema, generateOrganizationSchema } from "../lib/schema";

export default function RootLayout({ children }) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} ${raj.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-white text-[var(--charcoal)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
