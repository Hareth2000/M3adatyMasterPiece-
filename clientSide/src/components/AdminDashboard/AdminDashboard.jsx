import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Analytics from './Analytics';
import EquipmentManagement from './EquipmentManagement';
import ManagePartners from './ManagePartners';
import ManageUsers from './ManageUsers';
import ReviewsReports from './ReviewsReports';
import RentalRequests from './RentalRequests';

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* السايد بار */}
      <Sidebar />

      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-4 bg-gray-50">
        <Routes>
          <Route path="analytics" element={<Analytics />} />
          <Route path="equipment-management" element={<EquipmentManagement />} />
          <Route path="manage-partners" element={<ManagePartners />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="reviews-reports" element={<ReviewsReports />} />
          <Route path="rental-requests" element={<RentalRequests />} />
          <Route index element={<DashboardHome />} /> {/* الصفحة الرئيسية */}
        </Routes>
      </div>
    </div>
  );
};

// كومبوننت للصفحة الرئيسية (اختياري)
const DashboardHome = () => {
  return (
    <div>
      <Analytics/>
    </div>
  );
};

export default AdminDashboard;