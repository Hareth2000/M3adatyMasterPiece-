 
import React, { useState } from 'react';
import Swal from "sweetalert2";

const PaymentModal = ({ email, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name:'',
    email: email || "",
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    zipCode: '',
    country: 'الأردن '
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const paymentData = {
      ...formData,
      amount: 100,  // 💰 تحديد مبلغ الدفع (يجب استبداله بالقيمة الفعلية)
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire({
          title: "نجاح!",
          text: "تم إرسال طلب الدفع بنجاح!",
          icon: "success",
          confirmButtonText: "حسنًا",
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: "خطأ!",
          text: result.message,
          icon: "error",
          confirmButtonText: "حاول مرة أخرى",
          timer: 4000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء الاتصال بالخادم.",
        icon: "error",
        confirmButtonText: "حسنًا",
      });
      console.error("خطأ أثناء إرسال الطلب:", error);
    }
  };
  

  // معالجة تغيير قيم النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // تطبيق قيود الإدخال
    if (name === 'cardNumber') {
      // السماح فقط بـ 16 رقم مع مسافات
      const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
      if (cleaned.length <= 16) {
        // إضافة مسافة بعد كل 4 أرقام
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        setFormData({ ...formData, [name]: formatted });
      }
    } 
    else if (name === 'expiryDate') {
      // نمط الشهر/السنة (MM/YY)
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        let formatted = cleaned;
        if (cleaned.length > 2) {
          formatted = cleaned.slice(0, 2) + ' / ' + cleaned.slice(2);
        }
        setFormData({ ...formData, [name]: formatted });
      }
    }
    else if (name === 'cvc') {
      // السماح فقط بـ 3-4 أرقام
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        setFormData({ ...formData, [name]: cleaned });
      }
    }
    else if (name === 'zipCode') {
      // السماح فقط بـ 5 أرقام للرمز البريدي
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 5) {
        setFormData({ ...formData, [name]: cleaned });
      }
    }
    else {
      // لبقية الحقول
      setFormData({ ...formData, [name]: value });
    }
  };

 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      {/* زر الإغلاق */}
      <div className="flex justify-start">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">معلومات الدفع</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">البريد الإلكتروني</label>
            <div className="relative">
              {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div> */}
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pr-10 pl-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-right" 
                placeholder="email@example.com"
                required
                readOnly // ✅ يمنع التعديل عليه
              />
            </div>
          </div>

          <div>
              <label className="block text-sm text-gray-600 mb-1 mt-3"> اسم صاحب البطاقة</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-right" 
                placeholder=" الاسم الرباعي"
               
                required
              />
            </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1 mt-3">رقم البطاقة</label>
            <div className="flex">
              {/* <div className="flex items-center space-x-1 space-x-reverse ml-2">
                <img src="/api/placeholder/32/20" alt="Visa" className="h-5" />
                <img src="/api/placeholder/32/20" alt="Mastercard" className="h-5" />
                <img src="/api/placeholder/32/20" alt="Amex" className="h-5" />
                <img src="/api/placeholder/32/20" alt="Discover" className="h-5" />
              </div> */}
              <input 
                type="text" 
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-right" 
                placeholder="1234 1234 1234 1234"
                maxLength="19"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">رمز التحقق CVC</label>
              <div className="flex">
                {/* <div className="flex items-center ml-2">
                  <img src="/api/placeholder/24/16" alt="CVC" className="h-5" />
                </div> */}
                <input 
                  type="text" 
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-right" 
                  placeholder="CVC"
                  maxLength="4"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">تاريخ الانتهاء</label>
              <input 
                type="text" 
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-right" 
                placeholder="شهر / سنة"
                maxLength="7"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">الرمز البريدي</label>
              <input 
                type="text" 
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-right" 
                placeholder="12345"
                maxLength="5"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">الدولة</label>
              <select
    name="country"
    value={formData.country}  // تأكد من ربط القيمة بحالة `formData`
    onChange={handleChange}
    className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-right"
  >
    <option value="الأردن">الأردن</option>
    <option value="الإمارات العربية المتحدة">الإمارات العربية المتحدة</option>
    <option value="مصر">مصر</option>
    <option value="السعودية">السعودية</option>
    <option value="الكويت">الكويت</option>
  </select>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded transition duration-200">
            دفع  
          </button>
          
          <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
            <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            الدفع مؤمّن بواسطة Stripe
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;