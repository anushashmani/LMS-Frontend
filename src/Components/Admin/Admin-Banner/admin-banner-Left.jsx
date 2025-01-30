// import React from 'react';
// import SchoolIcon from '@mui/icons-material/School';
// import PersonIcon from '@mui/icons-material/Person';
// import pic from '../../../assets/images/Logo.jpg'

// export default function AdminBannerLeft() {
//   return (
//     <div className="w-full flex flex-col md:flex-row items-start rounded-xl">
//       <div style={{ backgroundColor: '#58baab', }} className="box w-full rounded-xl">
//         <div className="box-body flex p-0 rounded-2xl">
//           <div
//             className="flex-grow rounded-2xl bg-cover bg-right-bottom p-6 md:p-8"
//           >
//             <div className="grid grid-cols-1 xl:grid-cols-7 gap-6">
//               <div className='flex justify-between items-center'>
//                 <div className="col-span-7 xl:col-span-5">
//                   <p className=" font-semibold text-white text-left text-xl md:text-2xl">
//                     Learn Effectively With Us!
//                   </p>
//                   <p className=" text-left md:text-lg text-green-200">
//                     Get 30% off every course in January.
//                   </p>
//                   <div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex justify-center items-center w-12 h-12 bg-red-500 border border-white text-center text-xl text-white rounded-full">
//                         <SchoolIcon />
//                       </div>
//                       <div>
//                         <h5 className="text-white text-lg font-medium">Students</h5>
//                         <p className="text-green-200">75,000+</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <div className="flex justify-center items-center w-12 h-12 bg-yellow-400 border border-white text-center text-xl text-white rounded-full">
//                         <PersonIcon />
//                       </div>
//                       <div>
//                         <h5 className="text-white text-lg font-medium">Expert Mentors</h5>
//                         <p className="text-green-200">200+</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <img src={pic} width={70} height={70} alt="" />
//                 </div>
//               </div>
//               <div className="hidden xl:block col-span-7 xl:col-span-2"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import pic from '../../../assets/images/Logo.jpg';

export default function AdminBannerLeft() {
  return (
    <div className="w-full flex flex-col md:flex-row items-start rounded-xl">
      <div style={{ backgroundColor: '#58baab' }} className="box w-full rounded-xl">
        <div className="box-body flex p-0 rounded-2xl">
          <div className="flex-grow rounded-2xl bg-cover bg-right-bottom p-6 md:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-7 gap-6">
              <div className="flex justify-between items-center">
                <div className="col-span-7 xl:col-span-5">
                  <p className="font-semibold text-white text-left text-xl md:text-2xl">
                    Learn Effectively With Us!
                  </p>
                  <p className="text-left md:text-lg text-green-200">
                    Get 30% off every course in January.
                  </p>
                  <div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex justify-center items-center w-12 h-12 bg-red-500 border border-white text-center text-xl text-white rounded-full">
                        <SchoolIcon />
                      </div>
                      <div>
                        <h5 className="text-white text-lg font-medium">Students</h5>
                        <p className="text-green-200">75,000+</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex justify-center items-center w-12 h-12 bg-yellow-400 border border-white text-center text-xl text-white rounded-full">
                        <PersonIcon />
                      </div>
                      <div>
                        <h5 className="text-white text-lg font-medium">Expert Mentors</h5>
                        <p className="text-green-200">200+</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img src={pic} className="w-16 h-16 object-cover rounded-full" alt="Logo" />
                </div>
              </div>
              <div className="hidden xl:block col-span-7 xl:col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
