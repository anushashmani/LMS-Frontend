import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import styles from "../../../Styles/styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Course } from "@/Components/Course-Pages/Course";
import axios from "axios";
import { AppRoutes } from "@/Constant/Constant";
import { Spin } from "antd";

export default function AdminBannerRight() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState();
  const [annoucmenet, setAnnoucmenet] = useState();

  useEffect(() => {
    const fetchStudentCourses = async () => {
      const response = await axios.get(`${AppRoutes.getCourses}`);
      setCourses(response.data.data);
    };
    fetchStudentCourses();
  }, []);

  useEffect(() => {
    const fetchAnnoucements = async () => {
      const response = await axios.get(`${AppRoutes.getAnnouncements}`);
      setAnnoucmenet(response.data);
    };
    fetchAnnoucements();
  }, []);

  // console.log(annoucmenet);

  const handleClick = () => {
    navigate("/courses");
  };
  return (
    <div className="w-full md:w-auto pb-1 items-center">
      <div className="box bg-transparent shadow-none">
        <div className="box-body">
          <p className="text-sm md:text-xl font-semibold mb-5 text-center md:text-left">
            Have More Knowledge to Share?
          </p>
          <Link to={"/courses"}>
            <button
              // onClick={useNavigate(<Course />)}
              className={`${styles.button} w-full md:w-auto flex items-center justify-center py-8`}
            >
              <AddIcon className={`${styles.buttonIcon} mr-2`} /> Create New
              Course
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {/* Courses in Progress */}
        <div>
          <div className="box text-center  transition-transform transform hover:scale-105">
            <div className="box-body py-3 bg-blue-100 rounded-t-lg">
              <p className="text-xs text-blue-600 truncate">
                Courses in Progress
              </p>
            </div>
            <div className="box-body bg-slate-100 rounded-b-lg hover:text-blue-500 transform py-4">
              <h1 className="text-4xl font-bold m-0">
                {courses ? courses.length : <Spin />}
              </h1>
            </div>
          </div>
        </div>
        {/* Forum Discussion */}
        <div>
          <div className="box text-center transition-transform transform hover:scale-105">
            <div className="box-body py-4 bg-blue-100 rounded-t-lg">
              <p className="text-xs text-blue-600 truncate">Annoucements</p>
            </div>
            <div className="box-body bg-slate-100 rounded-b-lg hover:text-blue-500 transform py-4">
              <h1 className="text-4xl font-bold m-0">
                {annoucmenet ? annoucmenet.length : <Spin />}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
