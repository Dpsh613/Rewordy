import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rewordy | Your writing assistant",
  description: "Tiny AI writing assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
