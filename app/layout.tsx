import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { TelegramBar } from "@/components/TelegramBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { CartFavoritesProvider } from "@/components/CartFavoritesProvider";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Luxe Segment",
  description: "Premium catalog — consultations and orders via Telegram",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <CartFavoritesProvider>
            <TelegramBar />
            <Header />
            <Breadcrumbs />
            <main className="flex-1 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))]">
              {children}
            </main>
            <Footer />
          </CartFavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
