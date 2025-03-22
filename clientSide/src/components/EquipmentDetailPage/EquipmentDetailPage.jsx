


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import { Calendar, Wrench, DollarSign, Clock, MapPin, Star, Phone, Truck, Share2, MessageSquare, BookOpen } from 'lucide-react';

// export default function EquipmentDetailPage() {
//   const { id } = useParams();
//   const [equipment, setEquipment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [review, setReview] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [email, setEmail] = useState("");
//   const [showRentalRequest, setShowRentalRequest] = useState(false);

//   // عدد التقييمات وعدد النجوم الخاص بالمستخدم
//   const [ratingCount, setRatingCount] = useState(12);
//   const [userRating, setUserRating] = useState(0);
//   const [tempRating, setTempRating] = useState(0);
//   const [averageRating, setAverageRating] = useState(4.2);

//   // عرض المشاهدات والتقييمات وعدد المراجعات
//   const [viewCount, setViewCount] = useState(86);
//   const [reviewsCount, setReviewsCount] = useState(8);

//   // معلومات المستخدم
//   const [userId, setUserId] = useState(null);

//   // صور المعدة
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(false);

//   // معدات مشابهة
//   const [similarEquipment, setSimilarEquipment] = useState([]);

//   // جلب بيانات الصفحة عند تغيير الـ id
//   useEffect(() => {
//     fetchReviews();
//     fetchEquipment();
//     getUserId();
//     incrementViewCount();
//   }, [id]);

//   // جلب التقييمات
//   const fetchReviews = async () => {
//     try {
//       // استبدل المسار حسب ما عرّفته في الباك اند
//       const response = await axios.get(`http://localhost:5000/api/equipment/${id}/reviews`);
//       const approvedReviews = response.data;
//       setReviews(approvedReviews);
//       setReviewsCount(approvedReviews.length);
//     } catch (error) {
//       console.error("❌ خطأ في جلب التقييمات:", error);
//     }
//   };

//   // جلب بيانات المعدة
//   const fetchEquipment = async () => {
//     try {
//       const equipmentResponse = await axios.get(`http://localhost:5000/api/equipment/${id}`);
//       setEquipment(equipmentResponse.data);
//       setSelectedImage(equipmentResponse.data.mainImage);
//       fetchSimilarEquipment(equipmentResponse.data.category);
//     } catch (error) {
//       console.error("❌ خطأ في جلب بيانات المعدات:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // جلب معدات مشابهة بناءً على التصنيف
//   const fetchSimilarEquipment = async (category) => {
//     try {
//       // مسار افتراضي. تأكد من وجوده في الباك اند إن كنت تستخدمه
//       const response = await axios.get(`http://localhost:5000/api/equipment/category/${category}?limit=3`);
//       const filtered = response.data.filter(item => item._id !== id);
//       setSimilarEquipment(filtered.slice(0, 3));
//     } catch (error) {
//       console.error("❌ خطأ في جلب المعدات المشابهة:", error);
//     }
//   };

//   // زيادة عدد المشاهدات
//   const incrementViewCount = async () => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/equipment/${id}/view`);
//       if (response.data.views !== undefined) {
//         setViewCount(response.data.views);
//       }
//     } catch (error) {
//       console.error("خطأ في تحديث عدد المشاهدات:", error);
//     }
//   };

//   // جلب معرف المستخدم المسجّل حاليًا
//   const getUserId = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users/get-user", {
//         withCredentials: true,
//       });
//       if (res.data?.userId) {
//         console.log("✅ تم استلام معرف المستخدم:", res.data.userId);
//         setUserId(res.data.userId);
//         setEmail(res.data.email);
//         fetchUserRating(res.data.userId);
//       } else {
//         console.log("⚠ لم يتم العثور على معرف المستخدم (ربما لم يتم تسجيل الدخول)");
//       }
//     } catch (error) {
//       console.warn("❌ خطأ في جلب بيانات المستخدم (ربما لم يتم تسجيل الدخول):", error.response?.data || error.message);
//     }
//   };

//   // (اختياري) جلب تقييم المستخدم الخاص لتحديد عدد النجوم إن كان موجودًا
//   const fetchUserRating = async (userId) => {
//     try {
//       // يمكن أن تحتاج مسارًا منفصلًا يتحقق من تقييم المستخدم السابق
//       // هذا مجرد مثال توضيحي:
//       const response = await axios.get(`http://localhost:5000/api/ratings/${id}/${userId}`);
//       if (response.data && response.data.rating) {
//         setUserRating(response.data.rating);
//       }
//     } catch (error) {
//       console.error("❌ خطأ في جلب تقييم المستخدم:", error);
//     }
//   };

//   // إرسال التعليق + التقييم إلى السيرفر
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     if (!review.trim()) return;
//     try {
//       if (!userId) {
//         toast.error("يجب تسجيل الدخول لإضافة تقييم.");
//         return;
//       }
//       // استبدل المسار بما يناسب مشروعك
//       await axios.post(`http://localhost:5000/api/equipment/${id}/rate`, {
//         userId: userId,
//         content: review,
//         rating: userRating
//       });
//       toast.success("تم إرسال تقييمك بنجاح."); 
//       setReview("");
//       // بعد الإرسال نعيد جلب التقييمات لتظهر فوريًا
//       fetchReviews();
//     } catch (error) {
//       console.error("❌ خطأ أثناء إضافة التقييم:", error.response ? error.response.data : error.message);
//       toast.error("حدث خطأ أثناء إضافة التقييم."); 
//     }
//   };

//   // تسجيل تقييم النجوم فقط (إذا احتجت ذلك منفصلًا عن التعليق)
//   const submitRating = async (rating) => {
//     if (!userId) {
//       toast.error("يجب تسجيل الدخول لتقييم المعدات.");
//       return;
//     }
//     setUserRating(rating);
//     try {
//       // نفس المسار الخاص بالتقييم
//       const response = await axios.post(`http://localhost:5000/api/equipment/${id}/rate`, {
//         userId: userId,
//         rating: rating,
//         content: "" // أو قد تُرسل التعليق كذلك
//       });
//       if (response.data.averageRating !== undefined) {
//         setAverageRating(response.data.averageRating);
//         setRatingCount(response.data.ratingsCount);
//       }
//       toast.success("تم تسجيل تقييمك بنجاح!");
//     } catch (error) {
//       console.error("خطأ في تسجيل التقييم:", error);
//       toast.error("حدث خطأ أثناء تسجيل التقييم.");
//     }
//   };

//   // مشاركة الصفحة
//   const handleShare = async (platform) => {
//     const url = window.location.href;
//     const title = equipment?.title || "";
//     const text = equipment?.description ? equipment.description.substring(0, 100) : "";

//     switch (platform) {
//       case "facebook":
//         window.open(
//           `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
//           "_blank"
//         );
//         break;
//       case "linkedin":
//         window.open(
//           `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`,
//           "_blank"
//         );
//         break;
//       case "whatsapp":
//         window.open(
//           `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + url)}`,
//           "_blank"
//         );
//         break;
//       default:
//         break;
//     }
//   };

//   // طلب التواصل (مثال باستخدام sweetalert)
//   const handleContactRequest = () => {
//     Swal.fire({
//       title: 'طلب التواصل',
//       html: `
//         <div class="text-right" dir="rtl">
//           <p class="mb-4">سنقوم بالاتصال بك في أقرب وقت ممكن. الرجاء ترك رقم هاتفك:</p>
//           <input id="phone" class="w-full p-2 border rounded-md text-right" placeholder="رقم الهاتف" />
//         </div>
//       `,
//       confirmButtonText: 'إرسال',
//       confirmButtonColor: '#F59E0B',
//       showCancelButton: true,
//       cancelButtonText: 'إلغاء',
//       focusConfirm: false,
//       preConfirm: () => {
//         const phone = Swal.getPopup().querySelector('#phone').value;
//         if (!phone) {
//           Swal.showValidationMessage('الرجاء إدخال رقم الهاتف');
//         }
//         return { phone: phone };
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         toast.success("تم إرسال طلب التواصل بنجاح. سنتصل بك قريباً!");
//       }
//     });
//   };

//   // الإبلاغ عن تعليق
//   const handleReportReview = async (reviewId) => {
//     const { value: reason } = await Swal.fire({
//       title: 'الإبلاغ عن تقييم',
//       input: 'textarea',
//       inputLabel: 'سبب البلاغ',
//       inputPlaceholder: 'اكتب سبب البلاغ هنا...',
//       confirmButtonText: 'إرسال',
//       confirmButtonColor: '#F59E0B',
//       showCancelButton: true,
//       cancelButtonText: 'إلغاء',
//       inputValidator: (value) => {
//         if (!value) {
//           return 'يجب إدخال سبب البلاغ';
//         }
//       }
//     });
  
