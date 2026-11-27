import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TCE Cyclothon 2027 | Pedal No to Drug",
  description:
    "Join TCE Cyclothon on 7 February 2027 in Madurai. Choose a 5, 15, or 25 KM ride and support drug awareness under United Nations Sustainable Development Goal 3, Target 3.5.",
  keywords: [
    "TCE Cyclothon",
    "Pedal No to Drug",
    "Madurai",
    "anti-drug awareness",
    "cycling event",
    "SDG 3",
    "Thiagarajar College of Engineering",
  ],
  openGraph: {
    title: "TCE Cyclothon 2027 | Pedal No to Drug",
    description:
      "TCE Cyclothon 2027 in Madurai. Ride 5, 15, or 25 KM to support drug awareness.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
