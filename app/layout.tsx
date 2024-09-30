import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "./globals.css";

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
        <body className={`${poppinsFont.className} antialiased bg-[#F5F5F5]`}>          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
