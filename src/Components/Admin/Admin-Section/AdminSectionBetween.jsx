import { TrendingUp } from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export default function AreaChartComponent() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold  text-left text-gray-800">Monthly Progress</h2>
        <p className="text-sm text-left text-gray-500">
           This is the latest Improvement
        </p>
      </div>
      <div className="h-64">
        <AreaChart
          width={300}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
            itemStyle={{ color: "#374151" }}
          />
          <Area
            type="monotone"
            dataKey="mobile"
            stackId="1"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="desktop"
            stackId="1"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.2}
          />
        </AreaChart>
      </div>
      <div className="flex flex-col items-start mt-4 text-sm">
        <div className="flex items-center gap-2 font-medium text-green-600">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-gray-500">January - June 2024</div>
      </div>
    </div>
  );
}


