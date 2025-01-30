import React, { useEffect, useState } from "react";
import "@/App.css";
import { useAuth } from "@/Context/AuthContext";
import { Col, Row, Form, message, Select, Button } from "antd";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

const ClassWorkForm = () => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        githubLink: "",
        youtubeLink: "",
        course: "",
        batch: "",
        section: "",
        campus: "",
    });

    const [courses, setCourses] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedCampus, setSelectedCampus] = useState("");
    const [trainerId, setTrainerId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (!user || !user._id) throw new Error("User not authenticated");

                const [campusesResponse, trainerDataResponse] = await Promise.all([
                    axios.get(AppRoutes.getCampus),
                    axios.get(`${AppRoutes.getTrainerCourses}/${user._id}`),
                ]);

                setCampuses(campusesResponse.data.data);
                setTrainerId(trainerDataResponse.data.trainerID);
                setCourses(trainerDataResponse.data.courses);
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("githubLink", values.githubLink || "");
            formData.append("youtubeLink", values.youtubeLink || "");
            formData.append("course", selectedCourse);
            formData.append("batch", selectedBatch);
            formData.append("section", selectedSection);
            formData.append("trainer", trainerId);
            formData.append("campus", selectedCampus);

            const response = await axios.post(AppRoutes.addClassWork, formData);

            if (response.status === 201) {
                message.success("Class work submitted successfully");
                form.resetFields();
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            console.error("Error submitting:", error);
            message.error("Failed to submit");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center text-[#0561a6] mb-6">
                    Class Work Form
                </h1>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0561a6]"></div>
                    </div>
                ) : (
                    <Form layout="vertical" form={form} onFinish={handleSubmit}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[{ required: true, message: "Title is required" }]}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter Title"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0561a6]"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="GitHub Link" name="githubLink">
                                    <input
                                        type="url"
                                        placeholder="Enter GitHub Link"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0561a6]"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item label="YouTube Link" name="youtubeLink">
                                    <input
                                        type="url"
                                        placeholder="Enter YouTube Link"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0561a6]"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                    rules={[{ required: true, message: "Description is required" }]}
                                >
                                    <textarea
                                        placeholder="Enter Description"
                                        rows="4"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0561a6]"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Select Course" name="course" rules={[{ required: true }]}>
                                    <Select placeholder="Select a course" onChange={setSelectedCourse}>
                                        {courses.map((course) => (
                                            <Option key={course.courseName} value={course.courseName}>
                                                {course.courseName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Select Batch" name="batch" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Select a batch"
                                        onChange={setSelectedBatch}
                                        disabled={!selectedCourse}
                                    >
                                        {courses
                                            .find((c) => c.courseName === selectedCourse)
                                            ?.batches.map((batch) => (
                                                <Option key={batch._id} value={batch._id}>
                                                    {batch.title}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Select Section" name="section" rules={[{ required: true }]}>
                                    <Select placeholder="Select a section" disabled={!selectedBatch} onChange={setSelectedSection}>
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
                                <Form.Item label="Select Campus" name="campus" rules={[{ required: true }]}>
                                    <Select placeholder="Select a campus" onChange={setSelectedCampus}>
                                        {campuses.map((campus) => (
                                            <Option key={campus._id} value={campus._id}>
                                                {campus.title}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-[#0561a6] text-white w-full rounded-lg hover:bg-[#034f72]"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default ClassWorkForm;
