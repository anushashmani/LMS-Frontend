import React, { useState, useEffect } from 'react';
import { Button, Drawer, Select, message } from 'antd';
import axios from 'axios';
import { AppRoutes } from '@/Constant/Constant';
import Layout from '@/Components/Sidebar/Layout';
import AddStudentModal from '@/Components/Student-Pages/AddStudentModal';
import AttendanceSheetDrawer from '@/Components/Student-Pages/AddStudent';
import { StudentTable } from '@/Components/Student-Pages/Student-Table';

export const Student = () => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [attendanceDrawerVisible, setAttendanceDrawerVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(AppRoutes.getCourses);
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch courses');
        setCourses(data.data);
      } catch (error) {
        message.error('Failed to fetch courses.');
      }
    };
    fetchCourses();
  }, []);

  const fetchBatchesForCourse = async (courseId) => {
    try {
      const response = await axios.get(AppRoutes.getBatch);
      const filteredBatches = response.data.data.filter(batch => batch.course?._id === courseId);
      setBatches(filteredBatches);
    } catch (error) {
      message.error('Failed to fetch batches.');
    }
  };

  const fetchSectionsForBatch = async (batchId) => {
    try {
      const response = await fetch(AppRoutes.getSections);
      const data = await response.json();
      const sections = Array.isArray(data) ? data : data.data;
      if (sections && Array.isArray(sections)) {
        const filteredSections = sections.filter(
          section => section.batch && section.batch._id === batchId
        );
        setSections(filteredSections);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      message.error('Failed to fetch sections.');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(AppRoutes.getStudents);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      message.error('Failed to fetch students.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchBatchesForCourse(selectedCourse);
      setSelectedBatch(null);
      setSelectedSection(null);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedBatch) {
      fetchSectionsForBatch(selectedBatch);
      setSelectedSection(null);
    }
  }, [selectedBatch]);

  useEffect(() => {
    const filtered = students.filter(student => {
      return (
        (!selectedCourse || (student.course && student.course._id === selectedCourse)) &&
        (!selectedBatch || (student.batch && student.batch._id === selectedBatch)) &&
        (!selectedSection || (student.section && student.section._id === selectedSection))
      );
    });
    setFilteredStudents(filtered);
  }, [selectedCourse, selectedBatch, selectedSection, students]);


  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const showAttendanceDrawer = () => {
    setAttendanceDrawerVisible(true);
  };

  const closeAttendanceDrawer = () => {
    setAttendanceDrawerVisible(false);
  };


  return (
    <div className="min-h-screen">
      <Layout />
      <div className="flex flex-wrap sm:flex-col md:flex-row justify-between items-center mx-10 my-10 gap-4">
        <h1 className="text-xl md:text-2xl">Student</h1>

        <div className="flex gap-4 sm:w-full md:w-auto">
          <Button type="primary"
            onClick={() => setModalVisible(true)} className="w-full sm:w-auto rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700">
            Add Student
          </Button>

          <AddStudentModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
        </div>

        <div className="flex gap-4 sm:w-full md:w-auto">
          <Button type="primary" onClick={() => setAttendanceDrawerVisible(true)} className="w-full sm:w-auto rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700">
            Add Attendance Sheet
          </Button>

          <AttendanceSheetDrawer visible={attendanceDrawerVisible} onClose={() => setAttendanceDrawerVisible(false)} />
        </div>
      </div>
      
      <div className='container mx-auto px-4 py-8'>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4 mb-6">
          <Select
            placeholder="Select Course"
            style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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

        <StudentTable students={filteredStudents} />
      </div>
    </div>
  );
};

