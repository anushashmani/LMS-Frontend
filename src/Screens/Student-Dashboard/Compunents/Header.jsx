import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/Context/AuthContext";
import { useState } from "react";
import logo from "../../../assets/images/logo.png";

const Header = ({ toggleSidebar }) => {
	const { user, logout } = useAuth();
	const [isCollapsed, setIsCollapsed] = useState(true); // Context se user ka data lein

	// Logout function with redirection
	const handleLogout = () => {
		logout(); // Calls the logout function from context
	};

	return (
		<header className="bg-white shadow fixed w-full z-40 text-gray-400 p-4 px-6 flex justify-between items-center">
			<div className=" flex gap-8">
				<button
					className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all font-bold text-xl lg:hidden md:hidden sm:block"
					onClick={toggleSidebar}
				>
					<MenuIcon />
				</button>
			</div>

			<span className="w-20">
				<img
					className="w-full"
					src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
					alt="Logo"
				/>
			</span>

			<h1 className="text-2xl font-bold text-[#0782e0] hover:text-slate-400 hover:scale-105 transition-all cursor-pointer hidden sm:block">
				Welcome back,{" "}
				<span className="capitalize">
					{" "}
					{user ? user.name : "Guest"} {/* User ka naam yahan */}
				</span>
				👋
			</h1>

			<h1 className="text-lg font-bold  hover:text-blue-400 hover:scale-110 transition-all cursor-pointer">
				{" "}
				{/* Logout Button */}
				<div className="text-right mb-4">
					<button
						onClick={handleLogout} // Calls the logout function
						className="bg-red-500 text-white font-bold py-2 px-6 rounded-full sm:w-20 md:w-full hover:bg-red-600 transition duration-300"
					>
						Logout
					</button>
				</div>
			</h1>
		</header>
	);
};

export default Header;
