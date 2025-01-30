import React, { useState, useEffect } from "react";
import {
	ArrowLeft,
	Upload,
	FileText,
	LinkIcon,
	Calendar,
	Users,
	BookOpen,
	Edit,
	Trash,
} from "lucide-react";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import { useAuth } from "@/Context/AuthContext";
import { message } from "antd";

const AssignmentDetail = ({ assignment, onBack }) => {
	const [file, setFile] = useState(null);
	const [codeLink, setCodeLink] = useState("");
	const [deploymentLink, setDeploymentLink] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [submission, setSubmission] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const { user, studentData } = useAuth();

	const dueDate = new Date(assignment.deadline);
	const currentDate = new Date();
	const isPastDue = currentDate > dueDate;

	useEffect(() => {
		fetchSubmission();
	}, []);

	const fetchSubmission = async () => {
		try {
			const response = await axios.get(
				`${AppRoutes.getStudentSubmission}/${assignment._id}/${studentData.studentID}`,
				{ withCredentials: true }
			);
			setSubmission(response.data);
			if (response.data) {
				setCodeLink(response.data.codeLink || "");
				setDeploymentLink(response.data.deploymentLink || "");
				setVideoLink(response.data.videoLink || "");
			}
		} catch (error) {
			console.error("Error fetching submission:", error);
		}
	};

	const handleFileChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const handleSubmit = async () => {
		if (!file && !codeLink && !deploymentLink && !videoLink) {
			setError("Please provide at least one file or link to submit.");
			return;
		}

		if (
			!user ||
			user.role !== "student" ||
			!studentData ||
			!studentData.studentID
		) {
			setError(
				"User is not logged in as a student or student data is missing."
			);
			return;
		}

		setSubmitting(true);
		setError("");

		const formData = new FormData();
		if (file) formData.append("file", file);
		if (codeLink) formData.append("codeLink", codeLink);
		if (deploymentLink) formData.append("deploymentLink", deploymentLink);
		if (videoLink) formData.append("videoLink", videoLink);
		formData.append("assignmentId", assignment._id);
		formData.append("studentId", studentData.studentID);

		try {
			let response;
			if (isEditing) {
				response = await axios.put(
					`${AppRoutes.updateSubmission}/${submission._id}`,
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
						withCredentials: true,
					}
				);
			} else {
				response = await axios.post(AppRoutes.submitAssignment, formData, {
					headers: { "Content-Type": "multipart/form-data" },
					withCredentials: true,
				});
			}
			console.log("Assignment submitted successfully:", response.data);
			message.success(
				isEditing
					? "Assignment updated successfully!"
					: "Assignment submitted successfully!"
			);
			setIsEditing(false);
			fetchSubmission();
		} catch (error) {
			console.error(
				"Error submitting assignment:",
				error.response ? error.response.data : error.message
			);
			setError(
				`Failed to ${isEditing ? "update" : "submit"} assignment. ${error.response ? error.response.data.error : "Please try again."
				}`
			);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this submission?")) {
			try {
				await axios.delete(`${AppRoutes.deleteSubmission}/${submission._id}`, {
					withCredentials: true,
				});
				alert("Submission deleted successfully");
				setSubmission(null);
				setFile(null);
				setCodeLink("");
				setDeploymentLink("");
				setVideoLink("");
			} catch (error) {
				console.error("Error deleting submission:", error);
				setError("Failed to delete submission. Please try again.");
			}
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
			<button
				onClick={onBack}
				className="flex items-center text-[#0782e0] mb-6 hover:underline"
			>
				<ArrowLeft className="mr-2" />
				Back to Assignments List
			</button>
			<h2 className="text-3xl text-left font-bold text-gray-800 mb-4">
				{assignment.name}
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<p className="text-gray-600 flex items-center">
					<FileText className="mr-2 text-[#0782e0]" size={18} />
					Course: {assignment.course.title}
				</p>
				<p className="text-gray-600 flex items-center">
					<Users className="mr-2 text-[#0782e0]" size={18} />
					Batch: {assignment.batch.title}
				</p>
				<p className="text-gray-600 flex items-center">
					<BookOpen className="mr-2 text-[#0782e0]" size={18} />
					Section: {assignment.section.title}
				</p>
				<p className="text-gray-600 flex items-center">
					<Calendar className="mr-2 text-[#0782e0]" size={18} />
					Due: {new Date(assignment.deadline).toLocaleString()}
				</p>
			</div>

			{submission ? (
				<div className="space-y-4 mb-6">
					<div className="bg-green-100 text-green-700 p-4 rounded-md font-semibold mb-6">
						Assignment submitted successfully
					</div>
					{!isPastDue && (
						<div className="flex space-x-4 ">
							<button
								onClick={() => setIsEditing(true)}
								className="bg-[#0782e0] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out flex items-center"
							>
								<Edit className="mr-2" size={18} />
								Edit Submission
							</button>
							<button
								onClick={handleDelete}
								className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-150 ease-in-out flex items-center"
							>
								<Trash className="mr-2" size={18} />
								Delete Submission
							</button>
						</div>
					)}
				</div>
			) : isPastDue ? (
				<div className="bg-red-100 text-red-700 p-4 rounded-md font-semibold mb-6">
					The due date has passed. Assignment Status:{" "}
					<strong>Not Completed</strong>.
				</div>
			) : (
				<div className="space-y-4 mb-6">
					<input
						type="file"
						onChange={handleFileChange}
						className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#0782e0] file:text-white
              hover:file:bg-blue-600 transition duration-150 ease-in-out"
					/>

					<input
						type="url"
						placeholder="Code Link (e.g., GitHub)"
						value={codeLink}
						onChange={(e) => setCodeLink(e.target.value)}
						className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
					/>

					<input
						type="url"
						placeholder="Deployment Link (e.g., Live App URL)"
						value={deploymentLink}
						onChange={(e) => setDeploymentLink(e.target.value)}
						className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
					/>

					<input
						type="url"
						placeholder="Video Link (e.g., YouTube)"
						value={videoLink}
						onChange={(e) => setVideoLink(e.target.value)}
						className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
					/>

					{error && <p className="text-red-500">{error}</p>}

					<button
						onClick={handleSubmit}
						disabled={submitting}
						className="bg-[#0782e0] text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-full md:w-auto transition duration-150 ease-in-out"
					>
						<Upload className="mr-2" />
						{submitting
							? "Submitting..."
							: isEditing
								? "Update Assignment"
								: "Submit Assignment"}
					</button>
				</div>
			)}

			{assignment.file && (
				<div className="mb-4">
					<h3 className="text-lg text-left font-semibold mb-2 text-gray-800">
						Assignment File:
					</h3>
					<a
						href={assignment.file}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#0782e0] hover:underline flex items-center"
					>
						<FileText className="mr-2" size={18} />
						View Assignment File
					</a>
				</div>
			)}

			{assignment.link && (
				<div>
					<h3 className="text-lg text-left font-semibold mb-2 text-gray-800">
						Assignment Link:
					</h3>
					<a
						href={assignment.link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#0782e0] hover:underline flex items-center"
					>
						<LinkIcon className="mr-2" size={18} />
						Open Assignment Link
					</a>
				</div>
			)}
		</div>
	);
};

export default AssignmentDetail;
