// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card } from '@/Components/ui/card';
// import { AppRoutes } from '@/Constant/Constant';
// import { useAuth } from '@/Context/AuthContext';
// import { FaYoutube, FaGithub, FaChartLine, FaClock, FaStar, FaCalendarAlt, FaUserGraduate, FaBookOpen, FaSchool } from 'react-icons/fa';
// import { Progress } from '@/Components/ui/progress';
// import { format } from 'date-fns';

// export const ClassWorkList = () => {
//   const [classWorks, setClassWorks] = useState([]);
//   const [progressData, setProgressData] = useState([]);
//   const [topStats, setTopStats] = useState({
//     course: { name: '', count: 0 },
//     batch: { name: '', count: 0 },
//     section: { name: '', count: 0 }
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchTrainerData = async () => {
//       try {
//         const trainerResponse = await axios.get(`${AppRoutes.getTrainerCourses}/${user?._id}`);
//         if (trainerResponse.data && trainerResponse.data.trainerID) {
//           const classWorksResponse = await axios.get(`${AppRoutes.getClassWorks}?trainer=${trainerResponse.data.trainerID}`);
//           const works = classWorksResponse.data;
//           setClassWorks(works);

//           // Calculate monthly progress with mock student and engagement data
//           const monthlyData = works.reduce((acc, work) => {
//             const month = new Date(work.createdAt).toLocaleString('default', { month: 'short' });
//             if (!acc[month]) {
//               acc[month] = { month, count: 0, students: 0, engagement: 0 };
//             }
//             acc[month].count += 1;
//             acc[month].students += Math.floor(Math.random() * 50) + 10; // Mock student data
//             acc[month].engagement += Math.random() * 0.5 + 0.5; // Mock engagement data (50-100%)
//             return acc;
//           }, {});

//           setProgressData(Object.values(monthlyData));

//           // Calculate top stats
//           const stats = works.reduce((acc, work) => {
//             acc.courses[work.course] = (acc.courses[work.course] || 0) + 1;
//             acc.batches[work.batch.title] = (acc.batches[work.batch.title] || 0) + 1;
//             acc.sections[work.section] = (acc.sections[work.section] || 0) + 1;
//             return acc;
//           }, { courses: {}, batches: {}, sections: {} });

//           setTopStats({
//             course: getTopItem(stats.courses),
//             batch: getTopItem(stats.batches),
//             section: getTopItem(stats.sections)
//           });
//         } else {
//           setError('Trainer information not found');
//         }
//       } catch (error) {
//         setError('Failed to fetch class works');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (user?._id) {
//       fetchTrainerData();
//     }
//   }, [user]);

//   const getTopItem = (items) => {
//     const sortedItems = Object.entries(items).sort(([, a], [, b]) => b - a);
//     return sortedItems.length ? { name: sortedItems[0][0], count: sortedItems[0][1] } : { name: '', count: 0 };
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0561a6]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500 text-center">
//           <p className="text-xl font-semibold">{error}</p>
//           <p className="text-sm mt-2">Please try again later</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6 md:p-8">
//       <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#0561a6]">
//         Trainer Performance Class Work
//       </h2>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         <Card className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-[#0561a6]">Top Course</h3>
//             <FaBookOpen className="text-[#0561a6] text-2xl" />
//           </div>
//           <p className="text-xl font-bold text-gray-800 mb-2">{topStats.course.name}</p>
//           <p className="text-sm text-gray-600 mb-4">{topStats.course.count} class works</p>
//           <Progress value={(topStats.course.count / classWorks.length) * 100} className="h-2 bg-blue-100" />
//         </Card>

//         <Card className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-[#0561a6]">Top Batch</h3>
//             <FaUserGraduate className="text-[#0561a6] text-2xl" />
//           </div>
//           <p className="text-xl font-bold text-gray-800 mb-2">{topStats.batch.name}</p>
//           <p className="text-sm text-gray-600 mb-4">{topStats.batch.count} class works</p>
//           <Progress value={(topStats.batch.count / classWorks.length) * 100} className="h-2 bg-blue-100" />
//         </Card>

//         <Card className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-[#0561a6]">Top Section</h3>
//             <FaClock className="text-[#0561a6] text-2xl" />
//           </div>
//           <p className="text-xl font-bold text-gray-800 mb-2">{topStats.section.name}</p>
//           <p className="text-sm text-gray-600 mb-4">{topStats.section.count} class works</p>
//           <Progress value={(topStats.section.count / classWorks.length) * 100} className="h-2 bg-blue-100" />
//         </Card>
//       </div>

