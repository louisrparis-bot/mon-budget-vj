"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetCharts, IncomeDistributionChart } from "@/components/budget-charts"
import { BudgetSummary } from "@/components/budget-summary"
import { ExpenseForm } from "@/components/expense-form"
import { IncomeForm } from "@/components/income-form"
import { RotateCcw, Users, TrendingUp, TrendingDown, Lightbulb } from "lucide-react"
import { TipsContent } from "@/components/tips-content"
import AdBanner from "@/components/ad-banner"  // Import corrigé peut être sans accolades selon export

interface BudgetData {
  person1Income: number
  person2Income: number
  expenses: {
    [key: string]: number
  }
}

const defaultExpenses = {
  loyer: 800,
  charges: 100,
  fonciere: 80,
  internet: 30,
  tel: 40,
  assurance: 20,
  mutuelle: 100,
  voiture: 150,
  transports: 60,
  courses: 400,
  restaurant: 0,
  vetements: 0,
  coiffeur: 0,
  scolarite: 0,
  garde: 0,
  medicaux: 0,
  pharmacie: 0,
  loisirs: 150,
  abonnements: 0,
  vacances: 0,
  credits: 0,
  autres: 100,
}

export default function BudgetApp() {
  const [budgetData, setBudgetData] = useState<BudgetData>({
    person1Income: 1500,
    person2Income: 1000,
    expenses: defaultExpenses,
  })

  const totalIncome = budgetData.person1Income + budgetData.person2Income
  const totalExpenses = Object.values(budgetData.expenses).reduce((sum, expense) => sum + expense, 0)
  const savings = totalIncome - totalExpenses
  const savingsPercentage = totalIncome > 0 ? (savings / totalIncome) * 100 : 0

  useEffect(() => {
    const saved = localStorage.getItem("budgetCouple")
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setBudgetData(data)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("budgetCouple", JSON.stringify(budgetData))
  }, [budgetData])

  const updateIncome = (person: "person1" | "person2", value: number) => {
    setBudgetData((prev) => ({
      ...prev,
      [`${person}Income`]: value,
    }))
  }

  const updateExpense = (category: string, value: number) => {
    setBudgetData((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: value,
      },
    }))
  }

  const resetData = () => {
    const zeroExpenses = Object.keys(defaultExpenses).reduce(
      (acc, key) => {
        acc[key] = 0
        return acc
      },
      {} as { [key: string]: number },
    )

    setBudgetData({
      person1Income: 0,
      person2Income: 0,
      expenses: zeroExpenses,
    })
    localStorage.removeItem("budgetCouple")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-balance">Mon Budget</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Gérez facilement vos finances, seul ou en couple. Toutes vos données sont sauvegardées automatiquement dans
            votre navigateur.
          </p>
        </div>

        {/* Summary Cards */}
        <BudgetSummary
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          savings={savings}
          savingsPercentage={savingsPercentage}
        />

        {/* AdSense Banner */}
        <div className="mt-6">
          <AdBanner />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            <Tabs defaultValue="revenus" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="revenus" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Revenus
                </TabsTrigger>
                <TabsTrigger value="depenses" className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Dépenses
                </TabsTrigger>
                <TabsTrigger value="conseils" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Conseils
                </TabsTrigger>
              </TabsList>

              <TabsContent value="revenus" className="space-y-6">
                <IncomeForm
                  person1Income={budgetData.person1Income}
                  person2Income={budgetData.person2Income}
                  onUpdateIncome={updateIncome}
                />
                <IncomeDistributionChart
                  person1Income={budgetData.person1Income}
                  person2Income={budgetData.person2Income}
                />
              </TabsContent>

              <TabsContent value="depenses" className="space-y-6">
                <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground text-center">
                    💡 <strong>Astuce :</strong> Remplissez vos dépenses mensuelles dans les catégories ci-dessous pour
                    obtenir une analyse précise de votre budget.
                  </p>
                </div>
                <ExpenseForm expenses={budgetData.expenses} onUpdateExpense={updateExpense} />
              </TabsContent>

              <TabsContent value="conseils" className="space-y-6">
                <TipsContent />
              </TabsContent>
            </Tabs>

            <Card>
              <CardContent className="pt-6">
                <Button onClick={resetData} variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Réinitialiser les données
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Charts */}
          <div>
            <BudgetCharts
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              savings={savings}
              expenses={budgetData.expenses}
              person1Income={budgetData.person1Income}
              person2Income={budgetData.person2Income}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

