import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Sample data
const data = [
  { day: "Sun", hours: 1 },
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 5.5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 3.5 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 2 },
];

// Custom tooltip for hover effect
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-orange-500 text-white px-2 py-1 rounded">
        <p>{`${label}: ${payload[0].value} hours`}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = () => {
  return (
    <div className="rounded-lg pt-16 ml-10">
      <div className="flex justify-between items-center mb-5 ml-48">
        <h2 className="text-lg font-semibold text-gray-800 mr-16">Teaching Activity</h2>
        <p className="text-sm text-gray-500 mr-9">Weekly (01 Mar - 07 Mar)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Grid lines */}
          <CartesianGrid stroke="#e5e7eb" vertical={false} />
          {/* X-axis */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "black", fontSize: 12 }}
          />
          {/* Y-axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "black", fontSize: 12 }}
            domain={[0, 6]} // Adjust domain to match 0-5h range
          />
          {/* Tooltip */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#f97316", strokeWidth: 1, strokeDasharray: "3 3" }}
          />
          {/* Line */}
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#1e3a8a"
            strokeWidth={2}
            dot={{ fill: "#1e3a8a", r: 4 }}
            activeDot={{
              r: 6,
              stroke: "#1e3a8a",
              fill: "#1e3a8a",
              strokeWidth: 2,
            }}
          />
          {/* Add vertical line for active data point */}
          <ReferenceLine
            x="Tue"
            stroke="#f97316"
            strokeDasharray="3 3"
            label={{
              value: "5.5 hours",
              position: "top",
              fill: "#f97316",
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;





