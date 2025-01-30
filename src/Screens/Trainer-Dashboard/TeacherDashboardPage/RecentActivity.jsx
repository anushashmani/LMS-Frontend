import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { Select } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

const RecentActivity = () => {
  const [activityData, setActivityData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${AppRoutes.getTeacherClassWorkActivity}/${user._id}`, {
          withCredentials: true,
        });
        console.log("Fetched activity data:", response.data);
        setActivityData(response.data);
      } catch (error) {
        console.error("Error fetching class work activity data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.role === "teacher") {
      fetchActivityData();
    }
  }, [user]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredData =
    selectedMonth === "all"
      ? activityData
      : activityData.filter((item) => item.month === parseInt(selectedMonth));

  const sections = [
    ...new Set(
      activityData.flatMap((item) => Object.keys(item).filter((key) => key !== "month"))
    ),
  ];

  const colors = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#6366F1",
    "#84CC16",
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{months[label]}</p>
          {payload.map((entry, index) => (
            <div key={index} className="text-sm mb-1">
              <span style={{ color: entry.color }}>● </span>
              <span className="font-medium">{entry.name}:</span>
              <span className="ml-1">{entry.value} class works</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-lg">
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Class Work Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between">
          <Select
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
            style={{ width: 180 }}
            placeholder="Select Month"
          >
            <Option value="all">All Months</Option>
            {months.map((month, index) => (
              <Option key={index} value={index.toString()}>
                {month}
              </Option>
            ))}
          </Select>
        </div>
        {activityData.length > 0 ? (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(value) => months[value]}
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                />
                <YAxis
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  label={{
                    value: "Number of Class Works",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {sections.map((section, index) => (
                  <Bar
                    key={section}
                    dataKey={section}
                    name={section}
                    fill={colors[index % colors.length]}
                    radius={[4, 4, 0, 0]}
                    stackId="a"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px] text-gray-500">
            No class work activity data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
