import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { EventStructuredData } from "./structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metrosexual Awareness Night",
  description: "Join us for a night of metrosexual awareness and celebration",
  openGraph: {
    title: "Metrosexual Awareness Night",
    description: "Join us for a night of metrosexual awareness and celebration",
    images: [
      {
        url: "https://www.metrosexualawareness.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Metrosexual Awareness Night Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metrosexual Awareness Night",
    description: "Join us for a night of metrosexual awareness and celebration",
    images: ["https://www.metrosexualawareness.com/og-image.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/man-logo.svg",
        type: "image/svg+xml",
      },
    ],
  },
  keywords: "metrosexual, awareness, event, celebration, fashion, grooming",
  authors: [{ name: "Maxwell Young", url: "https://maxwellyoung.info" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.metrosexualawareness.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <EventStructuredData />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GJPG14LXDN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GJPG14LXDN');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WC9WXF7S');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WC9WXF7S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
