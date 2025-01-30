import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import { useAuth } from "@/Context/AuthContext";
import { Button, Modal, Input, Spin } from "antd";

const StudentCourse = () => {
	const { user } = useAuth();
	const [courseData, setCourseData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sectionRequest, setSectionRequest] = useState("");

	useEffect(() => {
		const fetchStudentCourses = async () => {
			if (user && user.role === "student") {
				try {
					const response = await axios.get(
						`${AppRoutes.getStudentCourses}/${user._id}`,
						{ withCredentials: true }
					);
					setCourseData(response.data);
				} catch (err) {
					if (err.response) {
						setError(
							err.response.data.message || "Failed to fetch course data"
						);
					} else {
						setError("Failed to fetch course data");
					}
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
				setError("User is not a student");
			}
		};

		fetchStudentCourses();
	}, [user]);

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleRequestSubmit = () => {
		console.log("Section Request Submitted:", sectionRequest);
		setIsModalOpen(false);
		setSectionRequest("");
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500 text-lg font-bold">Error: {error}</div>;
	}

	if (!courseData) {
		return (
			<div className="text-center text-lg font-bold">
				No course data available
			</div>
		);
	}

	return (
		<div className="p-4 lg:ml-20 md:ml-20 sm:ml-4">
			<div className="bg-white shadow-lg rounded-xl p-6 border border-[#0561a7] max-w-lg mx-auto relative">
				<div className="flex flex-col gap-4">
					<p className="text-xl mb-2 font-bold">{courseData?.course.title}</p>
					<div className="flex items-center mb-2 justify-between">
						<p className="text-lg font-medium">
							<strong className="text-[#0561a7]">Batch:</strong>{" "}
							{courseData?.batch.title}
						</p>
						<p className="text-lg font-medium">
							<strong className="text-[#0561a7]">Section:</strong>{" "}
							{courseData?.section.title}
						</p>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-lg font-medium">
							<strong className="text-[#0561a7]">Duration:</strong>{" "}
							{courseData?.course.duration}
						</p>
						<p className="text-lg font-medium">
							<strong className="text-[#0561a7]">Campus:</strong>{" "}
							{courseData?.campus?.title}
						</p>
					</div>
				</div>
				<div className="mt-6 text-right">
					<Button
						onClick={handleModalOpen}
						type="primary"
						className="bg-[#0561a7] hover:bg-[#034b82]"
					>
						Add Section Request
					</Button>
				</div>
			</div>

			<Modal
				title="Add Section Request"
				visible={isModalOpen}
				onCancel={handleModalClose}
				onOk={handleRequestSubmit}
				okText="Submit"
				cancelText="Cancel"
			>
				<Input
					value={sectionRequest}
					onChange={(e) => setSectionRequest(e.target.value)}
					placeholder="Enter section request details"
				/>
			</Modal>
		</div>
	);
};

export default StudentCourse;
