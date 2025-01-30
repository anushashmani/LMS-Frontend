import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import dayjs from 'dayjs';

const { Option } = Select;

const CreateExam = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [sections, setSections] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');

    // Handle file upload
    const handleFileUpload = (info) => {
        const uploadedFile = info.file;
        const fileType = uploadedFile.type;

        if (fileType.includes("image") || fileType === "application/pdf") {
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(uploadedFile);
            setFile(uploadedFile);
        } else {
            message.error("Only PDF or image files are allowed!");
        }
    };

    // Fetch Courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(AppRoutes.getCourses);
                setCourses(response.data.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch Trainers
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get(AppRoutes.getTrainer);
                setTrainers(response.data.data);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };
        fetchTrainers();
    }, []);

    // Fetch Batches based on Course
    const fetchBatches = async (courseId) => {
        try {
            const response = await axios.get(AppRoutes.getBatch);
            const filteredBatches = response.data.data.filter(batch => batch.course?._id === courseId);
            setBatches(filteredBatches);
            setSections([]);
        } catch (error) {
            console.error("Error fetching batches:", error);
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

    // Submit Form
    const handleSubmit = async (values) => {
        if (!file) {
            message.error("Please upload the exam paper!");
            return;
        }

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("trainerId", values.trainer);
        formData.append("course", selectedCourse);
        formData.append("batch", selectedBatch);
        formData.append("section", values.section);
        formData.append("date", values.date.format("YYYY-MM-DD"));
        formData.append("examPaper", file);

        try {
            setLoading(true);
            const response = await axios.post(
                AppRoutes.addExam,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            message.success(response.data.msg);
            console.log("Exam created successfully:", response.data);
        } catch (error) {
            console.log("Failed to create exam:", error.response?.data || error.message);
            message.error(error.response?.data.msg || "Failed to create exam!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Form layout="vertical" onFinish={handleSubmit} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
                <Form.Item name="title" label="Exam Title" rules={[{ required: true }]}>
                    <Input placeholder="Enter Exam Title" />
                </Form.Item>

                <Form.Item label="Course" name="course" rules={[{ required: true }]}>
                    <Select onChange={(value) => { setSelectedCourse(value); fetchBatches(value); }}>
                        {courses.map(course => (
                            <Option key={course._id} value={course._id}>{course.title}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Batch" name="batch" rules={[{ required: true }]}>
                    <Select onChange={(value) => { setSelectedBatch(value); fetchSections(value); }}>
                        {batches.map(batch => (
                            <Option key={batch._id} value={batch._id}>{batch.title}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Section" name="section" rules={[{ required: true }]}>
                    <Select>
                        {sections.map(section => (
                            <Option key={section._id} value={section._id}>{section.title}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Trainer" name="trainer" rules={[{ required: true }]}>
                    <Select>
                        {trainers.map(trainer => (
                            <Option key={trainer._id} value={trainer._id}>{trainer.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="date" label="Exam Date" rules={[{ required: true }]}>
                    <DatePicker style={{ width: "100%" }} disabledDate={(current) => current && current < dayjs().endOf('day')} />
                </Form.Item>

                <Form.Item label="Upload Exam Paper" rules={[{ required: true }]}>
                    <Upload beforeUpload={() => false} onChange={handleFileUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Upload File (PDF/Image)</Button>
                    </Upload>
                    {previewUrl && (
                        <div style={{ marginTop: "10px" }}>
                            {file.type.includes("image") ? (
                                <img src={previewUrl} alt="Preview" style={{ width: "200px", height: "auto" }} />
                            ) : (
                                <iframe src={previewUrl} title="PDF Preview" style={{ width: "200px", height: "300px" }} />
                            )}
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        className="bg-[#0561a6] w-full rounded-xl text-white hover:bg-[#034f72] transition-all duration-300"
                        type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Create Exam
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateExam;
