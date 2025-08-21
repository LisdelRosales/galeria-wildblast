import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Galería Wild Blast - Artworks Digitales",
    template: "%s | Galería Wild Blast",
  },
  description: "Descubre y descarga artworks digitales únicos. Galería de arte digital con descargas gratuitas para uso personal no comercial.",
  keywords: ["arte digital", "galería", "artworks", "descargas", "wild blast"],
  authors: [{ name: "Wild Blast" }],
  creator: "Wild Blast",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Galería Wild Blast - Artworks Digitales",
    description: "Descubre y descarga artworks digitales únicos. Galería de arte digital con descargas gratuitas para uso personal no comercial.",
    siteName: "Galería Wild Blast",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galería Wild Blast - Artworks Digitales",
    description: "Descubre y descarga artworks digitales únicos. Galería de arte digital con descargas gratuitas para uso personal no comercial.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
