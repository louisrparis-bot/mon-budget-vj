import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, PiggyBank, Euro } from "lucide-react"

interface BudgetSummaryProps {
  totalIncome: number
  totalExpenses: number
  savings: number
  savingsPercentage: number
}

export function BudgetSummary({ totalIncome, totalExpenses, savings, savingsPercentage }: BudgetSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{totalIncome.toLocaleString("fr-FR")} €</div>
          <p className="text-xs text-muted-foreground">Revenus nets après impôts du foyer</p>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dépenses totales</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{totalExpenses.toLocaleString("fr-FR")} €</div>
          <p className="text-xs text-muted-foreground">Charges mensuelles</p>
        </CardContent>
      </Card>

      <Card className={`${savings >= 0 ? "border-cyan-500/20" : "border-destructive/20"}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Épargne</CardTitle>
          <PiggyBank className={`h-4 w-4 ${savings >= 0 ? "text-cyan-500" : "text-destructive"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${savings >= 0 ? "text-cyan-500" : "text-destructive"}`}>
            {savings.toLocaleString("fr-FR")} €
          </div>
          <p className="text-xs text-muted-foreground">{savings >= 0 ? "Capacité d'épargne" : "Déficit budgétaire"}</p>
        </CardContent>
      </Card>

      <Card className={`${savingsPercentage >= 0 ? "border-cyan-500/20" : "border-destructive/20"}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux d'épargne</CardTitle>
          <Euro className={`h-4 w-4 ${savingsPercentage >= 0 ? "text-cyan-500" : "text-destructive"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${savingsPercentage >= 0 ? "text-cyan-500" : "text-destructive"}`}>
            {savingsPercentage.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">Du revenu total</p>
        </CardContent>
      </Card>
    </div>
  )
}
