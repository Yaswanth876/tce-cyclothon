import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TCE Cyclothon — Pedal to No Drug | Madurai District Edition",
  description:
    "Join Thiagarajar College of Engineering's cyclothon for a drug-free Madurai. Choose your distance: 5 KM Fun Ride, 15 KM Challenger, or 25 KM Champion. Organized under UN SDG 3 · Target 3.5.",
  keywords: [
    "TCE Cyclothon",
    "Pedal to No Drug",
    "Madurai",
    "anti-drug awareness",
    "cycling event",
    "SDG 3",
    "Thiagarajar College of Engineering",
  ],
  openGraph: {
    title: "TCE Cyclothon — Pedal to No Drug",
    description:
      "Madurai District Edition. 5 KM · 15 KM · 25 KM. Join us for a drug-free future.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
