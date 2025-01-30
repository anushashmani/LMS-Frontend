import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Table, Form, message } from "antd";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";

const ResultModal = () => {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [marks, setMarks] = useState("");
    const [reason, setReason] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchExams();
    }, []);

    // Fetch Exams
    const fetchExams = async () => {
        try {
            const { data } = await axios.get(AppRoutes.getExams);
            setExams(data);
        } catch (error) {
            message.error("Failed to load exams!");
        }
    };

    // Fetch Results
    const fetchResults = async (examId) => {
        try {
            const { data } = await axios.get(`http://localhost:4010/exam/getResults/${examId}`);
            setResults(data);
        } catch (error) {
            message.error("Failed to load results!");
        }
    };

    const handleSubmitResult = async () => {
        try {
            await axios.post("http://localhost:4010/exam/submitResult", {
                studentId: selectedExam.studentId,
                examId: selectedExam._id,
                marks,
                reason,
            });
            message.success("Result submitted successfully!");
            setIsModalOpen(false);
            fetchResults(selectedExam._id);
        } catch (error) {
            message.error("Failed to submit result!");
        }
    };

    const openModal = (exam) => {
        setSelectedExam(exam);
        setIsModalOpen(true);
        fetchResults(exam._id);
    };

    const columns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Course", dataIndex: "course", key: "course" },
        { title: "Batch", dataIndex: "batch", key: "batch" },
        { title: "Section", dataIndex: "section", key: "section" },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: "Actions",
            render: (text, record) => (
                <Button onClick={() => openModal(record)}>Add Result</Button>
            ),
        },
    ];

    return (
        <div>
            <h1>Manage Results</h1>
            <Table dataSource={exams} columns={columns} />

            {/* Result Modal */}
            <Modal
                title="Submit Result"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmitResult}
            >
                <Form layout="vertical">
                    <Form.Item label="Marks">
                        <Input
                            type="number"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Reason">
                        <Input.TextArea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ResultModal;
