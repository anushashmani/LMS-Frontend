import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppRoutes } from '@/Constant/Constant';

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axios.get(AppRoutes.getAnnouncements);
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-[#0561a7] mb-8 sm:mb-10 md:mb-12 tracking-wider">
        Announcements
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="flex flex-col bg-white text-[#0561a7] p-3 sm:p- rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:border-[#0561a7] focus:outline-none focus:scale-105 focus:shadow-lg focus:border-[#0561a7] duration-300 border border-gray-200 cursor-pointer"
          >
            <div className="w-full aspect-w-16 aspect-h-9">
              <img
                src={announcement.image}
                alt={announcement.title}
                className="w-full h-full object-cover rounded-md border border-gray-300"
              />
            </div>
            <div className="flex flex-row sm:flex-row sm:justify-between  sm:items-start gap-3 mt-3">
              <h3 className="text-base sm:text-lg font-semibold text-[#0561a7] sm:flex-[] ">
                {announcement.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-snug sm:flex-[]">
                {announcement.description}
              </p>
            </div>
            <div className="text-xs text-gray-600 mt-3 rounded-3xl">
              <p className='flex justify-between items-center'>
                <strong className="text-[#0561a7]">Course:</strong> {announcement.course?.title || 'N/A'}
              </p>
              <p className='flex justify-between items-center'>
                <strong className="text-[#0561a7]">Batch:</strong> {announcement.batch?.title || 'N/A'}
              </p>
              <p className='flex justify-between items-center'>
                <strong className="text-[#0561a7]">Section:</strong> {announcement.section?.title || 'N/A'}
              </p>
              <p className='flex justify-between items-center'>
                <strong className="text-[#0561a7]">Trainer:</strong> {announcement.trainer?.name || 'N/A'}
              </p>
              <p className='flex justify-between items-center'>
                <strong className="text-[#0561a7]">Campus:</strong> {announcement.campus?.title || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementList;
