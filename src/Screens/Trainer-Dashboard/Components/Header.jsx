import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Switch } from "@headlessui/react";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";
import { useAuth } from "@/Context/AuthContext";

const Header = ({ profileImage, setProfileImage, toggleSidebar }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newProfileImage, setNewProfileImage] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	const handleProfileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setNewProfileImage(imageUrl);
		}
	};

	const saveProfileImage = () => {
		if (newProfileImage) {
			setProfileImage(newProfileImage);
		}
		setIsModalOpen(false);
	};

	return (
		<>
			<header className="bg-white shadow-md sticky top-0 z-50 p-4 px-6 flex justify-between items-center transition-all ease-in-out duration-300">
				<button
					className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all font-bold text-xl lg:hidden md:hidden sm:block"
					onClick={toggleSidebar}
				>
					<MenuIcon />
				</button>

				<div className="sm:hidden flex justify-center items-center">
					<img
						src="https://mir-s3-cdn-cf.behance.net/projects/404/df812e210053451.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
						alt="Logo"
						className="w-12 h-12"
					/>
				</div>

				<h1 className="text-2xl font-bold hover:text-blue-400 hover:scale-110 transition-all cursor-pointer hidden sm:block">
					Welcome back,{" "}
					<span className="capitalize"> {user ? user.name : "Guest"} </span> 👋
				</h1>

				<div className="hidden sm:flex items-center space-x-6">
					<BellOutlined className="text-xl text-gray-600 cursor-pointer" />

					<SettingOutlined className="text-xl text-gray-600 cursor-pointer" />

					<div
						className="flex items-center cursor-pointer"
						onClick={() => setIsModalOpen(true)}
					>
						<img
							src={profileImage}
							alt="Profile"
							className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 mr-2"
						/>
						<span>Profile</span>
					</div>

					<button
						onClick={handleLogout}
						className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
					>
						Logout
					</button>
				</div>

				<div className="relative sm:hidden">
					<button
						className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						<MenuIcon />
					</button>
					<div
						className={`absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ${
							isDropdownOpen
								? "opacity-100 scale-100"
								: "opacity-0 scale-95 hidden"
						}`}
					>
						<div className="text-gray-800 font-bold mb-4 text-center">
							{user ? user.name : "Guest"}
						</div>

						<div className="flex items-center mb-4">
							<span className="mr-2">☀️</span>
							<Switch
								checked={isDarkMode}
								onChange={setIsDarkMode}
								className={`${
									isDarkMode ? "bg-blue-600" : "bg-blue-200"
								} relative inline-flex h-6 w-11 items-center rounded-full`}
							>
								<span
									className={`${
										isDarkMode
											? "translate-x-6 bg-white"
											: "translate-x-1 bg-white"
									} inline-block h-4 w-4 transform rounded-full transition`}
								/>
							</Switch>
							<span className="ml-2">🌙</span>
						</div>

						<div className="flex items-center mb-4">
							<BellOutlined className="text-xl text-gray-600 cursor-pointer mr-2" />
							<span>Notifications</span>
						</div>

						<div className="flex items-center mb-4">
							<SettingOutlined className="text-xl text-gray-600 cursor-pointer mr-2" />
							<span>Settings</span>
						</div>

						<button
							onClick={handleLogout}
							className="w-full bg-blue-500 text-white font-bold py-2 rounded-full hover:bg-blue-600 transition duration-300 mb-4"
						>
							Logout
						</button>

						<div
							className="flex items-center cursor-pointer"
							onClick={() => setIsModalOpen(true)}
						>
							<img
								src={profileImage}
								alt="Profile"
								className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 mr-2"
							/>
							<span>Profile</span>
						</div>
					</div>
				</div>
			</header>

			{isModalOpen && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white rounded-lg p-6 w-80">
						<h2 className="text-xl font-bold mb-4">Change Profile Picture</h2>
						<div className="flex flex-col items-center">
							<div className="w-24 h-24 mb-4">
								<img
									src={newProfileImage || profileImage}
									alt="Preview"
									className="w-full h-full rounded-full object-cover border-2 border-gray-300"
								/>
							</div>
							<input
								type="file"
								accept="image/*"
								onChange={handleProfileChange}
								className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
							/>
						</div>
						<div className="mt-4 flex justify-between">
							<button
								onClick={saveProfileImage}
								className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
							>
								Save
							</button>
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
