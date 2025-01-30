import React from "react";

export default function AdminFooterBetween() {
  const lessons = [
    {
      title: "Informatic Course",
      instructor: "Nil Yeager, 19 April",
      bgColor: "bg-yellow-500",
      icon: "📚",
    },
    {
      title: "Live Drawing",
      instructor: "Micak Doe, 12 June",
      bgColor: "bg-blue-500",
      icon: "✉️",
    },
    {
      title: "Contemporary Art",
      instructor: "Potar Doe, 27 July",
      bgColor: "bg-red-500",
      icon: "🎨",
    },
    {
      title: "Live Drawing",
      instructor: "Micak Doe, 12 June",
      bgColor: "bg-teal-500",
      icon: "✉️",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Lessons</h3>
        <button className="text-blue-600 text-sm font-medium">View All</button>
      </div>
      {lessons.map((lesson, index) => (
        <div
          key={index}
          className="bg-gray-50 p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-full text-white ${lesson.bgColor} text-xl`}
              >
                {lesson.icon}
              </div>
              <div className="ml-4">
                <a
                  href="course.html"
                  className="text-gray-800  text-left font-medium hover:text-blue-600"
                >
                  {lesson.title}
                </a>
                <p className="text-sm text-gray-500">{lesson.instructor}</p>
              </div>
            </div>
            <a
              href="course.html"
              className="text-gray-400 hover:text-blue-500 text-xl"
            >
              →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
