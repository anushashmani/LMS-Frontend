import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Trainers } from "../Screens/AdminDashboard/Trainers/Trainers";
import Quiz from "@/Screens/Quiz/StudentQuiz";
import WelcomeScreen from "@/Screens/Welcome-Screen/WelcomeScreen";
import TrainerApplyForm from "@/Screens/Trainer-apply-Form/TrainerApplyForm";
import ChooseUser from "@/Screens/ChooseUser/ChooseUser";
import StudentForm from "@/Screens/Student-Form/StudentForm";
import { StudentDashboardAbdul } from "@/Screens/Student-Dashboard/Student-Dashboard";
import { Admin } from "@/Screens/AdminDashboard/admin/Admin";
import { Campus } from "@/Screens/AdminDashboard/campus/Campus";

import { TrainerStudent } from "@/Screens/Trainer-Dashboard/Students/Trainerstudent";
import TrainerCourse from "@/Screens/Trainer-Dashboard/Courses/Trainercourses";
import TeacherDashboard from "@/Screens/Trainer-Dashboard/Dashboard/TeacherDashboard";
import TrainerAttendence from "@/Screens/Trainer-Dashboard/TrainerAttendence/TrainerAttendence";

import StudentAssignments from "@/Screens/Student-Dashboard/Compunents/Student-Assignments";
import StudentAttendence from "@/Screens/Student-Dashboard/Compunents/Student-Attendence";

import { AuthProvider } from "@/Context/AuthContext";
import { Courses } from "@/Screens/AdminDashboard/Courses/Courses";
import { Student } from "@/Screens/AdminDashboard/Student/Student";
import { Announcement } from "@/Screens/AdminDashboard/Announcement/Announcement";
import { Exam } from "@/Screens/AdminDashboard/Exam/Exam";
import TrainerAssignments from "@/Screens/Trainer-Dashboard/Trianer-Assignments/TrianerAssignments";
import SignUp from "@/Screens/Authentication/Signup";
import { Login } from "@/Screens/Authentication/Login";
import StudentCourses from "@/Screens/Student-Dashboard/Compunents/Student-Course";
import TrainerClassWork from "@/Screens/Trainer-Dashboard/Work/ClassWorkForm";
import { Users } from "@/Screens/AdminDashboard/AllUsers/Users";
import { StudentClassWork } from "@/Screens/Student-Dashboard/Compunents/Student-ClassWork";
import TrainerAnnouncement from "@/Screens/Trainer-Dashboard/TrianerAnnouncement/TrainerAnnouncement";
import StudentAnnoucement from "@/Screens/Student-Dashboard/Compunents/Student-Annoucement";
import CourseOutline from "@/Screens/AdminDashboard/CourseOutline/CourseOutline";

