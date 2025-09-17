import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import { ToastProvider, ToastContainer } from "../components/toast/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XenlixAI | AI Marketing Automation Platform for Small Business",
  description: "AI-powered marketing & website automation platform. XenlixAI helps businesses scale with AI-driven ad creation, website optimization, SEO automation, and analytics dashboards.",
  keywords: "AI marketing automation, AI SEO tools, AI website builder, AI ad creator, small business marketing, Dallas AI agency",
  authors: [{ name: "XenlixAI" }],
  robots: process.env.APP_ENV === 'production' ? "index, follow" : "noindex, nofollow",
  openGraph: {
    title: "XenlixAI | AI Marketing Automation Platform",
    description: "Scale your business with AI-driven marketing automation, website building, and SEO optimization.",
    url: "https://www.xenlixai.com",
    siteName: "XenlixAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@xenlixai",
    creator: "@xenlixai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "XenlixAI",
    "legalName": "XenlixAI LLC",
    "url": "https://www.xenlixai.com",
    "logo": "https://www.xenlixai.com/logo.png",
    "description": "AI-powered marketing & website automation platform. XenlixAI helps businesses scale with AI-driven ad creation, website optimization, SEO automation, and analytics dashboards.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dallas",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.7767,
      "longitude": -96.7970
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": ["US", "CA", "GB", "AU"]
    },
    "sameAs": [
      "https://x.com/xenlixai",
      "https://www.linkedin.com/company/xenlixai"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 32.7767,
        "longitude": -96.7970
      },
      "geoRadius": "global"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
