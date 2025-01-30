import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Courses from "../TrainerCourse-Page/TrainerCourses";

const TrainerCourse = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [isCollapsed, setIsCollapsed] = useState(true); // Initially, the sidebar is collapsed on mobile

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
				<div className="p-4 lg:ml-20 md:ml-20 sm:ml-4">
					<Courses />
				</div>
			</div>
		</div>
	);
};

export default TrainerCourse;
