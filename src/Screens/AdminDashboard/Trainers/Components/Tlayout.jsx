import React, { useState, useEffect } from "react"
import TrainerDrawer from "./Tsidebar"
import { Button, message, Select } from "antd"
import TrainerTable from "./TrainerTable"
import { AppRoutes } from "@/Constant/Constant"
import axios from "axios"

export const Tlayout = () => {
  const [TsidebarOpen, setTsidebarOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [batches, setBatches] = useState([])
  const [sections, setSections] = useState([])
  const [trainers, setTrainers] = useState([])
  const [filteredTrainers, setFilteredTrainers] = useState([])

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)

  useEffect(() => {
    fetchCourses()
    fetchTrainers()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get(AppRoutes.getCourses)
      setCourses(response.data.data)
    } catch (error) {
      message.error("Failed to fetch courses.")
    }
  }

  const fetchBatchesForCourse = async (courseId) => {
    try {
      const response = await axios.get(AppRoutes.getBatch)
      const filteredBatches = response.data.data.filter((batch) => batch.course?._id === courseId)
      setBatches(filteredBatches)
    } catch (error) {
      message.error("Failed to fetch batches.")
    }
  }

  const fetchSectionsForBatch = async (batchId) => {
    try {
      const response = await axios.get(AppRoutes.getSections)
      const sections = Array.isArray(response.data) ? response.data : response.data.data
      const filteredSections = sections.filter((section) => section.batch && section.batch._id === batchId)
      setSections(filteredSections)
    } catch (error) {
      message.error("Failed to fetch sections.")
    }
  }

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(AppRoutes.getTrainer)
      setTrainers(response.data.data)
    } catch (error) {
      message.error("Failed to fetch Trainers.")
    }
  }

  useEffect(() => {
    if (selectedCourse) {
      fetchBatchesForCourse(selectedCourse)
      setSelectedBatch(null)
      setSelectedSection(null)
    }
  }, [selectedCourse])

  useEffect(() => {
    if (selectedBatch) {
      fetchSectionsForBatch(selectedBatch)
      setSelectedSection(null)
    }
  }, [selectedBatch])

  useEffect(() => {
    filterTrainers()
  }, [selectedCourse, selectedBatch, selectedSection, trainers])

  const filterTrainers = () => {
    const filtered = trainers.filter((trainer) => {
      const courseMatch = !selectedCourse || trainer.courses.some((course) => course._id === selectedCourse)
      const batchMatch = !selectedBatch || trainer.batches.some((batch) => batch._id === selectedBatch)
      const sectionMatch = !selectedSection || trainer.sections.some((section) => section._id === selectedSection)
      return courseMatch && batchMatch && sectionMatch
    })
    setFilteredTrainers(filtered)
  }

  const toggleDrawer = () => {
    setTsidebarOpen(!TsidebarOpen)
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-start justify-between gap-10 mx-5 ">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6 md:mb-12 text-center text-[#0561a6]">
          Trainers Management
        </h2>
        <Button className="bg-[#0561a6] text-white font-bold " onClick={toggleDrawer}>
          Add Trainers
        </Button>
      </div>

      <div className="flex items-start justify-between mx-10  bg-indigo-400 ">
        <TrainerDrawer open={TsidebarOpen} toggleDrawer={toggleDrawer} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4 mb-6">
        <Select
          placeholder="Select Course"
          style={{ width: "100%" }}
          onChange={setSelectedCourse}
          value={selectedCourse}
        >
          {courses.map((course) => (
            <Select.Option key={course._id} value={course._id}>
              {course.title}
            </Select.Option>
          ))}
        </Select>

        {selectedCourse && (
          <Select
            placeholder="Select Batch"
            style={{ width: "100%" }}
            onChange={setSelectedBatch}
            value={selectedBatch}
          >
            {batches.map((batch) => (
              <Select.Option key={batch._id} value={batch._id}>
                {batch.title}
              </Select.Option>
            ))}
          </Select>
        )}

        {selectedBatch && (
          <Select
            placeholder="Select Section"
            style={{ width: "100%" }}
            onChange={setSelectedSection}
            value={selectedSection}
          >
            {sections.map((section) => (
              <Select.Option key={section._id} value={section._id}>
                {section.title}
              </Select.Option>
            ))}
          </Select>
        )}
      </div>

      <TrainerTable trainers={filteredTrainers} />
    </div>
  )
}

