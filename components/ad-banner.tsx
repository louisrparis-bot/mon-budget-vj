"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Star } from "lucide-react"

interface AdBannerProps {
  type?: "banner" | "card" | "sponsored-content"
  size?: "small" | "medium" | "large"
}

export function AdBanner({ type = "banner", size = "medium" }: AdBannerProps) {
  const ad = {
    title: "Boursorama Banque",
    description: "Compte gratuit + 80€ offerts",
    cta: "Découvrir l'offre",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-900",
  }

  // Initialiser Google AdSense quand le composant est monté
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error("Erreur Google AdSense:", e)
    }
  }, [])

  const googleAd = (
    <ins
      className="adsbygoogle"
      style={{ display: "block", margin: "1rem 0" }}
      data-ad-client="ca-pub-2630575387"   // Ton ID client AdSense
      data-ad-slot="4619917888"             // Ton ID d'unité d'annonce
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )

  if (type === "banner") {
    return (
      <div className={`${ad.color} border rounded-lg p-3 ${size === "small" ? "text-sm" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                Sponsorisé
              </span>
              <h4 className={`font-semibold ${ad.textColor}`}>{ad.title}</h4>
            </div>
            <p className={`${ad.textColor} opacity-80 mt-1`}>{ad.description}</p>
            {/* Afficher la pub Google AdSense ici */}
            {googleAd}
          </div>
          <button className={`${ad.textColor} hover:opacity-80 flex items-center gap-1 text-sm font-medium`}>
            {ad.cta}
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    )
  }

  if (type === "sponsored-content") {
    return (
      <Card className="border-l-4 border-l-yellow-400">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">Conseil Sponsorisé</span>
          </div>
          <h3 className="font-semibold mb-2">{ad.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{ad.description}</p>
          <button className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
            {ad.cta}
            <ExternalLink className="h-3 w-3" />
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={ad.color}>
      <CardContent className="pt-4">
        <div className="text-center">
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Publicité</span>
          <h4 className={`font-semibold mt-2 ${ad.textColor}`}>{ad.title}</h4>
          <p className={`${ad.textColor} opacity-80 text-sm mt-1`}>{ad.description}</p>
          {/* Afficher la pub Google AdSense ici aussi */}
          {googleAd}
          <button
            className={`mt-3 ${ad.textColor} hover:opacity-80 text-sm font-medium flex items-center gap-1 mx-auto`}
          >
            {ad.cta}
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

