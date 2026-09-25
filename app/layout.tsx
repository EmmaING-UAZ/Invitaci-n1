import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruben & Susana · Revelación de género",
  description: "Nuestro pequeño universo crece. Acompáñanos a descubrir nuestra aventura más bonita.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
