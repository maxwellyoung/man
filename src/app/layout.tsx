import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metrosexual Awareness Night",
  description: "by Thom Haha & Maxwell Young",
  keywords: ["metrosexual", "awareness", "event", "Thom Haha", "Maxwell Young"],
  authors: [{ name: "Thom Haha" }, { name: "Maxwell Young" }],
  openGraph: {
    title: "Metrosexual Awareness Night",
    description: "Join us for a night of metrosexual awareness and celebration",
    url: "https://metrosexual-awareness-night.com",
    siteName: "Metrosexual Awareness Night",
    images: [
      {
        url: "https://metrosexual-awareness-night.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metrosexual Awareness Night",
    description: "Join us for a night of metrosexual awareness and celebration",
    images: ["https://metrosexual-awareness-night.com/twitter-image.jpg"],
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
