import type { Metadata } from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets:["latin"],
  weight:["300","400","500","600","700"],
  variable: "--font-sans",
})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Medi Health",
  description: "A patient management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('antialiased bg-gray-50 min-h-screen font-sans',fontSans.variable) }
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
