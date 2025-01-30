import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppRoutes } from '@/Constant/Constant';
import { Form, Input, Select, DatePicker, Button, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAuth } from '@/Context/AuthContext';

const { Option } = Select;

const UploadAssignment = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user || !user._id) {
          throw new Error('User not authenticated');
        }

        const [campusesResponse, trainerDataResponse] = await Promise.all([
          axios.get(AppRoutes.getCampus),
          axios.get(`${AppRoutes.getTrainerCourses}/${user._id}`)
        ]);

        setCampuses(campusesResponse.data.data);
        setTrainerId(trainerDataResponse.data.trainerID);
        setCourses(trainerDataResponse.data.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load trainer data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // const handleSubmit = async (values) => {
  //   const formData = new FormData();
  //   formData.append("name", values.name);
  //   formData.append("deadline", values.deadline.format('YYYY-MM-DD'));
  //   formData.append("file", values.file[0].originFileObj);
  //   formData.append("link", values.link);
  //   formData.append("course", selectedCourse);
  //   formData.append("batch", selectedBatch);
  //   formData.append("section", selectedSection);
  //   formData.append("trainer", trainerId);
  //   formData.append("campus", selectedCampus);

  //   try {
  //     const response = await axios.post(AppRoutes.addAssignment, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log('Data response', response.data);

  //     message.success(response.data.message);
  //   } catch (error) {
  //     message.error("Error uploading assignment");
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("deadline", values.deadline.format('YYYY-MM-DD'));
    formData.append("link", values.link || '');

    // Append file if it exists
    if (values.file && values.file[0] && values.file[0].originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    // Find the full course object and append its name
    const selectedCourseObj = courses.find(c => c.courseName === selectedCourse);
    formData.append("course", selectedCourseObj ? selectedCourseObj.courseName : '');

    // Append batch ID
    formData.append("batch", selectedBatch);

    // Append section title
    formData.append("section", selectedSection);

    // Append trainer ID
    formData.append("trainer", trainerId);

    // Append campus ID
    formData.append("campus", selectedCampus);

    try {
      const response = await axios.post(AppRoutes.addAssignment, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('Assignment upload response:', response.data);

      message.success('Assignment uploaded successfully');
      // You might want to reset the form or redirect the user here
    } catch (error) {
      console.error('Error uploading assignment:', error);
      message.error(error.response?.data?.message || "Error uploading assignment");
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#0561a6] font-extrabold text-center mb-6 sm:mb-8">
        Upload Assignment
      </h2>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-transform hover:scale-105"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              label="Assignment Name"
              name="name"
              rules={[{ required: true, message: 'Please input the assignment name!' }]}
            >
              <Input placeholder="Enter assignment name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              label="Assignment Link"
              name="link"
              rules={[{ required: true, message: 'Please input the assignment link!' }]}
            >
              <Input placeholder="Enter assignment link" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              label="Deadline"
              name="deadline"
              rules={[{ required: true, message: 'Please select the deadline!' }]}
            >
              <DatePicker
                className="w-full"
                disabledDate={(current) => current && current < dayjs().endOf('day')}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Select Course"
              name="course"
              rules={[{ required: true, message: 'Please select a course!' }]}
            >
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

          <Col xs={24} sm={12}>
            <Form.Item
              label="Select Batch"
              name="batch"
              rules={[{ required: true, message: 'Please select a batch!' }]}
            >
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

          <Col xs={24} sm={12}>
            <Form.Item
              label="Select Section"
              name="section"
              rules={[{ required: true, message: 'Please select a section!' }]}
            >
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

          <Col xs={24} sm={12}>
            <Form.Item
              label="Select Campus"
              name="campus"
              rules={[{ required: true, message: 'Please select a campus!' }]}
            >
              <Select
                className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                placeholder="Select a campus"
                onChange={(value) => setSelectedCampus(value)}
              >
                {campuses.map((campus) => (
                  <Option key={campus._id} value={campus._id}>{campus.title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Upload File"
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              rules={[{ required: true, message: 'Please upload a file!' }]}
            >
              <Upload
                name="file"
                action="/upload"
                listType="picture"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} className="bg-[#0561a6] rounded-xl text-white hover:bg-[#034f72] transition-all duration-300">
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Button
                className="bg-[#0561a6] w-full rounded-xl text-white hover:bg-[#034f72] transition-all duration-300"
                type="primary" htmlType="submit" >
                Upload Assignment
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UploadAssignment;

