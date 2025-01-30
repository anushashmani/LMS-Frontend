import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import styles from '../../../Styles/styles.module.css';

export default function AdminFooterRight() {
  const notices = [
    {
      icon: <PersonIcon className="text-blue-600" />,
      bgColor: "bg-blue-100",
      title: "New Teacher",
      time: "Just Now",
      description: "It is a long established fact that a reader will be distracted by the readable...",
    },
    {
      icon: <AttachMoneyIcon className="text-red-600" />,
      bgColor: "bg-red-100",
      title: "New Fees Structure",
      time: "Today",
      description: "It is a long established fact that a reader will be distracted by the readable...",
    },
    {
      icon: <MenuBookIcon className="text-green-600" />,
      bgColor: "bg-green-100",
      title: "Updated Syllabus",
      time: "17 Dec 2020",
      description: "It is a long established fact that a reader will be distracted by the readable...",
    },
    {
      icon: <SchoolIcon className="text-teal-600" />,
      bgColor: "bg-teal-100",
      title: "New Course",
      time: "27 Oct 2020",
      description: "It is a long established fact that a reader will be distracted by the readable...",
    },
  ];

  return (
    <div className="w-full">
      <div>
        {/* Header */}
        <div className="p-4">
          <h3 className="text-lg text-left font-semibold text-gray-800">Notice Board</h3>
        </div>
        {/* Body */}
        <div className="p-4 max-h-80 overflow-y-auto">
          {notices.map((notice, index) => (
            <div key={index} className="flex items-start mb-4">
              {/* Icon */}
              <div
                className={`p-2 flex items-center justify-center rounded-full ${notice.bgColor}`}
              >
                {notice.icon}
              </div>

              {/* Notice Details */}
              <div className="ml-4">
                <p className="flex justify-between items-center">
                  <a
                    href="#"
                    className="text-gray-800 hover:text-green-500 font-medium"
                  >
                    {notice.title}
                  </a>
                  <span className="text-sm text-left text-gray-400">{notice.time}</span>
                </p>
                <p className="text-sm text-left text-gray-500">{notice.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <button
          className={styles.button}
            // className="btn-primary w-full py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition"
          >
            View all
          </button>
        </div>
      </div>
    </div>
  );
}

