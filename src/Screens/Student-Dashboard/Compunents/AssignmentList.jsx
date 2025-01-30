import React from "react";
import { Clock } from "lucide-react";
import { ArrowLeft, Upload } from "lucide-react";

const AssignmentList = ({ assignments, onAssignmentClick, onBack }) => {
	return (
		<div className="space-y-4">
			<button onClick={onBack} className="flex items-center text-blue-500 mb-4">
				<ArrowLeft className="mr-2" />
				Back to Assignments Courses
			</button>
			{assignments.map((assignment) => {
				// Parse the due date and compare with the current date
				const dueDate = new Date(assignment.dueDate);
				const currentDate = new Date();
				const isPastDue = currentDate > dueDate;

				return (
					<div
						key={assignment.id}
						className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
						onClick={() => onAssignmentClick(assignment)}
					>
						<div>
							<h3 className="text-lg font-semibold text-gray-800">
								{assignment.title}
							</h3>
							<p className="text-sm text-gray-500 flex items-center mt-1">
								<Clock className="w-4 h-4 mr-1" />
								Due {assignment.dueDate}
							</p>
							{isPastDue && !assignment.submitted && (
								<p className="text-red-500 text-sm mt-1">
									The due date has passed!
								</p>
							)}
						</div>
						<div>
							{assignment.submitted ? (
								<span className="text-green-500 font-semibold">Submitted</span>
							) : (
								<button
									className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
										isPastDue ? "bg-gray-400 cursor-not-allowed" : ""
									}`}
									disabled={isPastDue} // Disable the submit button if the due date has passed
								>
									Submit
								</button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AssignmentList;
