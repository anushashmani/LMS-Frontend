import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { AppRoutes } from "@/Constant/Constant";
import axios from "axios";
// import { data } from "react-router-dom";
import { Spin } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Campaign, Person } from "@mui/icons-material";

const StudentAnnoucement = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isCollapsed, setIsCollapsed] = useState(true); // Initially, the sidebar is collapsed on mobile
  const [annoucements, setAnnouncements] = useState();

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

  useEffect(() => {
    async function fetchAnnouncements() {
      const response = await axios.get(`${AppRoutes.getAnnouncements}`);
      console.log(response);
      setAnnouncements(response.data);
      console.log("getAnnouncements", annoucements);
    }
    fetchAnnouncements();
  }, []);

  // annoucements.map((data) => console.log(data));

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
        <div className="p-4">
          <div className="lg:ml-24 md:ml-24 sm:ml-4 mx-auto my-24">
            <h1 className="font-bold text-2xl text-[#0782e0]">
              <Campaign fontSize="large" /> General Annoucement
            </h1>
            {annoucements ? (
              <div className="container mx-auto xl:gap-8 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {annoucements.map((data) => (
                  <div
                    className="flex gap-3 py-6 items-center rounded-xl px-2 border border-[#0782e0] hover:scale-105 transition-all cursor-pointer"
                    key={data._id}
                  >
                    <div className="w-40">
                      <img
                        src={data.image}
                        className="rounded-xl"
                        alt={data.title}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <h4 className="text-base font-bold underline">
                        {data.title}
                      </h4>
                      <p className="text-xs my-1">{data.description}</p>
                      <span className="text-xs text-muted flex items-end gap-1 mt-1">
                        <Person fontSize="small" color="primary" />
                        <span>
                          {data.trainer?.name ? data.trainer.name : "N/A	"}
                        </span>
                      </span>
                      <div className="flex items-center gap-4 mt-[14px]">
                        <span className="text-xs hover:cursor-pointer hover:text-[#0782e0]">
                          <LikeOutlined /> Like
                        </span>
                        <span className="text-xs hover:cursor-pointer hover:text-[red]">
                          <DislikeOutlined /> Unlike
                        </span>
                        <span className="text-xs hover:cursor-pointer hover:text-[#0be637]">
                          <ShareAltOutlined /> Share
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center mt-28">
                <Spin size="large" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnnoucement;
