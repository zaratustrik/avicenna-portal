import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Onest } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Авиценна — Медицинское образование нового уровня",
  description:
    "Высокотехнологичная экосистема для обучения врачей и студентов-медиков. Микрообучение, клинические случаи, НМО-аккредитация.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${dmSerifDisplay.variable} ${onest.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
