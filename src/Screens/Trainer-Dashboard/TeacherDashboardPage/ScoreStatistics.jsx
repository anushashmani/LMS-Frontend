import React from "react";
import { RadialBarChart, RadialBar } from "recharts";

const data = [
  { name: "Grade", value: 50, fill: "#93c5fd" },
  { name: "Examination", value: 87, fill: "#2563eb" },
  { name: "Ranking", value: 80, fill: "#1e3a8a" },
];

const ScoreStatistics = () => {
  return (
    <div className="rounded-lg max-w-full p-8 md:p-16 bg-white shadow-lg">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Score Statistics
      </h2>
      <div className="flex flex-wrap justify-between items-center">
        {/* Radial Chart */}
        <div className="relative mx-auto md:ml-16">
          <RadialBarChart
            width={200}
            height={200}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="90%"
            barSize={8}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
            />
          </RadialBarChart>
          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-500">Subjects</p>
          </div>
        </div>

        {/* Legend */}
        <div className="ml-6 mt-6 md:mt-0 space-y-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#1e3a8a" }}
            ></div>
            <div>
              <p className="text-sm text-gray-800 font-medium">Grade</p>
              <p className="text-sm text-gray-600">8.5</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#2563eb" }}
            ></div>
            <div>
              <p className="text-sm text-gray-800 font-medium">
                Examination
              </p>
              <p className="text-sm text-gray-600">8.7</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#93c5fd" }}
            ></div>
            <div>
              <p className="text-sm text-gray-800 font-medium">Ranking</p>
              <p className="text-sm text-gray-600">25/50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreStatistics;

