import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", Usage: 40 },
  { name: "Feb", Usage: 50 },
  { name: "Mar", Usage: 45 },
  { name: "Apr", Usage: 60 },
  { name: "May", Usage: 70 },
  { name: "Jun", Usage: 80 },
];

const ContentUsage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Content Usage
      </h2>
      <div className="w-full flex justify-center items-center h-[300px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#374151" }} />
            <YAxis tick={{ fontSize: 14, fill: "#374151" }} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "#F9FAFB",
              }}
              labelStyle={{ color: "#111827", fontWeight: "bold" }}
              itemStyle={{ color: "#4B5563" }}
            />
            <Legend
              wrapperStyle={{ top: -10 }}
              formatter={(value) => (
                <span style={{ color: "#6B7280", fontSize: "14px" }}>
                  {value}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="Usage"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 5, fill: "#4F46E5" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ContentUsage;
