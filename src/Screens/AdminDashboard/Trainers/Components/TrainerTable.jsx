import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Drawer, Form, Input, Select, Upload, Space, Tag } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AppRoutes } from '@/Constant/Constant';

const { Option } = Select;

const TrainerTable = ({ trainers }) => {
  const [courses, setCourses] = useState([]);
  const [trainerBatches, setTrainerBatches] = useState([]);
  const [trainerSections, setTrainerSections] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);

  useEffect(() => {
    fetchCourses();
    return () => {
      imageFile.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(AppRoutes.getCourses);
      setCourses(response.data.data);
    } catch (error) {
      message.error('Failed to fetch courses');
    }
  };

  const fetchBatches = async (courseIds) => {
    try {
      const [batchesResponse, trainersResponse] = await Promise.all([
        axios.get(AppRoutes.getBatch),
        axios.get(AppRoutes.getTrainer)
      ]);
      const allBatches = batchesResponse.data.data;
      const allTrainers = trainersResponse.data.data;

      const filteredBatches = allBatches.filter(batch => courseIds.includes(batch.course?._id));
    
      const batchesWithAssignment = filteredBatches.map(batch => {
        const assignedTrainer = allTrainers.find(trainer => 
          trainer._id !== selectedTrainer?._id && // Exclude the current trainer
          trainer.batches?.some(trainerBatch => trainerBatch._id === batch._id)
        );
        return { 
          ...batch, 
          isAssigned: !!assignedTrainer,
          assignedTrainerName: assignedTrainer ? assignedTrainer.name : null
        };
      });

      setTrainerBatches(batchesWithAssignment);
    } catch (error) {
      message.error('Failed to fetch batches.');
    }
  };

  const fetchSections = async (batchIds) => {
    try {
      const [sectionsResponse, trainersResponse] = await Promise.all([
        axios.get(AppRoutes.getSections),
        axios.get(AppRoutes.getTrainer)
      ]);
      const allSections = Array.isArray(sectionsResponse.data) ? sectionsResponse.data : sectionsResponse.data.data;
      const allTrainers = trainersResponse.data.data;

      const filteredSections = allSections.filter(section =>
        batchIds.includes(section.batch?._id)
      );
    
      const sectionsWithAssignment = filteredSections.map(section => {
        const assignedTrainer = allTrainers.find(trainer => 
          trainer._id !== selectedTrainer?._id && // Exclude the current trainer
          trainer.sections?.some(trainerSection => trainerSection._id === section._id)
        );
        return { 
          ...section, 
          isAssigned: !!assignedTrainer,
          assignedTrainerName: assignedTrainer ? assignedTrainer.name : null
        };
      });

      setTrainerSections(sectionsWithAssignment);
    } catch (error) {
      console.error('Error fetching sections:', error);
      message.error('Failed to fetch sections.');
    }
  };

  const handleViewDetails = (trainer) => {
    setSelectedTrainer(trainer);
    setViewDrawerVisible(true);
  };

  const handleEditTrainer = async (trainer) => {
    try {
      const response = await axios.get(`${AppRoutes.getTrainer}/${trainer._id}`);
      const trainerDetails = response.data;
      setSelectedTrainer(trainerDetails);
      setEditDrawerVisible(true);
      form.setFieldsValue({
        name: trainerDetails.name,
        email: trainerDetails.email,
        phone: trainerDetails.phone,
        whatsapp: trainerDetails.whatsapp,
        address: trainerDetails.address,
        salary: trainerDetails.salary,
        specialization: trainerDetails.specialization,
        courses: trainerDetails.courses?.map(course => course._id) || [],
        batches: trainerDetails.batches?.map(batch => batch._id) || [],
        sections: trainerDetails.sections?.map(section => section._id) || [],
      });
      setImageFile(trainerDetails.image ? [{ uid: '-1', name: 'Image', url: trainerDetails.image }] : []);
      setResumeFile(trainerDetails.resume ? [{ uid: '-1', name: 'Resume', url: trainerDetails.resume }] : []);
      await fetchBatches(trainerDetails.courses?.map(course => course._id) || []);
      await fetchSections(trainerDetails.batches?.map(batch => batch._id) || []);
    } catch (error) {
      message.error('Failed to fetch trainer details');
    }
  };

  const handleCloseDrawer = () => {
    setViewDrawerVisible(false);
    setEditDrawerVisible(false);
    setSelectedTrainer(null);
    form.resetFields();
  };

  const handleDeleteTrainer = async (trainerId) => {
    try {
      await axios.delete(`${AppRoutes.deleteTrainer}${trainerId}`);
      message.success('Trainer deleted successfully');
      fetchTrainers();
    } catch (error) {
      message.error('Failed to delete trainer');
    }
  };

  const handleImageChange = ({ fileList }) => {
    const newFileList = fileList.map(file => {
      if (file.originFileObj) {
        file.preview = URL.createObjectURL(file.originFileObj);
      }
      return file;
    });
    setImageFile(newFileList);
  };

  const handleResumeChange = ({ fileList }) => {
    setResumeFile(fileList);
  };

  const handleUpdateTrainer = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (Array.isArray(values[key])) {
          values[key].forEach(value => formData.append(`${key}[]`, value));
        } else if (key !== 'image' && key !== 'resume') {
          formData.append(key, values[key]);
        }
      });

      // Handle removal of batches and sections
      const removedBatches = selectedTrainer.batches
        .filter(batch => !values.batches.includes(batch._id))
        .map(batch => batch._id);
      const removedSections = selectedTrainer.sections
        .filter(section => !values.sections.includes(section._id))
        .map(section => section._id);

      formData.append('removedBatches', JSON.stringify(removedBatches));
      formData.append('removedSections', JSON.stringify(removedSections));

      if (imageFile.length > 0 && imageFile[0].originFileObj) {
        formData.append('image', imageFile[0].originFileObj);
      }

      if (resumeFile.length > 0 && resumeFile[0].originFileObj) {
        formData.append('resume', resumeFile[0].originFileObj);
      }

      const response = await axios.put(`${AppRoutes.updateTrainer}${selectedTrainer._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        message.success('Trainer updated successfully');
        fetchTrainers();
        setEditDrawerVisible(false);
      } else {
        throw new Error('Failed to update trainer');
      }
    } catch (error) {
      console.error('Error updating trainer:', error);
      message.error('Failed to update trainer: ' + (error.response?.data?.message || error.message));
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image || "/placeholder.svg"} alt="Trainer" className="w-8 h-8 rounded-full object-cover" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            onClick={() => handleViewDetails(record)}
            icon={<EyeOutlined />}
            className="text-blue-600 hover:text-blue-800 text-xs"
          />
          <Button
            type="text"
            onClick={() => handleEditTrainer(record)}
            icon={<EditOutlined />}
            className="text-green-600 hover:text-green-800 text-xs"
          />
          <Popconfirm
            title="Are you sure you want to delete this trainer?"
            onConfirm={() => handleDeleteTrainer(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-800 text-xs"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={trainers}
        rowKey="_id"
        className="bg-white rounded-lg shadow-md overflow-hidden"
        pagination={false}
        scroll={{ y: 400, x: "max-content" }}
        rowClassName={(record, index) => 
          index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
        }
      />
      <style jsx>{`
        .ant-table-tbody > tr > td {
          padding: 8px 16px;
          font-size: 12px;
        }
      `}</style>

      {/* View Drawer */}
      <Drawer
        title="Trainer Details"
        placement="right"
        onClose={handleCloseDrawer}
        open={viewDrawerVisible}
        width={500}
        className="bg-white"
      >
        {selectedTrainer && (
          <div className="space-y-4">
            <p><strong className="text-gray-700">Name:</strong> <span className="text-gray-600">{selectedTrainer?.name}</span></p>
            <p><strong className="text-gray-700">Email:</strong> <span className="text-gray-600">{selectedTrainer?.email}</span></p>
            <p><strong className="text-gray-700">Role:</strong> <span className="text-gray-600">{selectedTrainer?.role}</span></p>
            <p><strong className="text-gray-700">Salary:</strong> <span className="text-gray-600">{selectedTrainer?.salary}</span></p>
            <p><strong className="text-gray-700">Phone No:</strong> <span className="text-gray-600">{selectedTrainer?.phone}</span></p>
            <p><strong className="text-gray-700">WhatsApp:</strong> <span className="text-gray-600">{selectedTrainer?.whatsapp}</span></p>
            <p><strong className="text-gray-700">Specialization:</strong> <span className="text-gray-600">{selectedTrainer?.specialization}</span></p>
            <p><strong className="text-gray-700">Address:</strong> <span className="text-gray-600">{selectedTrainer?.address}</span></p>

            {selectedTrainer.courses && selectedTrainer.courses.length > 0 ? (
              <div>
                <strong className="text-gray-700">Courses:</strong>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedTrainer.courses.map((course) => (
                    <li key={course._id}>{course.title}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600">No courses available</p>
            )}

            {selectedTrainer.batches && selectedTrainer.batches.length > 0 ? (
              <div>
                <strong className="text-gray-700">Batches:</strong>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedTrainer.batches.map((batch) => (
                    <li key={batch._id}>{batch.title} - {batch.course?.title}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600">No batches available</p>
            )}

            {selectedTrainer.sections && selectedTrainer.sections.length > 0 ? (
              <div>
                <strong className="text-gray-700">Sections:</strong>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedTrainer.sections.map((section) => (
                    <li key={section._id}>
                      {section.title} - Batch: {section.batch?.title} - Course: {section.course?.title}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600">No sections available</p>
            )}

            <div>
              <strong className="text-gray-700">Image:</strong>
              <img
                src={selectedTrainer?.image || "/placeholder.svg"}
                alt={`${selectedTrainer?.name}'s image`}
                className="mt-2 max-w-[200px] rounded-lg"
              />
            </div>

            {selectedTrainer?.resume && (
              <p>
                <strong className="text-gray-700">Resume:</strong>
                <a className="ml-2 text-blue-600 hover:text-blue-800" href={selectedTrainer?.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
              </p>
            )}
          </div>
        )}
      </Drawer>

      {/* Edit Drawer */}
      <Drawer
        title="Edit Trainer"
        width={720}
        onClose={handleCloseDrawer}
        open={editDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateTrainer} className="space-y-4">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item label="Whatsapp" name="whatsapp">
            <Input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item label="Salary" name="salary">
            <Input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input.TextArea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item label="Specialization" name="specialization">
            <Input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item label="Courses" name="courses">
            <Select
              mode="multiple"
              onChange={(selectedCourseIds) => {
                fetchBatches(selectedCourseIds);
                form.setFieldsValue({ batches: [], sections: [] });
              }}
              className="w-full"
            >
              {courses.map(course => (
                <Option key={course._id} value={course._id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Batches" name="batches">
            <Select
              mode="multiple"
              onChange={(selectedBatchIds) => {
                fetchSections(selectedBatchIds);
                form.setFieldsValue({ sections: [] });
              }}
              className="w-full"
            >
              {trainerBatches.map(batch => (
                <Option 
                  key={batch._id} 
                  value={batch._id}
                  disabled={batch.isAssigned && !form.getFieldValue('batches')?.includes(batch._id)}
                >
                  {batch.title} - {batch.course?.title}
                  {batch.isAssigned && ` (Assigned to ${batch.assignedTrainerName})`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Sections" name="sections">
            <Select 
              mode="multiple" 
              className="w-full"
              onChange={(selectedSectionIds) => {
                const updatedSections = trainerSections.map(section => ({
                  ...section,
                  isDisabled: section.isAssigned && !selectedSectionIds.includes(section._id)
                }));
                setTrainerSections(updatedSections);
              }}
            >
              {trainerSections.map(section => (
                <Option 
                  key={section._id} 
                  value={section._id}
                  disabled={section.isDisabled}
                >
                  <div className="flex justify-between items-center">
                    <span>{section.title}</span>
                    <span className="text-xs text-gray-500">
                      Batch: {section.batch.title}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">Course: {section.course.title}</div>
                  {section.isAssigned && (
                    <div className="text-xs text-red-500">
                      {section.isDisabled 
                        ? `Assigned to ${section.trainer?.name || 'Another Trainer'}`
                        : 'Click to remove from this trainer'
                      }
                    </div>
                  )}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Trainer Image" name="image">
            <Upload
              listType="picture-card"
              fileList={imageFile}
              beforeUpload={() => false}
              onChange={handleImageChange}
              maxCount={1}
            >
              {imageFile.length < 1 && (
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              )}
            </Upload>
            {imageFile.length > 0 && (
              <div className="mt-4">
                <img
                  src={imageFile[0].preview || imageFile[0].url || selectedTrainer?.image}
                  alt="Trainer"
                  className="w-full max-w-[200px] rounded-lg"
                />
              </div>
            )}
          </Form.Item>

          <Form.Item label="Resume" name="resume">
            <Upload
              fileList={resumeFile}
              beforeUpload={() => false}
              onChange={handleResumeChange}
              showUploadList={false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                Upload Resume
              </Button>
            </Upload>
            {resumeFile.length > 0 && (
              <div className="mt-4">
                <strong className="text-gray-700">Resume Preview:</strong>
                <a
                  href={resumeFile[0]?.url || selectedTrainer?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  View Resume
                </a>
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Update Trainer
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default TrainerTable;
