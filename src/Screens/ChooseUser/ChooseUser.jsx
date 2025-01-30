import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop, Snackbar } from "@mui/material";
import { AccountCircle, School, Group } from "@mui/icons-material";
import { AnimatedScreen } from "./AnimatedScreen";

const ChooseUser = ({ visitor }) => {
    const navigate = useNavigate();
    const password = "zxc";

    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRole, setCurrentRole] = useState("");

    const loginUser = async (fields, role) => {
        try {
            setLoader(true);
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock login logic based on fields
            if (fields.email === "yogendra@12" || fields.rollNum === "1") {
                setStatus("success");
                setCurrentUser(fields);
                setCurrentRole(role);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setLoader(false);
        }
    };

    const navigateHandler = (user) => {
        if (user === "Admin") {
            if (visitor === "guest") {
                const email = "yogendra@12";
                const fields = { email, password };
                loginUser(fields, user);
            } else {
                navigate("/Adminlogin");
            }
        } else if (user === "Student") {
            if (visitor === "guest") {
                const rollNum = "1";
                const studentName = "Dipesh Awasthi";
                const fields = { rollNum, studentName, password };
                loginUser(fields, user);
            } else {
                navigate("/studentForm");
            }
        } else if (user === "Teacher") {
            if (visitor === "guest") {
                const email = "tony@12";
                const fields = { email, password };
                loginUser(fields, user);
            } else {
                navigate("/trainerForm");
            }
        }
    };


    return (
           <div className="min-h-screen flex items-center justify-center overflow-hidden">
            <AnimatedScreen/>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={alert}
                color="#0364b0"
                autoHideDuration={2000}
                onClose={() => setAlert(false)}
                message="To be added in future"
            />
            <div className="container relative z-10 flex justify-center items-center max-w-5xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div
                        onClick={() => setAlert(true)}
                        className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer hover:bg-[#0364b0]  duration-300"
                    >
                        <AccountCircle fontSize="large" />
                        <h2 className="my-2 text-xl font-bold">Admin</h2>
                        Login as an administrator to access the dashboard to manage app
                        data.
                    </div>
                    <div
                        onClick={() => navigateHandler("Student")}
                        className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer hover:bg-[#0364b0] duration-300"
                    >
                        <School fontSize="large" />
                        <h2 className="my-2 text-xl font-bold">Student</h2>
                        Login as a student to explore course materials and assignments.
                    </div>
                    <div
                        onClick={() => navigateHandler("Teacher")}
                        className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer h hover:bg-[#0364b0] duration-300"
                    >
                        <Group fontSize="large" />
                        <h2 className="my-2 text-xl font-bold">Teacher</h2>
                        Login as a teacher to create courses, assignments, and track student
                        progress.
                    </div>
                </div>
            </div>
            {/* <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
                Please Wait
            </Backdrop> */}
        </div>
    );
};

export default ChooseUser;
