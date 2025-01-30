import React, { useState, useEffect } from "react";
import { StudentTable } from "../TrainerStudentList/Student-Table";
import "./custome-table.css";
import { Button, Drawer, Select } from "antd";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

export const TrainerStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user && user._id) {
      fetchTrainerCourses();
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  const fetchTrainerCourses = async () => {
    setIsLoading(true);
    try {
      if (!user || !user._id) {
        console.error("User or user ID is not available");
        return;
      }
      const response = await fetch(
        `${AppRoutes.getTrainerCourses}/${user._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trainer courses");
      }
      const data = await response.json();
      if (!data.courses || data.courses.length === 0) {
        setError("No courses available for this trainer");
      } else {
        setCourses(data.courses);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching trainer courses:", error);
      setError("Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudents = async (course, batch, section) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${AppRoutes.getStudents}?course=${course}&batch=${batch}&section=${section}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      // Filter students by the selected course, batch, and section for the trainer's course
      const filteredData = data.filter((student) => {
        return (
          student.course.title === course &&
          student.batch.title === batch &&
          student.section.title === section
        );
      });
      setStudents(filteredData);
      setFilteredStudents(filteredData);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch students");
    } finally {
      setIsLoading(false);
    }
  };

  const showDrawer = (student) => {
    setSelectedStudent(student);
    setDrawerVisible(true);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setIsDrawerOpen(false);
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedBatch(null);
    setSelectedSection(null);
    setFilteredStudents([]);
  };

  const handleBatchChange = (batch) => {
    setSelectedBatch(batch);
    setSelectedSection(null);
    setFilteredStudents([]);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    if (selectedCourse && selectedBatch && section) {
      fetchStudents(selectedCourse, selectedBatch, section);
    }
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex">
      <Sidebar
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 ${isMobile && "ml-0"} transition-all duration-300`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-4 lg:ml-20 md:ml-20 sm:ml-4">
          <div className="flex justify-between items-center container mx-auto py-6">
            <h1>Student List</h1>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen bg-white">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4 mb-6">
              <Select
                placeholder="Select Course"
                style={{ width: "100%" }}
                onChange={handleCourseChange}
              >
                {courses.map((course) => (
                  <Option key={course.courseName} value={course.courseName}>
                    {course.courseName}
                  </Option>
                ))}
              </Select>

              {selectedCourse && (
                <Select
                  placeholder="Select Batch"
                  style={{ width: "100%" }}
                  onChange={handleBatchChange}
                >
                  {courses
                    .find((c) => c.courseName === selectedCourse)
                    ?.batches.map((batch) => (
                      <Option key={batch.title} value={batch.title}>
                        {batch.title}
                      </Option>
                    ))}
                </Select>
              )}

              {selectedBatch && (
                <Select
                  placeholder="Select Section"
                  style={{ width: "100%" }}
                  onChange={handleSectionChange}
                >
                  {courses
                    .find((c) => c.courseName === selectedCourse)
                    ?.sections.map((section) => (
                      <Option key={section.title} value={section.title}>
                        {section.title}
                      </Option>
                    ))}
                </Select>
              )}
            </div>
          )}
          <StudentTable
            students={filteredStudents}
            onViewDetails={showDrawer}
          />
          {isDrawerOpen && selectedStudent && (
            <Drawer
              title="Student Details"
              placement="right"
              visible={drawerVisible}
              onClose={closeDrawer}
              width={400}
            >
              <div key={selectedStudent._id}>
                <p>
                  <strong>Name:</strong> {selectedStudent.name}
                </p>
                <p>
                  <strong>Father's Name:</strong> {selectedStudent.fatherName}
                </p>
                <p>
                  <strong>Roll No:</strong> {selectedStudent.rollNumber}
                </p>
                <p>
                  <strong>Course:</strong> {selectedStudent.course.title}
                </p>
                <p>
                  <strong>Batch:</strong> {selectedStudent.batch.title}
                </p>
                <p>
                  <strong>Section:</strong> {selectedStudent.section.title}
                </p>
                <p>
                  <strong>Phone No:</strong> {selectedStudent.phoneNo}
                </p>
              </div>
            </Drawer>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerStudent;
