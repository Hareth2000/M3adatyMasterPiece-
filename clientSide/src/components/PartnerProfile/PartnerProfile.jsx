// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Wrench,
//   Truck,
//   DollarSign,
//   Star,
//   MapPin,
//   Clock,
//   Users,
//   BarChart3,
//   Edit,
//   LogOut,
//   Settings,
// } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PartnerProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [equipment, setEquipment] = useState([]);
//   const [activeTab, setActiveTab] = useState("active");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [updateSuccess, setUpdateSuccess] = useState("");
//   const [updatedUser, setUpdatedUser] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     companyName: "",
//   });

//   const [userId, setUserId] = useState("");
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalEquipment: 0,
//     limit: 12,
//   });

//   // إحصائيات
//   const [stats, setStats] = useState({
//     totalRentals: 0,
//     activeRentals: 0,
//     completedRentals: 0,
//     totalRevenue: 0,
//     averageRating: 0,
//   });

//   // ─────────────────────────────
//   // طلبات التأجير: لنخزّنها هنا
//   const [rentalRequests, setRentalRequests] = useState([]);

//   // جلب طلبات التأجير لهذا المؤجر
//   const fetchRentalRequests = async (ownerId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/rentals/by-owner?ownerId=${ownerId}`,
//         { withCredentials: true }
//       );
//       setRentalRequests(res.data);
//     } catch (err) {
//       toast.error("فشل في جلب طلبات التأجير");
//     }
//   };

//   // قبول/رفض طلب التأجير
//   const handleRentalDecision = async (rentalId, decision) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/rentals/${rentalId}`,
//         { status: decision },
//         { withCredentials: true }
//       );
//       toast.success("تم تحديث حالة الطلب بنجاح");

//       // تحديث الحالة محليًا
//       setRentalRequests((prev) =>
//         prev.map((r) => (r._id === rentalId ? { ...r, status: decision } : r))
//       );
//     } catch (error) {
//       toast.error("فشل في تحديث حالة الطلب");
//     }
//   };

//   // جلب userId من السيرفر
//   useEffect(() => {
//     const getUserId = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/users/get-user",
//           {
//             withCredentials: true,
//           }
//         );
//         console.log("✅ تم استلام معرف المستخدم:", res.data.userId);
//         setUserId(res.data.userId);
//       } catch (error) {
//         console.error(
//           "❌ خطأ في جلب بيانات المستخدم:",
//           error.response?.data || error.message
//         );
//       }
//     };
//     getUserId();
//   }, []);

//   // جلب المعدات + الإحصائيات + طلبات التأجير
//   useEffect(() => {
//     if (!userId) return;

//     const fetchEquipment = async () => {
//       setLoading(true);
//       try {
//         // جلب معدات هذا المؤجر
//         const res = await axios.get(
//           `http://localhost:5000/api/equipment/owner/${userId}`,
//           {
//             params: {
//               page: pagination.currentPage,
//               limit: pagination.limit,
//             },
//           }
//         );

//         setEquipment(res.data.equipment);
//         setPagination((prev) => ({
//           ...prev,
//           totalPages: res.data.totalPages,
//           totalEquipment: res.data.totalEquipment,
//         }));

//         // جلب الإحصائيات
//         const statsRes = await axios.get(
//           `http://localhost:5000/api/partners/stats/${userId}`,
//           { withCredentials: true }
//         );
//         setStats(statsRes.data);

//         // جلب طلبات التأجير
//         fetchRentalRequests(userId);

//         setLoading(false);
//       } catch (err) {
//         setError("خطأ في جلب المعدات");
//         setLoading(false);
//       }
//     };

//     fetchEquipment();
//   }, [userId, pagination.currentPage]);

