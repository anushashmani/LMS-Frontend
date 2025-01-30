import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { Select } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

const TeachingActivity = () => {
  const [activityData, setActivityData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedAssignment, setSelectedAssignment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchActivityData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${AppRoutes.getTeachingActivity}/${user._id}`, { withCredentials: true });
        setActivityData(response.data);
      } catch (error) {
        console.error("Error fetching teaching activity data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.role === 'teacher') {
      fetchActivityData();
    }
  }, [user]);



  const courses = ["all", ...new Set(activityData.map(item => item.course))];
  const batches = ["all", ...new Set(activityData.map(item => item.batch))];
  const sections = ["all", ...new Set(activityData.map(item => item.section))];
  const assignments = ["all", ...new Set(activityData.map(item => item.assignmentName))];

  const filteredData = activityData.filter(item =>
    (selectedCourse === "all" || item.course === selectedCourse) &&
    (selectedBatch === "all" || item.batch === selectedBatch) &&
    (selectedSection === "all" || item.section === selectedSection) &&
    (selectedAssignment === "all" || item.assignmentName === selectedAssignment) &&
    new Date(item.date).getMonth() === selectedMonth
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="font-semibold text-gray-800">{format(new Date(label), 'MMM dd, yyyy')}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
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
        <CardTitle className="text-2xl font-bold text-gray-800">Teaching Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Select
            className="w-full sm:w-[180px]"
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
            placeholder="Select Month"
          >
            {months.map((month, index) => (
              <Option key={index} value={index}>
                {month}
              </Option>
            ))}
          </Select>
          <Select
            className="w-full sm:w-[180px]"
            value={selectedCourse}
            onChange={(value) => setSelectedCourse(value)}
            placeholder="Select Course"
          >
            {courses.map(course => (
              <Option key={course} value={course}>
                {course === "all" ? "All Courses" : course}
              </Option>
            ))}
          </Select>
          <Select
            className="w-full sm:w-[180px]"
            value={selectedBatch}
            onChange={(value) => setSelectedBatch(value)}
            placeholder="Select Batch"
          >
            {batches.map(batch => (
              <Option key={batch} value={batch}>
                {batch === "all" ? "All Batches" : batch}
              </Option>
            ))}
          </Select>
          <Select
            className="w-full sm:w-[180px]"
            value={selectedSection}
            onChange={(value) => setSelectedSection(value)}
            placeholder="Select Section"
          >
            {sections.map(section => (
              <Option key={section} value={section}>
                {section === "all" ? "All Sections" : section}
              </Option>
            ))}
          </Select>
          <Select
            className="w-full sm:w-[180px]"
            value={selectedAssignment}
            onChange={(value) => setSelectedAssignment(value)}
            placeholder="Select Assignment"
          >
            {assignments.map(assignment => (
              <Option key={assignment} value={assignment}>
                {assignment === "all" ? "All Assignments" : assignment}
              </Option>
            ))}
          </Select>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="totalSubmissions" stroke="#8884d8" />
              <Line type="monotone" dataKey="onTimeSubmissions" stroke="#82ca9d" />
              <Line type="monotone" dataKey="lateSubmissions" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeachingActivity;
