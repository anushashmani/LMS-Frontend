import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import WelcomeBanner from "../TeacherDashboardPage/WelcomeBanner";
import ScoreStatistics from "../TeacherDashboardPage/ScoreStatistics";
import RecentActivity from "../TeacherDashboardPage/RecentActivity";
import HomeworkProgress from "../TeacherDashboardPage/HomeWork";
import TeachingActivity from "../TeacherDashboardPage/TeachingActivity";
import { useAuth } from "@/Context/AuthContext";
import TeacherDashboardStats from "../TeacherDashboardPage/TeacherDashboardStats";

export default function TeacherDashboard() {
	const [isDark, setIsDark] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const { user } = useAuth();

	const toggleSidebar = () => setIsCollapsed(!isCollapsed);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setIsCollapsed(false);
			} else {
				setIsCollapsed(true);
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
				<main className="p-6 lg:ml-20 md:ml-20 sm:ml-4">
					<TeacherDashboardStats />
					<WelcomeBanner />
					<div className="grid gap-6 lg:grid-cols-2">
						{/* <TeachingActivity /> */}
						{user && user.role === 'teacher' && (
							<>
								<TeachingActivity trainerId={user._id} />
								<RecentActivity />
							</>
						)}
						
						{/* <ScoreStatistics /> */}
						{/* <HomeworkProgress /> */}
					</div>
				</main>
			</div>
		</div>
	);
}
