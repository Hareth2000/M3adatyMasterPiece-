import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaSearch, FaUser, FaEnvelope, FaPhone, FaIdCard, FaInfoCircle } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showZoomedImage, setShowZoomedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
  const [totalPages, setTotalPages] = useState(1); // إجمالي عدد الصفحات

  // جلب المستخدمين من السيرفر
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/users/users?page=${page}`);
      console.log('Response from API:', response.data.users);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages); 
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('حدث خطأ أثناء جلب المستخدمين', 'error');
    } finally {
      setLoading(false);
    }
  };

  // الموافقة على المستخدم
  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/users/approve/${userId}`);
      fetchUsers(currentPage); // إعادة جلب المستخدمين بعد التحديث
      showNotification('تمت الموافقة على المستخدم بنجاح', 'success');
    } catch (error) {
      console.error('Error approving user:', error);
      showNotification('حدث خطأ أثناء الموافقة على المستخدم', 'error');
    }
  };

  // رفض المستخدم (حذف ناعم)
  // const softDeleteUser = async (userId) => {
  //   try {
  //     await axios.put(`http://localhost:5000/api/users/users/soft-delete/${userId}`);
  //     fetchUsers(currentPage); // إعادة جلب المستخدمين بعد التحديث
  //     showNotification('تم رفض المستخدم بنجاح', 'success');
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     showNotification('حدث خطأ أثناء رفض المستخدم', 'error');
  //   }
  // };

  // عرض إشعار للمستخدم
  // const showNotification = (message, type) => {
  //   const notification = document.createElement('div');
  //   notification.className = `notification ${type}`;
  //   notification.textContent = message;
  //   document.body.appendChild(notification);

  //   setTimeout(() => {
  //     notification.classList.add('show');
  //   }, 10);

  //   setTimeout(() => {
  //     notification.classList.remove('show');
  //     setTimeout(() => document.body.removeChild(notification), 300);
  //   }, 3000);
  // };

  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-[#f9f9fb] min-h-screen rtl">
      {/* الإشعارات ستظهر هنا */}

      {/* صورة مكبرة عند النقر */}
      {showZoomedImage && (
        <div className="image-zoom-overlay" onClick={() => setShowZoomedImage(null)}>
          <img src={showZoomedImage} alt="صورة مكبرة" />
        </div>
      )}

      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* عنوان الصفحة */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-center border-b-4 border-[#51a31d]">
          <h1 className="text-3xl font-bold text-[#383838] relative inline-block">
            إدارة المستخدمين
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r rounded-full"></span>
          </h1>
        </div>

        {/* حقل البحث */}
        <div className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="ابحث بالاسم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-12 rounded-full border-2 border-[#7585ff] focus:border-[#51a31d] focus:outline-none transition-colors duration-300 text-[#383838] shadow-md"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7585ff]" size={18} />
        </div>

        {/* عرض المستخدمين */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
            <style jsx>{`
              .loader {
                border: 5px solid #f3f3f3;
                border-radius: 50%;
                border-top: 5px solid #51a31d;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                      user.status === 'pending' ? 'border-l-4 border-[#7585ff]' : ''
                    }`}
                  >
                    {/* هيدر البطاقة */}
                    <div className="bg-gradient-to-r from-[#51a31d] to-[#3d8a0e] p-4 text-white">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-16 h-16 rounded-full border-4 border-white object-cover"
                            onError={(e) => { e.target.src = 'https://placehold.co/60x60'; }}
                          />
                          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                            user.isDeleted ? 'bg-red-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{user.name}</h3>
                          <p className="text-sm opacity-90 flex items-center gap-1">
                            <span className="bg-white text-[#51a31d] px-2 py-0.5 rounded-full text-xs">
                              {user.role}
                            </span>
                            {user.status === 'pending' && (
                              <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs">
                                قيد الانتظار
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* محتوى البطاقة */}
                    <div className="p-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-[#7585ff]" />
                          <span className="text-gray-600 text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-[#7585ff]" />
                          <span className="text-gray-600 text-sm">{user.phone || 'غير متوفر'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUser className="text-[#7585ff]" />
                          <span className="text-gray-600 text-sm">
                            الحالة: {user.isDeleted ? 'معطل' : 'نشط'}
                          </span>
                        </div>
                      </div>

                      {/* معلومات إضافية للمستخدمين المعلقين */}
                      {user.status === 'pending' && (
                        <div className="mt-4 border-t pt-4 border-gray-200">
                          <div className="flex items-start gap-2 mb-3">
                            <FaInfoCircle className="text-[#7585ff] mt-1" />
                            <div>
                              <p className="text-sm font-bold text-gray-700">التوضيح:</p>
                              <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">{user.explanation}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <FaIdCard className="text-[#7585ff] mt-1" />
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-700">صورة الهوية:</p>
                              <div className="mt-2 bg-gray-50 p-1 rounded">
                                <img
                                  src={`http://localhost:5000/${user.identityProof}`}
                                  alt="صورة الهوية"
                                  className="w-full h-32 object-cover rounded cursor-zoom-in"
                                  onClick={() => setShowZoomedImage(`http://localhost:5000/${user.identityProof}`)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => approveUser(user._id)}
                              className="flex-1 bg-[#51a31d] hover:bg-[#468c19] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                            >
                              <FaCheck /> الموافقة
                            </button>
                            <button
                              onClick={() => softDeleteUser(user._id)}
                              className="flex-1 bg-[#ff4d4d] hover:bg-[#e63c3c] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                            >
                              <FaTimes /> رفض
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white rounded-lg shadow p-8">
                    <p className="text-gray-500 text-lg">لا يوجد مستخدمين مطابقين لبحثك</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 bg-[#7585ff] hover:bg-[#5c6cd9] text-white py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      عرض جميع المستخدمين
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`mx-1 px-4 py-2 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;