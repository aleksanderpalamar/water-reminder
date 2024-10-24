import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ServiceProvider } from "@/contexts/WaterIntakeContext";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'Water Reminder',
  description: 'An app to remind you to drink water regularly',
  manifest: '/manifest.json',
  themeColor: '#5DCCFC',
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </head>
        <body className={`${poppinsFont.className} antialiased bg-zinc-950 text-zinc-50 scrollbar-hide`}>
          <ServiceProvider>
            {children}
          </ServiceProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
