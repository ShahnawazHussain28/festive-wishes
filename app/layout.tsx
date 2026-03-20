import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Magical Eid Wish For You ✨",
  description:
    "I've sent you a personalized starlit blessing. Tap to experience the magic.",
  themeColor: "#090b1e",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  icons: {
    icon: "/moon.png",
    apple: "/moon.png",
  },
  openGraph: {
    title: "A Magical Wish for You ✨",
    description: "Open to reveal a special Eid experience curated just for you.",
    url: "https://eid-moon-hunt.vercel.app",
    siteName: "Eid Moon Hunt",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Special Eid Gift Awaits... ✨",
    description:
      "A moment of peace and a personalized blessing is waiting for you. Tap to experience.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-full">{children}</body>
    </html>
  );
}
