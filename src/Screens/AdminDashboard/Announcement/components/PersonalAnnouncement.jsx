import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Select, Input } from "antd";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

export const PersonalAnnouncementPage = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [campuses, setCampuses] = useState([]);
	const [courses, setCourses] = useState([]);
	const [batches, setBatches] = useState([]);
	const [sections, setSections] = useState([]);
	const [trainers, setTrainers] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [selectedBatch, setSelectedBatch] = useState("");
	const [selectedCampus, setSelectedCampus] = useState("");
	const [selectedTrainer, setSelectedTrainer] = useState("");
	const [selectedSection, setSelectedSection] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		// Fetch campuses, courses, and trainers
		const fetchCampuses = async () => {
			try {
				const response = await fetch(AppRoutes.getCampus);
				const data = await response.json();
				setCampuses(data.data);
			} catch (error) {
				console.error("Error fetching campuses:", error);
			}
		};
		fetchCampuses();

		const fetchCourses = async () => {
			try {
				const response = await fetch(AppRoutes.getCourses);
				const data = await response.json();
				setCourses(data.data);
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};
		fetchCourses();

		const fetchTrainers = async () => {
			try {
				const response = await axios.get(AppRoutes.getTrainer);
				setTrainers(response.data.data);
			} catch (error) {
				console.error("Error fetching trainers:", error);
			}
		};
		fetchTrainers();
	}, []);

	const fetchBatches = async (courseId) => {
		try {
			const response = await fetch(AppRoutes.getBatch);
			const data = await response.json();
			const filteredBatches = data.data.filter(
				(batch) => batch.course?._id === courseId
			);
			setBatches(filteredBatches);
			setSections([]); // Reset sections when a new course is selected
		} catch (error) {
			console.error("Error fetching batches:", error);
		}
	};

	const fetchSections = async (batchId) => {
		try {
			const response = await fetch(AppRoutes.getSections);
			const data = await response.json();
			const sections = Array.isArray(data) ? data : data.data;
			const filteredSections = sections.filter(
				(section) => section.batch && section.batch._id === batchId
			);
			setSections(filteredSections);
		} catch (error) {
			console.error("Error fetching sections:", error);
		}
	};

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const response = await axios.get(AppRoutes.getPersonalAnnouncements);
				setAnnouncements(response.data);
			} catch (err) {
				console.error("Error fetching announcements:", err);
			}
		};
		fetchAnnouncements();
	}, []);

	const handleSubmit = async () => {
		const newAnnouncement = {
			title,
			description,
			course: selectedCourse,
			batch: selectedBatch,
			section: selectedSection,
			trainer: selectedTrainer,
			campus: selectedCampus,
		};

		try {
			const response = await axios.post(
				AppRoutes.addPersonalAnnouncements,
				newAnnouncement
			);
			setAnnouncements([...announcements, response.data]);
			setIsModalVisible(false); // Close modal after submission
			resetFormFields(); // Reset form fields
		} catch (err) {
			console.error("Error posting new announcement:", err);
		}
	};

	const resetFormFields = () => {
		setTitle("");
		setDescription("");
		setSelectedCourse("");
		setSelectedBatch("");
		setSelectedSection("");
		setSelectedTrainer("");
		setSelectedCampus("");
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="flex flex-wrap justify-between items-center">
				<h2 className="text-4xl font-extrabold text-center text-[#0561a7] mb-12 tracking-wider">
					Personal Class Announcement
				</h2>

				{/* Button to open Modal */}
				<Button
					type="primary"
					onClick={() => setIsModalVisible(true)}
					className="bg-[#0561a7] text-white hover:bg-[#143c5b] mb-6"
				>
					Add Announcement
				</Button>
			</div>

			{/* Modal for Add Announcement */}
			<Modal
				title="Add Announcement"
				visible={isModalVisible}
				onOk={handleSubmit}
				onCancel={() => setIsModalVisible(false)}
				className="rounded-lg"
				width={700}
				footer={null}
			>
				<Form layout="vertical" onFinish={handleSubmit}>
					<Form.Item label="Title" name="title" required>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full rounded-lg p-3 border border-gray-300"
						/>
					</Form.Item>

					<Form.Item label="Description" name="description" required>
						<Input.TextArea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full rounded-lg p-3 border border-gray-300"
							rows={4}
						/>
					</Form.Item>

					<Form.Item label="Campus" name="campus" required>
						<Select
							value={selectedCampus}
							onChange={(value) => setSelectedCampus(value)}
							className="w-full rounded-lg p-3 border border-gray-300"
						>
							{campuses.map((campus) => (
								<Option key={campus._id} value={campus._id}>
									{campus.title}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="Course" name="course" required>
						<Select
							value={selectedCourse}
							onChange={(value) => {
								setSelectedCourse(value);
								fetchBatches(value);
							}}
							className="w-full rounded-lg p-3 border border-gray-300"
						>
							{courses.map((course) => (
								<Option key={course._id} value={course._id}>
									{course.title}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="Batch" name="batch" required>
						<Select
							value={selectedBatch}
							onChange={(value) => {
								setSelectedBatch(value);
								fetchSections(value);
							}}
							className="w-full rounded-lg p-3 border border-gray-300"
						>
							{batches.map((batch) => (
								<Option key={batch._id} value={batch._id}>
									{batch.title}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="Section" name="section" required>
						<Select
							value={selectedSection}
							onChange={(value) => setSelectedSection(value)}
							className="w-full rounded-lg p-3 border border-gray-300"
						>
							{sections.map((section) => (
								<Option key={section._id} value={section._id}>
									{section.title}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="Trainer" name="trainer" required>
						<Select
							value={selectedTrainer}
							onChange={(value) => setSelectedTrainer(value)}
							className="w-full rounded-lg p-3 border border-gray-300"
						>
							{trainers.map((trainer) => (
								<Option key={trainer._id} value={trainer._id}>
									{trainer.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Button
						type="primary"
						htmlType="submit"
						className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 py-3 mt-4"
					>
						Add Announcement
					</Button>
				</Form>
			</Modal>

			{/* Display announcements */}
			<div className="mt-8">
				{announcements.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{announcements.map((announcement) => (
							<div
								key={announcement._id}
								className="bg-white text-[#0561a7] p-8 rounded-3xl shadow-2xl hover:shadow-[0_20px_40px_rgba(5,97,166,0.3)] transition-all duration-500 border-t-8 border-[#0561a7]"
							>
								<h3 className="text-3xl font-semibold mb-4 text-[#0561a7] tracking-wide">
									{announcement.title}
								</h3>
								<p className="text-lg mb-6 text-gray-700 leading-relaxed">
									{announcement.description}
								</p>
								<div className="text-sm text-gray-600 space-y-2">
									<p>
										<strong className="text-[#0561a7]">Course:</strong>{" "}
										{announcement.course?.title || "N/A"}
									</p>
									<p>
										<strong className="text-[#0561a7]">Batch:</strong>{" "}
										{announcement.batch?.title || "N/A"}
									</p>
									<p>
										<strong className="text-[#0561a7]">Section:</strong>{" "}
										{announcement.section?.title || "N/A"}
									</p>
									<p>
										<strong className="text-[#0561a7]">Trainer:</strong>{" "}
										{announcement.trainer?.name || "N/A"}
									</p>
									<p>
										<strong className="text-[#0561a7]">Campus:</strong>{" "}
										{announcement.campus?.title || "N/A"}
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-600">No announcements found.</p>
				)}
			</div>
		</div>
	);
};
