import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";
import { FaBook, FaUsers, FaListAlt } from "react-icons/fa";

const TrainerCourses = () => {
	const { user } = useAuth(); // Get the logged-in user
	const [courses, setCourses] = useState([]); // State for storing courses
	const [loading, setLoading] = useState(true); // State for loader
	const [error, setError] = useState(null); // State for errors

	// Fetch trainer courses when component loads
	useEffect(() => {
		const fetchCourses = async () => {
			if (user && user._id && user.role === "teacher") {
				try {
					const response = await axios.get(
						`${AppRoutes.getTrainerCourses}/${user._id}`,
						{ withCredentials: true }
					);
					console.log("Api Response", response.data);

					setCourses(response.data.courses || []); // Store fetched courses
				} catch (err) {
					console.error("Error fetching courses:", err);
					setError("Failed to fetch courses.");
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};
		fetchCourses();
	}, [user]); // Depend on user data

	// Loader
	if (loading)
		return (
			<div className="flex items-center justify-center h-screen bg-white">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
			</div>
		)
	if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
	if (!courses.length)
		return <div className="text-center p-6">No courses found.</div>;

	// Card Design for Each Course
	const renderCourses = () => {
		return courses.map((course, index) => (
			<div
				key={index}
				className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 ease-in-out flex flex-col border border-gray-200 dark:border-gray-700"
			>
				<div className="p-6 flex-grow text-gray-800 dark:text-gray-300">
					<h3 className="text-2xl font-semibold mb-4 text-[#0561a6] hover:text-blue-700 transition-all duration-300">
						<FaBook className="inline-block mr-2 text-[#0561a6]" />
						{course.courseName}
					</h3>

					{/* Batches Section */}
					<div className="mb-4">
						<h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-400">
							<FaUsers className="inline-block mr-2 text-gray-700 dark:text-gray-400" />{" "}
							Batches:
						</h4>
						<ul className="list-none list-inside text-gray-600 dark:text-gray-400">
							{course.batches.map((batch, i) => (
								<li key={i} className="mb-1">
									<span className="font-medium text-black dark:text-white">
										Title:
									</span>{" "}
									{batch.title}
								</li>
							))}
						</ul>
					</div>

					{/* Sections Section */}
					<div>
						<h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-400">
							<FaListAlt className="inline-block mr-2 text-gray-700 dark:text-gray-400" />{" "}
							Sections:
						</h4>
						<ul className="list-inside list-none text-gray-600 dark:text-gray-400">
							{course.sections.map((section, j) => (
								<li key={j} className="mb-1">
									<span className="font-medium text-black dark:text-white">
										Title:
									</span>{" "}
									{section.title}
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="p-4 border-t border-[#0561a6] flex justify-between items-center bg-gray-50 dark:bg-gray-800">
					<div className="text-sm text-gray-600 dark:text-gray-400">
						Course Details
					</div>
				</div>
			</div>
		));
	};

	return (
		<div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
			<h2 className="text-3xl font-bold mb-8 text-center text-[#0561a6] dark:text-blue-400">
				Courses
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{renderCourses()}
			</div>
		</div>
	);
};

export default TrainerCourses;
