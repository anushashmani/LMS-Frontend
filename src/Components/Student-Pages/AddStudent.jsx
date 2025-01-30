import React, { useEffect, useState } from 'react';
import { Drawer, Select, Button, Upload, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AppRoutes } from '@/Constant/Constant';
import axios from 'axios';  // Ensure axios is imported for making requests

const { Option } = Select;

const AttendanceSheetDrawer = ({ visible, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [campuses, setCampuses] = useState([]); // New state for Campus
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await fetch(AppRoutes.getCampus);
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch campuses');
        setCampuses(data.data);
      } catch (error) {
        message.error('Failed to fetch campuses.');
      }
    };
    fetchCampuses();
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(AppRoutes.getTrainer); // Adjust the API endpoint as needed
        setTrainers(response.data.data); // Assuming the response contains data in 'data' field
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

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

  // Fetch batches based on the selected course
  const fetchBatchesForCourse = async (courseId) => {
    try {
      const response = await axios.get(AppRoutes.getBatch, {
        params: { courseId }  // Pass the courseId as a parameter to fetch filtered batches
      });
      const filteredBatches = response.data.data.filter(batch => batch.course?._id === courseId);
      setBatches(filteredBatches);
    } catch (error) {
      message.error('Failed to fetch batches.');
    }
  };

  // Fetch sections based on the selected batch
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

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
    setSelectedBatch(null);
    setSelectedSection(null);
    console.log('Selected Course:', value);
  };

  const handleBatchChange = (value) => {
    setSelectedBatch(value);
    setSelectedSection(null);
    console.log('Selected Batch:', value);
  };

  const handleSectionChange = (value) => {
    setSelectedSection(value);
    console.log('Selected Section:', value);
  };

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

  const handleSubmit = () => {
    onClose();
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log('Uploaded File:', info.file);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Drawer
      title="Add Student Attendance Sheet (Excel)"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
    >

      <div className="space-y-4">
        <Select
          style={{ width: '100%' }}
          placeholder="Select Campus">
          {campuses.map(campus => (
            <Select.Option key={campus._id} value={campus._id}>
              {campus.title}
            </Select.Option>
          ))}
        </Select>

        <Select
          style={{ width: '100%' }}
          placeholder="Select Trainer">
          {trainers.map(trainer => (
            <Select.Option key={trainer._id} value={trainer._id}>
              {trainer.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder="Select Course"
          style={{ width: '100%' }}
          onChange={handleCourseChange}
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
            onChange={handleBatchChange}
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
            onChange={handleSectionChange}
            value={selectedSection}
          >
            {sections.map((section) => (
              <Select.Option key={section._id} value={section._id}>
                {section.title}
              </Select.Option>
            ))}
          </Select>
        )}

        <div>
          <Upload
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <Button icon={<UploadOutlined />}>Add Excel Sheet</Button>
          </Upload>
        </div>
      </div>

      <Button
        type="primary"
        className="mt-4"
        block
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Drawer>
  );
};

export default AttendanceSheetDrawer;
