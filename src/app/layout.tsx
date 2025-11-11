// layout.tsx (Server Component)
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/containers/Header";
import { ThemeProvider } from "@/components/ThemeContext";
import ThemedBody from "@/components/ThemedBody";

const ibmMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishwang-Suthar",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ThemedBody className={`${ibmMono.className} antialiased`}>
          <Header />
          {children}
        </ThemedBody>
      </ThemeProvider>
    </html>
  );
}
