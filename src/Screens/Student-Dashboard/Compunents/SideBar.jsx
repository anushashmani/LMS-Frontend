import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GradingIcon from "@mui/icons-material/Grading";
import { Chat, ClassTwoTone, HomeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Popover } from "antd";

const Sidebar = ({ isMobile, isCollapsed, toggleSidebar }) => {
	return (
		<div
			className={`bg-white shadow z-40 fixed h-screen text-gray-400 ${
				isMobile
					? `fixed top-0 left-0 z-50 w-20 transition-transform duration-300 ${
							isCollapsed ? "-translate-x-full" : "translate-x-0"
					  }`
					: `transition-all duration-300 w-20`
			}`}
		>
			<div className="flex flex-col p-4">
				{isMobile && (
					<div className="flex items-end justify-end">
						<button
							className="text-gray-400 font-bold text-sm"
							onClick={toggleSidebar}
						>
							✕
						</button>
					</div>
				)}

				{/* {isMobile ? (
					<span className="w-40">
						<img
							className="w-20 flex items-center"
							src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
							alt="Logo"
						/>
					</span>
				) : (
					<span className="w-40">
						<img
							className="w-20 flex items-center"
							src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
							alt="Logo"
						/>
					</span>
				)} */}
			</div>
			<ul className=" mt-20 flex flex-col justify-center items-center gap-4">
				{/* studentDasboard */}
				<Link to={"/studentDashboard"}>
					<li
						className={`flex items-center gap-4 p-3 font-bold text-md  text-[#0782e0] hover:text-[#349cecb9] hover:scale-105 transition-all cursor-pointer ${
							isCollapsed ? "justify-center" : "justify-start"
						}`}
					>
						<Popover content={"Home"} placement={"right"}>
							<HomeOutlined fontSize="medium" />
						</Popover>
						{/* {!isCollapsed && <span>Dashboard</span>} */}
					</li>
				</Link>

				{/* StudentCourses */}
				<Link to={"/StudentCourses"}>
					<li
						className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
							isCollapsed ? "justify-center" : "justify-start"
						}`}
					>
						<Popover content={"Courses"} placement={"right"}>
							<SchoolIcon fontSize="medium" />
						</Popover>
						{/* {!isCollapsed && <span>Courses</span>} */}
					</li>
				</Link>

				{/* StudentAssignments */}
				<Link to={"/StudentAssignments"}>
					<li
						className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
							isCollapsed ? "justify-center" : "justify-start"
						}`}
					>
						<Popover content={"Assignments"} placement={"right"}>
							<AssignmentIcon fontSize="medium" />
						</Popover>
						{/* {!isCollapsed && <span>Assignments</span>} */}
					</li>
				</Link>

				{/* StudentAssignments */}
				<Link to={"/StudentClassWork"}>
					<li
						className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
							isCollapsed ? "justify-center" : "justify-start"
						}`}
					>
						<Popover content={"Class Work"} placement={"right"}>
							<ClassTwoTone fontSize="medium" />
						</Popover>
						{/* {!isCollapsed && <span>Class Work</span>} */}
					</li>
				</Link>

				{/* StudentAttendence */}
				<Link to={"/StudentAttendence"}>
					<li
						className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
							isCollapsed ? "justify-center" : "justify-start"
						}`}
					>
						<Popover content={"Attendence"} placement={"right"}>
							<GradingIcon fontSize="medium" />
						</Popover>
						{/* {!isCollapsed && <span>Attendence</span>} */}
					</li>
				</Link>
				{/* StudentAttendence */}
				<Link to={"/StudentAnnoucement"}>
					<li
						className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
							isCollapsed ? "justify-center" : "justify-start"
						}`}
					>
						<Popover content={"Annoucement"} placement={"right"}>
							<Chat fontSize="medium" />
						</Popover>
						{/* {!isCollapsed && <span>Annoucement</span>} */}
					</li>
				</Link>
			</ul>
		</div>
	);
};

export default Sidebar;