//     if (!reason) {
//       return; 
//     }
  
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/reviews/report/${reviewId}`,
//         { reason }
//       );
      
//       if (response.status === 200) {
//         toast.success("تم إرسال البلاغ بنجاح. سيتم مراجعته من قبل المسؤول.");
//         fetchReviews(); 
//       }
//     } catch (error) {
//       toast.error("حدث خطأ أثناء الإبلاغ عن التقييم.");
//       console.log(error);
//     }
//   };

//   // في حال كان هناك تحميل
//   if (loading) {
//     return <div className="text-center p-10 text-xl">جارٍ تحميل المعلومات...</div>;
//   }
//   // في حال لم نجد المعدات المطلوبة
//   if (!equipment) {
//     return <div className="text-center p-10 text-red-500 text-xl">المعدات غير موجودة</div>;
//   }

//   // دالة رسم النجوم
//   const renderStars = (rating, setRatingFn = null, hover = null, setHover = null) => {
//     return (
//       <div className="flex items-center">
//         {[...Array(5)].map((_, index) => {
//           const ratingValue = index + 1;
//           return (
//             <div
//               key={index}
//               className={`${setRatingFn ? "cursor-pointer" : ""} text-xl mx-1`}
//               onClick={() => setRatingFn && submitRating(ratingValue)}
//               onMouseEnter={() => setHover && setHover(ratingValue)}
//               onMouseLeave={() => setHover && setHover(0)}
//             >
//               <Star
//                 className={`h-6 w-6 ${
//                   ratingValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
//                 }`}
//               />
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-6xl" dir="rtl">
//       {/* فئة المعدات */}
//       <div className="mb-4 text-sm text-gray-500 flex gap-2">
//         <span>المعدات</span>
//         <span>|</span>
//         <span>{equipment.category || "غير محدد"}</span>
//       </div>

//       {/* قسم رئيسي */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
//         {/* معرض الصور */}
//         <div className="lg:col-span-2">
//           <div className="mb-4">
//             <div 
//               className="w-full h-96 overflow-hidden rounded-lg shadow-md cursor-pointer relative"
//               onClick={() => setShowImageModal(true)}
//             >
//               <img
//                 src={`http://localhost:5000/${selectedImage || equipment.mainImage}`}
//                 alt={equipment.title}
//                 className="w-full h-full object-contain bg-gray-100"
//               />
//               <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-sm">
//                 {equipment.condition}
//               </div>
//             </div>
//           </div>
          
//           {/* الصور المصغرة */}
//           <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
//             <div 
//               className={`flex-shrink-0 w-24 h-24 cursor-pointer rounded-md overflow-hidden ${selectedImage === equipment.mainImage ? 'ring-2 ring-amber-500' : 'ring-1 ring-gray-200'}`}
//               onClick={() => setSelectedImage(equipment.mainImage)}
//             >
//               <img
//                 src={`http://localhost:5000/${equipment.mainImage}`}
//                 alt={equipment.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {equipment.additionalImages && equipment.additionalImages.map((image, index) => (
//               <div 
//                 key={index}
//                 className={`flex-shrink-0 w-24 h-24 cursor-pointer rounded-md overflow-hidden ${selectedImage === image ? 'ring-2 ring-amber-500' : 'ring-1 ring-gray-200'}`}
//                 onClick={() => setSelectedImage(image)}
//               >
//                 <img
//                   src={`http://localhost:5000/${image}`}
//                   alt={`${equipment.title} - صورة ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* عنوان المعدات والتقييم */}
//           <div className="mb-6">
//             <div className="flex justify-between items-start">
//               <h1 className="text-3xl font-bold text-gray-800 leading-tight">{equipment.title}</h1>
//               <div className="text-right">
//                 <div className="flex items-center mb-1">
//                   {renderStars(averageRating)}
//                   <span className="mr-2 text-amber-500 font-bold">{averageRating.toFixed(1)}</span>
//                 </div>
//                 <span className="text-sm text-gray-500">{ratingCount} تقييم</span>
//               </div>
//             </div>
//           </div>

//           {/* وصف المعدات */}
//           <div className="bg-gray-50 p-6 rounded-lg mb-8">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-amber-500" />
//               <span>الوصف</span>
//             </h2>
//             <div className="text-gray-700 leading-relaxed">
//               <p>{equipment.description}</p>
//             </div>
//           </div>

//           {/* المواصفات الفنية */}
//           <div className="bg-gray-50 p-6 rounded-lg mb-8">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Wrench className="h-5 w-5 text-amber-500" />
//               <span>المواصفات الفنية</span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <ul className="space-y-3">
//                   <li className="flex items-center justify-between border-b pb-2">
//                     <span className="text-gray-500">المصنع:</span>
//                     <span className="font-medium">{equipment.manufacturer}</span>
//                   </li>
//                   <li className="flex items-center justify-between border-b pb-2">
//                     <span className="text-gray-500">الموديل:</span>
//                     <span className="font-medium">{equipment.model}</span>
//                   </li>
//                   <li className="flex items-center justify-between border-b pb-2">
//                     <span className="text-gray-500">سنة الصنع:</span>
//                     <span className="font-medium">{equipment.year}</span>
//                   </li>
//                   <li className="flex items-center justify-between border-b pb-2">
//                     <span className="text-gray-500">الحالة:</span>
//                     <span className="font-medium">{equipment.condition}</span>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-2">المواصفات الإضافية:</h3>
//                 <div className="text-gray-700">
//                   {equipment.technicalSpecs}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* المميزات */}
//           {equipment.features && equipment.features.length > 0 && (
//             <div className="bg-gray-50 p-6 rounded-lg mb-8">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">المميزات</h2>
//               <div className="flex flex-wrap gap-2">
//                 {equipment.features.map((feature, index) => (
//                   <span 
//                     key={index}
//                     className="inline-block bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
//                   >
//                     {feature}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
          
//           {/* شروط وأحكام التأجير */}
//           <div className="bg-gray-50 p-6 rounded-lg mb-8">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Calendar className="h-5 w-5 text-amber-500" />
//               <span>شروط وأحكام التأجير</span>
//             </h2>
//             <div className="text-gray-700 leading-relaxed">
//               <p>{equipment.rentalTerms || "لا توجد شروط إضافية محددة."}</p>
//             </div>
//           </div>
          
//           {/* بار الإحصائيات */}
//           <div className="flex items-center justify-between mb-8 py-3 px-4 bg-gray-50 rounded-lg">
//             <div className="flex items-center space-x-8 space-x-reverse">
//               <div className="flex items-center">
//                 <Clock className="h-5 w-5 text-gray-500 ml-1" />
//                 <span className="text-gray-600">الحد الأدنى للتأجير: {equipment.minRentalDays} يوم</span>
//               </div>
//               <div className="flex items-center">
//                 <MapPin className="h-5 w-5 text-gray-500 ml-1" />
//                 <span className="text-gray-600">{equipment.location}</span>
//               </div>
//               <div className="flex items-center">
//                 <Truck className="h-5 w-5 text-gray-500 ml-1" />
//                 <span className="text-gray-600">{equipment.deliveryOptions}</span>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4 space-x-reverse">
//               <button
//                 onClick={() => handleShare('whatsapp')}
//                 className="flex items-center text-gray-600 hover:text-green-600"
//               >
//                 <Share2 className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => handleShare('facebook')}
//                 className="flex items-center text-gray-600 hover:text-blue-600"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* قسم جانبي - معلومات السعر والحجز */}
//         <div className="lg:col-span-1">
//           {/* بطاقة التسعير */}
//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6 sticky top-4">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <DollarSign className="h-5 w-5 text-amber-500" />
//               <span>أسعار التأجير</span>
//             </h2>
            
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between items-center pb-2 border-b">
//                 <span className="text-gray-700">سعر التأجير اليومي:</span>
//                 <span className="font-bold text-lg text-amber-500">{equipment.dailyRate} دينار</span>
//               </div>
              
//               {equipment.weeklyRate && (
//                 <div className="flex justify-between items-center pb-2 border-b">
//                   <span className="text-gray-700">سعر التأجير الأسبوعي:</span>
//                   <span className="font-bold">{equipment.weeklyRate} دينار</span>
//                 </div>
//               )}
              
//               {equipment.monthlyRate && (
//                 <div className="flex justify-between items-center pb-2 border-b">
//                   <span className="text-gray-700">سعر التأجير الشهري:</span>
//                   <span className="font-bold">{equipment.monthlyRate} دينار</span>
//                 </div>
//               )}
              
//               <div className="flex justify-between items-center pb-2 border-b">
//                 <span className="text-gray-700">مبلغ التأمين:</span>
//                 <span className="font-bold">{equipment.depositAmount} دينار</span>
//               </div>
//             </div>
            
//             <div className="space-y-3 mb-6">
//               <button
//                 onClick={() => setShowRentalRequest(true)}
//                 className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md transition duration-200"
//               >
//                 طلب تأجير
//               </button>
              
//               <button
//                 onClick={handleContactRequest}
//                 className="w-full bg-white hover:bg-gray-50 text-amber-500 font-bold py-3 px-4 rounded-md border border-amber-500 transition duration-200 flex justify-center items-center gap-2"
//               >
//                 <Phone className="h-5 w-5" />
//                 <span>طلب تواصل</span>
//               </button>
//             </div>
            
//             {/* معلومات المؤجر */}
//             <div className="pt-4 border-t">
//               <h3 className="font-bold text-gray-800 mb-2">معلومات المؤجر</h3>
//               <div className="flex items-center mb-4">
//                 <div className="ml-3">
//                   <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
//                     {equipment.ownerId?.name ? equipment.ownerId.name.charAt(0).toUpperCase() : null}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="font-medium">{equipment.ownerId?.name || "المعدات الذهبية"}</p>
//                   <p className="text-xs text-gray-500">عضو منذ {equipment.ownerId?.createdAt ? new Date(equipment.ownerId.createdAt).toLocaleDateString() : "2023"}</p>
//                 </div>
//               </div>
//               <div className="text-sm text-gray-600">
//                 <p>نسبة الرد: 98%</p>
//                 <p>وقت الرد: خلال ساعتين</p>
//               </div>
//             </div>
//           </div>
          
//           {/* بطاقة الموقع */}
//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
//             <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//               <MapPin className="h-5 w-5 text-amber-500" />
//               <span>الموقع</span>
//             </h2>
//             <p className="text-gray-700 mb-3">{equipment.location}</p>
//             <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center">
//               <span className="text-gray-500">خريطة الموقع</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* معدات مشابهة */}
//       {similarEquipment.length > 0 && (
//         <div className="mb-10">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">معدات مشابهة</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {similarEquipment.map((item) => (
//               <div key={item._id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//                 <div className="h-48 overflow-hidden">
//                   <img
//                     src={`http://localhost:5000/${item.mainImage}`}
//                     alt={item.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
//                   <div className="flex justify-between items-center">
//                     <span className="text-amber-500 font-bold">{item.dailyRate} دينار / يوم</span>
//                     <div className="flex items-center">
//                       <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
//                       <span className="text-sm">{item.averageRating || 4.0}</span>
//                     </div>
//                   </div>
//                   <Link
//                     to={`/equipment/${item._id}`}
//                     className="block mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 rounded-md transition duration-200"
//                   >
//                     عرض التفاصيل
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* قسم التقييمات */}
//       <div className="mb-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">التقييمات</h2>
//         <div className="space-y-4">
//           {reviews.length > 0 ? (
//             reviews.map((rev) => (
//               <div key={rev._id} className="bg-white p-4 rounded-md shadow-sm">
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
//                       {rev.userId?.name ? rev.userId.name.charAt(0).toUpperCase() : "م"}
//                     </div>
//                     <div>
//                       <p className="font-semibold">{rev.userId?.name || "مستخدم"}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleReportReview(rev._id)}
//                     className="text-red-500 text-sm hover:underline"
//                   >
//                     إبلاغ
//                   </button>
//                 </div>
//                 <p className="text-gray-700 mb-2">{rev.content}</p>
//                 <div className="flex items-center">
//                   {renderStars(rev.rating)}
//                   <span className="ml-2 text-sm text-gray-500">{rev.rating.toFixed(1)}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-600">لا توجد تقييمات بعد.</p>
//           )}
//         </div>
//       </div>

