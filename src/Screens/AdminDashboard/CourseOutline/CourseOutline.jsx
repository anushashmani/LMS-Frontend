import React, { useState, useEffect } from "react"
import axios from "axios"
import Layout from "@/Components/Sidebar/Layout"
import AddModuleForm from "./Compunents/Module"
import AddChapterForm from "./Compunents/Chapters"
import AddTopicForm from "./Compunents/Topics"
import { CourseOutlines } from "./Compunents/CourseOutlines"
import { AppRoutes } from "@/Constant/Constant"

const CourseOutline = ({ courseId }) => {
  const [courseStructure, setCourseStructure] = useState(null)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [modules, setModules] = useState([])
  const [topics, setTopics] = useState([])

  useEffect(() => {
    // fetchCourseStructure()
    fetchModules()
  }, [courseId])

  const fetchModules = async () => {
    try {
      const response = await axios.get(AppRoutes.getCoursesModule)
      setModules(response.data.data)
    } catch (error) {
      console.error("Error fetching modules:", error)
    }
  }

  const tabs = [
    { value: "courseOutline", label: "CourseOutline", component: <CourseOutlines /> },
    { value: "module", label: "Module", component: <AddModuleForm onModuleAdded={fetchModules} /> },
    { value: "topic",  label: "Topics", component: <AddTopicForm modules={modules} />,},
    { value: "chapter", label: "Chapters", component: <AddChapterForm modules={modules} /> },
  ]


  return (
    <div className="course-outline">
      <Layout />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              className={`px-6 py-2 rounded-lg font-medium transition-all text-sm w-full sm:w-auto ${index === activeTabIndex ? "bg-[#0561a6] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="h-full flex flex-col">{tabs[activeTabIndex].component}</div>
      </div>
    </div>
  )
}

export default CourseOutline

