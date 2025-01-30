import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const data = [
  { name: "Boys", value: 60, color: "#4F46E5" }, // Purple
  { name: "Girls", value: 40, color: "#22D3EE" }, // Cyan
];

export default function PassPercentageChart() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-4 text-center">
        Overall Pass Percentage
      </h2>

      {/* Chart Container */}
      <div className="flex justify-center items-center w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="50%"
              outerRadius="70%"
              paddingAngle={5}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
              }}
              labelStyle={{ fontWeight: "bold", color: "#374151" }}
              itemStyle={{ color: "#4B5563" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
