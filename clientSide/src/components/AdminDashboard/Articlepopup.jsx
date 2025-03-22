import React, { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaTools, FaTruck, FaClipboardList, FaEye, FaThumbsUp } from "react-icons/fa";

const EquipmentPopup = ({ isOpen, onClose, equipment }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isPressing, setIsPressing] = useState(false);
  const [images, setImages] = useState([]);
  
  // إغلاق النافذة عند الضغط على Escape
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (equipment) {
      // تجميع جميع الصور في مصفوفة واحدة
      const allImages = [equipment.mainImage];
      if (equipment.additionalImages && equipment.additionalImages.length > 0) {
        allImages.push(...equipment.additionalImages);
      }
      setImages(allImages);
    }
  }, [equipment]);

  if (!isOpen || !equipment) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div 
        className={`bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden ${
          isPressing 
            ? "shadow-[0_0_20px_rgba(245,159,11,0.7)]" 
            : "shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        } transition-all duration-300 transform ${
          isPressing ? "scale-[0.99]" : "scale-100"
        }`}
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
        onMouseLeave={() => setIsPressing(false)}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{equipment.title || "تفاصيل المعدات"}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-black/10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
          {["نظرة عامة", "المواصفات", "الإحصائيات"].map((tab, index) => {
            const tabId = ["general", "specifications", "statistics"][index];
            const isActive = activeTab === tabId;
            
            return (
              <button
                key={tabId}
                className={`px-5 py-4 font-medium text-sm flex-1 transition-all duration-300 ${
                  isActive
                    ? "text-amber-500 border-b-2 border-amber-500 bg-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tabId)}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 bg-[#fafbfc]">
          {activeTab === "general" && (
            <div className="space-y-6 text-right">
              {/* صور المعدات */}
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">صور المعدات</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg border border-gray-200">
                      <img 
                        src={`http://localhost:5000/${image}`} 
                        alt={`صورة ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* معلومات أساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "الشركة المصنعة", value: equipment.manufacturer, icon: <FaTruck className="text-amber-500" /> },
                  { label: "الموديل", value: equipment.model, icon: <FaTools className="text-amber-500" /> },
                  { label: "سنة الصنع", value: equipment.year, icon: <FaCalendarAlt className="text-amber-500" /> },
                  { label: "الموقع", value: equipment.location, icon: <FaMapMarkerAlt className="text-amber-500" /> },
                  { label: "الحالة", value: equipment.condition, icon: <FaClipboardList className="text-amber-500" /> },
                  { label: "المالك", value: equipment.ownerId?.name || "غير محدد", icon: <FaTools className="text-amber-500" /> }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-amber-300 transition-colors">
                    <div className="flex items-center">
                      <div className="ml-3">{item.icon}</div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-medium text-gray-800">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* الوصف */}
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-r-4 border-amber-500 pr-3">الوصف</h3>
                <p className="text-gray-700 leading-relaxed">
                  {equipment.description || "لا يوجد وصف متاح"}
                </p>
              </div>

              {/* أسعار التأجير */}
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-r-4 border-amber-500 pr-3">أسعار التأجير</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <FaDollarSign className="mx-auto text-amber-500 mb-2" size={20} />
                    <div className="text-amber-500 font-bold text-xl">{equipment.dailyRate} دينار</div>
                    <div className="text-gray-600 text-sm">سعر اليوم</div>
                  </div>
                  
                  {equipment.weeklyRate && (
                    <div className="bg-amber-50 p-4 rounded-lg text-center">
                      <FaDollarSign className="mx-auto text-amber-500 mb-2" size={20} />
                      <div className="text-amber-500 font-bold text-xl">{equipment.weeklyRate} دينار</div>
                      <div className="text-gray-600 text-sm">سعر الأسبوع</div>
                    </div>
                  )}
                  
                  {equipment.monthlyRate && (
                    <div className="bg-amber-50 p-4 rounded-lg text-center">
                      <FaDollarSign className="mx-auto text-amber-500 mb-2" size={20} />
                      <div className="text-amber-500 font-bold text-xl">{equipment.monthlyRate} دينار</div>
                      <div className="text-gray-600 text-sm">سعر الشهر</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "specifications" && (
            <div className="space-y-6 text-right">
              {/* المواصفات الفنية */}
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-r-4 border-amber-500 pr-3">المواصفات الفنية</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">
                    {equipment.technicalSpecs || "لا توجد مواصفات فنية متاحة"}
                  </p>
                </div>
              </div>

              {/* شروط التأجير */}
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-r-4 border-amber-500 pr-3">شروط التأجير</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700">الحد الأدنى لمدة التأجير:</span>
                    <span className="font-medium text-gray-900">{equipment.minRentalDays || 1} يوم</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700">مبلغ التأمين:</span>
                    <span className="font-medium text-gray-900">{equipment.depositAmount || "غير محدد"} دينار</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700">خيارات التوصيل:</span>
                    <span className="font-medium text-gray-900">{equipment.deliveryOptions || "غير محدد"}</span>
                  </div>
                </div>
                
                {equipment.rentalTerms && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">شروط وأحكام إضافية:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-line">{equipment.rentalTerms}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* المميزات */}
              {equipment.features && equipment.features.length > 0 && (
                <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-r-4 border-amber-500 pr-3">المميزات</h3>
                  <div className="flex flex-wrap gap-2">
                    {equipment.features.map((feature, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "statistics" && (
            <div className="space-y-6 text-right">
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 border-r-4 border-amber-500 pr-3">إحصائيات المعدات</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "عدد المشاهدات", value: equipment.views || 0, icon: <FaEye /> },
                    { label: "متوسط التقييم", value: `${equipment.averageRating?.toFixed(1) || "0"} / 5`, icon: <FaStar /> },
                    { label: "عدد التقييمات", value: equipment.ratingsCount || 0, icon: <FaThumbsUp /> },
                    { label: "عدد الطلبات", value: equipment.rentalsCount || 0, icon: <FaClipboardList /> }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-all">
                      <div className="text-amber-500 mb-2">{item.icon}</div>
                      <div className="text-gray-800 font-bold text-lg">{item.value}</div>
                      <div className="text-gray-500 text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* آخر التقييمات */}
              <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-r-4 border-amber-500 pr-3">آخر التقييمات</h3>
                
                <div className="space-y-4">
                  {equipment.reviews && equipment.reviews.length > 0 ? (
                    equipment.reviews.map((review, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start">
                            <div className="ml-3 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                              {review.userId?.name?.charAt(0) || "م"}
                            </div>
                            <div>
                              <div className="font-medium">{review.userId?.name || "مستخدم"}</div>
                              <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-2">{review.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">لا توجد تقييمات حتى الآن</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default EquipmentPopup;