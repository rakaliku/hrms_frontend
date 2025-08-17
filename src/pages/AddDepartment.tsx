import React, { useState } from 'react';
import axios from 'axios';

const AddDepartment: React.FC = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://127.0.0.1:8004/departments/', {
        name: departmentName,
      });
      setResponse(`Department created: ID = ${result.data.id}`);
      setDepartmentName('');
    } catch (error: any) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setResponse('Failed to create department');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Department Name:</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Department
        </button>
      </form>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
};

export default AddDepartment;
