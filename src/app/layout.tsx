import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/containers/Header";
import { ThemeProvider } from "@/components/ThemeContext";
const ibmMono = IBM_Plex_Mono({
  // variable: "--font-ibm-plex-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishwang-Suthar",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${ibmMono.className}  antialiased`}>
          <Header />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
