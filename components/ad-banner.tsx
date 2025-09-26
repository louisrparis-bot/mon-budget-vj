"use client"
import { useEffect } from "react"

interface AdBannerProps {
  slot: string // ID du bloc d'annonce AdSense
  style?: React.CSSProperties
  format?: string
}

export default function AdBanner({
  slot,
  style = { display: "block" },
  format = "auto",
}: AdBannerProps) {
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
      style={style}
      data-ad-client="ca-pub-7969645992528567" // Ton ID client AdSense
      data-ad-slot={slot}                         // ID du bloc passé en prop
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}

