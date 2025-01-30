import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppRoutes } from '@/Constant/Constant';
import { Form, Select, Table, message, Row, Col } from 'antd';
import { useAuth } from '@/Context/AuthContext';
import { Card } from "@/Components/ui/card";
import { format } from "date-fns";
import { FaBookOpen, FaCalendarAlt, FaClock, FaDownload, FaSchool, FaUserGraduate } from "react-icons/fa";

const { Option } = Select;

const AssignmentList = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalAssignments, setTotalAssignments] = useState(0);  // New state for total count

  const { user } = useAuth();

  // Fetch the courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        if (!user || !user._id) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`${AppRoutes.getTrainerCourses}/${user._id}`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load trainer data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  // Fetch assignments based on selected course, batch, and section
  useEffect(() => {
    const fetchAssignments = async () => {
      if (!selectedCourse || !selectedBatch || !selectedSection) return;

      setIsLoading(true);
      try {
        const response = await axios.get(AppRoutes.getAssignments, {
          params: {
            course: selectedCourse,
            batch: selectedBatch,
            section: selectedSection
          }
        });

        setAssignments(response.data.assignments);
        console.log('Assignments', response.data); // Debugging
        setTotalAssignments(response.data.totalAssignments); // Set total assignments count
        console.log('Assignments', response.data); // Debugging

      } catch (error) {
        message.error('Failed to load assignments');
        console.error('Error fetching assignments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [selectedCourse, selectedBatch, selectedSection]); // Ensure data fetch only when all fields are selected

  // Handle loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#0561a6] font-extrabold text-center mb-6 sm:mb-8">
        Assignment List
      </h2>

      {/* Form for selecting course, batch, and section */}
      <Form layout="inline" className="mb-6 sm:mb-8">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Form.Item label="Select Course">
              <Select
                className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                placeholder="Select a course"
                onChange={(value) => {
                  setSelectedCourse(value);
                  setSelectedBatch("");
                  setSelectedSection("");
                }}
              >
                {courses.map((course) => (
                  <Option key={course.courseName} value={course.courseName}>
                    {course.courseName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item label="Select Batch">
              <Select
                className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                placeholder="Select a batch"
                onChange={(value) => {
                  setSelectedBatch(value);
                  setSelectedSection("");
                }}
                disabled={!selectedCourse}
              >
                {courses.find(c => c.courseName === selectedCourse)?.batches.map((batch) => (
                  <Option key={batch._id} value={batch._id}>{batch.title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item label="Select Section">
              <Select
                className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                placeholder="Select a section"
                onChange={(value) => setSelectedSection(value)}
                disabled={!selectedBatch}
              >
                {courses
                  .find((c) => c.courseName === selectedCourse)
                  ?.sections.map((section) => (
                    <Option key={section.title} value={section.title}>
                      {section.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* Total Assignments Count */}
      {/* {totalAssignments && ( */}
      <p className="text-center text-lg text-[#0561a6] font-semibold mb-6">
        Total Assignments: {totalAssignments}
      </p>
      {/* // )} */}

      <Card>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white text-[#0561a6] p-4 sm:p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-[0_20px_40px_rgba(5,97,166,0.3)] transition-all duration-500 border-t-4 md:border-t-8 border-[#0561a6]"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-4 text-[#0561a6] tracking-wide">
                  {assignment.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {assignment.description}
                </p>

                <div className="space-y-2 text-gray-600">
                  <p className="text-sm flex items-center gap-2">
                    <FaCalendarAlt className="text-[#0561a6]" />
                    <span className="font-semibold">Deadline:</span> {format(new Date(assignment.deadline), 'MMMM dd, yyyy')}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaBookOpen className="text-[#0561a6]" />
                    <span className="font-semibold">Course:</span> {assignment.course.title.slice(0, 12)}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaUserGraduate className="text-[#0561a6]" />
                    <span className="font-semibold">Batch:</span> {assignment.batch?.title || 'N/A'}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaClock className="text-[#0561a6]" />
                    <span className="font-semibold">Section:</span> {assignment.section.title}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaSchool className="text-[#0561a6]" />
                    <span className="font-semibold">Campus:</span> {assignment.campus.title.slice(0, 12)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                {assignment.file && (
                  <a
                    href={assignment.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0561a6] text-white py-2 px-4 rounded-lg hover:bg-[#045c8f] flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <FaDownload className="text-xl" />Download File
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AssignmentList;









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AppRoutes } from "@/Constant/Constant";
// import { Form, Select, Table, message, Row, Col } from "antd";
// import { useAuth } from "@/Context/AuthContext";
// import { Card } from "@/Components/ui/card";
// import { format } from "date-fns";
// import {
//   FaBookOpen,
//   FaCalendarAlt,
//   FaClock,
//   FaDownload,
//   FaSchool,
//   FaUserGraduate,
// } from "react-icons/fa";

// const { Option } = Select;

// const AssignmentList = () => {
//   const [courses, setCourses] = useState([]);
//   const [assignments, setAssignments] = useState([]);
//   const [filteredAssignments, setFilteredAssignments] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [totalAssignments, setTotalAssignments] = useState(0);

//   const { user } = useAuth();

//   // Fetch courses and trainer assignments on component mount
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setIsLoading(true);
//       try {
//         if (!user || !user._id) {
//           throw new Error("User not authenticated");
//         }

//         // Fetch trainer courses
//         const courseResponse = await axios.get(
//           `${AppRoutes.getTrainerCourses}/${user._id}`
//         );
//         setCourses(courseResponse.data.courses);

//         // Fetch all assignments for the trainer
//         const assignmentResponse = await axios.get(
//           `${AppRoutes.getAssignments}`
//         );
//         setAssignments(assignmentResponse.data.assignments);
//         setFilteredAssignments(assignmentResponse.data.assignments); // Show all initially
//         setTotalAssignments(assignmentResponse.data.totalAssignments);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         message.error("Failed to load data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [user]);

//   // Filter assignments based on selected course, batch, and section
//   useEffect(() => {
//     let filtered = assignments;

//     if (selectedCourse) {
//       filtered = filtered.filter(
//         (assignment) => assignment.course.title === selectedCourse
//       );
//     }
//     if (selectedBatch) {
//       filtered = filtered.filter(
//         (assignment) => assignment.batch?.title === selectedBatch
//       );
//     }
//     if (selectedSection) {
//       filtered = filtered.filter(
//         (assignment) => assignment.section.title === selectedSection
//       );
//     }

//     setFilteredAssignments(filtered);
//     setTotalAssignments(filtered.length); // Update total assignments count
//   }, [selectedCourse, selectedBatch, selectedSection, assignments]);

//   // Handle loading spinner
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-white">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 sm:p-6 md:p-8">
//       <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#0561a6] font-extrabold text-center mb-6 sm:mb-8">
//         Assignment List
//       </h2>

//       {/* Form for selecting course, batch, and section */}
//       <Form layout="inline" className="mb-6 sm:mb-8">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={8}>
//             <Form.Item label="Select Course">
//               <Select
//                 className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
//                 placeholder="Select a course"
//                 onChange={(value) => {
//                   setSelectedCourse(value);
//                   setSelectedBatch("");
//                   setSelectedSection("");
//                 }}
//               >
//                 {courses.map((course) => (
//                   <Option key={course.courseName} value={course.courseName}>
//                     {course.courseName}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>

//           <Col xs={24} sm={8}>
//             <Form.Item label="Select Batch">
//               <Select
//                 className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
//                 placeholder="Select a batch"
//                 onChange={(value) => {
//                   setSelectedBatch(value);
//                   setSelectedSection("");
//                 }}
//                 disabled={!selectedCourse}
//               >
//                 {courses
//                   .find((c) => c.courseName === selectedCourse)
//                   ?.batches.map((batch) => (
//                     <Option key={batch._id} value={batch.title}>
//                       {batch.title}
//                     </Option>
//                   ))}
//               </Select>
//             </Form.Item>
//           </Col>

//           <Col xs={24} sm={8}>
//             <Form.Item label="Select Section">
//               <Select
//                 className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
//                 placeholder="Select a section"
//                 onChange={(value) => setSelectedSection(value)}
//                 disabled={!selectedBatch}
//               >
//                 {courses
//                   .find((c) => c.courseName === selectedCourse)
//                   ?.sections.map((section) => (
//                     <Option key={section.title} value={section.title}>
//                       {section.title}
//                     </Option>
//                   ))}
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//       </Form>

//       {/* Total Assignments Count */}
//       <p className="text-center text-lg text-[#0561a6] font-semibold mb-6">
//         Total Assignments: {totalAssignments}
//       </p>

//       <Card>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//           {filteredAssignments.map((assignment) => (
//             <div
//               key={assignment._id}
//               className="bg-white text-[#0561a6] p-4 sm:p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-[0_20px_40px_rgba(5,97,166,0.3)] transition-all duration-500 border-t-4 md:border-t-8 border-[#0561a6]"
//             >
//               <div className="flex-grow">
//                 <h3 className="text-xl font-semibold mb-4 text-[#0561a6] tracking-wide">
//                   {assignment.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   {assignment.description}
//                 </p>

//                 <div className="space-y-2 text-gray-600">
//                   <p className="text-sm flex items-center gap-2">
//                     <FaCalendarAlt className="text-[#0561a6]" />
//                     <span className="font-semibold">Deadline:</span>{" "}
//                     {format(new Date(assignment.deadline), "MMMM dd, yyyy")}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaBookOpen className="text-[#0561a6]" />
//                     <span className="font-semibold">Course:</span>{" "}
//                     {assignment.course.title.slice(0, 12)}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaUserGraduate className="text-[#0561a6]" />
//                     <span className="font-semibold">Batch:</span>{" "}
//                     {assignment.batch?.title || "N/A"}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaClock className="text-[#0561a6]" />
//                     <span className="font-semibold">Section:</span>{" "}
//                     {assignment.section.title}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaSchool className="text-[#0561a6]" />
//                     <span className="font-semibold">Campus:</span>{" "}
//                     {assignment.campus.title.slice(0, 12)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 mt-6">
//                 {assignment.file && (
//                   <a
//                     href={assignment.file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 bg-[#0561a6] text-white py-2 px-4 rounded-lg hover:bg-[#045c8f] flex items-center justify-center gap-2 transition-all duration-300"
//                   >
//                     <FaDownload className="text-xl" />
//                     Download File
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default AssignmentList;
