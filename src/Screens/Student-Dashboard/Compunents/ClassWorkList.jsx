import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import {
	ChevronDown,
	ChevronUp,
	BookOpen,
	Calendar,
	Users,
} from "lucide-react";
import ClassWorkDetail from "./ClassWorkDetail";

export function ClassWorkList() {
	const { courses, classWorks, refreshClassWorks, studentData } = useAuth();
	const [selectedClassWork, setSelectedClassWork] = useState(null);
	const [expandedCourses, setExpandedCourses] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await refreshClassWorks();
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch class works. Please try again later.");
				setLoading(false);
			}
		};
		fetchData();
	}, [refreshClassWorks]);

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
				<p className="text-xl text-red-600 bg-white p-6 rounded-lg shadow-md">
					{error}
				</p>
			</div>
		);
	}

	if (!courses || !courses.course) {
		return (
			<div className="flex items-center justify-center h-screen bg-white">
				<p className="text-xl text-gray-600 bg-white p-6 rounded-lg shadow-md">
					No courses found.
				</p>
			</div>
		);
	}

	const renderClassWorks = () => {
		if (classWorks.length === 0) {
			return (
				<p className="text-gray-500 text-center mt-4">No class works found.</p>
			);
		}

		return (
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{classWorks.map((classWork) => (
					<div
						key={classWork._id}
						className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out cursor-pointer border border-gray-200"
						onClick={() => setSelectedClassWork(classWork)}
					>
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							{classWork.title}
						</h3>
						<p className="text-gray-600 mb-2">
							{classWork.description.substring(0, 100)}...
						</p>
						<p className="text-sm text-[#0782e0]">Click to view details</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-white py-8">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{selectedClassWork ? (
					<ClassWorkDetail
						classWork={selectedClassWork}
						onBack={() => setSelectedClassWork(null)}
					/>
				) : (
					<>
						<h1 className="text-3xl font-bold mb-6 text-[#0782e0]">
							Your Class Works
						</h1>
						<div className="bg-white rounded-lg shadow-lg p-6">
							<div
								className="flex justify-between items-center cursor-pointer"
								onClick={() => toggleCourse(courses.course._id)}
							>
								<h2 className="text-2xl font-semibold text-[#0782e0]">
									{courses.course.title}
								</h2>
								{expandedCourses[courses.course._id] ? (
									<ChevronUp className="text-[#0782e0]" />
								) : (
									<ChevronDown className="text-[#0782e0]" />
								)}
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
							{expandedCourses[courses.course._id] && (
								<div className="mt-6">
									<h3 className="text-xl font-semibold mb-4 text-gray-800">
										Class Works
									</h3>
									{renderClassWorks()}
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
