import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriFeed | Premium Agricultural Feed Marketplace",
  description: "The modern marketplace for agricultural concentrates, roughages, and supplements. Quality feed for BHAROSA, NutriRich, and more.",
  keywords: ["agriculture", "feed", "livestock", "concentrates", "roughages", "marketplace"],
};

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <CartDrawer />
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
