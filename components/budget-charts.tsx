"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, LabelList } from "recharts"
import {
  Home,
  Wifi,
  Heart,
  Car,
  ShoppingCart,
  GraduationCap,
  Gamepad2,
  CreditCard,
  MoreHorizontal,
  Shirt,
  User,
} from "lucide-react"

interface BudgetChartsProps {
  totalIncome: number
  totalExpenses: number
  savings: number
  expenses: { [key: string]: number }
  person1Income: number
  person2Income: number
}

const expenseCategories = [
  {
    title: "Logement",
    icon: Home,
    keys: ["loyer", "charges", "fonciere"],
  },
  {
    title: "Services & Assurances",
    icon: Wifi,
    keys: ["internet", "tel", "assurance", "mutuelle"],
  },
  {
    title: "Transport",
    icon: Car,
    keys: ["voiture", "transports"],
  },
  {
    title: "Alimentation",
    icon: ShoppingCart,
    keys: ["courses", "restaurant"],
  },
  {
    title: "Vêtements & Beauté",
    icon: Shirt,
    keys: ["vetements", "coiffeur"],
  },
  {
    title: "Éducation / Enfants",
    icon: GraduationCap,
    keys: ["scolarite", "garde"],
  },
  {
    title: "Santé",
    icon: Heart,
    keys: ["medicaux", "pharmacie"],
  },
  {
    title: "Loisirs & Abonnements",
    icon: Gamepad2,
    keys: ["loisirs", "abonnements", "vacances"],
  },
  {
    title: "Crédits",
    icon: CreditCard,
    keys: ["credits"],
  },
  {
    title: "Autres",
    icon: MoreHorizontal,
    keys: ["autres"],
  },
]

const chartColors = [
  "hsl(12, 76%, 61%)",
  "hsl(173, 58%, 39%)",
  "hsl(197, 37%, 24%)",
  "hsl(43, 74%, 66%)",
  "hsl(27, 87%, 67%)",
]

const CustomLabel = (props: any) => {
  const { x, y, width, height, value } = props
  const labelY = y + height / 2
  const labelX = x + width / 2

  return (
    <text
      x={labelX}
      y={labelY}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="14"
      fontWeight="600"
    >
      {`${Number(value).toLocaleString("fr-FR")} €`}
    </text>
  )
}

const CustomPieLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, name, value } = props
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.75
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const category = expenseCategories.find((cat) => cat.title === name)
  const IconComponent = category ? category.icon : MoreHorizontal

  return (
    <g>
      <foreignObject x={x - 12} y={y - 12} width="24" height="24">
        <div className="flex items-center justify-center w-6 h-6">
          <IconComponent className="w-4 h-4 text-white drop-shadow-sm" />
        </div>
      </foreignObject>
    </g>
  )
}

export function BudgetCharts({
  totalIncome,
  totalExpenses,
  savings,
  expenses,
  person1Income,
  person2Income,
}: BudgetChartsProps) {
  const barData = [
    {
      name: "Revenus",
      value: totalIncome,
      fill: "hsl(142, 76%, 36%)", // Green matching text-primary
    },
    {
      name: "Dépenses",
      value: totalExpenses,
      fill: "hsl(0, 84%, 60%)", // Red matching text-destructive
    },
    {
      name: "Épargne",
      value: Math.max(0, savings),
      fill: "hsl(188, 94%, 42%)", // Turquoise matching text-cyan-500
    },
  ]

  const expenseData = expenseCategories
    .map((category, index) => {
      const categoryTotal = category.keys.reduce((sum, key) => sum + (expenses[key] || 0), 0)
      return {
        name: category.title,
        value: categoryTotal,
        fill: chartColors[index % chartColors.length],
        icon: category.icon,
      }
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vue d'ensemble du budget</CardTitle>
          <CardDescription>Comparaison revenus, dépenses et épargne</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Montant (€)",
              },
            }}
            className="h-[280px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} barCategoryGap="20%">
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} height={40} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                  tickFormatter={(value) => `${Number(value).toLocaleString("fr-FR")} €`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${Number(value).toLocaleString("fr-FR")} €`, ""]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  <LabelList content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {expenseData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
            <CardDescription>Détail des postes de dépenses par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Dépenses (€)",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    paddingAngle={1}
                    dataKey="value"
                    labelLine={false}
                    label={CustomPieLabel}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${Number(value).toLocaleString("fr-FR")} €`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              {expenseData.slice(0, 8).map((entry, index) => {
                const IconComponent = entry.icon
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.fill }} />
                    <IconComponent className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">
                      {entry.name}: {entry.value.toLocaleString("fr-FR")} €
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export function IncomeDistributionChart({
  person1Income,
  person2Income,
}: {
  person1Income: number
  person2Income: number
}) {
  const incomeData = [
    {
      name: "Personne 1",
      value: person1Income,
      fill: "hsl(142, 76%, 36%)", // Green matching text-primary
    },
    {
      name: "Personne 2",
      value: person2Income,
      fill: "hsl(188, 94%, 42%)", // Turquoise matching text-cyan-500
    },
  ]

  return (
    <Card className="mt-4">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Répartition des revenus</CardTitle>
        <CardDescription className="text-sm">Contribution de chaque personne</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <ChartContainer
              config={{
                value: {
                  label: "Revenus (€)",
                },
              }}
              className="h-[140px] w-[140px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${Number(value).toLocaleString("fr-FR")} €`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="flex-1 space-y-2">
            {incomeData.map((entry, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.fill }} />
                <div className="bg-primary text-primary-foreground rounded-full p-1">
                  <User className="h-3 w-3" />
                </div>
                <span className="text-sm font-medium">{entry.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{entry.value.toLocaleString("fr-FR")} €</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
