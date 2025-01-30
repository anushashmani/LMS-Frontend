import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, message } from "antd";
import { AppRoutes } from "@/Constant/Constant";

const GetExams = () => {
    const [loading, setLoading] = useState(true);
    const [exams, setExams] = useState([]);

    const fetchExams = async () => {
        try {
            const response = await axios.get(AppRoutes.getExams);
            const data = Array.isArray(response.data) ? response.data : [];
            setExams(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching exams:", error);
            message.error("Failed to fetch exams!");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {exams.map((exam) => (
                    <div
                        key={exam._id}
                        className="bg-white text-[#0561a6] p-3 sm:p-4 rounded-3xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 border border-gray-200"
                    >
                        <div className="mb-3">
                            {exam.examPaperUrl.endsWith(".pdf") ? (
                                <iframe
                                    src={exam.examPaperUrl}
                                    title="Exam Paper"
                                    className="w-full h-40 border rounded-md"
                                    style={{ border: "none" }}
                                ></iframe>
                            ) : (
                                <img
                                    alt="Exam"
                                    src={exam.examPaperUrl}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                            )}
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#0561a6] truncate">
                            {exam.title}
                        </h3>
                        <p className="text-xs sm:text-sm mb-1 flex justify-between items-center ">
                            <strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs sm:text-sm mb-1 flex justify-between items-center">
                            <strong>Course:</strong> {exam.course?.title || "N/A"}
                        </p>
                        <p className="text-xs sm:text-sm mb-1 flex justify-between items-center">
                            <strong>Batch:</strong> {exam.batch?.title || "N/A"}
                        </p>
                        <p className="text-xs sm:text-sm mb-1 flex justify-between items-center">
                            <strong>Section:</strong> {exam.section?.title || "N/A"}
                        </p>
                        <p className="text-xs sm:text-sm mb-2 flex justify-between items-center">
                            <strong>Trainer:</strong> {exam.trainerId?.name || "N/A"}
                        </p>
                        <a
                            href={exam.examPaperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-[#0561a6] text-white font-medium py-2 px-4 rounded text-center hover:bg-[#045c8f] transition-all duration-300"
                        >
                            Download File
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetExams;
