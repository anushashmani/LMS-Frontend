// import { AppRoutes } from "@/Constant/Constant";
// import { useAuth } from "@/Context/AuthContext";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import SchoolIcon from "@mui/icons-material/School";
// import { CircularProgress } from "@mui/material";
// import { Article, AssignmentInd, Campaign, Task } from "@mui/icons-material";
// import { message } from "antd";

// const TeacherDashboardStats = () => {
//     const { user } = useAuth();
//     const [course, setCourse] = useState();
//     const [assignments, setAssignment] = useState();
//     const [annoucements, setAnnouncements] = useState();
//     const [submitAssignments, setSubmitAssignments] = useState();
//     const [trainerData, setTrainerData] = useState(null);

//     useEffect(() => {
//         const fetchTrainerData = async () => {
//             try {
//                 const response = await axios.get(`${AppRoutes.getTrainerCourses}/${user._id}`);
//                 setTrainerData(response.data);
//             } catch (error) {
//                 setError("Failed to fetch trainer data. Please try again.");
//             }
//         };

//         if (user && user._id) {
//             fetchTrainerData();
//         }
//     }, [user]);

//     useEffect(() => {
//         const fetchStudentCourses = async () => {
//             if (user && user.role === "teacher") {
//                 const response = await axios.get(
//                     `${AppRoutes.getTrainerCourses}/${user._id}`,
//                     { withCredentials: true }
//                 );
//                 setCourse(response.data.courses);
//             }
//         };
//         fetchStudentCourses();
//     }, [user]);

//     useEffect(() => {
//         const fetchAnnouncements = async () => {
//             if (user && user.email) {
//                 try {
//                     const response = await axios.get(`${AppRoutes.getTeacherAnnouncements}?email=${user.email}`)
//                     setAnnouncements(response.data)
//                 } catch (err) {
//                     console.error("Error fetching announcements:", err)
//                     // Use your preferred method to show errors, e.g., toast or alert
//                     message.error("Failed to fetch announcements");
//                 }
//             }
//         }
//         fetchAnnouncements()
//     }, [user])


//     useEffect(() => {
//         async function fetchSubmitAssignment() {
//             const response = await axios.get(`${AppRoutes.getSubmittedAssignments}?trainer=${trainerData.trainerID}`)
//             setSubmitAssignments(response.data);
//         }
//         fetchSubmitAssignment();
//     }, []);

//     // useEffect(() => {
//     //     async function fetchAssignment() {
//     //         if (trainerData && trainerData.trainerID) {
//     //             const response = await axios.get(`http://localhost:4010/assignment/trainerAssignments/${trainerID._id}`);
//     //             setAssignment(response.data.totalAssignments);
//     //             console.log('Response', response.data)
//     //         }
//     //     }
//     //     fetchAssignment();
//     // }, []);

//     useEffect(() => {
//         const fetchAssignment = async () => {
//             if (user && user._id) {
//                 try {
//                     const response = await axios.get(`${AppRoutes.getTrainerAssignments}/${user._id}`)
//                     setAssignment(response.data.totalAssignments);
//                 } catch (error) {
//                     console.error("Error fetching trainer data:", error)
//                 }
//             }
//         }

//         fetchAssignment()
//     }, [user])

//     console.log("Trainer Data:", trainerData);

//     console.log("Courses:", course);

//     return (
//         <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-4 my-4">
//             <div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
//                 <SchoolIcon fontSize="large" />
//                 <div className="flex items-center gap-1 flex-col">
//                     <h3 className="font-bold">Enrolled Courses</h3>
//                     <h4 className="font-bold text-2xl">
//                         {course ? (
//                             `${course.length}`
//                         ) : (
//                             <CircularProgress size={30} color="inherit" />
//                         )}
//                     </h4>
//                 </div>
//             </div>
//             <div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
//                 <Campaign fontSize="large" />
//                 <div className="flex items-center gap-1 flex-col">
//                     <h3 className="font-bold">Total Annoucements</h3>
//                     <h4 className="font-bold text-2xl">
//                         {annoucements ? (
//                             `${annoucements.length}`
//                         ) : (
//                             <CircularProgress size={30} color="inherit" />
//                         )}
//                     </h4>
//                 </div>
//             </div>
//             <div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
//                 <AssignmentInd fontSize="large" />
//                 <div className="flex items-center gap-1 flex-col">
//                     <h3 className="font-bold">Total Assignment</h3>
//                     <h4 className="font-bold text-2xl">
//                         {assignments ? (
//                             `${assignments}`
//                         ) : (
//                             <CircularProgress size={30} color="inherit" />
//                         )}
//                     </h4>
//                 </div>
//             </div>
//             <div className="h-24 px-4 gap-1 py-6 items-center bg-[#0782e0] text-white flex justify-evenly rounded-xl">
//                 <Task fontSize="large" />
//                 <div className="flex items-center gap-1 flex-col">
//                     <h3 className="font-bold">Submitted Assignments</h3>
//                     <h4 className="font-bold text-2xl">
//                         {submitAssignments ? (
//                             `${submitAssignments.length}`
//                         ) : (
//                             <CircularProgress size={30} color="inherit" />
//                         )}
//                     </h4>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TeacherDashboardStats;

