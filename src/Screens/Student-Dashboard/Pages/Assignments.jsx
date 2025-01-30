import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import { ChevronDown, ChevronUp, BookOpen, Calendar, Users, Filter } from "lucide-react";
import AssignmentDetail from "../Compunents/AssignmentDetails";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import { AssignmentStatusChart } from "../Compunents/AssignmentStatusChart";
import { Select } from "antd";

export default function Home() {
	const { courses, assignments, refreshAssignments, studentData } = useAuth();
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [expandedCourses, setExpandedCourses] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [submissionStatus, setSubmissionStatus] = useState({});
	const [totalSubmitted, setTotalSubmitted] = useState(0);
	const [totalPending, setTotalPending] = useState(0);
	const [totalNotCompleted, setTotalNotCompleted] = useState(0);
	const [statusFilter, setStatusFilter] = useState("all");

	useEffect(() => {
		const fetchData = async () => {
			try {
				await refreshAssignments();
				await fetchSubmissionStatus();
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch assignments. Please try again later.");
				setLoading(false);
			}
		};
		fetchData();
	}, [refreshAssignments]);

	useEffect(() => {
		const submitted = Object.values(submissionStatus).filter((s) => s).length;
		const notCompleted = assignments.filter((a) => new Date() > new Date(a.deadline) && !submissionStatus[a._id]).length;
		const pending = assignments.length - submitted - notCompleted;

		setTotalSubmitted(submitted);
		setTotalPending(pending);
		setTotalNotCompleted(notCompleted);
	}, [assignments, submissionStatus]);

	const fetchSubmissionStatus = async () => {
		if (!studentData || !studentData.studentID) return;

		const status = {};
		for (const assignment of assignments) {
			try {
				const response = await axios.get(
					`${AppRoutes.getStudentSubmission}/${assignment._id}/${studentData.studentID}`,
					{ withCredentials: true }
				);
				status[assignment._id] = response.data;
			} catch (error) {
				console.error("Error fetching submission status:", error);
			}
		}
		setSubmissionStatus(status);
	};

	const toggleCourse = (courseId) => {
		setExpandedCourses((prev) => ({
			...prev,
			[courseId]: !prev[courseId],
		}));
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-white">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-screen bg-white">
				<p className="text-xl text-red-600 bg-white p-6 rounded-lg shadow-md">{error}</p>
			</div>
		);
	}

	if (!courses || typeof courses !== "object" || !courses.course) {
		return (
			<div className="flex items-center justify-center h-screen bg-white">
				<p className="text-xl text-gray-600 bg-white p-6 rounded-lg shadow-md">No courses found.</p>
			</div>
		);
	}

	const renderAssignments = (courseId) => {
		const courseAssignments = assignments.filter((assignment) => assignment.course._id === courseId);

		if (courseAssignments.length === 0) {
			return <p className="text-gray-500 text-center mt-4">No assignments for this course.</p>;
		}

		const sortedAssignments = courseAssignments.sort((a, b) => {
			const aIsNew = new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
			const bIsNew = new Date(b.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
			if (aIsNew && !bIsNew) return -1;
			if (!aIsNew && bIsNew) return 1;
			return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
		});

		const filteredAssignments = sortedAssignments.filter((assignment) => {
			const dueDate = new Date(assignment.deadline);
			const currentDate = new Date();
			const isPastDue = currentDate > dueDate;
			const submission = submissionStatus[assignment._id];

			switch (statusFilter) {
				case "submitted":
					return submission;
				case "pending":
					return !submission && !isPastDue;
				case "notCompleted":
					return !submission && isPastDue;
				default:
					return true;
			}
		});

		return (
			<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{filteredAssignments.map((assignment) => {
					const dueDate = new Date(assignment.deadline);
					const currentDate = new Date();
					const isPastDue = currentDate > dueDate;
					const submission = submissionStatus[assignment._id];

					let statusText = "";
					let statusClass = "";

					if (submission) {
						statusText = "Submitted";
						statusClass = "text-green-500";
					} else if (isPastDue) {
						statusText = "Not Completed";
						statusClass = "text-red-500";
					} else {
						statusText = "Pending";
						statusClass = "text-[#0782e0]";
					}

					const isNew = (() => {
						const today = new Date();
						today.setHours(0, 0, 0, 0);

						const yesterday = new Date(today);
						yesterday.setDate(today.getDate() - 1);

						const createdAt = new Date(assignment.createdAt);

						return createdAt >= yesterday && createdAt < today || createdAt >= today;
					})();

					return (
						<div
							key={assignment._id}
							className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out cursor-pointer border border-gray-200 relative"
							onClick={() => setSelectedAssignment(assignment)}
						>
							{isNew && (
								<span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
									NEW
								</span>
							)}
							<h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.name}</h3>
							<p className="text-gray-600 mb-2">
								Due: <span className="font-medium">{dueDate.toLocaleDateString()}</span>
							</p>
							<p className={`text-sm font-medium ${statusClass}`}>{statusText}</p>
							{isPastDue && !submission && <p className="text-xs text-red-400 mt-1">Deadline has passed</p>}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-white py-8">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{!selectedAssignment && (
					<div className="mb-8">
						<AssignmentStatusChart submitted={totalSubmitted} pending={totalPending} notCompleted={totalNotCompleted} />
					</div>
				)}
				{selectedAssignment ? (
					<AssignmentDetail
						assignment={selectedAssignment}
						onBack={async () => {
							setSelectedAssignment(null);
							await refreshAssignments();
							await fetchSubmissionStatus();
						}}
					/>
				) : (
					<>
						<h1 className="text-3xl font-bold mb-6 text-[#0782e0]">Your Assignments</h1>
						<div className="bg-white rounded-lg shadow-lg p-6">
							<div className="flex flex-wrap justify-between items-center mb-4 gap-4">
								<div className="flex items-center cursor-pointer" onClick={() => toggleCourse(courses.course._id)}>
									<h2 className="text-2xl font-semibold text-[#0782e0]">{courses.course.title}</h2>
									{expandedCourses[courses.course._id] ? (
										<ChevronUp className="text-[#0782e0] ml-2 text-3xl" />
									) : (
										<ChevronDown className="text-[#0782e0] ml-2 font-bold" />
									)}
								</div>
								<div className="flex items-center">
									<Filter className="text-[#0782e0] w-5 h-5 mr-2" />
									<Select
										value={statusFilter}
										onChange={(value) => setStatusFilter(value)}
										className="text-[#0782e0]"
										style={{ width: 150 }}
									>
										<Select.Option value="all">All</Select.Option>
										<Select.Option value="submitted">Submitted</Select.Option>
										<Select.Option value="pending">Pending</Select.Option>
										<Select.Option value="notCompleted">Not Completed</Select.Option>
									</Select>
								</div>
								<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
									<p className="text-gray-600 flex items-center">
										<BookOpen className="mr-2 text-[#0782e0]" size={18} />
										Batch: {courses.batch?.title || "N/A"}
									</p>
									<p className="text-gray-600 flex items-center">
										<Users className="mr-2 text-[#0782e0]" size={18} />
										Section: {courses.section?.title || "N/A"}
									</p>
								</div>
							</div>
							{expandedCourses[courses.course._id] && renderAssignments(courses.course._id)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
