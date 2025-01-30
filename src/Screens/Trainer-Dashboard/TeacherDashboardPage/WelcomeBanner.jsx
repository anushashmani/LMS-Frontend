import { useAuth } from "@/Context/AuthContext";

export default function WelcomeBanner() {
	const { user, logout } = useAuth();
	return (
		<div className="mb-8 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-white">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">
						Welcome back, {user ? user.name : "Guest"}! 👋
					</h1>
					<p className="mt-2">
						You&apos;ve learned 70% of your goal this week!
						<br />
						Keep it up and improve your progress.
					</p>
				</div>
				{/* <img
					src="https://img.freepik.com/premium-vector/real-estate-design_24877-39863.jpg?ga=GA1.1.435385141.1727093756&semt=ais_hybrid"
					alt="Welcome illustration"
					className="h-32 w-32 hidden sm:block"
				/> */}
			</div>
		</div>
	);
}
