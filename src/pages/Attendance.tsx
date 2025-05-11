import React, { useState } from 'react';

const Attendance: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const handleCheckIn = async () => {
    if (!employeeId) {
      alert('Please enter a valid Employee ID!');
      return;
    }

    const currentTime = new Date().toISOString(); // Get current time in ISO format
    try {
      const response = await fetch('http://127.0.0.1:8005/attendance/checkin', {
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
        alert(`Check-In successful! Time: ${currentTime}`);
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

    try {
      const response = await fetch(`http://127.0.0.1:8004/attendance/checkout/${employeeId}`, {
        method: 'PUT', // Use PUT as per the backend logic
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attendance_status: 'In', // Optional, as the backend sets this
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('Checked Out');
        setCheckOutTime(new Date().toISOString());
        alert(`Check-Out successful! Time: ${data.check_out}`);
      } else {
        const errorData = await response.json();
        alert(`Check-Out failed! Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error during Check-Out:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee Attendance</h2>
      <div className="mb-4">
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
      <p className="text-sm text-gray-600 mb-2">Status: {status || 'No action yet'}</p>
      <p className="text-sm text-gray-600 mb-4">Last Check-In Time: {checkInTime || 'N/A'}</p>
      <p className="text-sm text-gray-600 mb-4">Last Check-Out Time: {checkOutTime || 'N/A'}</p>
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

export default Attendance;