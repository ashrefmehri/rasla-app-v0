import type { Metadata } from "next";
import { Lexend, Tajawal } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Rasla — votre vendeur IA sur Messenger",
  description:
    "Rasla répond à vos clients en derja, en arabizi, en français ou en arabe, et transforme chaque conversation en commande.",
  icons: { icon: "/brand/mark-teal.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${lexend.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
