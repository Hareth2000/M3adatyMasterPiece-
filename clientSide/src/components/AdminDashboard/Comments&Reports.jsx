import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportedComments = () => {
  const [reportedComments, setReportedComments] = useState([]);

  // جلب التعليقات المبلغ عنها
  const fetchReportedComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments/reported/comments');
      setReportedComments(response.data);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب التعليقات المبلغ عنها', error);
    }
  };

  useEffect(() => {
    fetchReportedComments();
  }, []);

  // تحديث حالة التعليق (موافقة أو رفض)
  const handleUpdateStatus = async (commentId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/comments/${commentId}/status`, { status });
      fetchReportedComments(); // تحديث القائمة بعد تغيير الحالة
    } catch (error) {
      console.error('حدث خطأ أثناء تحديث حالة التعليق', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f9fb] p-4 font-sans">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#383838] bg-white py-4 rounded-lg shadow-md border-b-4 border-red-600">
            التعليقات المبلغ عنها
          </h2>
        </div>
        <div className="space-y-6">
          {reportedComments.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-[#383838]">
              لا توجد تعليقات مبلغ عنها في الوقت الحالي
            </div>
          ) : (
            reportedComments.map((comment) => (
              <div 
                key={comment._id} 
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                dir="rtl"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-[#383838]">{comment.userId.name}</p>
                  <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded-full">تم الإبلاغ</span>
                </div>
                <p className="text-[#383838] mb-4 border-r-4 border-[#7585ff] pr-3 py-2">{comment.content}</p>
                <p className="text-sm text-gray-500 mb-4">{new Date(comment.createdAt).toLocaleString('ar-SA')}</p>

                {/* أزرار الموافقة والرفض */}
                <div className="flex justify-end space-x-0 space-x-reverse space-y-0 mt-4 rtl">
                  <button
                    onClick={() => handleUpdateStatus(comment._id, "rejected")}
                    className="bg-[#383838] text-white px-5 py-2 rounded-r-lg transition duration-300 hover:bg-red-600 ml-1"
                  >
                    رفض
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(comment._id, "approved")}
                    className="bg-[#51a31d] text-white px-5 py-2 rounded-l-lg transition duration-300 hover:bg-green-600"
                  >
                    موافقة
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportedComments;