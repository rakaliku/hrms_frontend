import React from 'react';
import Attendance from './Attendance'; // Import the Attendance component

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <Attendance /> {/* Include the Attendance component */}
    </div>
  );
};

export default Dashboard;