//       {/* Recent Class Works */}
//       <div className="mb-12">
//         <h3 className="text-2xl font-semibold mb-6 text-[#0561a6]">Recent Class Works</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {classWorks.slice(0, 6).map((classWork) => (
//             <Card
//               key={classWork._id}
//               className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-t-4 border-[#0561a6] flex flex-col h-full"
//             >
//               <div className="flex-grow">
//                 <h3 className="text-xl font-semibold mb-4 text-[#0561a6] tracking-wide">
//                   {classWork.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-6">
//                   {classWork.description}
//                 </p>

//                 <div className="space-y-2 text-gray-600">
//                   <p className="text-sm flex items-center gap-2">
//                     <FaCalendarAlt className="text-[#0561a6]" />
//                     <span className="font-semibold">Date:</span> {format(new Date(classWork.createdAt), 'MMMM dd, yyyy')}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaBookOpen className="text-[#0561a6]" />
//                     <span className="font-semibold">Course:</span> {classWork.course}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaUserGraduate className="text-[#0561a6]" />
//                     <span className="font-semibold">Batch:</span> {classWork.batch?.title || 'N/A'}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaClock className="text-[#0561a6]" />
//                     <span className="font-semibold">Section:</span> {classWork.section}
//                   </p>
//                   <p className="text-sm flex items-center gap-2">
//                     <FaSchool className="text-[#0561a6]" />
//                     <span className="font-semibold">Campus:</span> {classWork.campus.title}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 mt-6">
//                 {classWork.youtubeLink && (
//                   <a
//                     href={classWork.youtubeLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 bg-[#0561a6] text-white py-2 px-4 rounded-lg hover:bg-[#045c8f] flex items-center justify-center gap-2 transition-all duration-300"
//                   >
//                     <FaYoutube className="text-xl" /> Video
//                   </a>
//                 )}
//                 {classWork.githubLink && (
//                   <a
//                     href={classWork.githubLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 border-2 border-[#0561a6] text-[#0561a6] py-2 px-4 rounded-lg hover:bg-[#0561a6] hover:text-white flex items-center justify-center gap-2 transition-all duration-300"
//                   >
//                     <FaGithub className="text-xl" /> Code
//                   </a>
//                 )}
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassWorkList;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/Components/ui/card';
import { AppRoutes } from '@/Constant/Constant';
import { useAuth } from '@/Context/AuthContext';
import { FaYoutube, FaGithub, FaClock, FaStar, FaCalendarAlt, FaUserGraduate, FaBookOpen, FaSchool } from 'react-icons/fa';
import { Progress } from '@/Components/ui/progress';
import { format } from 'date-fns';

