import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mon Budget - Gestion financière en couple",
  description: "Gérez facilement vos finances, seul ou en couple",
  generator: "v0.app",
  verification: {
    google: "<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7969645992528567"
     crossorigin="anonymous"></script>", // Remplace par ton vrai code Google ici (sans les guillemets ni la balise meta)
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Script Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7969645992528567"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