import { AppRoutes } from "@/Constant/Constant";
import { useAuth } from "@/Context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import { CircularProgress } from "@mui/material";
import { Article, AssignmentInd, Campaign, Task } from "@mui/icons-material";
import { message } from "antd";

const TeacherDashboardStats = () => {
    const { user } = useAuth();
    const [course, setCourse] = useState();
    const [assignments, setAssignment] = useState();
    const [annoucements, setAnnouncements] = useState();
    const [submitAssignments, setSubmitAssignments] = useState();
    const [trainerData, setTrainerData] = useState(null);

    useEffect(() => {
        const fetchTrainerData = async () => {
            try {
                const response = await axios.get(`${AppRoutes.getTrainerCourses}/${user._id}`);
                setTrainerData(response.data);
            } catch (error) {
                message.error("Failed to fetch trainer data. Please try again.");
            }
        };

        if (user && user._id) {
            fetchTrainerData();
        }
    }, [user]);

    useEffect(() => {
        const fetchStudentCourses = async () => {
            if (user && user.role === "teacher") {
                try {
                    const response = await axios.get(
                        `${AppRoutes.getTrainerCourses}/${user._id}`,
                        { withCredentials: true }
                    );
                    setCourse(response.data.courses);
                } catch (error) {
                    message.error("Failed to fetch student courses.");
                }
            }
        };
        fetchStudentCourses();
    }, [user]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            if (user && user.email) {
                try {
                    const response = await axios.get(`${AppRoutes.getTeacherAnnouncements}?email=${user.email}`);
                    setAnnouncements(response.data);
                } catch (err) {
                    message.error("Failed to fetch announcements.");
                }
            }
        };
        fetchAnnouncements();
    }, [user]);

    useEffect(() => {
        async function fetchSubmitAssignment() {
            try {
                if (trainerData) {
                    const response = await axios.get(
                        `${AppRoutes.getSubmittedAssignments}?trainer=${trainerData.trainerID}`
                    );
                    setSubmitAssignments(response.data);
                }
            } catch (error) {
                message.error("Failed to fetch submitted assignments.");
            }
        }
        fetchSubmitAssignment();
    }, [trainerData]);

    useEffect(() => {
        const fetchAssignment = async () => {
            if (user && user._id) {
                try {
                    const response = await axios.get(`${AppRoutes.getTrainerAssignments}/${user._id}`);
                    setAssignment(response.data.totalAssignments);
                } catch (error) {
                    message.error("Failed to fetch assignments.");
                }
            }
        };
        fetchAssignment();
    }, [user]);

    return (
        <div className="grid sm:grid-cols-2 gap-6 md:grid-cols-4 my-6">
            <div className="h-28 px-4 py-6 items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white flex justify-between rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <SchoolIcon fontSize="large" />
                <div className="flex items-center flex-col">
                    <h3 className="font-semibold text-lg">Enrolled Courses</h3>
                    <h4 className="font-bold text-2xl">
                        {course ? (
                            `${course.length}`
                        ) : (
                            <CircularProgress size={30} color="inherit" />
                        )}
                    </h4>
                </div>
            </div>
            <div className="h-28 px-4 py-6 items-center bg-gradient-to-r from-green-600 to-green-800 text-white flex justify-between rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Campaign fontSize="large" />
                <div className="flex items-center flex-col">
                    <h3 className="font-semibold text-lg">Total Announcements</h3>
                    <h4 className="font-bold text-2xl">
                        {annoucements ? (
                            `${annoucements.length}`
                        ) : (
                            <CircularProgress size={30} color="inherit" />
                        )}
                    </h4>
                </div>
            </div>
            <div className="h-28 px-4 py-6 items-center bg-gradient-to-r from-purple-600 to-purple-800 text-white flex justify-between rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <AssignmentInd fontSize="large" />
                <div className="flex items-center flex-col">
                    <h3 className="font-semibold text-lg">Total Assignments</h3>
                    <h4 className="font-bold text-2xl">
                        {assignments ? (
                            `${assignments}`
                        ) : (
                            <CircularProgress size={30} color="inherit" />
                        )}
                    </h4>
                </div>
            </div>
            <div className="h-28 px-4 py-6 items-center bg-gradient-to-r from-red-600 to-red-800 text-white flex justify-between rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Task fontSize="large" />
                <div className="flex items-center flex-col">
                    <h3 className="font-semibold text-lg">Submitted Assignments</h3>
                    <h4 className="font-bold text-2xl">
                        {submitAssignments ? (
                            `${submitAssignments.length}`
                        ) : (
                            <CircularProgress size={30} color="inherit" />
                        )}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardStats;
