import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";

const Login = ({ switchForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null);

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/get-role",
        { withCredentials: true }
      );
      setUserRole(response.data.role);
    } catch (error) {
      console.error("error fetching user role");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/users/login", formData, {
        withCredentials: true, // Ensures cookies are stored
      });
      fetchUserRole();

      if (formData.email === "Admin@gmail.com") {
        window.location.href = "/admin-dashboard"; // Redirect after login
      } else {
        window.location.href = "/"; // Redirect after login
      }
    } catch (error) {
      setError(error.response?.data?.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/google-login",
        {
          token: credentialResponse.credential,
        }
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error) {
      setError(
        error.response?.data?.message || "فشل تسجيل الدخول باستخدام جوجل"
      );
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
      className="h-full flex flex-col bg-gray-800 text-gray-100"
    >
      <div className="mb-8 text-right">
        <h2 className="text-3xl font-bold text-yellow-500">تسجيل الدخول</h2>
        <p className="text-gray-400 mt-2">
          مرحباً بعودتك! سجل الدخول للوصول إلى منصة تأجير المعدات والآليات
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            البريد الإلكتروني
          </label>
          <input
            id="email"
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
          <div className="flex justify-between items-center mb-1">
            <a href="#" className="text-sm text-yellow-500 hover:text-yellow-400">
              نسيت كلمة المرور؟
            </a>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              كلمة المرور
            </label>
          </div>
          <input
            id="password"
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

        <div className="flex items-center justify-end">
          <label
            htmlFor="remember-me"
            className="mr-2 block text-sm text-gray-300"
          >
            تذكرني
          </label>
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-yellow-500 border-gray-700 rounded focus:ring-yellow-500 bg-gray-700"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-medium shadow-lg hover:bg-yellow-400 transition-colors"
          disabled={loading}
        >
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </motion.button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-800 text-gray-400 text-sm">
              أو الاستمرار باستخدام
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("فشل تسجيل الدخول باستخدام جوجل")}
            shape="pill"
            theme="filled_black"
            width="100%"
            disabled={loading}
          />
        </div>
      </form>

      <p className="text-center text-gray-400 mt-8">
        ليس لديك حساب؟{" "}
        <button
          onClick={switchForm}
          className="text-yellow-500 font-medium hover:text-yellow-400"
        >
          إنشاء حساب
        </button>
      </p>
    </motion.div>
  );
};

export default Login;