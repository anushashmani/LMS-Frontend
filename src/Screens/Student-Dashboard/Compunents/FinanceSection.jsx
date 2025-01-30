import { useEffect, useState } from "react"
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { useAuth } from "@/Context/AuthContext"

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
]

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#0561a6",
  },
  notCompleted: {
    label: "Not Completed",
    color: "#e63946",
  },
  pending: {
    label: "Pending",
    color: "#fca311",
  },
}

export default function AssignmentPerformanceChart() {
  const { assignments } = useAuth()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const processedData = processAssignments(assignments)
    setChartData(processedData)
  }, [assignments])

  const processAssignments = (assignments) => {
    const data = months.map(month => ({
      month,
      completed: 0,
      notCompleted: 0,
      pending: 0,
    }))

    assignments.forEach(assignment => {
      const submissionDate = new Date(assignment.deadline)
      const monthIndex = submissionDate.getMonth()
      const status = assignment.status.toLowerCase()

      if (status === 'completed') {
        data[monthIndex].completed++
      } else if (status === 'not completed') {
        data[monthIndex].notCompleted++
      } else if (status === 'pending') {
        data[monthIndex].pending++
      }
    })

    return data
  }

  const calculateTrend = () => {
    if (chartData.length < 2) return 0
    const currentMonth = chartData[chartData.length - 1]
    const previousMonth = chartData[chartData.length - 2]
    const currentTotal = currentMonth.completed + currentMonth.pending
    const previousTotal = previousMonth.completed + previousMonth.pending
    return ((currentTotal - previousTotal) / previousTotal) * 100
  }

  const trend = calculateTrend()

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Assignment Performance</CardTitle>
        <CardDescription>Your assignment submission status for the year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={700} height={350} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} stackId="a" />
            <Bar dataKey="notCompleted" fill="var(--color-notCompleted)" radius={4} stackId="a" />
            <Bar dataKey="pending" fill="var(--color-pending)" radius={4} stackId="a" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend > 0 ? "Trending up" : "Trending down"} by {Math.abs(trend).toFixed(1)}% this month{" "}
          <TrendingUp className={`h-4 w-4 ${trend >= 0 ? "text-green-500" : "text-red-500"}`} />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing assignment submission status for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
