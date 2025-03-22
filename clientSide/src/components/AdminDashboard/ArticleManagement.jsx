import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaCheck, FaTimes, FaBars, FaEdit, FaEye, FaTrash, FaStar } from "react-icons/fa";
import axios from "axios";
import EquipmentPopup from "./EquipmentPopup";

const EquipmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    fetchEquipment(currentPage);
  }, [currentPage]);

  const fetchEquipment = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/equipment/all?page=${page}&limit=10`
      );
      setEquipment(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
      setLoading(false);
    }
  };

  const openPopup = (item) => {
    setSelectedEquipment(item);
  };

  const closePopup = () => {
    setSelectedEquipment(null);
  };

  const updateEquipmentStatus = async (id, isActive) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/equipment/${id}/status`,
        {
          status: isActive ? "active" : "inactive",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchEquipment(currentPage);
    } catch (error) {
      console.error("خطأ في تحديث الحالة:", error);
    }
  };

  const deleteEquipment = async (id) => {
    // تأكيد قبل الحذف
    if (!window.confirm("هل أنت متأكد من حذف هذه المعدات؟")) {
      return;
    }
    
    try {
      await axios.delete(`http://localhost:5000/api/equipment/${id}`);
      fetchEquipment(currentPage);
    } catch (error) {
      console.error("خطأ في حذف المعدات:", error);
    }
  };

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.manufacturer && item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.model && item.model.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesPrice = item.dailyRate >= priceRange[0] && item.dailyRate <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch(sortBy) {
      case "price_asc":
        return a.dailyRate - b.dailyRate;
      case "price_desc":
        return b.dailyRate - a.dailyRate;
      case "rating":
        return (b.averageRating || 0) - (a.averageRating || 0);
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div
      className="w-full p-2 sm:p-4 md:p-6 bg-gray-50 min-h-screen"
      dir="rtl"
    >
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center bg-white rounded-lg py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-amber-500">
        إدارة المعدات
      </h1>

      {/* Mobile View Toggle Filters Button */}
      <button
        className="md:hidden w-full mb-4 p-3 bg-white rounded-lg shadow flex items-center justify-center"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaBars className="ml-2" />
        <span>{showFilters ? "إخفاء خيارات البحث" : "عرض خيارات البحث"}</span>
      </button>

      {/* Filters Section */}
      <div
        className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md mb-4 sm:mb-6 
        ${showFilters ? "block" : "hidden md:block"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">البحث</label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل كلمات البحث..."
                className="w-full p-3 sm:p-3 pr-10 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">التصنيف</label>
            <select
              className="w-full p-3 sm:p-3 pr-10 border border-gray-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500 transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">جميع الفئات</option>
              <option value="حفارات">حفارات</option>
              <option value="جرافات">جرافات</option>
              <option value="رافعات">رافعات</option>
              <option value="شاحنات">شاحنات</option>
              <option value="معدات خرسانة">معدات خرسانة</option>
              <option value="مولدات">مولدات</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
          
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">الترتيب حسب</label>
            <select
              className="w-full p-3 sm:p-3 pr-10 border border-gray-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500 transition-all"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">الأحدث</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
              <option value="rating">التقييم</option>
            </select>
          </div>
          
          <div className="md:col-span-3">
            <label className="text-sm font-medium text-gray-700 mb-1 block">نطاق السعر (دينار/يوم)</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder="الحد الأدنى"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="الحد الأقصى"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full hover:shadow-lg transition-all duration-300">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
            <p className="text-gray-500 text-lg mt-4">جاري تحميل المعدات...</p>
          </div>
        ) : (
          <>
            {/* Desktop view - table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">صورة</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      العنوان
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      الفئة
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      الحالة
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      السعر اليومي
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      التقييم
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      المالك
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEquipment.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 w-20">
                        <img 
                          src={`http://localhost:5000/${item.mainImage}`} 
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className="text-sm text-gray-700 font-medium cursor-pointer"
                          onClick={() => setSelectedEquipment(item)}
                        >
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {`${item.manufacturer} ${item.model} (${item.year})`}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${
                            item.availability
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.availability ? "متاح" : "غير متاح"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-amber-500">{item.dailyRate} دينار</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <span className="ml-1">{item.averageRating?.toFixed(1) || "لا تقييم"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.ownerId?.name || "غير معروف"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2 justify-end">
                          <button
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors duration-200"
                            onClick={() => setSelectedEquipment(item)}
                            title="عرض التفاصيل"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-amber-500 hover:bg-amber-50 rounded-full transition-colors duration-200"
                            onClick={() => window.location.href = `/equipment/edit/${item._id}`}
                            title="تعديل"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            className={`p-2 ${item.availability ? "text-red-500 hover:bg-red-50" : "text-green-500 hover:bg-green-50"} rounded-full transition-colors duration-200`}
                            onClick={() => updateEquipmentStatus(item._id, !item.availability)}
                            title={item.availability ? "إيقاف" : "تفعيل"}
                          >
                            {item.availability ? <FaTimes className="w-4 h-4" /> : <FaCheck className="w-4 h-4" />}
                          </button>
                          <button
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                            onClick={() => deleteEquipment(item._id)}
                            title="حذف"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view - cards */}
            <div className="md:hidden">
              {filteredEquipment.map((item) => (
                <div
                  key={item._id}
                  className="border-b border-gray-200 p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3 items-start">
                      <img 
                        src={`http://localhost:5000/${item.mainImage}`} 
                        alt={item.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="text-lg font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {`${item.manufacturer} ${item.model} (${item.year})`}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${
                          item.availability
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.availability ? "متاح" : "غير متاح"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 w-4 h-4" />
                      <span className="text-sm">{item.averageRating?.toFixed(1) || "لا تقييم"}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-500">{item.dailyRate} دينار</span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <button
                      className="px-3 py-1 rounded-md text-sm text-blue-500 border border-blue-500"
                      onClick={() => setSelectedEquipment(item)}
                    >
                      عرض
                    </button>
                    <button
                      className="px-3 py-1 rounded-md text-sm text-amber-500 border border-amber-500"
                      onClick={() => window.location.href = `/equipment/edit/${item._id}`}
                    >
                      تعديل
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md text-sm ${
                        item.availability 
                          ? "text-red-500 border border-red-500" 
                          : "text-green-500 border border-green-500"
                      }`}
                      onClick={() => updateEquipmentStatus(item._id, !item.availability)}
                    >
                      {item.availability ? "إيقاف" : "تفعيل"}
                    </button>
                    <button
                      className="px-3 py-1 rounded-md text-sm text-red-500 border border-red-500"
                      onClick={() => deleteEquipment(item._id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {filteredEquipment.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد معدات مطابقة للبحث</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center">
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
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
                    onClick={() => setCurrentPage(i + 1)}
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
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className="mx-1 px-3 py-2 rounded-md border text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              التالي
            </button>
          </nav>
        </div>
      )}

      {selectedEquipment && (
        <EquipmentPopup
          isOpen={true}
          onClose={closePopup}
          equipment={selectedEquipment}
        />
      )}
    </div>
  );
};

export default EquipmentManagement;