import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import Courses from "../Pages/Courses";
import { useAuth } from "@/Context/AuthContext";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";

const StudentCourses = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const { user } = useAuth();
	const [student, setStudent] = useState(null); // Initially, the sidebar is collapsed on mobile
	console.log(user);

	useEffect(() => {
		async function fetchStudentData() {
			const response = await axios.get(`${AppRoutes.getStudents}/${user._id}`, {
				withCredentials: true,
			});
			setStudent(response.data);
		}
	}, [user]);

	const toggleSidebar = () => setIsCollapsed(!isCollapsed);

	// Update isMobile state on window resize
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setIsCollapsed(false); // Reset the sidebar for larger screens
			} else {
				setIsCollapsed(true); // Hide sidebar for mobile on resize
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="flex">
			<Sidebar
				isMobile={isMobile}
				isCollapsed={isCollapsed}
				toggleSidebar={toggleSidebar}
			/>
			<div
				className={`flex-1 ${isMobile && "ml-0"} transition-all duration-300`}
			>
				<Header toggleSidebar={toggleSidebar} />
				{/* <div className="py-24 p-4 lg:ml-20 md:ml-20 sm:ml-4"> */}
					<div className="py-20">
						<Courses />
					</div>
				{/* </div> */}
			</div>
		</div>
	);
};

export default StudentCourses;