//       {/* إضافة تقييم جديد */}
//       <div className="bg-white p-4 rounded-md shadow-sm">
//         <h3 className="text-lg font-bold text-gray-800 mb-4">أضف تقييمك</h3>
//         <form onSubmit={handleReviewSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">تقييمك:</label>
//             <div className="flex items-center">
//               {renderStars(userRating, setUserRating, tempRating, setTempRating)}
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">تعليقك:</label>
//             <textarea
//               className="w-full p-2 border rounded-md"
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               rows="3"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md font-bold transition duration-200"
//           >
//             إرسال
//           </button>
//         </form>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  Calendar,
  Wrench,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Phone,
  Truck,
  Share2,
  MessageSquare,
  BookOpen,
} from "lucide-react";

export default function EquipmentDetailPage() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------------
  // من بيانات المستخدم:
  const [userId, setUserId] = useState(null);

  // ----------------------------------
  // التقييمات والتعليقات
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(4.2);
  const [ratingCount, setRatingCount] = useState(12);
  const [userRating, setUserRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [viewCount, setViewCount] = useState(86);
  const [reviewsCount, setReviewsCount] = useState(8);

  // ----------------------------------
  // نموذج طلب التأجير: حالة العرض + الحقول
  const [showRentalRequest, setShowRentalRequest] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // ----------------------------------
  // صور المعدة
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // ----------------------------------
  // معدات مشابهة
  const [similarEquipment, setSimilarEquipment] = useState([]);

  // ----------------------------------
  // جلب بيانات صفحة التفاصيل عند الدخول
  useEffect(() => {
    fetchEquipment();
    fetchReviews();
    getUserIdFromServer();
    incrementViewCount();
  }, [id]);

  // جلب معرف المستخدم المسجّل حاليًا
  const getUserIdFromServer = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/get-user", {
        withCredentials: true, // لو تعتمد على الكوكيز
      });
      if (res.data?.userId) {
        setUserId(res.data.userId);
      }
    } catch (error) {
      console.warn(
        "❌ لم يتم العثور على معرف المستخدم:",
        error.response?.data || error.message
      );
    }
  };

  // جلب بيانات المعدة
  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const equipmentResponse = await axios.get(
        `http://localhost:5000/api/equipment/${id}`
      );
      setEquipment(equipmentResponse.data);
      setSelectedImage(equipmentResponse.data.mainImage);
      // جلب المعدات المشابهة
      fetchSimilarEquipment(equipmentResponse.data.category);
    } catch (error) {
      console.error("❌ خطأ في جلب بيانات المعدات:", error);
    } finally {
      setLoading(false);
    }
  };

  // جلب التقييمات
  const fetchReviews = async () => {
    try {
      // مسار وهمي لمراجعات هذه المعدة
      const response = await axios.get(
        `http://localhost:5000/api/equipment/${id}/reviews`
      );
      const approvedReviews = response.data;
      setReviews(approvedReviews);
      setReviewsCount(approvedReviews.length);
    } catch (error) {
      console.error("❌ خطأ في جلب التقييمات:", error);
    }
  };

  // جلب معدات مشابهة بناءً على التصنيف
  const fetchSimilarEquipment = async (category) => {
    try {
      // مسار وهمي للمعدات حسب التصنيف
      const response = await axios.get(
        `http://localhost:5000/api/equipment/category/${category}?limit=3`
      );
      const filtered = response.data.filter((item) => item._id !== id);
      setSimilarEquipment(filtered.slice(0, 3));
    } catch (error) {
      console.error("❌ خطأ في جلب المعدات المشابهة:", error);
    }
  };

  // زيادة عدد المشاهدات
  const incrementViewCount = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/equipment/${id}/view`
      );
      if (response.data.views !== undefined) {
        setViewCount(response.data.views);
      }
    } catch (error) {
      console.error("خطأ في تحديث عدد المشاهدات:", error);
    }
  };

  // ----------------------------------
  // إرسال التقييم
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    if (!userId) {
      toast.error("يجب تسجيل الدخول لإضافة تقييم.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/equipment/${id}/rate`, {
        userId: userId,
        content: review,
        rating: userRating,
      });
      toast.success("تم إرسال تقييمك بنجاح.");
      setReview("");
      fetchReviews();
    } catch (error) {
      console.error("❌ خطأ أثناء إضافة التقييم:", error);
      toast.error("حدث خطأ أثناء إضافة التقييم.");
    }
  };

  // إرسال تقييم النجوم فقط
  const submitRating = async (rating) => {
    if (!userId) {
      toast.error("يجب تسجيل الدخول لتقييم المعدات.");
      return;
    }
    setUserRating(rating);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/equipment/${id}/rate`,
        {
          userId: userId,
          rating: rating,
          content: "",
        }
      );
      if (response.data.averageRating !== undefined) {
        setAverageRating(response.data.averageRating);
        setRatingCount(response.data.ratingsCount);
      }
      toast.success("تم تسجيل تقييمك بنجاح!");
    } catch (error) {
      console.error("خطأ في تسجيل التقييم:", error);
      toast.error("حدث خطأ أثناء تسجيل التقييم.");
    }
  };

  // رسم النجوم
  const renderStars = (rating, setRatingFn = null, hover = null, setHover = null) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <div
              key={index}
              className={`${setRatingFn ? "cursor-pointer" : ""} text-xl mx-1`}
              onClick={() => setRatingFn && submitRating(ratingValue)}
              onMouseEnter={() => setHover && setHover(ratingValue)}
              onMouseLeave={() => setHover && setHover(0)}
            >
              <Star
                className={`h-6 w-6 ${
                  ratingValue <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // ----------------------------------
  // مشاركة الصفحة
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = equipment?.title || "";
    const text = equipment?.description
      ? equipment.description.substring(0, 100)
      : "";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            text
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            title + " - " + url
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  // ----------------------------------
  // طلب التواصل (مثال باستخدام sweetalert)
  const handleContactRequest = () => {
    Swal.fire({
      title: "طلب التواصل",
      html: `
        <div class="text-right" dir="rtl">
          <p class="mb-4">سنقوم بالاتصال بك في أقرب وقت ممكن. الرجاء ترك رقم هاتفك:</p>
          <input id="phone" class="w-full p-2 border rounded-md text-right" placeholder="رقم الهاتف" />
        </div>
      `,
      confirmButtonText: "إرسال",
      confirmButtonColor: "#F59E0B",
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      focusConfirm: false,
      preConfirm: () => {
        const phone = Swal.getPopup().querySelector("#phone").value;
        if (!phone) {
          Swal.showValidationMessage("الرجاء إدخال رقم الهاتف");
        }
        return { phone: phone };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("تم إرسال طلب التواصل بنجاح. سنتصل بك قريباً!");
      }
    });
  };

  // ----------------------------------
  // الإبلاغ عن تعليق
  const handleReportReview = async (reviewId) => {
    const { value: reason } = await Swal.fire({
      title: "الإبلاغ عن تقييم",
      input: "textarea",
      inputLabel: "سبب البلاغ",
      inputPlaceholder: "اكتب سبب البلاغ هنا...",
      confirmButtonText: "إرسال",
      confirmButtonColor: "#F59E0B",
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      inputValidator: (value) => {
        if (!value) {
          return "يجب إدخال سبب البلاغ";
        }
      },
    });

    if (!reason) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reviews/report/${reviewId}`,
        { reason }
      );

      if (response.status === 200) {
        toast.success("تم إرسال البلاغ بنجاح. سيتم مراجعته من قبل المسؤول.");
        fetchReviews();
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الإبلاغ عن التقييم.");
      console.log(error);
    }
  };

  // ----------------------------------
  // عند ضغط زر "إرسال الطلب" في نموذج التأجير
  const handleRentalSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("يجب تسجيل الدخول أولاً!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rentals",
        {
          userId: userId,
          equipmentId: id, // معرف المعدة
          startDate,
          endDate,
          phoneNumber,
          address,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message || "تم إنشاء طلب التأجير بنجاح");
      // إعادة تعيين الحقول
      setStartDate("");
      setEndDate("");
      setPhoneNumber("");
      setAddress("");
      setShowRentalRequest(false);
    } catch (error) {
      console.error("خطأ في إنشاء طلب التأجير:", error);
      toast.error("حدث خطأ في إرسال طلب التأجير");
    }
  };

  // ----------------------------------
  // واجهة العرض
  if (loading) {
    return (
      <div className="text-center p-10 text-xl">جارٍ تحميل المعلومات...</div>
    );
  }
  if (!equipment) {
    return (
      <div className="text-center p-10 text-red-500 text-xl">
        المعدات غير موجودة
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl" dir="rtl">
      <ToastContainer />

      {/* فئة المعدات */}
      <div className="mb-4 text-sm text-gray-500 flex gap-2">
        <span>المعدات</span>
        <span>|</span>
        <span>{equipment.category || "غير محدد"}</span>
      </div>

      {/* قسم رئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* معرض الصور */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div
              className="w-full h-96 overflow-hidden rounded-lg shadow-md cursor-pointer relative"
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={`http://localhost:5000/${selectedImage || equipment.mainImage}`}
                alt={equipment.title}
                className="w-full h-full object-contain bg-gray-100"
              />
              <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-sm">
                {equipment.condition}
              </div>
            </div>
          </div>

          {/* الصور المصغرة */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
            <div
              className={`flex-shrink-0 w-24 h-24 cursor-pointer rounded-md overflow-hidden ${
                selectedImage === equipment.mainImage
                  ? "ring-2 ring-amber-500"
                  : "ring-1 ring-gray-200"
              }`}
              onClick={() => setSelectedImage(equipment.mainImage)}
            >
              <img
                src={`http://localhost:5000/${equipment.mainImage}`}
                alt={equipment.title}
                className="w-full h-full object-cover"
              />
            </div>
            {equipment.additionalImages &&
              equipment.additionalImages.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-24 h-24 cursor-pointer rounded-md overflow-hidden ${
                    selectedImage === image
                      ? "ring-2 ring-amber-500"
                      : "ring-1 ring-gray-200"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt={`${equipment.title} - صورة ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>

          {/* عنوان المعدات والتقييم */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                {equipment.title}
              </h1>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  {renderStars(averageRating)}
                  <span className="mr-2 text-amber-500 font-bold">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{ratingCount} تقييم</span>
              </div>
            </div>
          </div>

          {/* وصف المعدات */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              <span>الوصف</span>
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p>{equipment.description}</p>
            </div>
          </div>

          {/* المواصفات الفنية */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-amber-500" />
              <span>المواصفات الفنية</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">المصنع:</span>
                    <span className="font-medium">{equipment.manufacturer}</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">الموديل:</span>
                    <span className="font-medium">{equipment.model}</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">سنة الصنع:</span>
                    <span className="font-medium">{equipment.year}</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-500">الحالة:</span>
                    <span className="font-medium">{equipment.condition}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">المواصفات الإضافية:</h3>
                <div className="text-gray-700">{equipment.technicalSpecs}</div>
              </div>
            </div>
          </div>

          {/* المميزات */}
          {equipment.features && equipment.features.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">المميزات</h2>
              <div className="flex flex-wrap gap-2">
                {equipment.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* شروط وأحكام التأجير */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span>شروط وأحكام التأجير</span>
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p>{equipment.rentalTerms || "لا توجد شروط إضافية محددة."}</p>
            </div>
          </div>

          {/* بار الإحصائيات (مشاهدات / مشاركة ... إلخ) */}
          <div className="flex items-center justify-between mb-8 py-3 px-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-8 space-x-reverse">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 ml-1" />
                <span className="text-gray-600">
                  الحد الأدنى للتأجير: {equipment.minRentalDays} يوم
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 ml-1" />
                <span className="text-gray-600">{equipment.location}</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-500 ml-1" />
                <span className="text-gray-600">{equipment.deliveryOptions}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center text-gray-600 hover:text-green-600"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* قسم جانبي - معلومات السعر والحجز */}
        <div className="lg:col-span-1">
          {/* بطاقة التسعير */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-amber-500" />
              <span>أسعار التأجير</span>
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">سعر التأجير اليومي:</span>
                <span className="font-bold text-lg text-amber-500">
                  {equipment.dailyRate} دينار
                </span>
              </div>

              {equipment.weeklyRate && (
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-700">سعر التأجير الأسبوعي:</span>
                  <span className="font-bold">{equipment.weeklyRate} دينار</span>
                </div>
              )}

              {equipment.monthlyRate && (
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-700">سعر التأجير الشهري:</span>
                  <span className="font-bold">{equipment.monthlyRate} دينار</span>
                </div>
              )}

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">مبلغ التأمين:</span>
                <span className="font-bold">{equipment.depositAmount} دينار</span>
              </div>
            </div>

            <button
              onClick={() => setShowRentalRequest(true)}
              className="bg-amber-500 w-full text-white py-2 rounded-md text-center mb-3"
            >
              طلب تأجير
            </button>

            <button
              onClick={handleContactRequest}
              className="bg-blue-500 w-full text-white py-2 rounded-md text-center"
            >
              <Phone className="inline-block mr-1 h-4 w-4" />
              طلب مكالمة
            </button>
          </div>
        </div>
      </div>

      {/* قسم التقييمات والمراجعات */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-amber-500" />
          آراء المستخدمين
        </h3>
        <div className="mb-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{rev.userId?.name || "مستخدم"}</h4>
                <button
                  onClick={() => handleReportReview(rev._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  الإبلاغ
                </button>
              </div>
              <p className="text-gray-600">{rev.content}</p>
              <div className="text-sm text-gray-400 mt-1">
                التقييم: {rev.rating} نجوم
              </div>
            </div>
          ))}
        </div>

        {/* إضافة تقييم جديد */}
        {userId ? (
          <form onSubmit={handleReviewSubmit}>
            <div className="flex items-center mb-2">
              {renderStars(userRating, setUserRating, tempRating, setTempRating)}
            </div>
            <textarea
              className="w-full border rounded p-2 mb-2"
              rows="3"
              placeholder="أضف تعليقك..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded"
            >
              إرسال التقييم
            </button>
          </form>
        ) : (
          <p className="text-gray-500">
            يجب <strong>تسجيل الدخول</strong> لإضافة تقييم.
          </p>
        )}
      </div>

      {/* معدات مشابهة */}
      {similarEquipment.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">معدات مشابهة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {similarEquipment.map((item) => (
              <div key={item._id} className="border p-4 rounded">
                <img
                  src={`http://localhost:5000/${item.mainImage}`}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">سعر اليوم: {item.dailyRate} دينار</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* نافذة تكبير الصورة (اختياري) */}
      {showImageModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowImageModal(false)}
        >
          <img
            src={`http://localhost:5000/${selectedImage}`}
            alt="Enlarged"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* نافذة (Modal) طلب التأجير */}
      {showRentalRequest && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowRentalRequest(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">طلب التأجير</h2>
            <form onSubmit={handleRentalSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">تاريخ البداية</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded p-2 w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">تاريخ النهاية</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded p-2 w-full"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">العنوان</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowRentalRequest(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  إرسال الطلب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
