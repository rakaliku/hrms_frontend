import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import AddDepartment from './pages/AddDepartment';
import Login from './pages/Login';
import Register from './pages/Register'; // Import the Register component
import Dashboard from './pages/Dashboard'; // Import the Dashboard component
import UserProfile from './pages/UserProfile'; // Import the UserProfile component

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route path="/profile" element={<UserProfile />} /> {/* Add User Profile route */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}