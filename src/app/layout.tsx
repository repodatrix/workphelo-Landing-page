import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workphelo ERP — One Platform. One Login. Complete Business Visibility.",
  description:
    "Workphelo unifies HR, Marketing, Sales, Accounting, Operations, Fleet Management, and Executive Reporting into one intelligent platform built for African businesses. Join the waitlist.",
  keywords: [
    "Workphelo",
    "ERP",
    "enterprise resource planning",
    "HR management",
    "accounting software",
    "marketing automation",
    "operations management",
    "business intelligence",
    "Africa",
    "Ghana",
    "Datrix Tech Solutions",
  ],
  authors: [{ name: "Datrix Tech Solutions" }],
  openGraph: {
    title: "Workphelo ERP — One Platform. Complete Business Visibility.",
    description:
      "The all-in-one ERP platform built for African businesses. HR, Accounting, Marketing, Operations — unified.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workphelo ERP",
    description:
      "The all-in-one ERP platform built for African businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}