import React from 'react';
import { useAuth } from '@/Context/AuthContext';
import StudentCourse from '../Compunents/GetStudentCourse/StudentCourse';

const Courses = () => {
  const { user } = useAuth();

  if (user && user.role === 'student') {
    return <StudentCourse />;
  }
};

export default Courses;
