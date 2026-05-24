import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikhil Maturi | AI for Science",
  description:
    "Personal website for Nikhil Maturi: research, writing, and contact information across AI for science.",
  openGraph: {
    title: "Nikhil Maturi | AI for Science",
    description:
      "Research, writing, and interactive notes across AI for science.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
