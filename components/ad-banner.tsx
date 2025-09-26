"use client"
import { useEffect } from "react"

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error("Adsense error:", e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7969645992528567" // Ton ID client AdSense
      data-ad-slot="4619917888"               // Ton ID unité d'annonce (à remplacer)
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
