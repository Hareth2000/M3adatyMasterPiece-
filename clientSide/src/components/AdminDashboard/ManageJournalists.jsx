import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaCheck, FaTimes, FaEdit, FaTrash, FaTools, FaHandshake, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSearch, FaFileAlt } from 'react-icons/fa';

const ManagePartners = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPartner, setExpandedPartner] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    fetchPartners(currentPage);
  }, [currentPage]);

  const fetchPartners = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/partners?page=${page}`);
      setPartners(response.data.partners);
      setFilteredPartners(response.data.partners);
      setTotalPages(response.data.totalPages);

      // تهيئة حالة التوسيع
      const initialExpandedState = {};
      response.data.partners.forEach(partner => {
        initialExpandedState[partner._id] = false;
      });
      setExpandedPartner(initialExpandedState);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // تطبيق الفلترة والبحث عند تغيير المدخلات
  useEffect(() => {
    let results = partners;

    // تطبيق فلترة البحث
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(partner =>
        (partner.name && partner.name.toLowerCase().includes(term)) ||
        (partner.email && partner.email.toLowerCase().includes(term)) ||
        (partner.companyName && partner.companyName.toLowerCase().includes(term)) ||
        (partner.phone && partner.phone.includes(term))
      );
    }

    // تطبيق فلترة الحالة
    if (statusFilter !== 'all') {
      results = results.filter(partner => partner.status === statusFilter);
    }

    setFilteredPartners(results);
  }, [searchTerm, statusFilter, partners]);

  const toggleExpand = (partnerId) => {
    setExpandedPartner(prev => ({
      ...prev,
      [partnerId]: !prev[partnerId]
    }));
  };

  const updatePartnerStatus = async (partnerId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/partners/${partnerId}/status`, { status: newStatus });
      
      // تحديث حالة الشريك في القائمة المحلية
      setPartners(partners.map(partner => 
        partner._id === partnerId ? { ...partner, status: newStatus } : partner
      ));
      
      // تحديث القائمة المفلترة أيضًا
      setFilteredPartners(filteredPartners.map(partner => 
        partner._id === partnerId ? { ...partner, status: newStatus } : partner
      ));
    } catch (error) {
      console.error('خطأ في تحديث حالة الشريك:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const openPartnerDetails = (partner) => {
    setSelectedPartner(partner);
  };

  const closePartnerDetails = () => {
    setSelectedPartner(null);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending':
        return 'قيد المراجعة';
      case 'approved':
        return 'مُعتمد';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
        <p className="mt-4 text-gray-500 text-lg">جاري تحميل بيانات الشركاء...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">حدث خطأ: {error}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 bg-white py-4 rounded-lg shadow-md border-b-4 border-amber-500">
            إدارة الشركاء ومزودي المعدات
          </h2>
        </div>

        {/* فلاتر البحث */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pr-8 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
                <FaSearch className="absolute top-3 right-2 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد المراجعة</option>
                <option value="approved">مُعتمد</option>
                <option value="rejected">مرفوض</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          </div>
        </div>

        {/* قائمة الشركاء */}
        {filteredPartners.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaHandshake className="mx-auto text-gray-300 h-16 w-16 mb-3" />
            <p className="text-lg font-medium text-gray-700">لا توجد نتائج مطابقة</p>
            <p className="text-gray-500 mt-2">جرب تغيير معايير البحث أو إعادة ضبط الفلاتر</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <div 
                key={partner._id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-300"
              >
                {/* رأس البطاقة مع الحالة */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-medium text-lg text-gray-800">
                    {partner.name}
                    {partner.companyName && (
                      <span className="block text-sm text-gray-500">
                        {partner.companyName}
                      </span>
                    )}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(partner.status)}`}>
                    {getStatusText(partner.status)}
                  </span>
                </div>
                
                {/* معلومات الاتصال */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaEnvelope className="ml-2 text-amber-500" />
                    <span className="truncate">{partner.email}</span>
                  </div>
                  {partner.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaPhone className="ml-2 text-amber-500" />
                      <span>{partner.phone}</span>
                    </div>
                  )}
                  {partner.address && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="ml-2 text-amber-500" />
                      <span className="truncate">{partner.address}</span>
                    </div>
                  )}
                </div>
                
                {/* المزيد من المعلومات (مخفية بشكل افتراضي) */}
                {expandedPartner[partner._id] && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
                    {partner.businessType && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">نوع العمل:</span>{" "}
                        {partner.businessType === 'individual' ? 'فرد / مالك معدات' : 'شركة / مؤسسة'}
                      </div>
                    )}
                    {partner.yearsOfExperience && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">سنوات الخبرة:</span>{" "}
                        {partner.yearsOfExperience} سنوات
                      </div>
                    )}
                    {partner.equipmentTypes && partner.equipmentTypes.length > 0 && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">أنواع المعدات:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {partner.equipmentTypes.map((type, index) => (
                            <span key={index} className="bg-amber-100 text-amber-700 text-xs rounded-full px-2 py-0.5">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {partner.description && (
                      <div className="text-sm mt-2">
                        <span className="font-medium text-gray-700 block mb-1">الوصف:</span>
                        <p className="text-gray-600 bg-white p-2 rounded">{partner.description}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* أزرار الإجراءات */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                  <button
                    onClick={() => toggleExpand(partner._id)}
                    className="text-sm text-amber-500 hover:text-amber-600"
                  >
                    {expandedPartner[partner._id] ? "عرض أقل" : "عرض المزيد"}
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPartnerDetails(partner)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                      title="عرض التفاصيل"
                    >
                      <FaEye size={16} />
                    </button>
                    
                    {partner.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updatePartnerStatus(partner._id, 'approved')}
                          className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                          title="موافقة"
                        >
                          <FaCheck size={16} />
                        </button>
                        <button
                          onClick={() => updatePartnerStatus(partner._id, 'rejected')}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="رفض"
                        >
                          <FaTimes size={16} />
                        </button>
                      </>
                    )}
                    
                    {partner.status === 'approved' && (
                      <button
                        onClick={() => updatePartnerStatus(partner._id, 'rejected')}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="إيقاف الحساب"
                      >
                        <FaTimes size={16} />
                      </button>
                    )}
                    
                    {partner.status === 'rejected' && (
                      <button
                        onClick={() => updatePartnerStatus(partner._id, 'approved')}
                        className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                        title="تفعيل الحساب"
                      >
                        <FaCheck size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* أزرار الصفحات */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-2 rounded-md border text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                // Show limited page numbers with ellipsis
                if (
                  totalPages <= 7 || 
                  i === 0 || 
                  i === totalPages - 1 || 
                  (i >= currentPage - 2 && i <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`mx-1 w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                        currentPage === i + 1
                          ? "bg-amber-500 text-white"
                          : "bg-white text-gray-700 border hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (
                  i === 1 && currentPage > 3 ||
                  i === totalPages - 2 && currentPage < totalPages - 2
                ) {
                  return <span key={i} className="mx-1">...</span>;
                }
                return null;
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-2 rounded-md border text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* تفاصيل الشريك */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">تفاصيل الشريك</h3>
              <button 
                onClick={closePartnerDetails}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
              {/* بطاقة معلومات الشريك */}
              <div className="bg-gray-50 p-5 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4 border-r-4 border-amber-500 pr-3">
                      معلومات شخصية
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3">
                        <span className="text-gray-600 font-medium">الاسم:</span>
                        <span className="col-span-2">{selectedPartner.name}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-gray-600 font-medium">البريد الإلكتروني:</span>
                        <span className="col-span-2">{selectedPartner.email}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-gray-600 font-medium">رقم الهاتف:</span>
                        <span className="col-span-2">{selectedPartner.phone || "غير متوفر"}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-gray-600 font-medium">العنوان:</span>
                        <span className="col-span-2">{selectedPartner.address || "غير متوفر"}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-gray-600 font-medium">تاريخ التسجيل:</span>
                        <span className="col-span-2">{new Date(selectedPartner.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4 border-r-4 border-amber-500 pr-3">
                      معلومات العمل
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3">
                        <span className="text-gray-600 font-medium">نوع العمل:</span>
                        <span className="col-span-2">
                          {selectedPartner.businessType === 'individual' ? 'فرد / مالك معدات' : 'شركة / مؤسسة'}
                        </span>
                      </div>
                      {selectedPartner.companyName && (
                        <div className="grid grid-cols-3">
                          <span className="text-gray-600 font-medium">اسم الشركة:</span>
                          <span className="col-span-2">{selectedPartner.companyName}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-3">
                        <span className="text-gray-600 font-medium">سنوات الخبرة:</span>
                        <span className="col-span-2">{selectedPartner.yearsOfExperience || "غير محدد"} {selectedPartner.yearsOfExperience && "سنوات"}</span>
                      </div>
                      {selectedPartner.taxNumber && (
                        <div className="grid grid-cols-3">
                          <span className="text-gray-600 font-medium">الرقم الضريبي:</span>
                          <span className="col-span-2">{selectedPartner.taxNumber}</span>
                        </div>
                      )}
                      {selectedPartner.website && (
                        <div className="grid grid-cols-3">
                          <span className="text-gray-600 font-medium">الموقع الإلكتروني:</span>
                          <span className="col-span-2">
                            <a 
                              href={selectedPartner.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {selectedPartner.website}
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* وصف الشريك */}
              {selectedPartner.description && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3 border-r-4 border-amber-500 pr-3">
                    نبذة عن الشريك
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedPartner.description}
                    </p>
                  </div>
                </div>
              )}
              
              {/* أنواع المعدات */}
              {selectedPartner.equipmentTypes && selectedPartner.equipmentTypes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3 border-r-4 border-amber-500 pr-3">
                    أنواع المعدات
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.equipmentTypes.map((type, index) => (
                        <span 
                          key={index} 
                          className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm flex items-center"
                        >
                          <FaTools className="ml-1.5 h-3 w-3" />
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* المستندات */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3 border-r-4 border-amber-500 pr-3">
                  المستندات
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <FaFileAlt className="ml-2 text-amber-500" />
                      <h5 className="font-medium text-gray-700">صورة الهوية الشخصية</h5>
                    </div>
                    {selectedPartner.identityDocument ? (
                      <div className="mt-2">
                        <img 
                          src={`http://localhost:5000/${selectedPartner.identityDocument}`} 
                          alt="صورة الهوية" 
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">لم يتم تحميل صورة الهوية</p>
                    )}
                  </div>
                  
                  {selectedPartner.businessType === 'company' && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-2">
                        <FaFileAlt className="ml-2 text-amber-500" />
                        <h5 className="font-medium text-gray-700">السجل التجاري</h5>
                      </div>
                      {selectedPartner.commercialRegister ? (
                        <div className="mt-2">
                          <img 
                            src={`http://localhost:5000/${selectedPartner.commercialRegister}`} 
                            alt="السجل التجاري" 
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">لم يتم تحميل السجل التجاري</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* الإحصائيات */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3 border-r-4 border-amber-500 pr-3">
                  إحصائيات
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-amber-500">{selectedPartner.equipmentCount || 0}</div>
                    <div className="text-gray-600 text-sm">المعدات</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-amber-500">{selectedPartner.activeRentals || 0}</div>
                    <div className="text-gray-600 text-sm">تأجير نشط</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-amber-500">{selectedPartner.completedRentals || 0}</div>
                    <div className="text-gray-600 text-sm">تأجير مكتمل</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-amber-500">{selectedPartner.averageRating || 0}</div>
                    <div className="text-gray-600 text-sm">متوسط التقييم</div>
                  </div>
                </div>
              </div>
              
              {/* أزرار الإجراءات */}
              <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                {selectedPartner.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updatePartnerStatus(selectedPartner._id, 'approved');
                        setSelectedPartner({...selectedPartner, status: 'approved'});
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      الموافقة
                    </button>
                    <button
                      onClick={() => {
                        updatePartnerStatus(selectedPartner._id, 'rejected');
                        setSelectedPartner({...selectedPartner, status: 'rejected'});
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      الرفض
                    </button>
                  </>
                )}
                
                {selectedPartner.status === 'approved' && (
                  <button
                    onClick={() => {
                      updatePartnerStatus(selectedPartner._id, 'rejected');
                      setSelectedPartner({...selectedPartner, status: 'rejected'});
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    إيقاف الحساب
                  </button>
                )}
                
                {selectedPartner.status === 'rejected' && (
                  <button
                    onClick={() => {
                      updatePartnerStatus(selectedPartner._id, 'approved');
                      setSelectedPartner({...selectedPartner, status: 'approved'});
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    تفعيل الحساب
                  </button>
                )}
                
                <button
                  onClick={closePartnerDetails}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePartners;