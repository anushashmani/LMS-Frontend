import { Image } from "@mui/icons-material";
import { Button  } from "antd/es/radio";
import React from "react";
import styles from '../../../Styles/styles.module.css';

const BestInstructors = () => {
  const courses = [
    { title: "Nil Yeager", courses: "5 Design Course", color: "bg-yellow-400", btnColor: "bg-yellow-100", initial: "U" , image: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg' },
    { title: "Theron Trump", courses: "5 Design Course", color: "bg-red-400", btnColor: "bg-red-100", initial: "M" , image: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg' },
    { title: "Tyler Mark", courses: "5 Design Course", color: "bg-green-400", btnColor: "bg-green-100", initial: "W" , image: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg' },
    { title: "Johen Mark", courses: "5 Design Course", color: "bg-blue-400", btnColor: "bg-blue-100", initial: "M" , image: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg' },
  ];

  return (
    <div className="col-span-12 lg:col-span-4 w-full  mb-4 p-4 hover:shadow-lg transition">
      <div className="flex py-4 justify-between items-center mb-4">
        <h3 className="text-lg text-left font-semibold">Best Instructors</h3>
        
          <Button className={styles.ChartButtons}>See All</Button>
    
      </div>

      <div>
        {courses.map((course, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4 hover:shadow-lg transition">
            <div className="flex justify-between gap-4 items-center">
              <div className="flex items-center">
                
                <div
                 className={`${course.color} flex items-center justify-center h-12 w-12 rounded-2xl text-white text-lg font-bold mr-4`}
                >
                    {course.initial}
                </div>
                <div>
                  <p className="text-gray-800 text-base font-medium hover:text-opacity-80">
                    {course.title}
                  </p>
                  <p className="text-gray-500 text-sm">{course.courses}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                   className={styles.ChartButtons}
                  // className={`${course.btnColor} b-0 px-3 py-1 text-sm rounded hover:bg-opacity-80`}
                >
                Courses
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestInstructors;
