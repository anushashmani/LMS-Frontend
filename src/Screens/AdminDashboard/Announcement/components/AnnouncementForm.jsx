import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AppRoutes } from '@/Constant/Constant';

const { Option } = Select;

const AnnouncementForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [campuses, setCampuses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [sections, setSections] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCampuses = async () => {
            try {
                const response = await fetch(AppRoutes.getCampus);
                const data = await response.json();
                setCampuses(data.data);
            } catch (error) {
                console.error('Error fetching campuses:', error);
            }
        };
        fetchCampuses();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(AppRoutes.getCourses);
                const data = await response.json();
                setCourses(data.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get(AppRoutes.getTrainer);
                setTrainers(response.data.data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };
        fetchTrainers();
    }, []);

    const fetchBatches = async (courseId) => {
        try {
            const response = await fetch(AppRoutes.getBatch);
            const data = await response.json();
            const filteredBatches = data.data.filter(batch => batch.course?._id === courseId);
            setBatches(filteredBatches);
            setSections([]);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    const fetchSections = async (batchId) => {
        try {
            const response = await fetch(AppRoutes.getSections);
            const data = await response.json();
            const sections = Array.isArray(data) ? data : data.data;
            const filteredSections = sections.filter(
                section => section.batch && section.batch._id === batchId
            );
            setSections(filteredSections);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('course', selectedCourse);
        formData.append('batch', selectedBatch);
        formData.append('section', values.section);
        formData.append('campus', values.campus);
        formData.append('trainer', values.trainer);
        formData.append('image', image);

        try {
            await axios.post(AppRoutes.addAnnouncements, formData);
            message.success('Announcement created successfully!');
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to create announcement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-xl border border-gray-100">
            {loading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                </div>
            )}
            <Form layout="vertical" onFinish={handleSubmit} className="announcement-form">
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
                    <Input
                        placeholder="Enter Announcement Title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 text-base md:text-lg p-3 md:p-4"
                    />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]}>
                    <Input.TextArea
                        placeholder="Enter Announcement Description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 text-base md:text-lg p-3 md:p-4"
                    />
                </Form.Item>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="border border-gray-300 rounded-md p-2 md:p-3 w-full"
                        required
                    />
                </div>

                <Form.Item label="Campus" name="campus">
                    <Select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 text-base md:text-lg"
                    >
                        {campuses.map(campus => (
                            <Option key={campus._id} value={campus._id}>{campus.title}</Option>
                        ))}
                    </Select>
                </Form.Item>


                <Form.Item label="Course" name="course">
                    <Select
                        onChange={(value) => { setSelectedCourse(value); fetchBatches(value); }}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 text-lg"
                    >
                        {courses.map(course => (
                            <Option key={course._id} value={course._id}>{course.title}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Batch" name="batch">
                    <Select
                        onChange={(value) => { setSelectedBatch(value); fetchSections(value); }}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 text-lg"
                    >
                        {batches.map(batch => (
                            <Option key={batch._id} value={batch._id}>{batch.title}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Section" name="section">
                    <Select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 text-lg"
                    >
                        {sections.map(section => (
                            <Option key={section._id} value={section._id}>{section.title}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Trainer" name="trainer">
                    <Select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 text-lg"
                    >
                        {trainers.map(trainer => (
                            <Option key={trainer._id} value={trainer._id}>{trainer.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full py-3 bg-[#0561a7] hover:bg-[#034c7d] text-white rounded-md shadow-xl text-base md:text-lg">
                        Create Announcement
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AnnouncementForm;
