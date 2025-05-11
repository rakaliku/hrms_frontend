import React, { useEffect, useState } from 'react';
import Attendance from './Attendance'; // Import the Attendance component
import Calendar from 'react-calendar'; // Install with `npm install react-calendar`
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

interface AttendanceRecord {
  employee_id: number;
  check_in: string;
  attendance_status: string;
  attendance_id: number;
  check_out: string | null;
}

const Dashboard: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch attendance records from the backend
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8005/attendance/all/'); // Replace with your backend endpoint
        if (response.ok) {
          const data = await response.json();
          setAttendanceRecords(data);
        } else {
          console.error('Failed to fetch attendance records');
        }
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  // Filter attendance records for the selected date
  const filteredRecords = selectedDate
    ? attendanceRecords.filter((record) =>
        new Date(record.check_in).toDateString() === selectedDate.toDateString()
      )
    : attendanceRecords;

  // Calculate attendance stats
  const totalEmployees = attendanceRecords.length;
  const checkedIn = attendanceRecords.filter((record) => record.attendance_status === 'In').length;
  const checkedOut = attendanceRecords.filter((record) => record.attendance_status === 'Out').length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold">Total Employees</h2>
          <p className="text-2xl font-semibold text-indigo-600">{totalEmployees}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold">Checked In</h2>
          <p className="text-2xl font-semibold text-green-600">{checkedIn}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold">Checked Out</h2>
          <p className="text-2xl font-semibold text-red-600">{checkedOut}</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Attendance Calendar</h2>
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
          tileClassName={({ date }) => {
            const isCheckedIn = attendanceRecords.some(
              (record) => new Date(record.check_in).toDateString() === date.toDateString()
            );
            return isCheckedIn ? 'bg-green-200' : '';
          }}
        />
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-In Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-Out Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.attendance_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.employee_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.check_in).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.check_out ? new Date(record.check_out).toLocaleString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.attendance_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Check-In/Check-Out Logic */}
      <Attendance />
    </div>
  );
};

export default Dashboard;