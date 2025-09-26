"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdBanner from "./ad-banner" // export default
import { PiggyBank, TrendingUp, Shield } from "lucide-react"
import React from "react"

interface Tip {
  icon: React.ElementType
  title: string
  content: string
}

export default function TipsContent() {
  const tips: Tip[] = [
    {
      icon: PiggyBank,
      title: "Règle des 50/30/20",
      content: "Allouez 50% de vos revenus aux besoins essentiels, 30% aux loisirs et 20% à l'épargne.",
    },
    {
      icon: TrendingUp,
      title: "Automatisez votre épargne",
      content: "Mettez en place des virements automatiques vers votre compte épargne dès réception de votre salaire.",
    },
    {
      icon: Shield,
      title: "Constituez un fonds d'urgence",
      content: "Visez 3 à 6 mois de charges courantes dans un livret facilement accessible.",
    },
  ] || [] // fallback si undefined

  if (tips.length === 0) {
    return <p>Aucun conseil disponible pour le moment.</p>
  }

  return (
    <div className="space-y-6">
      {/* Bannière publicitaire en haut */}
      <AdBanner />

      <div className="grid gap-6">
        {tips.map((tip, index) => (
          <div key={index}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <tip.icon className="h-5 w-5 text-primary" />
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.content}</p>
              </CardContent>
            </Card>

            {/* Contenu sponsorisé après le 2ème conseil */}
            {index === 1 && (
              <div className="mt-4">
                <AdBanner />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bannière publicitaire en bas */}
      <AdBanner />
    </div>
  )
}

