import { AppRoutes } from "@/Constant/Constant";
import { useAuth } from "@/Context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import { CircularProgress } from "@mui/material";
import { Article, Campaign, Task } from "@mui/icons-material";

const StudentDashboardStates = () => {
	const { user, studentData, assignments } = useAuth();
	const [course, setCourse] = useState();
	// const [assignments, setAssignment] = useState();
	const [annoucements, setAnnouncements] = useState();
	const [submitAssignments, setSubmitAssignments] = useState();

	useEffect(() => {
		const fetchStudentCourses = async () => {
			if (user && user.role === "student") {
				const response = await axios.get(
					`${AppRoutes.getStudentCourses}/${user._id}`,
					{ withCredentials: true }
				);
				setCourse(Array(response.data));
			}
		};
		fetchStudentCourses();
	}, [user]);

	useEffect(() => {
		async function fetchAnnouncements() {
			const response = await axios.get(`${AppRoutes.getAnnouncements}`);
			setAnnouncements(response.data);
			console.log("getAnnouncements", response.data);
		}
		fetchAnnouncements();
	}, []);

	// useEffect(() => {
	// 	async function fetchAssignment(userId) {
	// 		const response = await axios.get(`${AppRoutes.getStudentAssignments}/${userId}`);
	// 		setAssignment(response.data);
	// 		console.log('getAssignments',response.data);
	// 	}
	// 	fetchAssignment();
	// }, []);

	useEffect(() => {
		async function fetchSubmitAssignment() {
			const response = await axios.get(`${AppRoutes.getStudentSubmission}`);
			setSubmitAssignments(response.data);
		}
		fetchSubmitAssignment();
	}, []);

	console.log(
		assignments,
		course,
		annoucements,
		submitAssignments,
		studentData
	);

	return (
		<div className="grid sm:grid-cols-2 gap-4 md:grid-cols-4 my-4">
			<div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
				<SchoolIcon fontSize="large" />
				<div className="flex items-center gap-1 flex-col">
					<h3 className="font-bold">Enrolled Courses</h3>
					<h4 className="font-bold text-2xl">
						{course ? (
							`${course.length}`
						) : (
							<CircularProgress size={30} color="inherit" />
						)}
					</h4>
				</div>
			</div>
			<div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
				<Campaign fontSize="large" />
				<div className="flex items-center gap-1 flex-col">
					<h3 className="font-bold">Total Annoucements</h3>
					<h4 className="font-bold text-2xl">
						{annoucements ? (
							`${annoucements.length}`
						) : (
							<CircularProgress size={30} color="inherit" />
						)}
					</h4>
				</div>
			</div>
			<div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
				<Article fontSize="large" />
				<div className="flex items-center gap-1 flex-col">
					<h3 className="font-bold">Total Assignment</h3>
					<h4 className="font-bold text-2xl">
						{assignments ? (
							`${assignments.length}`
						) : (
							<CircularProgress size={30} color="inherit" />
						)}
					</h4>
				</div>
			</div>
			<div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
				<Task fontSize="large" />
				<div className="flex items-center gap-1 flex-col">
					<h3 className="font-bold">Submitted Assignments</h3>
					<h4 className="font-bold text-2xl">
						{course ? (
							`${course.length}`
						) : (
							<CircularProgress size={30} color="inherit" />
						)}
					</h4>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboardStates;
