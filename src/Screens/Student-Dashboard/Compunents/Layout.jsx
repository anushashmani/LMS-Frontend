import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-5">
      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;

