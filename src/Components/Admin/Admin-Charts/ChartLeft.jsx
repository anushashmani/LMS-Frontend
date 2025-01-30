// import React from "react";
// import {
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

// const data = [
//   { name: "School A", Boys: 85, Girls: 75 },
//   { name: "School B", Boys: 90, Girls: 65 },
//   { name: "School C", Boys: 80, Girls: 70 },
//   // { name: "School D", Boys: 95, Girls: 85 },
//   // { name: "School E", Boys: 88, Girls: 80 },
// ];

// const Top5SchoolPerformance = () => {
//   return (
//     <div className="p-6 bg-white rounded-lg flex-nowrap  shadow-lg md:max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//         Top 5 School Performance
//       </h2>
//       <div className="w-full p-2">
//         <BarChart
//           width={350}
//           height={300}
//           data={data}
//           className="mx-auto"
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//           <XAxis
//             dataKey="name"
//             tick={{ fontSize: 14, fill: "#374151" }}
//             axisLine={{ stroke: "#D1D5DB" }}
//             tickLine={false}
//           />
//           <YAxis
//             tick={{ fontSize: 14, fill: "#374151" }}
//             axisLine={{ stroke: "#D1D5DB" }}
//             tickLine={false}
//           />
//           <Tooltip
//             contentStyle={{ borderRadius: "8px", backgroundColor: "#F9FAFB" }}
//             labelStyle={{ color: "#111827", fontWeight: "bold" }}
//             itemStyle={{ color: "#4B5563" }}
//           />
//           <Legend
//             wrapperStyle={{ top: -10 }}
//             formatter={(value) => (
//               <span style={{ color: "#374151", fontSize: "14px", fontWeight: "bold" }}>
//                 {value}
//               </span>
//             )}
//           />
//           <Bar
//             dataKey="Boys"
//             fill="#4F46E5"
//             radius={[6, 6, 0, 0]}
//             barSize={20}
//             label={{ position: "top", fill: "#4F46E5", fontSize: 12, fontWeight: "bold" }}
//           />
//           <Bar
//             dataKey="Girls"
//             fill="#EC4899"
//             radius={[6, 6, 0, 0]}
//             barSize={20}
//             label={{ position: "top", fill: "#EC4899", fontSize: 12, fontWeight: "bold" }}
//           />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default Top5SchoolPerformance;


import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "School A", Boys: 85, Girls: 75 },
  { name: "School B", Boys: 90, Girls: 65 },
  { name: "School C", Boys: 80, Girls: 70 },
];

const Top5SchoolPerformance = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top 5 School Performance
      </h2>
      <div className="flex justify-center items-center w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: "#374151" }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 14, fill: "#374151" }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ borderRadius: "8px", backgroundColor: "#F9FAFB" }}
              labelStyle={{ color: "#111827", fontWeight: "bold" }}
              itemStyle={{ color: "#4B5563" }}
            />
            <Legend
              wrapperStyle={{ top: -10 }}
              formatter={(value) => (
                <span
                  style={{
                    color: "#374151",
                    fontSize: "17px",
                    fontWeight: "bold",
                    margin: "top"
                  }}
                >
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="Boys"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
              barSize={20}
              label={{
                position: "top",
                fill: "#4F46E5",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <Bar
              dataKey="Girls"
              fill="#EC4899"
              radius={[6, 6, 0, 0]}
              barSize={20}
              label={{
                position: "top",
                fill: "#EC4899",
                fontSize: 12,
                fontWeight: "bold",
              }}  
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Top5SchoolPerformance;
