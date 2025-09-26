import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"  // 👈 à importer
import "./globals.css"

export const metadata: Metadata = {
  title: "Mon Budget - Gestion financière en couple",
  description: "Gérez facilement vos finances, seul ou en couple",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head />
      <body className="font-sans antialiased">
        {children}

        {/* Script Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7969645992528567"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

