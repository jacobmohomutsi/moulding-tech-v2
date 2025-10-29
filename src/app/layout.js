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
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      "/favicon.ico",
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#0ea5e9" }, // optional
    ],
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.brand,
    locale: "en_ZA",
    type: "website",
  },
};

const poppins = Poppins({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-poppins" });
const roboto = Roboto({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-roboto" });
const raj = Rajdhani({ weight: ["500"], subsets: ["latin"], variable: "--font-rajdhani" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} ${raj.variable}`}>
      <body className="bg-white text-[var(--charcoal)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