export const ClassWorkList = () => {
  const [classWorks, setClassWorks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [progressData, setProgressData] = useState([]);
  const [topStats, setTopStats] = useState({
    course: { name: '', count: 0 },
    batch: { name: '', count: 0 },
    section: { name: '', count: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainerResponse = await axios.get(`${AppRoutes.getTrainerCourses}/${user?._id}`);
        if (trainerResponse.data && trainerResponse.data.trainerID) {
          // const coursesResponse = await axios.get(`${AppRoutes.getTrainerCourses}`);
          setCourses(trainerResponse.data.courses);

          const classWorksResponse = await axios.get(`${AppRoutes.getClassWorks}?trainer=${trainerResponse.data.trainerID}&course=${selectedCourse}&batch=${selectedBatch}&section=${selectedSection}`);
          const works = classWorksResponse.data;
          console.log('Class Works', works);
          
          setClassWorks(works);

          // Calculate progress, top stats, etc.
          calculateProgressAndStats(works);
        } else {
          setError('Trainer information not found');
        }
      } catch (error) {
        setError('Failed to fetch class works');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) {
      fetchData();
    }
  }, [user, selectedCourse, selectedBatch, selectedSection]);

  const calculateProgressAndStats = (works) => {
    const monthlyData = works.reduce((acc, work) => {
      const month = new Date(work.createdAt).toLocaleString('default', { month: 'short' });
      if (!acc[month]) {
        acc[month] = { month, count: 0, students: 0, engagement: 0 };
      }
      acc[month].count += 1;
      acc[month].students += Math.floor(Math.random() * 50) + 10;
      acc[month].engagement += Math.random() * 0.5 + 0.5;
      return acc;
    }, {});

    setProgressData(Object.values(monthlyData));

    const stats = works.reduce((acc, work) => {
      acc.courses[work.course] = (acc.courses[work.course] || 0) + 1;
      acc.batches[work.batch.title] = (acc.batches[work.batch.title] || 0) + 1;
      acc.sections[work.section] = (acc.sections[work.section] || 0) + 1;
      return acc;
    }, { courses: {}, batches: {}, sections: {} });

    setTopStats({
      course: getTopItem(stats.courses),
      batch: getTopItem(stats.batches),
      section: getTopItem(stats.sections)
    });
  };

  const getTopItem = (items) => {
    const sortedItems = Object.entries(items).sort(([, a], [, b]) => b - a);
    return sortedItems.length ? { name: sortedItems[0][0], count: sortedItems[0][1] } : { name: '', count: 0 };
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === 'course') setSelectedCourse(value);
    else if (name === 'batch') setSelectedBatch(value);
    else if (name === 'section') setSelectedSection(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0561a6]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6 md:p-8">
      <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#0561a6]">
        Trainer Performance Class Work
      </h2>

      {/* Filters Section */}
      <div className="mb-8 flex justify-between gap-4">
        <select
          name="course"
          value={selectedCourse}
          onChange={handleSelectChange}
          className="p-3 border rounded-lg w-1/3"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>{course.courseName}</option>
          ))}
        </select>
        <select
          name="batch"
          value={selectedBatch}
          onChange={handleSelectChange}
          className="p-3 border rounded-lg w-1/3"
        >
          <option value="">Select Batch</option>
          {courses.find(c => c.courseName === selectedCourse)?.batches.map((batch) => (
            <option key={batch._id} value={batch._id}>{batch.title}</option>
          ))}
        </select>
        <select
          name="section"
          value={selectedSection}
          onChange={handleSelectChange}
          className="p-3 border rounded-lg w-1/3"
        >
          <option value="">Select Section</option>
          {courses
            .find((c) => c.courseName === selectedCourse)
            ?.sections.map((section) => (
              <option key={section.title} value={section.title}>
                {section.title}
              </option>
            ))}
        </select>
      </div>

      {/* Stats and Class Work List */}
      {/* Display top stats and class works as before */}
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#0561a6]">Top Course</h3>
            <FaBookOpen className="text-[#0561a6] text-2xl" />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">{topStats.course.name}</p>
          <p className="text-sm text-gray-600 mb-4">{topStats.course.count} class works</p>
          <Progress value={(topStats.course.count / classWorks.length) * 100} className="h-2 bg-blue-100" />
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#0561a6]">Top Batch</h3>
            <FaUserGraduate className="text-[#0561a6] text-2xl" />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">{topStats.batch.name}</p>
          <p className="text-sm text-gray-600 mb-4">{topStats.batch.count} class works</p>
          <Progress value={(topStats.batch.count / classWorks.length) * 100} className="h-2 bg-blue-100" />
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#0561a6]">Top Section</h3>
            <FaClock className="text-[#0561a6] text-2xl" />
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">{topStats.section.name}</p>
          <p className="text-sm text-gray-600 mb-4">{topStats.section.count} class works</p>
          <Progress value={(topStats.section.count / classWorks.length) * 100} className="h-2 bg-blue-100" />
        </Card>
      </div>

      {/* Recent Class Works */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-[#0561a6]">Recent Class Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classWorks.slice(0, 6).map((classWork) => (
            <Card
              key={classWork._id}
              className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-t-4 border-[#0561a6] flex flex-col h-full"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-4 text-[#0561a6] tracking-wide">
                  {classWork.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {classWork.description}
                </p>

                <div className="space-y-2 text-gray-600">
                  <p className="text-sm flex items-center gap-2">
                    <FaCalendarAlt className="text-[#0561a6]" />
                    <span className="font-semibold">Date:</span> {format(new Date(classWork.createdAt), 'MMMM dd, yyyy')}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaBookOpen className="text-[#0561a6]" />
                    <span className="font-semibold">Course:</span> {classWork.course}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaUserGraduate className="text-[#0561a6]" />
                    <span className="font-semibold">Batch:</span> {classWork.batch?.title || 'N/A'}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaClock className="text-[#0561a6]" />
                    <span className="font-semibold">Section:</span> {classWork.section}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaSchool className="text-[#0561a6]" />
                    <span className="font-semibold">Campus:</span> {classWork.campus.title}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                {classWork.youtubeLink && (
                  <a
                    href={classWork.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0561a6] text-white py-2 px-4 rounded-lg hover:bg-[#045c8f] flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <FaYoutube className="text-xl" /> Video
                  </a>
                )}
                {classWork.githubLink && (
                  <a
                    href={classWork.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-[#0561a6] text-[#0561a6] py-2 px-4 rounded-lg hover:bg-[#0561a6] hover:text-white flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <FaGithub className="text-xl" /> Code
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    // </div >
  );
};

export default ClassWorkList;