export const RouterConfig = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<WelcomeScreen />} />
					<Route path="/choose" element={<ChooseUser />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/trainerForm" element={<TrainerApplyForm />} />
					<Route path="/studentQuiz" element={<Quiz />} />
					<Route path="/studentform" element={<StudentForm />} />

					{/* Admin Dashboard Pages */}

					<Route path="/admin" element={<Admin />} />
					<Route path="/trainers" element={<Trainers />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/campus" element={<Campus />} />
					<Route path="/courseOutline" element={<CourseOutline />} />
					<Route path="/student" element={<Student />} />
					<Route path="/announcement" element={<Announcement />} />
					<Route path="/allUsers" element={<Users />} />
					<Route path="/exam" element={<Exam />} />
					{/* Trainer Dashboard */}

					<Route path="/trainerstudent" element={<TrainerStudent />} />
					<Route path="/trainercourse" element={<TrainerCourse />} />
					<Route path="/trainerAssignment" element={<TrainerAssignments />} />
					<Route path="/teacherdashboard" element={<TeacherDashboard />} />
					<Route path="/trainerattendence" element={<TrainerAttendence />} />
					<Route path="/trainerClassWork" element={<TrainerClassWork />} />
					<Route
						path="/trainerAnnouncement"
						element={<TrainerAnnouncement />}
					/>

					{/* {Student Dashboard} */}
					<Route path="/studentDashboard" element={<StudentDashboardAbdul />} />
					<Route path="/StudentCourses" element={<StudentCourses />} />
					<Route path="/StudentClassWork" element={<StudentClassWork />} />
					<Route path="/StudentAssignments" element={<StudentAssignments />} />
					<Route path="/StudentAttendence" element={<StudentAttendence />} />
					<Route path="/StudentAnnoucement" element={<StudentAnnoucement />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

// import React from 'react';
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import { useAuth } from '@/Context/AuthContext';

// // Screens
// import { Login } from '../Screens/Login/Login';
// import SignUp from '@/Screens/Login/Signup';
// import WelcomeScreen from '@/Screens/Welcome-Screen/WelcomeScreen';
// import ChooseUser from '@/Screens/ChooseUser/ChooseUser';
// import TrainerApplyForm from '@/Screens/Trainer-apply-Form/TrainerApplyForm';
// import StudentForm from '@/Screens/Student-Form/StudentForm';

// // Admin Dashboard
// import { Admin } from '@/Screens/AdminDashboard/admin/Admin';
// import { Trainers } from '@/Screens/AdminDashboard/Trainers/Trainers';
// import { Campus } from '@/Screens/AdminDashboard/campus/Campus';
// import { Courses } from '@/Screens/AdminDashboard/Courses/Courses';
// import { Student } from '@/Screens/AdminDashboard/Student/Student';
// import { Announcement } from '@/Screens/AdminDashboard/Announcement/Announcement';
// import { Exam } from '@/Screens/AdminDashboard/Exam/Exam';

// // Trainer Dashboard
// import TrainerDasboard from '@/Screens/Trainer-Dashboard/Trainer-Dashboard';
// import { TrainerStudent } from '@/Screens/Trainer-Dashboard/Students/Trainerstudent';
// import TrainerCourse from '@/Screens/Trainer-Dashboard/Courses/Trainercourses';
// import TeacherDashboard from '@/Screens/Trainer-Dashboard/Dashboard/TeacherDashboard';
// import TrainerAttendence from '@/Screens/Trainer-Dashboard/TrainerAttendence/TrainerAttendence';
// import TrainerAssignments from '@/Screens/Trainer-Dashboard/Trianer-Assignments/TrianerAssignments';

// // Student Dashboard
// import { StudentDashboardAbdul } from '@/Screens/Student-Dashboard/Student-Dashboard';
// import StudentCourses from '@/Screens/Student-Dashboard/Compunents/Student-Course';
// import StudentAssignments from '@/Screens/Student-Dashboard/Compunents/Student-Assignments';
// import StudentAttendence from '@/Screens/Student-Dashboard/Compunents/Student-Attendence';

// import Quiz from '@/Screens/Quiz/StudentQuiz';
// import { AuthProvider } from '@/Context/AuthContext';

// // Protected Route Component
// const ProtectedRoute = ({ element, allowedRoles }) => {
//   const { user } = useAuth();

//   // If user is not logged in or role doesn't match, redirect to home
//   if (!user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }
//   return element;
// };

// export const RouterConfig = () => {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<WelcomeScreen />} />
//           <Route path="/choose" element={<ChooseUser />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/trainerForm" element={<TrainerApplyForm />} />
//           <Route path="/studentQuiz" element={<Quiz />} />
//           <Route path="/studentform" element={<StudentForm />} />

//           {/* Admin Dashboard */}
//           <Route
//             path="/admin"
//             element={<ProtectedRoute element={<Admin />} allowedRoles={['admin']} />}
//           />
//           <Route
//             path="/trainers"
//             element={<ProtectedRoute element={<Trainers />} allowedRoles={['admin']} />}
//           />
//           <Route
//             path="/courses"
//             element={<ProtectedRoute element={<Courses />} allowedRoles={['admin']} />}
//           />
//           <Route
//             path="/campus"
//             element={<ProtectedRoute element={<Campus />} allowedRoles={['admin']} />}
//           />
//           <Route
//             path="/student"
//             element={<ProtectedRoute element={<Student />} allowedRoles={['admin']} />}
//           />
//           <Route
//             path="/announcement"
//             element={<ProtectedRoute element={<Announcement />} allowedRoles={['admin']} />}
//           />
//           <Route
//             path="/exam"
//             element={<ProtectedRoute element={<Exam />} allowedRoles={['admin']} />}
//           />

//           {/* Trainer Dashboard */}
//           <Route
//             path="/trainerstudent"
//             element={<ProtectedRoute element={<TrainerStudent />} allowedRoles={['teacher']} />}
//           />
//           <Route
//             path="/trainercourse"
//             element={<ProtectedRoute element={<TrainerCourse />} allowedRoles={['teacher']} />}
//           />
//           <Route
//             path="/trainerAssignment"
//             element={<ProtectedRoute element={<TrainerAssignments />} allowedRoles={['teacher']} />}
//           />
//           <Route
//             path="/teacherdashboard"
//             element={<ProtectedRoute element={<TeacherDashboard />} allowedRoles={['teacher']} />}
//           />
//           <Route
//             path="/trainerattendence"
//             element={<ProtectedRoute element={<TrainerAttendence />} allowedRoles={['teacher']} />}
//           />

//           {/* Student Dashboard */}
//           <Route
//             path="/studentDasboard"
//             element={<ProtectedRoute element={<StudentDashboardAbdul />} allowedRoles={['student']} />}
//           />
//           <Route
//             path="/StudentCourses"
//             element={<ProtectedRoute element={<StudentCourses />} allowedRoles={['student']} />}
//           />
//           <Route
//             path="/StudentAssignments"
//             element={<ProtectedRoute element={<StudentAssignments />} allowedRoles={['student']} />}
//           />
//           <Route
//             path="/StudentAttendence"
//             element={<ProtectedRoute element={<StudentAttendence />} allowedRoles={['student']} />}
//           />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// };