//   // جلب بروفايل المستخدم
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(res.data.user);
//         setUpdatedUser({
//           name: res.data.user.name,
//           email: res.data.user.email,
//           phone: res.data.user.phoneNumber || "",
//           address: res.data.user.address || "",
//           companyName: res.data.user.companyName || "",
//         });
//       } catch (error) {
//         toast.error(
//           error.response?.data?.message || "فشل في جلب بيانات المستخدم"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // نرسله إلى updateUserProfile مع الحقول
//       const res = await axios.put(
//         "http://localhost:5000/api/users/profile",
//         {
//           name: updatedUser.name,
//           email: updatedUser.email,
//           phoneNumber: updatedUser.phone,
//           address: updatedUser.address,
//           companyName: updatedUser.companyName,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setUser(res.data.user);
//       setIsEditing(false);
//       toast.success("تم تحديث المعلومات بنجاح");
//       setUpdateSuccess("تم تحديث المعلومات بنجاح");
//       setTimeout(() => setUpdateSuccess(""), 3000);
//     } catch (error) {
//       setError(error.response?.data?.message || "فشل في تحديث المعلومات");
//       toast.error(error.response?.data?.message || "فشل في تحديث المعلومات");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       window.location.href = "/auth";
//     } catch (error) {
//       setError("فشل في تسجيل الخروج");
//       toast.error("فشل في تسجيل الخروج");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   // تغيير صفحة الباجينج
//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > pagination.totalPages) return;
//     setPagination((prev) => ({
//       ...prev,
//       currentPage: newPage,
//     }));
//   };

//   // تحديث حالة المعدة (متاحة/غير متاحة)
//   const handleStatusChange = async (equipmentId, newStatus) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/equipment/${equipmentId}/status`,
//         { status: newStatus },
//         { withCredentials: true }
//       );

//       // تحديث القائمة محلياً
//       setEquipment((prev) =>
//         prev.map((item) =>
//           item._id === equipmentId
//             ? { ...item, availability: newStatus === "active" }
//             : item
//         )
//       );

//       toast.success("تم تحديث حالة المعدات بنجاح");
//     } catch (error) {
//       toast.error("فشل في تحديث حالة المعدات");
//     }
//   };

//   // تصفية المعدات
//   const filteredEquipment = equipment.filter((item) => {
//     const matchesTab =
//       activeTab === "all" ||
//       (activeTab === "active" && item.availability) ||
//       (activeTab === "inactive" && !item.availability);

//     const matchesSearch =
//       searchTerm === "" ||
//       item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.model.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesTab && matchesSearch;
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl text-gray-700 flex items-center">
//           <svg
//             className="animate-spin -ml-1 mr-3 h-8 w-8 text-amber-500"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           جارٍ التحميل...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen" dir="rtl">
//       <ToastContainer
//         position="top-left"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={true}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       {/* رأس الصفحة مع الإحصائيات */}
//       <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
//               <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg mb-4 md:mb-0">
//                 <span className="text-3xl text-amber-500 font-bold">
//                   {user?.name?.charAt(0).toUpperCase() || "؟"}
//                 </span>
//               </div>
//               <div className="mt-4 md:mt-0 md:mr-4 text-center md:text-right">
//                 <h1 className="text-2xl font-bold">{user?.name}</h1>
//                 <p className="text-amber-100">{user?.email}</p>
//                 <div className="mt-1">
//                   <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
//                     {user?.companyName || "شريك مزود معدات"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[100px] text-center">
//                 <div className="text-2xl font-bold">
//                   {pagination.totalEquipment}
//                 </div>
//                 <div className="text-sm">المعدات</div>
//               </div>
//               <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[100px] text-center">
//                 <div className="text-2xl font-bold">
//                   {stats.activeRentals || 0}
//                 </div>
//                 <div className="text-sm">تأجير نشط</div>
//               </div>
//               <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[100px] text-center">
//                 <div className="text-2xl font-bold">
//                   {stats.averageRating?.toFixed(1) || "0.0"}
//                 </div>
//                 <div className="text-sm">التقييم</div>
//               </div>
//               <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[100px] text-center">
//                 <div className="text-2xl font-bold">
//                   {stats.totalRevenue?.toLocaleString() || 0}
//                 </div>
//                 <div className="text-sm">الإيرادات (د.أ)</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* المحتوى الرئيسي */}
//       <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {updateSuccess && (
//           <div
//             className="bg-white border-r-4 border-amber-500 text-gray-700 px-4 py-3 rounded-lg shadow-md mb-6"
//             role="alert"
//           >
//             <span className="block sm:inline">{updateSuccess}</span>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* الشريط الجانبي */}
//           <div className="lg:col-span-3">
//             {/* معلومات المستخدم */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
//               <div className="bg-gray-800 text-white p-4">
//                 <h2 className="text-lg font-semibold flex items-center gap-2">
//                   <Settings size={18} />
//                   <span>المعلومات الشخصية</span>
//                 </h2>
//               </div>
//               <div className="p-4">
//                 {isEditing ? (
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                       <label className="text-sm text-gray-500 block mb-1">
//                         الاسم
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={updatedUser.name}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500 block mb-1">
//                         البريد الإلكتروني
//                       </label>
//                       <input
//                         readOnly
//                         type="email"
//                         name="email"
//                         value={updatedUser.email}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500 block mb-1">
//                         رقم الهاتف
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={updatedUser.phone}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
//                         placeholder="+962 7X XXX XXXX"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500 block mb-1">
//                         العنوان
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={updatedUser.address}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
//                         placeholder="المدينة، المنطقة، الشارع"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500 block mb-1">
//                         اسم الشركة
//                       </label>
//                       <input
//                         type="text"
//                         name="companyName"
//                         value={updatedUser.companyName}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
//                         placeholder="اسم الشركة أو المؤسسة (اختياري)"
//                       />
//                     </div>
//                     <div className="flex justify-between">
//                       <button
//                         type="button"
//                         onClick={() => setIsEditing(false)}
//                         className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         type="submit"
//                         className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
//                       >
//                         حفظ التغييرات
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <div className="space-y-3">
//                     <div>
//                       <label className="text-sm text-gray-500">الاسم</label>
//                       <p className="font-medium text-gray-800">{user?.name}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">
//                         البريد الإلكتروني
//                       </label>
//                       <p className="font-medium text-gray-800">{user?.email}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">
//                         رقم الهاتف
//                       </label>
//                       <p className="font-medium text-gray-800">
//                         {user?.phoneNumber || "غير محدد"}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">العنوان</label>
//                       <p className="font-medium text-gray-800">
//                         {user?.address || "غير محدد"}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">
//                         اسم الشركة
//                       </label>
//                       <p className="font-medium text-gray-800">
//                         {user?.companyName || "غير محدد"}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-500">
//                         تاريخ الانضمام
//                       </label>
//                       <p className="font-medium text-gray-800">
//                         {new Date(user?.createdAt).toLocaleDateString("ar-EG")}
//                       </p>
//                     </div>
//                     <div className="pt-3">
//                       <button
//                         onClick={() => setIsEditing(true)}
//                         className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors"
//                       >
//                         <Edit size={16} />
//                         <span>تعديل المعلومات</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* الإحصائيات السريعة */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
//               <div className="bg-amber-500 text-white p-4">
//                 <h2 className="text-lg font-semibold flex items-center gap-2">
//                   <BarChart3 size={18} />
//                   <span>إحصائيات النشاط</span>
//                 </h2>
//               </div>
//               <div className="p-4">
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">معدات متاحة للتأجير</span>
//                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {equipment.filter((e) => e.availability).length}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">معدات غير متاحة</span>
//                     <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {equipment.filter((e) => !e.availability).length}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">
//                       طلبات التأجير المكتملة
//                     </span>
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {stats.completedRentals || 0}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">إجمالي المشاهدات</span>
//                     <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {equipment
//                         .reduce((sum, item) => sum + (item.views || 0), 0)
//                         .toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="pt-4">
//                   <Link to="/equipment/create">
//                     <button className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition-colors">
//                       <Wrench size={16} />
//                       <span>إضافة معدات جديدة</span>
//                     </button>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors mt-2"
//                   >
//                     <LogOut size={16} />
//                     <span>تسجيل الخروج</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* المعدات */}
//           <div className="lg:col-span-9">
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
//               <div className="p-4">
//                 <div className="flex flex-col sm:flex-row justify-between mb-6">
//                   <div className="mb-4 sm:mb-0">
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="بحث في المعدات..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full sm:w-64 p-2 pl-9 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
//                       />
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 absolute left-2 top-2.5 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="flex space-x-2 space-x-reverse">
//                     <button
//                       onClick={() => setActiveTab("all")}
//                       className={`px-4 py-2 rounded-md text-sm ${
//                         activeTab === "all"
//                           ? "bg-amber-500 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       الكل
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("active")}
//                       className={`px-4 py-2 rounded-md text-sm ${
//                         activeTab === "active"
//                           ? "bg-amber-500 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       متاحة
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("inactive")}
//                       className={`px-4 py-2 rounded-md text-sm ${
//                         activeTab === "inactive"
//                           ? "bg-amber-500 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       غير متاحة
//                     </button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredEquipment.length === 0 ? (
//                     <div className="col-span-full text-center py-10 text-gray-600">
//                       <Truck className="mx-auto h-16 w-16 text-gray-300 mb-2" />
//                       <p className="text-lg">لا توجد معدات لعرضها</p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         يمكنك إضافة معدات جديدة من خلال الضغط على زر "إضافة
//                         معدات جديدة"
//                       </p>
//                     </div>
//                   ) : (
//                     filteredEquipment.map((item) => (
//                       <div
//                         key={item._id}
//                         className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
//                       >
//                         <div className="relative h-48 overflow-hidden">
//                           <img
//                             src={`http://localhost:5000/${item.mainImage}`}
//                             alt={item.title}
//                             className="w-full h-full object-cover"
//                           />
//                           <div
//                             className={`absolute top-0 right-0 m-2 px-2 py-1 rounded-md text-xs font-medium ${
//                               item.availability
//                                 ? "bg-green-500 text-white"
//                                 : "bg-red-500 text-white"
//                             }`}
//                           >
//                             {item.availability ? "متاحة" : "غير متاحة"}
//                           </div>
//                         </div>
//                         <div className="p-4">
//                           <h3 className="font-bold text-lg mb-2 line-clamp-1">
//                             {item.title}
//                           </h3>

