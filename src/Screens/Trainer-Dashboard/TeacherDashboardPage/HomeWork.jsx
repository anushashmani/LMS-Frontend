// import React from 'react';
// import { Card, CardContent } from "@/Components/ui/card";
// import { Button } from "@/@/components/ui/button";

// const HomeworkProgress = () => {
//     return (
//         <Card>
//             <CardContent className="pt-6">
//                 <h2 className="mb-4 text-xl font-semibold">Homework Progress</h2>
//                 <div className="space-y-4">
//                     {[{ title: "Farming App Design", date: "March 21, 2023", progress: 70 }].map(item => (
//                         <div key={item.title} className="flex items-center gap-4">
//                             <div className="relative h-12 w-12">
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <span className="text-sm font-semibold">{item.progress}%</span>
//                                 </div>
//                             </div>
//                             <div className="flex-1">
//                                 <p className="font-semibold">{item.title}</p>
//                                 <p className="text-sm text-muted-foreground">{item.date}</p>
//                             </div>
//                             <Button variant="ghost" size="sm">
//                                 <span className="sr-only">View details</span> →
//                             </Button>
//                         </div>
//                     ))}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// export default HomeworkProgress;


import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const HomeworkProgress = () => {
  // Sample data for homework progress
  const homeworkData = [
    { title: "Farming App Design", date: "March 21, 2023", progress: 70 },
    { title: "UI Wireframes", date: "March 22, 2023", progress: 85 },
    { title: "Prototype Review", date: "March 23, 2023", progress: 60 },
  ];

  return (
    <Card className="shadow-lg rounded-lg">
      <CardContent className="pt-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Homework Progress
        </h2>
        <div className="space-y-6">
          {homeworkData.map((item, index) => (
            <div key={index} className="flex items-center gap-6">
              {/* Circular Progress Bar */}
              <div className="relative h-14 w-14">
                <CircularProgressbar
                  value={item.progress}
                  text={`${item.progress}%`}
                  styles={buildStyles({
                    textSize: "12px",
                    textColor: "#4B5563",
                    pathColor: "#4F46E5",
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
              {/* Homework Details */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
              {/* View Details Button */}
              <Button variant="ghost" size="sm">
                <span className="sr-only">View details</span> →
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeworkProgress;
