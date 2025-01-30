import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

const COLORS = ["#10B981", "#3B82F6", "#EF4444"]

export const AssignmentStatusChart = ({ submitted, pending, notCompleted }) => {
  const total = submitted + pending + notCompleted
  const data = [
    { name: "Submitted", value: submitted },
    { name: "Pending", value: pending },
    { name: "Not Completed", value: notCompleted },
  ]

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">Assignment Status Overview</CardTitle>
        <p className="text-center text-gray-600">
          Total Assignments: <span className="font-semibold">{total}</span>
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((entry, index) => (
            <Card
              key={entry.name}
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-center" style={{ color: COLORS[index] }}>
                  {entry.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={[entry, { name: "Remaining", value: total - entry.value }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        fill={COLORS[index]}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        <Cell key={`cell-remaining-${index}`} fill="#E5E7EB" />
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "0.5rem",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-4xl font-bold" style={{ color: COLORS[index] }}>
                      {entry.value}
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {((entry.value / total) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

