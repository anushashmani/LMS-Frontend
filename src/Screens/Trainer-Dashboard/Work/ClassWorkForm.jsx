import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import ClassWorkForm from "./Compoenents/ClassWorkForm";
import { ClassWorkList } from "./Compoenents/ClassWorkList";
import { Tabs } from "antd";

const onChange = (key) => {
	console.log(key);
};

const TrainerClassWork = () => {
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

	const items = [
		{
			key: "1",
			label: "Class Work",
			children: <ClassWorkList />,
		},
		{
			key: "2",
			label: "Create Class Work",
			children: <ClassWorkForm />,
		},
	];

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
				<div className="p-4 mx-10 lg:ml-20 md:ml-20 sm:ml-4">
					{/* <ClassWorkForm /> */}
					<Tabs
						defaultActiveKey="1"
						onChange={onChange}
						tabBarStyle={{ color: "#0561a6" }}
						tabBarActiveLineStyle={{ backgroundColor: "#0561a6" }}
					>
						{items.map((item) => (
							<Tabs.TabPane
								key={item.key}
								tab={<span className="text-[#0561a6]">{item.label}</span>}
							>
								{item.children}
							</Tabs.TabPane>
						))}
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default TrainerClassWork;
