import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Select, Input, message } from "antd";
import { AppRoutes } from "@/Constant/Constant";
import { useAuth } from "@/Context/AuthContext";
import { FaBookOpen, FaClock, FaSchool, FaUserGraduate, FaPlus } from "react-icons/fa";

const { Option } = Select;

export const AnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [campuses, setCampuses] = useState([]);
    const [selectedCampus, setSelectedCampus] = useState("");
    const [trainerId, setTrainerId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [trainerData, setTrainerData] = useState(null);

    const { user } = useAuth();
    const [form] = Form.useForm();

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
                setTrainerData(trainerDataResponse.data);
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

    useEffect(() => {
        const fetchAnnouncements = async () => {
            if (user && user.email) {
                try {
                    const response = await axios.get(`${AppRoutes.getTeacherAnnouncements}?email=${user.email}`)
                    setAnnouncements(response.data)
                } catch (err) {
                    console.error("Error fetching announcements:", err)
                    // Use your preferred method to show errors, e.g., toast or alert
                    message.error("Failed to fetch announcements");
                }
            }
        }
        fetchAnnouncements()
    }, [user])

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => formData.append(key, values[key]));
            formData.append("trainer", trainerData.trainerID);

            const response = await axios.post(AppRoutes.addTeacherAnnouncement, formData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log('Form Data', formData);
            

            if (response.status === 201) {
                message.success("Announcement submitted successfully");
                form.resetFields();
                setIsModalVisible(false);
                // Refresh announcements
                const newAnnouncementsResponse = await axios.get(AppRoutes.getTeacherAnnouncements);
                setAnnouncements(newAnnouncementsResponse.data);
            }
        } catch (error) {
            console.error("Error submitting Announcement:", error);
            // message.error("Failed to submit Announcement");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0561a6]"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0561a7] mb-4 sm:mb-0">
                    Announcements
                </h2>
                <button
                    onClick={() => setIsModalVisible(true)}
                    className="bg-[#0561a7] text-white hover:bg-[#143c5b] transition-colors duration-300 py-2 px-4 rounded-lg flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Announcement
                </button>
            </div>

            <Modal
                title="Add Announcement"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className="max-w-lg mx-auto"
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input className="rounded-lg" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
                        <Input.TextArea className="rounded-lg" rows={4} />
                    </Form.Item>
                    <Form.Item name="campus" label="Campus" rules={[{ required: true, message: 'Please select a campus!' }]}>
                        <Select className="rounded-lg">
                            {campuses.map((campus) => (
                                <Option key={campus._id} value={campus._id}>{campus.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Select Course"
                        name="course"
                        rules={[{ required: true, message: 'Please select a course!' }]}
                    >
                        <Select
                            className="w-full rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                            placeholder="Select a course"
                            onChange={(value) => {
                                setSelectedCourse(value);
                                setSelectedBatch("");
                                setSelectedSection("");
                            }}
                        >
                            {courses.map((course) => (
                                <Option key={course._id} value={course.courseName}>
                                    {course.courseName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Select Batch"
                        name="batch"
                        rules={[{ required: true, message: 'Please select a batch!' }]}
                    >
                        <Select
                            className="w-full rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
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

                    <Form.Item
                        label="Select Section"
                        name="section"
                        rules={[{ required: true, message: 'Please select a section!' }]}
                    >
                        <Select
                            className="w-full rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
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
                    <Form.Item>
                        <button type="submit" className="w-full bg-[#0561a7] text-white rounded-lg hover:bg-[#0761a7] py-3 transition-colors duration-300">
                            Add Announcement
                        </button>
                    </Form.Item>
                </Form>
            </Modal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <div
                            key={announcement._id}
                            className="bg-white text-[#0561a6] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#0561a6]"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-[#0561a6] tracking-wide">
                                {announcement.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                {announcement.description}
                            </p>
                            <div className="space-y-2 text-gray-600">
                                <p className="text-sm flex items-center gap-2">
                                    <FaBookOpen className="text-[#0561a6]" />
                                    <span className="font-semibold">Course:</span> {announcement.course.title}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                    <FaUserGraduate className="text-[#0561a6]" />
                                    <span className="font-semibold">Batch:</span> {announcement.batch?.title || 'N/A'}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                    <FaClock className="text-[#0561a6]" />
                                    <span className="font-semibold">Section:</span> {announcement.section}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                    <FaSchool className="text-[#0561a6]" />
                                    <span className="font-semibold">Campus:</span> {announcement.campus.title}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full text-center">No announcements found.</p>
                )}
            </div>
        </div>
    );
};

