import { Button } from "antd/es/radio";
import React, { useEffect, useState } from "react";
import styles from "../../../Styles/styles.module.css";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import { Avatar } from "antd";

const PopularCourses = () => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchStudentCourses = async () => {
      const response = await axios.get(`${AppRoutes.getCourses}`);
      setCourses(response.data.data);
    };
    fetchStudentCourses();
  }, []);

  console.log(courses);
  const colors = [
    { colorCode: "bg-yellow-100" },
    { colorCode: "bg-red-100" },
    { colorCode: "bg-blue-100" },
    { colorCode: "bg-green-100" },
    { colorCode: "bg-orange-100" },
  ];

  // const courses = [
  //   { title: "UI/UX Design", count: "30+ Courses", color: "bg-yellow-400", btnColor: "bg-yellow-100", initial: "U" },
  //   { title: "Marketing", count: "25+ Courses", color: "bg-red-400", btnColor: "bg-red-100", initial: "M" },
  //   { title: "Web Dev.", count: "30+ Courses", color: "bg-green-400", btnColor: "bg-green-100", initial: "W" },
  //   { title: "Mathematics", count: "50+ Courses", color: "bg-blue-400", btnColor: "bg-blue-100", initial: "M" },
  // ];

  return (
    <div className="col-span-12 lg:col-span-6  w-full  ">
      <div className="flex py-4 justify-between items-center mb-4">
        <h3 className="text-lg text-left font-semibold">Popular Courses</h3>

        <Button className={styles.ChartButtons}>All Courses</Button>
      </div>

      <div>
        {courses?.slice(0, 4).map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg mb-4 p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between gap-4 items-center">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-2xl text-white text-lg font-bold mr-4`}
                >
                  <Avatar
                    size={"large"}
                    className={`${colors.map((data) => data.colorCode)}`}
                  >
                    <span>{course.title.slice(0, 2)}</span>
                  </Avatar>
                </div>
                <div>
                  <p className="text-gray-800 text-base font-medium hover:text-opacity-80">
                    {course.title}
                  </p>
                  <p className="text-gray-500 text-sm">{course.count}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  className={styles.ChartButtons}
                  // className={`${course.btnColor} b-0 px-3 py-1 text-sm rounded hover:bg-opacity-80`}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
