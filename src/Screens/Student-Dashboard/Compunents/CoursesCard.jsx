import React from 'react';
import { Book } from 'lucide-react';


const CourseCard= ({ name, teacher, color, onClick }) => {
  return (
    <div 
      className={`${color} rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105`}
      onClick={onClick}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-2">{name}</h2>
        <p className="text-white text-opacity-90">{teacher}</p>
      </div>
      <div className="bg-white p-4 flex justify-between items-center">
        <Book className="text-gray-500" />
        <button className="text-blue-500 hover:text-blue-600">View</button>
      </div>
    </div>
  );
};

export default CourseCard;

