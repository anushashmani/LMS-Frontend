import React from "react";
import {
  HomeOutlined,
  MailOutlined,
  CalendarTodayOutlined,
  GroupOutlined,
  WidgetsOutlined,
  LockOutlined,
  AssignmentOutlined,
  MenuBookOutlined,
  AccountCircle,
  GradingOutlined,
  Settings,
  ClassOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { LogOut } from "lucide-react";
import { Popover } from "antd";

const Sidebar = ({ isMobile, isCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth(); // Context se user ka data lein

  const handleLogout = () => {
    logout(); // Calls the logout function from context
  };
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

        {isMobile ? (
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
        )}
      </div>
      <ul className=" flex flex-col gap-2 justify-center items-center">
        <li
          className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link to="/teacherdashboard">
            <Popover content={"Overview"} placement={"right"}>
              <HomeOutlined fontSize="medium" />
            </Popover>
            {/* {!isCollapsed && <span className="ml-4">Overview</span>} */}
          </Link>
        </li>
        <li
          className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link to="/trainerstudent">
            <Popover content={"Students"} placement={"right"}>
              <GroupOutlined fontSize="medium" />
            </Popover>
            {/* {!isCollapsed && <span className="ml-4">Students</span>} */}
          </Link>
        </li>
        <li
          className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link to="/trainercourse">
            <Popover content={"Your Courses"} placement={"right"}>
              <MenuBookOutlined fontSize="medium" />
            </Popover>
            {/* {!isCollapsed && <span className="ml-4">Courses</span>} */}
          </Link>
        </li>
        <li
          className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link to={"/trainerAssignment"}>
            <Popover content={"Assignment"} placement={"right"}>
              <AssignmentOutlined fontSize="medium" />
            </Popover>
            {/* {!isCollapsed && <span className="ml-4">Assignment</span>} */}
          </Link>
        </li>

        <li
          className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link to={"/trainerClassWork"}>
            <Popover content={"Class Work"} placement={"right"}>
              <ClassOutlined fontSize="medium" />
            </Popover>
            {/* {!isCollapsed && <span className="ml-4">Class Work</span>} */}
          </Link>
        </li>

        <Link to={"/TrainerAttendence"}>
          <li
            className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
          >
            <Popover content={"Attendence"} placement={"right"}>
              <GradingOutlined fontSize="medium" />
            </Popover>
            {/* {!isCollapsed && <span>Attendence</span>} */}
          </li>
        </Link>

        <Link to={"/TrainerAnnouncement"}>
          <li
            className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
          >
            {/* <GradingOutlined fontSize="medium" />
						{!isCollapsed && <span>Announcement</span>} */}
            <Popover content={"Announcement"} placement={"right"}>
              <GradingOutlined fontSize="medium" />
            </Popover>
          </li>
        </Link>

				{/* <li
					className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${isCollapsed ? "justify-center" : "justify-start"
						}`}
				>
					<Popover content={"Setting"} placement={"right"}>
						<Settings fontSize="medium" />
					</Popover>
					//  {!isCollapsed && <span>Setting</span>} 
				</li>
				<li
					onClick={handleLogout}
					className={`flex items-center gap-4 p-3 text-[#0782e0] hover:text-[#349cecb9] font-bold text-md cursor-pointer hover:scale-105 transition-all ${isCollapsed ? "justify-center" : "justify-start"
						}`}
				>
					<Popover content={"Logout"} placement={"right"}>
						<LogOut fontSize="medium" />
					</Popover>
					 {!isCollapsed && <span>Logout</span>} 
				</li> */}
			</ul>
		</div>
	);
};

export default Sidebar;
