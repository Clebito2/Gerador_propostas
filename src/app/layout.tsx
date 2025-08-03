import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Inter as FontSans, Merriweather as FontSerif } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: 'AgeQuodAgis Live Proposals',
  description: 'Generate professional consulting proposals with the M.A.P.C.A framework.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
