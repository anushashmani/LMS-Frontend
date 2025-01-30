// import React, { useEffect, useState } from "react"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/Context/AuthContext"

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ]

// const chartConfig = {
//   submitted: {
//     label: "Submitted",
//     color: "#10B981",
//   },
//   notCompleted: {
//     label: "Not Completed",
//     color: "#EF4444",
//   },
//   pending: {
//     label: "Pending",
//     color: "#3B82F6",
//   },
// }

// export function MonthlyAssignmentStatus() {
//   const { assignments } = useAuth()
//   const [chartData, setChartData] = useState([])

//   useEffect(() => {
//     const processedData = processAssignments(assignments)
//     setChartData(processedData)
//   }, [assignments])

//   const processAssignments = (assignments) => {
//     const data = months.map((month) => ({
//       month,
//       submitted: 0,
//       notCompleted: 0,
//       pending: 0,
//     }))

//     assignments.forEach((assignment) => {
//       const submissionDate = new Date(assignment.deadline)
//       const monthIndex = submissionDate.getMonth()
//       const status = assignment.status.toLowerCase()

//       if (status === "completed") {
//         data[monthIndex].submitted++
//       } else if (status === "not completed") {
//         data[monthIndex].notCompleted++
//       } else if (status === "pending") {
//         data[monthIndex].pending++
//       }
//     })

//     return data
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center text-gray-800">Monthly Assignment Status</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="submitted"
//               stackId="a"
//               fill={chartConfig.submitted.color}
//               name={chartConfig.submitted.label}
//             />
//             <Bar dataKey="pending" stackId="a" fill={chartConfig.pending.color} name={chartConfig.pending.label} />
//             <Bar
//               dataKey="notCompleted"
//               stackId="a"
//               fill={chartConfig.notCompleted.color}
//               name={chartConfig.notCompleted.label}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }


