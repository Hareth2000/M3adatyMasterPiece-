// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { User, MapPin, Phone, LogOut, Edit, Heart, Clock, Truck, Star, Settings } from "lucide-react";
// import { Link } from "react-router-dom";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [rentalHistory, setRentalHistory] = useState([]);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [updatedUser, setUpdatedUser] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     profilePicture: null,
//   });

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
//           phone: res.data.user.phone || "",
//           address: res.data.user.address || "",
//           profilePicture: res.data.user.profilePicture,
//         });
//       } catch (error) {
//         toast.error(
//           error.response?.data?.message || "فشل في جلب بيانات المستخدم"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     const fetchFavorites = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/favorites", {
//           withCredentials: true,
//         });
//         setFavorites(res.data);
//       } catch (error) {
//         console.error("خطأ في جلب المفضلة:", error);
//       }
//     };
    
//     const fetchRentalHistory = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/rentals/history", {
//           withCredentials: true,
//         });
//         setRentalHistory(res.data);
//       } catch (error) {
//         console.error("خطأ في جلب سجل التأجير:", error);
//       }
//     };
    
//     fetchUserProfile();
//     fetchFavorites();
//     fetchRentalHistory();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setUpdatedUser((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", updatedUser.name);
//     formData.append("email", updatedUser.email);
//     formData.append("phone", updatedUser.phone);
//     formData.append("address", updatedUser.address);
//     if (updatedUser.profilePicture && updatedUser.profilePicture instanceof File) {
//       formData.append("profilePicture", updatedUser.profilePicture);
//     }
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/users/profile",
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setUser(res.data.user);
//       setIsEditing(false);
//       toast.success("تم تحديث المعلومات بنجاح");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "فشل في تحديث المعلومات");
//     }
//   };

//   const handleRemoveFavorite = async (equipmentId) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/toggle-favorite",
//         { equipmentId },
//         { withCredentials: true }
//       );
      
//       // تحديث قائمة المفضلة بعد الإزالة
//       setFavorites(favorites.filter(item => item._id !== equipmentId));
//       toast.success("تمت إزالة المعدات من المفضلة");
//     } catch (error) {
//       toast.error("فشل في إزالة المعدات من المفضلة");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/logout",
//         {},
//         { withCredentials: true }
//       );
//       window.location.href = "/auth";
//     } catch (error) {
//       toast.error("فشل في تسجيل الخروج");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl text-gray-700">
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
//           جاري التحميل...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8"
//       dir="rtl"
//     >
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-6">
//           <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-lg px-6 py-8">
//             <div className="flex flex-col md:flex-row items-center">
//               {user.profilePicture ? (
//                 <img
//                   src={`http://localhost:5000${user.profilePicture}`}
//                   alt="الصورة الشخصية"
//                   className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
//                 />
//               ) : (
//                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-md">
//                   <User className="h-16 w-16 text-amber-500" />
//                 </div>
//               )}
//               <div className="mt-4 md:mt-0 md:mr-6 text-center md:text-right flex-grow">
//                 <h1 className="text-2xl md:text-3xl font-bold text-white">
//                   {user.name}
//                 </h1>
//                 <p className="text-white">{user.email}</p>
//                 <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
//                   <span className="inline-flex items-center px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-full text-sm">
//                     <Star className="ml-1 h-4 w-4" />
//                     مستأجر
//                   </span>
//                   {user.phone && (
//                     <span className="inline-flex items-center px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-full text-sm">
//                       <Phone className="ml-1 h-4 w-4" />
//                       {user.phone}
//                     </span>
//                   )}
//                   {user.address && (
//                     <span className="inline-flex items-center px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-full text-sm">
//                       <MapPin className="ml-1 h-4 w-4" />
//                       {user.address}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="mt-4 md:mt-0">
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center bg-white text-amber-500 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
//                 >
//                   <LogOut className="h-5 w-5 ml-2" />
//                   تسجيل الخروج
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Tabs Navigation */}
//         <div className="bg-white rounded-lg shadow-md mb-6 p-3">
//           <div className="flex flex-wrap overflow-x-auto">
//             <button 
//               onClick={() => setActiveTab("profile")} 
//               className={`flex items-center px-4 py-2 rounded-md ${activeTab === "profile" 
//                 ? "bg-amber-50 text-amber-500 font-medium" 
//                 : "text-gray-600 hover:bg-gray-50"}`}
//             >
//               <User className="h-5 w-5 ml-2" />
//               <span>الملف الشخصي</span>
//             </button>
//             <button 
//               onClick={() => setActiveTab("favorites")} 
//               className={`flex items-center px-4 py-2 rounded-md ${activeTab === "favorites" 
//                 ? "bg-amber-50 text-amber-500 font-medium" 
//                 : "text-gray-600 hover:bg-gray-50"}`}
//             >
//               <Heart className="h-5 w-5 ml-2" />
//               <span>المفضلة</span>
//               <span className="mr-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
//                 {favorites.length}
//               </span>
//             </button>
//             <button 
//               onClick={() => setActiveTab("rentals")} 
//               className={`flex items-center px-4 py-2 rounded-md ${activeTab === "rentals" 
//                 ? "bg-amber-50 text-amber-500 font-medium" 
//                 : "text-gray-600 hover:bg-gray-50"}`}
//             >
//               <Clock className="h-5 w-5 ml-2" />
//               <span>سجل التأجير</span>
//               <span className="mr-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
//                 {rentalHistory.length}
//               </span>
//             </button>
//             <button 
//               onClick={() => setActiveTab("settings")} 
//               className={`flex items-center px-4 py-2 rounded-md ${activeTab === "settings" 
//                 ? "bg-amber-50 text-amber-500 font-medium" 
//                 : "text-gray-600 hover:bg-gray-50"}`}
//             >
//               <Settings className="h-5 w-5 ml-2" />
//               <span>الإعدادات</span>
//             </button>
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           {/* Profile Tab */}
//           {activeTab === "profile" && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   المعلومات الشخصية
//                 </h2>
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors text-sm"
//                 >
//                   <Edit className="h-4 w-4 ml-1" />
//                   {isEditing ? "إلغاء" : "تعديل المعلومات"}
//                 </button>
//               </div>

//               {isEditing ? (
//                 <form
//                   onSubmit={handleSubmit}
//                   className="space-y-6"
//                   encType="multipart/form-data"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="text-sm text-gray-600 block mb-1">
//                         الاسم
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={updatedUser.name}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600 block mb-1">
//                         البريد الإلكتروني
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={updatedUser.email}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600 block mb-1">
//                         رقم الهاتف
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={updatedUser.phone}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         placeholder="+962 7X XXX XXXX"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600 block mb-1">
//                         العنوان
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={updatedUser.address}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         placeholder="المدينة، المنطقة"
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="text-sm text-gray-600 block mb-1">
//                         الصورة الشخصية
//                       </label>
//                       <input
//                         type="file"
//                         name="profilePicture"
//                         onChange={handleFileChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         accept="image/*"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       type="submit"
//                       className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md transition-colors"
//                     >
//                       حفظ التغييرات
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <label className="text-sm text-gray-500">الاسم</label>
//                     <p className="font-medium text-gray-800">{user.name}</p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <label className="text-sm text-gray-500">
//                       البريد الإلكتروني
//                     </label>
//                     <p className="font-medium text-gray-800">{user.email}</p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <label className="text-sm text-gray-500">رقم الهاتف</label>
//                     <p className="font-medium text-gray-800">{user.phone || "غير محدد"}</p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <label className="text-sm text-gray-500">
//                       العنوان
//                     </label>
//                     <p className="font-medium text-gray-800">{user.address || "غير محدد"}</p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <label className="text-sm text-gray-500">
//                       تاريخ الانضمام
//                     </label>
//                     <p className="font-medium text-gray-800">
//                       {new Date(user.createdAt).toLocaleDateString("ar-EG")}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Favorites Tab */}
//           {activeTab === "favorites" && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                 المعدات المفضلة
//               </h2>
              
//               {favorites.length === 0 ? (
//                 <div className="text-center py-10 bg-gray-50 rounded-lg">
//                   <Heart className="mx-auto h-12 w-12 text-gray-300 mb-3" />
//                   <p className="text-gray-600 mb-2">لا توجد معدات مفضلة</p>
//                   <p className="text-gray-500 text-sm">يمكنك إضافة المعدات إلى المفضلة بالضغط على زر القلب</p>
//                   <Link to="/equipment" className="inline-block mt-4 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
//                     استعرض المعدات المتاحة
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {favorites.map((item) => (
//                     <div key={item._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//                       <div className="relative h-48 overflow-hidden">
//                         <img
//                           src={`http://localhost:5000/${item.mainImage}`}
//                           alt={item.title}
//                           className="w-full h-full object-cover"
//                         />
//                         <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-2 py-1 m-2 rounded">
//                           {item.condition}
//                         </div>
//                         <button
//                           onClick={() => handleRemoveFavorite(item._id)}
//                           className="absolute top-0 left-0 p-2 m-2 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-colors"
//                         >
//                           <Heart className="h-5 w-5" fill="currentColor" />
//                         </button>
//                       </div>
                      
//                       <div className="p-4">
//                         <Link to={`/equipment/${item._id}`}>
//                           <h3 className="font-bold text-lg mb-2 hover:text-amber-500 transition-colors line-clamp-1">
//                             {item.title}
//                           </h3>
//                         </Link>
                        
//                         <div className="flex items-center text-sm text-gray-600 mb-2">
//                           <Truck className="h-4 w-4 ml-1 text-amber-500" />
//                           <span>{item.manufacturer} {item.model}</span>
//                         </div>
                        
//                         <div className="flex justify-between items-center mb-3">
//                           <div className="flex items-center">
//                             <MapPin className="h-4 w-4 ml-1 text-amber-500" />
//                             <span className="text-sm">{item.location}</span>
//                           </div>
//                           <div className="flex items-center">
//                             <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
//                             <span className="font-medium">{item.averageRating || "4.5"}</span>
//                           </div>
//                         </div>
                        
//                         <div className="flex justify-between items-center">
//                           <div className="text-amber-500 font-bold">
//                             {item.dailyRate} دينار<span className="text-xs text-gray-500 mr-1">/ يوم</span>
//                           </div>
//                           <Link to={`/equipment/${item._id}`} className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition-colors">
//                             عرض التفاصيل
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Rentals Tab */}
//           {activeTab === "rentals" && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                 سجل التأجير
//               </h2>
              
//               {rentalHistory.length === 0 ? (
//                 <div className="text-center py-10 bg-gray-50 rounded-lg">
//                   <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
//                   <p className="text-gray-600 mb-2">لا يوجد سجل تأجير حتى الآن</p>
//                   <p className="text-gray-500 text-sm">ستظهر هنا المعدات التي قمت بتأجيرها</p>
//                   <Link to="/equipment" className="inline-block mt-4 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
//                     استعرض المعدات المتاحة
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           المعدات
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           تاريخ البدء
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           تاريخ الانتهاء
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           المبلغ
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           الحالة
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           الخيارات
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {/* بيانات توضيحية فقط - في التطبيق الفعلي ستأتي من الخادم */}
//                       <tr>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img className="h-10 w-10 rounded-md object-cover" src="/img/placeholder.jpg" alt="" />
//                             </div>
//                             <div className="mr-4">
//                               <div className="text-sm font-medium text-gray-900">حفارة هيدروليكية كاتربيلر 320D</div>
//                               <div className="text-sm text-gray-500">شركة المعدات الثقيلة</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">15/03/2025</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">22/03/2025</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-bold text-amber-500">850 دينار</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                             مكتمل
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
//                           <button className="text-amber-500 hover:text-amber-600">تقييم</button>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img className="h-10 w-10 rounded-md object-cover" src="/img/placeholder.jpg" alt="" />
//                             </div>
//                             <div className="mr-4">
//                               <div className="text-sm font-medium text-gray-900">مولد كهربائي 100 كيلو واط</div>
//                               <div className="text-sm text-gray-500">مؤسسة الطاقة للمعدات</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">05/03/2025</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">12/03/2025</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-bold text-amber-500">700 دينار</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                             نشط
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
//                           <button className="text-amber-500 hover:text-amber-600">تفاصيل</button>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Settings Tab */}
//           {activeTab === "settings" && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                 إعدادات الحساب
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-800 mb-4">تغيير كلمة المرور</h3>
//                   <form className="space-y-4">
//                     <div>
//                       <label className="text-sm text-gray-600 block mb-1">
//                         كلمة المرور الحالية
//                       </label>
//                       <input
//                         type="password"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         placeholder="أدخل كلمة المرور الحالية"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600 block mb-1">
//                         كلمة المرور الجديدة
//                       </label>
//                       <input
//                         type="password"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         placeholder="أدخل كلمة المرور الجديدة"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600 block mb-1">
//                         تأكيد كلمة المرور الجديدة
//                       </label>
//                       <input
//                         type="password"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         placeholder="أعد إدخال كلمة المرور الجديدة"
//                         required
//                       />
//                     </div>
//                     <button 
//                       type="submit"
//                       className="w-full bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-md transition-colors"
//                     >
//                       تغيير كلمة المرور
//                     </button>
//                   </form>
//                 </div>
                
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-800 mb-4">إعدادات الإشعارات</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <label className="text-gray-700">إشعارات البريد الإلكتروني</label>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input type="checkbox" className="sr-only peer" defaultChecked />
//                         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
//                       </label>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <label className="text-gray-700">إشعارات SMS</label>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input type="checkbox" className="sr-only peer" />
//                         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
//                       </label>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <label className="text-gray-700">إشعارات العروض الخاصة</label>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input type="checkbox" className="sr-only peer" defaultChecked />
//                         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
//                       </label>
//                     </div>
//                     <button 
//                       type="button"
//                       className="w-full bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-md transition-colors mt-2"
//                     >
//                       حفظ الإعدادات
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-50 p-6 rounded-lg md:col-span-2">
//                   <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     حذف الحساب
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     سيؤدي حذف حسابك إلى إزالة جميع بياناتك الشخصية من نظامنا. لا يمكن التراجع عن هذا الإجراء.
//                   </p>
//                   <button 
//                     type="button"
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
//                   >
//                     حذف الحساب
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer rtl={true} />
//     </div>
//   );
// };

// export default UserProfile;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  MapPin,
  Phone,
  LogOut,
  Edit,
  Heart,
  Clock,
  Truck,
  Star,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // قائمة المفضلة
  const [favorites, setFavorites] = useState([]);
  // سجل التأجير
  const [rentalHistory, setRentalHistory] = useState([]);

  // تفعيل التبويبات
  const [activeTab, setActiveTab] = useState("profile");

  // بيانات المستخدم التي يمكن تعديلها
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: null,
  });

  // إعداد الإشعارات: افترضنا خيارين (بريد إلكتروني + إشعارات التطبيق)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);

  useEffect(() => {
    // جلب بيانات المستخدم
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
        // تعبئة الحقول
        setUpdatedUser({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phoneNumber || "",
          address: res.data.user.address || "",
          profilePicture: res.data.user.profilePicture,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "فشل في جلب بيانات المستخدم");
      } finally {
        setLoading(false);
      }
    };

    // جلب المفضلة
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/favorites", {
          withCredentials: true,
        });
        setFavorites(res.data);
      } catch (error) {
        console.error("خطأ في جلب المفضلة:", error);
      }
    };

    // جلب سجل التأجير
    const fetchRentalHistory = async () => {
      try {
        // تأكد من وجود هذا المسار في الباك اند
        const res = await axios.get("http://localhost:5000/api/rentals/history", {
          withCredentials: true,
        });
        setRentalHistory(res.data);
      } catch (error) {
        console.error("خطأ في جلب سجل التأجير:", error);
      }
    };

    fetchUserProfile();
    fetchFavorites();
    fetchRentalHistory();
  }, []);

  // تحديث حقول الإدخال في الحالة
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  // تغيير ملف الصورة الشخصية
  const handleFileChange = (e) => {
    setUpdatedUser((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  // حفظ التعديلات
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    // لاحظ: phone -> phoneNumber لأن في المودل والدالة اسمه phoneNumber
    formData.append("phoneNumber", updatedUser.phone);
    formData.append("address", updatedUser.address);

    if (updatedUser.profilePicture && updatedUser.profilePicture instanceof File) {
      formData.append("profilePicture", updatedUser.profilePicture);
    }

    try {
      const res = await axios.put("http://localhost:5000/api/users/profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      setIsEditing(false);
      toast.success("تم تحديث المعلومات بنجاح");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في تحديث المعلومات");
    }
  };

  // إزالة معدة من المفضلة
  const handleRemoveFavorite = async (equipmentId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/toggle-favorite",
        { equipmentId },
        { withCredentials: true }
      );
      setFavorites(favorites.filter((item) => item._id !== equipmentId));
      toast.success("تمت إزالة المعدات من المفضلة");
    } catch (error) {
      toast.error("فشل في إزالة المعدات من المفضلة");
    }
  };

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      window.location.href = "/auth";
    } catch (error) {
      toast.error("فشل في تسجيل الخروج");
    }
  };

  // حذف الحساب
  const handleDeleteAccount = async () => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف حسابك نهائيًا؟ لا يمكن التراجع.")) {
      return;
    }
    try {
      await axios.delete("http://localhost:5000/api/users/delete", {
        withCredentials: true,
      });
      toast.success("تم حذف الحساب بنجاح.");
      // إعادة توجيه أو تحديث الصفحة
      window.location.href = "/auth"; // أو إلى صفحة رئيسية
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في حذف الحساب");
    }
  };

  // تحكم في تحميل الصفحة
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-700">
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
          جاري التحميل...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* الهيدر */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-lg px-6 py-8">
            <div className="flex flex-col md:flex-row items-center">
              {user.profilePicture ? (
                <img
                  src={`http://localhost:5000${user.profilePicture}`}
                  alt="الصورة الشخصية"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-md">
                  <User className="h-16 w-16 text-amber-500" />
                </div>
              )}
              <div className="mt-4 md:mt-0 md:mr-6 text-center md:text-right flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-white">{user.email}</p>
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-full text-sm">
                    <Star className="ml-1 h-4 w-4" />
                    زبون عادي
                  </span>
                  {/* رقم الهاتف */}
                  {user.phoneNumber && (
                    <span className="inline-flex items-center px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-full text-sm">
                      <Phone className="ml-1 h-4 w-4" />
                      {user.phoneNumber}
                    </span>
                  )}
                  {/* العنوان */}
                  {user.address && (
                    <span className="inline-flex items-center px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-full text-sm">
                      <MapPin className="ml-1 h-4 w-4" />
                      {user.address}
                    </span>
                  )}
                </div>
              </div>
              {/* زر تسجيل الخروج */}
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-white text-amber-500 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5 ml-2" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* تبويبات الملاحة */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-3">
          <div className="flex flex-wrap overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === "profile"
                  ? "bg-amber-50 text-amber-500 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <User className="h-5 w-5 ml-2" />
              <span>الملف الشخصي</span>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === "favorites"
                  ? "bg-amber-50 text-amber-500 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Heart className="h-5 w-5 ml-2" />
              <span>المفضلة</span>
              <span className="mr-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {favorites.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("rentals")}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === "rentals"
                  ? "bg-amber-50 text-amber-500 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Clock className="h-5 w-5 ml-2" />
              <span>سجل التأجير</span>
              <span className="mr-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {rentalHistory.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === "settings"
                  ? "bg-amber-50 text-amber-500 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Settings className="h-5 w-5 ml-2" />
              <span>الإعدادات</span>
            </button>
          </div>
        </div>

        {/* محتوى التبويبات */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* التبويب الأول: الملف الشخصي */}
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">المعلومات الشخصية</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors text-sm"
                >
                  <Edit className="h-4 w-4 ml-1" />
                  {isEditing ? "إلغاء" : "تعديل المعلومات"}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">الاسم</label>
                      <input
                        type="text"
                        name="name"
                        value={updatedUser.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">البريد الإلكتروني</label>
                      <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">رقم الهاتف</label>
                      <input
                        type="tel"
                        name="phone"
                        value={updatedUser.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="+962 7X XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">العنوان</label>
                      <input
                        type="text"
                        name="address"
                        value={updatedUser.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="المدينة، المنطقة"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-600 block mb-1">الصورة الشخصية</label>
                      <input
                        type="file"
                        name="profilePicture"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md transition-colors"
                    >
                      حفظ التغييرات
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">الاسم</label>
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">البريد الإلكتروني</label>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">رقم الهاتف</label>
                    <p className="font-medium text-gray-800">{user.phoneNumber || "غير محدد"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">العنوان</label>
                    <p className="font-medium text-gray-800">{user.address || "غير محدد"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">تاريخ الانضمام</label>
                    <p className="font-medium text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* التبويب الثاني: المفضلة */}
          {activeTab === "favorites" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">المعدات المفضلة</h2>
              {favorites.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <Heart className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-600 mb-2">لا توجد معدات مفضلة</p>
                  <p className="text-gray-500 text-sm">
                    يمكنك إضافة المعدات إلى المفضلة بالضغط على زر القلب
                  </p>
                  <Link
                    to="/equipment"
                    className="inline-block mt-4 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
                  >
                    استعرض المعدات المتاحة
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={`http://localhost:5000/${item.mainImage}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-2 py-1 m-2 rounded">
                          {item.condition}
                        </div>
                        <button
                          onClick={() => handleRemoveFavorite(item._id)}
                          className="absolute top-0 left-0 p-2 m-2 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Heart className="h-5 w-5" fill="currentColor" />
                        </button>
                      </div>
                      <div className="p-4">
                        <Link to={`/equipment/${item._id}`}>
                          <h3 className="font-bold text-lg mb-2 hover:text-amber-500 transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Truck className="h-4 w-4 ml-1 text-amber-500" />
                          <span>
                            {item.manufacturer} {item.model}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 ml-1 text-amber-500" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium">{item.averageRating || "4.5"}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-amber-500 font-bold">
                            {item.dailyRate} دينار
                            <span className="text-xs text-gray-500 mr-1">/ يوم</span>
                          </div>
                          <Link
                            to={`/equipment/${item._id}`}
                            className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition-colors"
                          >
                            عرض التفاصيل
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* التبويب الثالث: سجل التأجير */}
          {activeTab === "rentals" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">سجل التأجير</h2>
              {rentalHistory.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-600 mb-2">لا يوجد سجل تأجير حتى الآن</p>
                  <p className="text-gray-500 text-sm">ستظهر هنا المعدات التي قمت بتأجيرها</p>
                  <Link
                    to="/equipment"
                    className="inline-block mt-4 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
                  >
                    استعرض المعدات المتاحة
                  </Link>
                </div>
              ) : (
                // جدول يعرض بيانات التأجير
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المعدات
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ البدء
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ الانتهاء
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المبلغ
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الخيارات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rentalHistory.map((rental) => (
                        <tr key={rental._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={`/uploads/${rental.equipmentImage || "placeholder.jpg"}`}
                                  alt=""
                                />
                              </div>
                              <div className="mr-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {rental.equipmentName}
                                </div>
                                <div className="text-sm text-gray-500">{rental.manufacturer}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(rental.startDate).toLocaleDateString("ar-EG")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(rental.endDate).toLocaleDateString("ar-EG")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-amber-500">
                              {rental.totalPrice} دينار
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rental.status === "completed" ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                مكتمل
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                نشط
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                            <button className="text-amber-500 hover:text-amber-600">تفاصيل</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* التبويب الرابع: الإعدادات */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">إعدادات الحساب</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* إعدادات الإشعارات */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">إعدادات الإشعارات</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-gray-700">إشعارات البريد الإلكتروني</label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-700">إشعارات التطبيق</label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={appNotifications}
                          onChange={(e) => setAppNotifications(e.target.checked)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                    <button
                      type="button"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-md transition-colors mt-2"
                      onClick={() => toast.success("تم حفظ إعدادات الإشعارات.")}
                    >
                      حفظ الإعدادات
                    </button>
                  </div>
                </div>

                {/* حذف الحساب */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 ml-2 text-red-500" />
                    حذف الحساب
                  </h3>
                  <p className="text-gray-600 mb-4">
                    سيؤدي حذف حسابك إلى إزالة جميع بياناتك الشخصية من نظامنا. لا يمكن التراجع عن هذا الإجراء.
                  </p>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={handleDeleteAccount}
                  >
                    حذف الحساب
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer rtl={true} />
    </div>
  );
};

export default UserProfile;
