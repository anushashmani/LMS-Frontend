import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN components

// Import chart.js modules
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = () => {
  // Define your data
  const data = {
    labels: ["Sun","Mon", "Tue" ,"Wed" , "Thurs" , "Fri" , "Sat",],
    datasets: [
      {
        label: "Learning Progress",
        data: [10, 25, 40, 50, 65, 80],
        borderColor: "#2563EB", // Tailwind's blue-600
        backgroundColor: "rgba(37, 99, 235, 0.2)", // Tailwind's blue with opacity
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#ffffff",
        tension: 0.4, // Smooth curve
        fill: true,
      },
    ],
  };

  // Define your options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#374151", // Tailwind's gray-700
        },
      },
      tooltip: {
        backgroundColor: "#1F2937", // Tailwind's gray-800
        bodyColor: "#FFFFFF", // White text
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4B5563", // Tailwind's gray-600
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#4B5563",
        },
        grid: {
          color: "rgba(107, 114, 128, 0.2)", // Tailwind's gray-500 with opacity
        },
      },
    },
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <h3 className="text-lg font-semibold">Learning Progress</h3>
      </CardHeader>
      <CardContent>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default LineChart;
