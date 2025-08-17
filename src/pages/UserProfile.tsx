import React, { useState } from 'react';

const UserProfile: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<number | null>(null); // State for employee ID
  const [status, setStatus] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = async () => {
    if (!employeeId) {
      alert('Please enter a valid Employee ID!');
      return;
    }

    const currentTime = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    try {
      const response = await fetch('http://127.0.0.1:8004/attendance/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: employeeId,
          check_in: currentTime,
          attendance_status: 'In',
        }),
      });

      if (response.ok) {
        
        setStatus('Checked In');
        setCheckInTime(currentTime);
        alert(`Check-In successful! Date: ${currentTime}`);
      } else {
        alert('Check-In failed!');
      }
    } catch (error) {
      console.error('Error during Check-In:', error);
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId) {
      alert('Please enter a valid Employee ID!');
      return;
    }

    const currentTime = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    try {
      const response = await fetch('http://127.0.0.1:8004/attendance/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: employeeId,
          check_out: currentTime,
          attendance_status: 'Out',
        }),
      });

      if (response.ok) {
        
        setStatus('Checked Out');
        alert(`Check-Out successful! Date: ${currentTime}`);
      } else {
        alert('Check-Out failed!');
      }
    } catch (error) {
      console.error('Error during Check-Out:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <div className="mb-6">
        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
          Employee ID:
        </label>
        <input
          type="number"
          id="employeeId"
          value={employeeId || ''}
          onChange={(e) => setEmployeeId(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Employee ID"
        />
      </div>
      <p className="text-sm text-gray-600 mb-2">Status: <span className="font-medium">{status || 'No action yet'}</span></p>
      <p className="text-sm text-gray-600 mb-4">Last Check-In Time: <span className="font-medium">{checkInTime || 'N/A'}</span></p>
      <div className="flex justify-between">
        <button
          onClick={handleCheckIn}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Check-In
        </button>
        <button
          onClick={handleCheckOut}
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Check-Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;