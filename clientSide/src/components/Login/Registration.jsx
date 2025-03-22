import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Register = ({ switchForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }

    if (formData.password.length < 8) {
      setError("يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      await axios.post(
        "http://localhost:5000/api/users/register",
        dataToSend,
        { withCredentials: true }
      );
      alert("تم التسجيل بنجاح!");
      switchForm();
    } catch (error) {
      setError(error.response?.data?.message || "فشل التسجيل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col text-gray-100"
    >
      <div className="mb-8 text-right">
        <h2 className="text-3xl font-bold text-yellow-500">إنشاء حساب جديد</h2>
        <p className="text-gray-400 mt-2">
          انضم إلينا اليوم واستفد من خدمات تأجير المعدات والآليات الصناعية
        </p>
      </div>

      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-700 text-red-400 p-4 rounded-lg mb-6 text-right">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
        <div className="text-right">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            الاسم الكامل
          </label>
          <input
            id="name"
            type="text"
            placeholder="أدخل اسمك الكامل"
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-right"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            dir="rtl"
          />
        </div>

        <div className="text-right">
          <label
            htmlFor="register-email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            البريد الإلكتروني
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="your@email.com"
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-right"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            dir="rtl"
          />
        </div>

        <div className="text-right">
          <label
            htmlFor="register-password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            كلمة المرور
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-right"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            dir="rtl"
          />
        </div>

        <div className="text-right">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            تأكيد كلمة المرور
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-right"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            dir="rtl"
          />
          <p className="text-xs text-gray-500 mt-1">
            يجب أن تحتوي على 8 أحرف على الأقل
          </p>
        </div>

        <div className="flex items-start justify-end">
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
            أوافق على{" "}
            <a href="#" className="text-yellow-500 hover:text-yellow-400">
              الشروط والأحكام
            </a>{" "}
            و{" "}
            <a href="#" className="text-yellow-500 hover:text-yellow-400">
              سياسة الخصوصية
            </a>
          </label>
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 mt-1 text-yellow-500 border-gray-700 rounded focus:ring-yellow-500 bg-gray-700"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-medium shadow-lg hover:bg-yellow-400 transition-colors"
          disabled={loading}
        >
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </motion.button>
      </form>

      <p className="text-center text-gray-400 mt-8">
        لديك حساب بالفعل؟{" "}
        <button
          onClick={switchForm}
          className="text-yellow-500 font-medium hover:text-yellow-400"
        >
          تسجيل الدخول
        </button>
      </p>
    </motion.div>
  );
};

export default Register;