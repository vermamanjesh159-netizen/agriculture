import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgriFeed | Premium Agricultural Feed Marketplace",
  description: "The modern marketplace for agricultural concentrates, roughages, and supplements. Quality feed for BHAROSA, NutriRich, and more.",
  keywords: ["agriculture", "feed", "livestock", "concentrates", "roughages", "marketplace"],
};

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            var theme = localStorage.getItem('theme');
            if (theme === 'dark' || theme === 'light') {
              document.documentElement.setAttribute('data-theme', theme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.setAttribute('data-theme', 'dark');
            } else {
              document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `}} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <div style={{ flex: 1 }}>
                {children}
              </div>
              <Footer />
            </div>
            <ChatAssistant />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
