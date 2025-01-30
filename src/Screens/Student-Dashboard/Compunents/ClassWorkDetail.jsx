import React, { useState, useEffect } from "react";
import {
	ArrowLeft,
	FileText,
	LinkIcon,
	Calendar,
	Users,
	BookOpen,
	Send,
	Loader2,
} from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { message } from "antd";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";

const ClassWorkDetail = ({ classWork, onBack }) => {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [fetchingComments, setFetchingComments] = useState(true);
	const { user, studentData } = useAuth();

	useEffect(() => {
		fetchComments();
	}, [classWork._id]);

	const fetchComments = async () => {
		try {
			const response = await axios.get(
				`${AppRoutes.getStudentComment}/${classWork._id}`
			);
			setComments(response.data);
		} catch (error) {
			console.error("Error fetching comments:", error);
		} finally {
			setFetchingComments(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append("student", studentData.studentID);
		formData.append("classWork", classWork._id);
		formData.append("description", newComment);
		if (file) {
			formData.append("problemFile", file);
		}

		try {
			const response = await fetch(AppRoutes.addStudentComment, {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				setNewComment("");
				setFile(null);
				fetchComments();
				message.success("Comment added successfully");
			} else {
				message.error("Failed to add comment");
			}
		} catch (error) {
			console.error("Error submitting comment:", error);
			message.error("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
			<button
				onClick={onBack}
				className="flex items-center text-[#0782e0] mb-6 hover:underline"
			>
				<ArrowLeft className="mr-2" />
				Back to Class Works List
			</button>
			<h2 className="text-3xl text-left py-2 font-bold text-gray-800 mb-4">
				{classWork.title}
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<p className="text-gray-600 flex items-center">
					<FileText className="mr-2 text-[#0782e0]" size={18} />
					Course: {classWork.course}
				</p>
				<p className="text-gray-600 flex items-center">
					<Users className="mr-2 text-[#0782e0]" size={18} />
					Batch: {classWork.batch.title}
				</p>
				<p className="text-gray-600 flex items-center">
					<BookOpen className="mr-2 text-[#0782e0]" size={18} />
					Section: {classWork.section}
				</p>
				{classWork.date && (
					<p className="text-gray-600 flex items-center">
						<Calendar className="mr-2 text-[#0782e0]" size={18} />
						Date: {new Date(classWork.date).toLocaleDateString()}
					</p>
				)}
			</div>

			<div className="mb-6">
				<h3 className="text-lg text-left py-2 font-semibold mb-2 text-gray-800">
					Description:
				</h3>
				<p className="text-gray-600">{classWork.description}</p>
			</div>

			{classWork.youtubeLink && (
				<div className="mb-4">
					<h3 className="text-lg text-left py-2 font-semibold mb-2 text-gray-800">
						YouTube Video:
					</h3>
					<a
						href={classWork.youtubeLink}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#0782e0] hover:underline flex items-center"
					>
						<LinkIcon className="mr-2" size={18} />
						Watch Video
					</a>
				</div>
			)}

			{classWork.githubLink && (
				<div>
					<h3 className="text-lg text-left py-2 font-semibold mb-2 text-gray-800">
						GitHub Repository:
					</h3>
					<a
						href={classWork.githubLink}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#0782e0] hover:underline flex items-center"
					>
						<LinkIcon className="mr-2" size={18} />
						View GitHub Repository
					</a>
				</div>
			)}

			<div className="mt-8">
				<h3 className="text-2xl text-left py-2 font-semibold mb-4 text-gray-800">Comments</h3>
				<form onSubmit={handleSubmit} className="mb-4">
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						className="w-full p-2 border rounded-md"
						placeholder="Add a comment or share a problem..."
						required
					/>
					<div className="mt-2 flex items-center">
						<input
							type="file"
							onChange={(e) => setFile(e.target.files[0])}
							className="mr-2"
						/>
						<button
							disabled={loading}
							type="submit"
							className={`bg-[#0782e0] rounded-xl text-white px-4 py-2 flex items-center ${
								loading ? "opacity-70" : ""
							}`}
						>
							{loading ? (
								<Loader2 className="mr-2 animate-spin" size={18} />
							) : (
								<Send className="mr-2" size={18} />
							)}
							Submit
						</button>
					</div>
				</form>

				{fetchingComments ? (
					<div className="flex items-center justify-center h-screen bg-white">
						<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
					</div>
				) : (
					<div className="space-y-4">
						{comments.map((comment) => (
							<div
								key={comment._id}
								className="bg-white shadow-lg p-4 rounded-md flex items-start gap-4"
							>
								<div className="w-10 h-10 rounded-full bg-[#0782e0] text-white flex items-center justify-center">
									{comment.student?.name?.[0]?.toUpperCase() || "U"}
								</div>
								<div>
									<p className="font-semibold">{comment.student?.name}</p>
									<p className="text-gray-600">{comment.description}</p>
									{comment.problemFile && (
										<a
											href={comment.problemFile}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#0782e0] hover:underline"
										>
											View attached file
										</a>
									)}
									<p className="text-sm text-gray-500 mt-2">
										{new Date(comment.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ClassWorkDetail;
