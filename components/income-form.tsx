"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

interface IncomeFormProps {
  person1Income: number
  person2Income: number
  onUpdateIncome: (person: "person1" | "person2", value: number) => void
}

export function IncomeForm({ person1Income, person2Income, onUpdateIncome }: IncomeFormProps) {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <User className="h-3 w-3" />
            </div>
            Personne 1
          </CardTitle>
          <CardDescription>Revenus nets mensuels après impôts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="person1-income">Salaire net (€)</Label>
            <Input
              id="person1-income"
              type="number"
              value={person1Income}
              onChange={(e) => onUpdateIncome("person1", Number.parseFloat(e.target.value) || 0)}
              className="text-lg font-semibold"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <User className="h-3 w-3" />
            </div>
            Personne 2
          </CardTitle>
          <CardDescription>Revenus nets mensuels après impôts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="person2-income">Salaire net (€)</Label>
            <Input
              id="person2-income"
              type="number"
              value={person2Income}
              onChange={(e) => onUpdateIncome("person2", Number.parseFloat(e.target.value) || 0)}
              className="text-lg font-semibold"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
