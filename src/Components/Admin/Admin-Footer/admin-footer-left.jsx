import React from "react";

export default function AdminFooterLeft() {
  const data = [
    { label: "In Progress", percentage: 40, users: 117, color: "bg-blue-500" },
    { label: "Completed", percentage: 20, users: 74, color: "bg-green-500" },
    { label: "Inactive", percentage: 18, users: 58, color: "bg-yellow-500" },
    { label: "Expired", percentage: 7, users: 11, color: "bg-red-500" },
  ];

  return (
    <div className="w-full ">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold">Course Completion</h3>
        <button className="text-blue-600 text-sm">View All</button>
      </div>
      <div>
        {data.map((item, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
              <p className="text-sm text-gray-500">{item.users} Users</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