//                           <div className="flex items-center text-sm text-gray-600 mb-2">
//                             <Wrench className="h-4 w-4 ml-1 text-amber-500" />
//                             <span className="ml-3">
//                               {item.manufacturer} {item.model}
//                             </span>
//                             <span className="mx-2">•</span>
//                             <span>{item.year}</span>
//                           </div>

//                           <div className="flex items-center text-sm text-gray-600 mb-3">
//                             <MapPin className="h-4 w-4 ml-1 text-amber-500" />
//                             <span>{item.location}</span>
//                           </div>

//                           <div className="flex justify-between items-center mb-4">
//                             <div className="flex items-center">
//                               <DollarSign className="h-4 w-4 ml-1 text-amber-500" />
//                               <span className="font-bold text-amber-500">
//                                 {item.dailyRate}
//                               </span>
//                               <span className="text-xs text-gray-500 mr-1">
//                                 / يوم
//                               </span>
//                             </div>
//                             <div className="flex items-center">
//                               <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
//                               <span className="font-medium">
//                                 {item.averageRating || "0.0"}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="pt-3 border-t border-gray-100 flex justify-between">
//                             <Link
//                               to={`/equipment/${item._id}`}
//                               className="text-amber-500 hover:text-amber-600 font-medium text-sm"
//                             >
//                               عرض التفاصيل
//                             </Link>
//                             <Link
//                               to={`/equipment/edit/${item._id}`}
//                               className="text-blue-500 hover:text-blue-600 font-medium text-sm"
//                             >
//                               تعديل
//                             </Link>
//                             <button
//                               onClick={() =>
//                                 handleStatusChange(
//                                   item._id,
//                                   item.availability ? "inactive" : "active"
//                                 )
//                               }
//                               className={`font-medium text-sm ${
//                                 item.availability
//                                   ? "text-red-500 hover:text-red-600"
//                                   : "text-green-500 hover:text-green-600"
//                               }`}
//                             >
//                               {item.availability ? "إيقاف" : "تفعيل"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 {/* أزرار التنقل بين الصفحات (Pagination) */}
//                 {pagination.totalPages > 1 && (
//                   <div className="mt-6 flex justify-center">
//                     <button
//                       onClick={() =>
//                         handlePageChange(pagination.currentPage - 1)
//                       }
//                       disabled={pagination.currentPage === 1}
//                       className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       السابق
//                     </button>
//                     <span className="mx-4 text-lg flex items-center">
//                       الصفحة {pagination.currentPage} من {pagination.totalPages}
//                     </span>
//                     <button
//                       onClick={() =>
//                         handlePageChange(pagination.currentPage + 1)
//                       }
//                       disabled={
//                         pagination.currentPage === pagination.totalPages
//                       }
//                       className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       التالي
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* قسم طلبات التأجير: عرض الطلبات الواردة من rentalRequests */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
//               <div className="bg-gray-800 text-white p-4">
//                 <h2 className="text-lg font-semibold flex items-center gap-2">
//                   <Users size={18} />
//                   <span>طلبات التأجير الأخيرة</span>
//                 </h2>
//               </div>
//               <div className="p-4">
//                 {rentalRequests.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             العميل
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             المعدات
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             تاريخ البدء
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             تاريخ النهاية
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             الحالة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             خيارات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {rentalRequests.map((rental) => {
//                           const start = new Date(rental.startDate);
//                           const end = new Date(rental.endDate);
//                           return (
//                             <tr key={rental._id}>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {rental.user?.name}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {rental.user?.email}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">
//                                   {rental.equipment?.title}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 {start.toLocaleDateString("ar-EG")}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 {end.toLocaleDateString("ar-EG")}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 {rental.status === "pending" && (
//                                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                                     قيد المراجعة
//                                   </span>
//                                 )}
//                                 {rental.status === "accepted" && (
//                                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                     مقبول
//                                   </span>
//                                 )}
//                                 {rental.status === "rejected" && (
//                                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                     مرفوض
//                                   </span>
//                                 )}
//                                 {rental.status === "paid" && (
//                                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                                     مدفوع
//                                   </span>
//                                 )}
//                                 {rental.status === "cancelled" && (
//                                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-700">
//                                     ملغي
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 {rental.status === "pending" ? (
//                                   <div className="space-x-1 space-x-reverse">
//                                     <button
//                                       onClick={() =>
//                                         handleRentalDecision(
//                                           rental._id,
//                                           "accepted"
//                                         )
//                                       }
//                                       className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
//                                     >
//                                       قبول
//                                     </button>
//                                     <button
//                                       onClick={() =>
//                                         handleRentalDecision(
//                                           rental._id,
//                                           "rejected"
//                                         )
//                                       }
//                                       className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
//                                     >
//                                       رفض
//                                     </button>
//                                   </div>
//                                 ) : (
//                                   <span className="text-gray-400 text-xs">
//                                     لا توجد إجراءات
//                                   </span>
//                                 )}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-600">
//                     <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
//                     <p className="text-lg">لا توجد طلبات تأجير حاليًا</p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       ستظهر هنا طلبات التأجير عندما يقوم العملاء بطلب تأجير
//                       معداتك
//                     </p>
//                   </div>
//                 )}

//                 <div className="mt-4 text-center">
//                   <Link
//                     to="/rentals"
//                     className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium"
//                   >
//                     عرض كافة طلبات التأجير
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PartnerProfile;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Wrench,
  Truck,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Users,
  BarChart3,
  Edit,
  LogOut,
  Settings,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PartnerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
  });

  const [userId, setUserId] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEquipment: 0,
    limit: 12,
  });

  // إحصائيات
  const [stats, setStats] = useState({
    totalRentals: 0,
    activeRentals: 0,
    completedRentals: 0,
    totalRevenue: 0,
    averageRating: 0,
  });

  // طلبات التأجير: لنخزّنها هنا
  const [rentalRequests, setRentalRequests] = useState([]);

  // جلب طلبات التأجير لهذا المؤجر
  const fetchRentalRequests = async (ownerId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/rentals/by-owner?ownerId=${ownerId}`,
        { withCredentials: true }
      );
      setRentalRequests(res.data);
    } catch (err) {
      toast.error("فشل في جلب طلبات التأجير");
    }
  };

  // قبول/رفض طلب التأجير
  const handleRentalDecision = async (rentalId, decision) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/rentals/${rentalId}`,
        { status: decision },
        { withCredentials: true }
      );
      toast.success("تم تحديث حالة الطلب بنجاح");

      // تحديث الحالة محليًا
      setRentalRequests((prev) =>
        prev.map((r) => (r._id === rentalId ? { ...r, status: decision } : r))
      );
    } catch (error) {
      toast.error("فشل في تحديث حالة الطلب");
    }
  };

  // جلب userId من السيرفر
  useEffect(() => {
    const getUserId = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/get-user",
          {
            withCredentials: true,
          }
        );
        console.log("✅ تم استلام معرف المستخدم:", res.data.userId);
        setUserId(res.data.userId);
      } catch (error) {
        console.error(
          "❌ خطأ في جلب بيانات المستخدم:",
          error.response?.data || error.message
        );
      }
    };
    getUserId();
  }, []);

  // جلب المعدات + الإحصائيات + طلبات التأجير
  useEffect(() => {
    if (!userId) return;

    const fetchEquipment = async () => {
      setLoading(true);
      try {
        // جلب معدات هذا المؤجر
        const res = await axios.get(
          `http://localhost:5000/api/equipment/owner/${userId}`,
          {
            params: {
              page: pagination.currentPage,
              limit: pagination.limit,
            },
          }
        );

        setEquipment(res.data.equipment);
        setPagination((prev) => ({
          ...prev,
          totalPages: res.data.totalPages,
          totalEquipment: res.data.totalEquipment,
        }));

        // جلب الإحصائيات
        const statsRes = await axios.get(
          `http://localhost:5000/api/partners/stats/${userId}`,
          { withCredentials: true }
        );
        setStats(statsRes.data);

        // جلب طلبات التأجير
        fetchRentalRequests(userId);

        setLoading(false);
      } catch (err) {
        setError("خطأ في جلب المعدات");
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [userId, pagination.currentPage]);

  // جلب بروفايل المستخدم
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setUpdatedUser({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phoneNumber || "",
          address: res.data.user.address || "",
          companyName: res.data.user.companyName || "",
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "فشل في جلب بيانات المستخدم"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // نرسله إلى updateUserProfile مع الحقول
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: updatedUser.name,
          email: updatedUser.email,
          phoneNumber: updatedUser.phone,
          address: updatedUser.address,
          companyName: updatedUser.companyName,
        },
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      setIsEditing(false);
      toast.success("تم تحديث المعلومات بنجاح");
      setUpdateSuccess("تم تحديث المعلومات بنجاح");
      setTimeout(() => setUpdateSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "فشل في تحديث المعلومات");
      toast.error(error.response?.data?.message || "فشل في تحديث المعلومات");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      window.location.href = "/auth";
    } catch (error) {
      setError("فشل في تسجيل الخروج");
      toast.error("فشل في تسجيل الخروج");
      setTimeout(() => setError(""), 3000);
    }
  };

  // تغيير صفحة الباجينج
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  // تحديث حالة المعدة (متاحة/غير متاحة)
  const handleStatusChange = async (equipmentId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/equipment/${equipmentId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      // تحديث القائمة محلياً
      setEquipment((prev) =>
        prev.map((item) =>
          item._id === equipmentId
            ? { ...item, availability: newStatus === "active" }
            : item
        )
      );

      toast.success("تم تحديث حالة المعدات بنجاح");
    } catch (error) {
      toast.error("فشل في تحديث حالة المعدات");
    }
  };

  // تصفية المعدات
  const filteredEquipment = equipment.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && item.availability) ||
      (activeTab === "inactive" && !item.availability);

    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-700 flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-amber-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          جارٍ التحميل...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* رأس الصفحة محسن مع الإحصائيات */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-amber-800 flex items-center justify-center border-4 border-white shadow-lg mb-4 md:mb-0">
                  <span className="text-3xl text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "؟"}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:mr-4 text-center md:text-right">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-amber-100">{user?.email}</p>
                <div className="mt-1">
                  <span className="inline-block px-3 py-1 bg-amber-800 bg-opacity-30 rounded-full text-sm">
                    {user?.companyName || "شريك مزود معدات"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-amber-800 bg-opacity-30 rounded-lg p-4 min-w-[110px] text-center backdrop-blur-sm shadow-inner">
                <div className="text-2xl font-bold text-white">
                  {pagination.totalEquipment}
                </div>
                <div className="text-sm text-amber-100">المعدات</div>
              </div>
              <div className="bg-amber-800 bg-opacity-30 rounded-lg p-4 min-w-[110px] text-center backdrop-blur-sm shadow-inner">
                <div className="text-2xl font-bold text-white">
                  {stats.activeRentals || 0}
                </div>
                <div className="text-sm text-amber-100">تأجير نشط</div>
              </div>
              <div className="bg-amber-800 bg-opacity-30 rounded-lg p-4 min-w-[110px] text-center backdrop-blur-sm shadow-inner">
                <div className="text-2xl font-bold text-white flex items-center justify-center">
                  {stats.averageRating?.toFixed(1) || "0.0"}
                  <Star size={16} className="mr-1 fill-amber-300 text-amber-300" />
                </div>
                <div className="text-sm text-amber-100">التقييم</div>
              </div>
              <div className="bg-amber-800 bg-opacity-30 rounded-lg p-4 min-w-[110px] text-center backdrop-blur-sm shadow-inner">
                <div className="text-2xl font-bold text-white">
                  {stats.totalRevenue?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-amber-100">الإيرادات (د.أ)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {updateSuccess && (
          <div
            className="bg-green-50 border-r-4 border-green-500 text-green-700 px-4 py-3 rounded-lg shadow-md mb-6 flex items-center"
            role="alert"
          >
            <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="block sm:inline">{updateSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* الشريط الجانبي */}
          <div className="lg:col-span-3">
            {/* معلومات المستخدم */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
              <div className="bg-gray-800 text-white p-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Settings size={18} />
                  <span>المعلومات الشخصية</span>
                </h2>
              </div>
              <div className="p-4">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        الاسم
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={updatedUser.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        readOnly
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={updatedUser.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
                        placeholder="+962 7X XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        العنوان
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={updatedUser.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
                        placeholder="المدينة، المنطقة، الشارع"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        اسم الشركة
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={updatedUser.companyName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20"
                        placeholder="اسم الشركة أو المؤسسة (اختياري)"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
                      >
                        حفظ التغييرات
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <label className="text-sm text-gray-500 block mb-1">الاسم</label>
                      <p className="font-medium text-gray-800">{user?.name}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <label className="text-sm text-gray-500 block mb-1">
                        البريد الإلكتروني
                      </label>
                      <p className="font-medium text-gray-800">{user?.email}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <label className="text-sm text-gray-500 block mb-1">
                        رقم الهاتف
                      </label>
                      <p className="font-medium text-gray-800">
                        {user?.phoneNumber || "غير محدد"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <label className="text-sm text-gray-500 block mb-1">العنوان</label>
                      <p className="font-medium text-gray-800">
                        {user?.address || "غير محدد"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <label className="text-sm text-gray-500 block mb-1">
                        اسم الشركة
                      </label>
                      <p className="font-medium text-gray-800">
                        {user?.companyName || "غير محدد"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <label className="text-sm text-gray-500 block mb-1">
                        تاريخ الانضمام
                      </label>
                      <p className="font-medium text-gray-800">
                        {new Date(user?.createdAt).toLocaleDateString("ar-EG")}
                      </p>
                    </div>
                    <div className="pt-3">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
                      >
                        <Edit size={16} />
                        <span>تعديل المعلومات</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* الإحصائيات السريعة */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
              <div className="bg-amber-600 text-white p-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 size={18} />
                  <span>إحصائيات النشاط</span>
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border-r-4 border-green-500 bg-green-50 rounded-md shadow-sm">
                    <span className="text-gray-700 font-medium">معدات متاحة للتأجير</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {equipment.filter((e) => e.availability).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-r-4 border-red-500 bg-red-50 rounded-md shadow-sm">
                    <span className="text-gray-700 font-medium">معدات غير متاحة</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {equipment.filter((e) => !e.availability).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-r-4 border-blue-500 bg-blue-50 rounded-md shadow-sm">
                    <span className="text-gray-700 font-medium">
                      طلبات التأجير المكتملة
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {stats.completedRentals || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-r-4 border-gray-500 bg-gray-50 rounded-md shadow-sm">
                    <span className="text-gray-700 font-medium">إجمالي المشاهدات</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {equipment
                        .reduce((sum, item) => sum + (item.views || 0), 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <Link to="/create-equipment">
                    <button className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-md transition-colors shadow-sm">
                      <Wrench size={16} />
                      <span>إضافة معدات جديدة</span>
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-md transition-colors shadow-sm"
                  >
                    <LogOut size={16} />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* المعدات */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
              <div className="bg-gray-50 border-b border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row justify-between mb-6">
                  <div className="mb-4 sm:mb-0">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="بحث في المعدات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 p-2 pl-9 border border-gray-300 rounded-md focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-20 shadow-sm"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-2 top-2.5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex space-x-2 space-x-reverse shadow-sm rounded-md overflow-hidden">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-4 py-2 text-sm ${
                        activeTab === "all"
                          ? "bg-amber-500 text-white font-medium"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      الكل
                    </button>
                    <button
                      onClick={() => setActiveTab("active")}
                      className={`px-4 py-2 text-sm ${
                        activeTab === "active"
                          ? "bg-amber-500 text-white font-medium"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      متاحة
                    </button>
                    <button
                      onClick={() => setActiveTab("inactive")}
                      className={`px-4 py-2 text-sm ${
                        activeTab === "inactive"
                          ? "bg-amber-500 text-white font-medium"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      غير متاحة
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEquipment.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-600">
                      <Truck className="mx-auto h-16 w-16 text-gray-300 mb-2" />
                      <p className="text-lg">لا توجد معدات لعرضها</p>
                      <p className="text-sm text-gray-500 mt-1">
                        يمكنك إضافة معدات جديدة من خلال الضغط على زر "إضافة
                        معدات جديدة"
                      </p>
                    </div>
                  ) : (
                    filteredEquipment.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md group"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={`http://localhost:5000/${item.mainImage}`}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div
                            className={`absolute top-0 right-0 m-2 px-3 py-1 rounded-md text-xs font-medium shadow-sm ${
                              item.availability
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {item.availability ? "متاحة" : "غير متاحة"}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-800">
                            {item.title}
                          </h3>

                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Wrench className="h-4 w-4 ml-1 text-amber-500" />
                            <span className="ml-3">
                              {item.manufacturer} {item.model}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span>{item.year}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 ml-1 text-amber-500" />
                            <span>{item.location}</span>
                          </div>

                          <div className="flex justify-between items-center mb-4 bg-amber-50 p-2 rounded-md">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 ml-1 text-amber-600" />
                              <span className="font-bold text-amber-600">
                                {item.dailyRate}
                              </span>
                              <span className="text-xs text-gray-500 mr-1">
                                / يوم
                              </span>
                            </div>
                            <div className="flex items-center bg-white px-2 py-1 rounded-md shadow-sm">
                              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
                              <span className="font-medium">
                                {item.averageRating || "0.0"}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-100 flex justify-between">
                            <Link
                              to={`/equipment/${item._id}`}
                              className="text-amber-500 hover:text-amber-600 font-medium text-sm flex items-center"
                            >
                              <span>عرض التفاصيل</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </Link>
                            <Link
                              to={`/equipment/edit/${item._id}`}
                              className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center"
                            >
                              <Edit size={14} className="ml-1" />
                              <span>تعديل</span>
                            </Link>
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  item._id,
                                  item.availability ? "inactive" : "active"
                                )
                              }
                              className={`font-medium text-sm flex items-center ${
                                item.availability
                                  ? "text-red-500 hover:text-red-600"
                                  : "text-green-500 hover:text-green-600"
                              }`}
                            >
                              {item.availability ? (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  <span>إيقاف</span>
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>تفعيل</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* أزرار التنقل بين الصفحات (Pagination) */}
                {pagination.totalPages > 1 && (
                  <div className="mt-6 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        السابق
                      </button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border ${
                            page === pagination.currentPage
                              ? "z-10 bg-amber-50 border-amber-500 text-amber-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          } text-sm font-medium`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        التالي
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>

            {/* قسم طلبات التأجير: عرض الطلبات الواردة من rentalRequests */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
              <div className="bg-gray-800 text-white p-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users size={18} />
                  <span>طلبات التأجير الأخيرة</span>
                </h2>
              </div>
              <div className="p-4">
                {rentalRequests.length > 0 ? (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            العميل
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            المعدات
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            تاريخ البدء
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            تاريخ النهاية
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            الحالة
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            خيارات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rentalRequests.map((rental) => {
                          const start = new Date(rental.startDate);
                          const end = new Date(rental.endDate);
                          return (
                            <tr key={rental._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium mr-3">
                                    {rental.user?.name?.charAt(0).toUpperCase() || "؟"}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {rental.user?.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {rental.user?.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {rental.equipment?.title}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 flex items-center">
                                  <Clock size={14} className="ml-1 text-gray-400" />
                                  {start.toLocaleDateString("ar-EG")}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 flex items-center">
                                  <Clock size={14} className="ml-1 text-gray-400" />
                                  {end.toLocaleDateString("ar-EG")}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {rental.status === "pending" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    قيد المراجعة
                                  </span>
                                )}
                                {rental.status === "accepted" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    مقبول
                                  </span>
                                )}
                                {rental.status === "rejected" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    مرفوض
                                  </span>
                                )}
                                {rental.status === "paid" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    مدفوع
                                  </span>
                                )}
                                {rental.status === "cancelled" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-700">
                                    ملغي
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {rental.status === "pending" ? (
                                  <div className="space-x-1 space-x-reverse">
                                    <button
                                      onClick={() =>
                                        handleRentalDecision(
                                          rental._id,
                                          "accepted"
                                        )
                                      }
                                      className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                                    >
                                      قبول
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleRentalDecision(
                                          rental._id,
                                          "rejected"
                                        )
                                      }
                                      className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                                    >
                                      رفض
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-xs">
                                    لا توجد إجراءات
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-600 bg-gray-50 rounded-lg">
                    <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-lg">لا توجد طلبات تأجير حاليًا</p>
                    <p className="text-sm text-gray-500 mt-1">
                      ستظهر هنا طلبات التأجير عندما يقوم العملاء بطلب تأجير
                      معداتك
                    </p>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <Link
                    to="/rentals"
                    className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
                  >
                    عرض كافة طلبات التأجير
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;