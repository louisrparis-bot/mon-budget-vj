"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Home,
  Wifi,
  Car,
  ShoppingCart,
  GraduationCap,
  Heart,
  Gamepad2,
  CreditCard,
  MoreHorizontal,
  Shirt,
} from "lucide-react"

interface ExpenseFormProps {
  expenses: { [key: string]: number }
  onUpdateExpense: (category: string, value: number) => void
}

const expenseCategories = [
  {
    title: "Logement",
    icon: Home,
    items: [
      { key: "loyer", label: "Loyer / Crédit immobilier" },
      { key: "charges", label: "Charges de copropriété" },
      { key: "fonciere", label: "Taxe Foncière" },
    ],
  },
  {
    title: "Services & Assurances",
    icon: Wifi,
    items: [
      { key: "internet", label: "Box Internet" },
      { key: "tel", label: "Forfait Téléphone" },
      { key: "assurance", label: "Assurance Responsabilité civile" },
      { key: "mutuelle", label: "Mutuelle Santé" },
    ],
  },
  {
    title: "Transport",
    icon: Car,
    items: [
      { key: "voiture", label: "Frais voiture (essence, assurance)" },
      { key: "transports", label: "Transports en commun" },
    ],
  },
  {
    title: "Alimentation",
    icon: ShoppingCart,
    items: [
      { key: "courses", label: "Courses" },
      { key: "restaurant", label: "Restaurants / Sorties" },
    ],
  },
  {
    title: "Vêtements & Beauté",
    icon: Shirt,
    items: [
      { key: "vetements", label: "Vêtements" },
      { key: "coiffeur", label: "Coiffeur / Beauté" },
    ],
  },
  {
    title: "Éducation / Enfants",
    icon: GraduationCap,
    items: [
      { key: "scolarite", label: "Frais de scolarité" },
      { key: "garde", label: "Garde d'enfants" },
    ],
  },
  {
    title: "Santé",
    icon: Heart,
    items: [
      { key: "medicaux", label: "Frais médicaux non remboursés" },
      { key: "pharmacie", label: "Pharmacie" },
    ],
  },
  {
    title: "Loisirs & Abonnements",
    icon: Gamepad2,
    items: [
      { key: "loisirs", label: "Loisirs" },
      { key: "abonnements", label: "Abonnements divers" },
      { key: "vacances", label: "Vacances / Voyages" },
    ],
  },
  {
    title: "Crédits",
    icon: CreditCard,
    items: [{ key: "credits", label: "Crédit à la consommation / prêts personnels" }],
  },
  {
    title: "Autres",
    icon: MoreHorizontal,
    items: [{ key: "autres", label: "Autres dépenses" }],
  },
]

export function ExpenseForm({ expenses, onUpdateExpense }: ExpenseFormProps) {
  return (
    <div className="space-y-6">
      {expenseCategories.map((category) => {
        const Icon = category.icon
        return (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="h-5 w-5 text-primary" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {category.items.map((item) => (
                  <div key={item.key} className="space-y-2">
                    <Label htmlFor={item.key} className="text-sm font-medium">
                      {item.label}
                    </Label>
                    <div className="relative">
                      <Input
                        id={item.key}
                        type="number"
                        value={expenses[item.key] || 0}
                        onChange={(e) => onUpdateExpense(item.key, Number.parseFloat(e.target.value) || 0)}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
