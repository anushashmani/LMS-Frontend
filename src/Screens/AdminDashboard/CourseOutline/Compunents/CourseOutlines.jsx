import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AppRoutes } from "@/Constant/Constant";

export const CourseOutlines = () => {
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(AppRoutes.getCoursesOutline);
        setCourses(response.data.data);
        console.log("Course Outline Data:", response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const toggleExpand = (stateSetter, id) => {
    stateSetter((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-2xl rounded-lg">
      <h1 className="text-3xl font-extrabold text-center text-[#0561a6] mb-6">Courses Outlines</h1>
      {courses.map((course) => (
        <div
          key={course._id}
          className="mb-6 border border-blue-200 rounded-lg bg-white shadow-md overflow-hidden"
        >
          <button
            onClick={() => toggleExpand(setExpandedCourse, course._id)}
            className="flex items-center justify-between w-full p-4 bg-blue-100 text-[#0561a6] font-bold text-lg hover:bg-blue-200 transition-all"
          >
            <span>{course.title}</span>
            {expandedCourse === course._id ? (
              <ChevronDown className="w-6 h-6" />
            ) : (
              <ChevronRight className="w-6 h-6" />
            )}
          </button>
          {expandedCourse === course._id && (
            <div className="mt-4 pl-6 pb-4">
              {course.modules.map((module) => (
                <div key={module._id} className="mb-4">
                  <button
                    onClick={() => toggleExpand(setExpandedModule, module._id)}
                    className="flex items-center justify-between w-full p-3 bg-blue-50 text-[#0561a6] font-semibold text-md hover:bg-blue-100 transition-all rounded-md"
                  >
                    <span>{module.title}</span>
                    {expandedModule === module._id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                  {expandedModule === module._id && (
                    <div className="mt-2 pl-6">
                      {module.topics.map((topic) => (
                        <div key={topic._id} className="mb-3">
                          <button
                            onClick={() => toggleExpand(setExpandedTopic, topic._id)}
                            className="flex items-center justify-between w-full p-2 text-[#0561a6] hover:text-blue-800 transition-all"
                          >
                            <span>Topics: {topic.title}</span>
                            {expandedTopic === topic._id ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          {expandedTopic === topic._id && (
                            <div className="mt-2 pl-4">
                              {topic.chapters.length > 0 ? (
                                topic.chapters.map((chapter) => (
                                  <div key={chapter._id} className="mb-2">
                                    <h6 className="font-medium text-[#0561a6]">{chapter.title}</h6>
                                    {/* <p className="text-sm text-gray-600 mt-1">{chapter.content}</p> */}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500 italic">No chapters available</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
