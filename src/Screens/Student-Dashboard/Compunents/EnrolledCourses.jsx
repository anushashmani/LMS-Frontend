import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import Courses from "../Pages/Courses";

export function EnrolledCourses() {
	return (
		<div className="mb-8">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold">Enrolled Courses</h2>
			</div>
			<div className="grid grid-cols-1 gap-4">
				<Courses />
			</div>
		</div>
	);
}
