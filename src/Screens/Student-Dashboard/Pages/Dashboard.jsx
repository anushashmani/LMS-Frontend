import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import FinanceSection from "../Compunents/FinanceSection";
import { EnrolledCourses } from "../Compunents/EnrolledCourses";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import { Button } from "antd";
import { CalendarFilled } from "@ant-design/icons";
import { FaCalendar } from "react-icons/fa";
import { AccessAlarm, Watch } from "@mui/icons-material";
import StudentDashboardStates from "../Compunents/StudentDashboardStates";

const DashboardsT = () => {
  const { user, logout } = useAuth(); // Context se user ka data lein
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axios.get(AppRoutes.getAnnouncements);
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Current date ko format karein
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", // Day of the week
    year: "numeric", // Full year
    month: "long", // Full month name
    day: "numeric", // Day of the month
  });

  return (
    <div className=" lg:ml-24 md:ml-24 sm:ml-4 mx-auto my-24">
      {/* Header */}
      <StudentDashboardStates />

      {/* Welcome Banner */}
      <div className="bg-[#0782e0] h-60 flex items-center justify-between px-6 rounded-2xl w-full">
        <div className={`w-2/2 flex flex-row justify-start`}>
          <div className="text-left">
            <p className=" text-slate-200 font-bold text-xl">{currentDate}</p>{" "}
            {/* Dynamic Date */}
            <h1 className="mt-2 text-xl font-bold text-white sm:text-xl">
              Welcome back, {user ? user.name : "Guest"}! 👋{" "}
              {/* User ka naam yahan */}
            </h1>
            <p className="mt-4 text-slate-200 font-bold text-md">
              Always stay updated in your student portal
            </p>
          </div>
        </div>

        <div className="w-1/2 flex overflow-hidden justify-end hidden sm:block">
          <div className=" w-full h-60 flex justify-end ">
            <img
              className=""
              src="https://static.vecteezy.com/system/resources/thumbnails/036/498/133/small/ai-generated-3d-cartoon-child-character-in-a-graduation-cap-isolated-on-transparent-background-png.png"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 my-4 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FinanceSection />
          {/* <MonthlyAssignmentStatus /> */}
          {/* <EnrolledCourses /> */}
        </div>
        <div className="lg:col-1">
          <div className="border py-4 shadow shadow-black">
            <div className=" py-2 px-4 w-[90%] mb-2 rounded-xl mx-auto flex justify-between items-center my-2 bg-[#0782e0]">
              <h4 className="text-white font-bold">Annoucements</h4>
              <Button>See All</Button>
            </div>
            <div className="flex justify-start flex-col gap-3 h-64 overflow-y-scroll">
              {announcements.map((announcementData) => {
                return (
                  <div
                    key={announcementData?.id}
                    className="flex gap-3 items-center py-2 hover:scale-105 transition-all cursor-pointer px-2 w-[90%] mx-auto shadow-md border rounded-xl"
                  >
                    <Avatar
                      className={"bg-[#0782e0] flex items-center justify-self"}
                    >
                      <AvatarImage src={announcementData?.image} />
                    </Avatar>
                    <div>
                      <h6 className="text-sm font-bold text-left">
                        {announcementData?.title}
                      </h6>
                      <div className="text-sm flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaCalendar color="#0782e0" />
                          {`${announcementData?.createdAt.slice(0, 10)} `}
                        </span>
                        <span className="flex items-center gap-1">
                          <AccessAlarm fontSize="small" color="primary" />
                          {`${announcementData?.createdAt.slice(0, 10)} `}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardsT;
