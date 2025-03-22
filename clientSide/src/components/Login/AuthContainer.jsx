import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Login from "./login";
import Register from "./Registration";

const AuthContainer = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const switchForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 font-tajawal">
      <div className="w-full max-w-5xl flex rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side - Equipment Showcase */}
        <div className="hidden md:flex flex-col w-2/5 bg-yellow-500 text-gray-900 p-12 justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">
              مرحباً بك في منصة تأجير المعدات الصناعية
            </h1>
            <p className="text-gray-900 opacity-90 mb-8">
              المنصة الأولى لتأجير المعدات الصناعية والآليات بكفاءة عالية وأسعار تنافسية
            </p>
          </div>

          <div className="space-y-8 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-600 p-2 rounded-full ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p>آليات ومعدات صناعية حديثة</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-yellow-600 p-2 rounded-full ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p>توصيل وتركيب سريع</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-yellow-600 p-2 rounded-full ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p>أسعار تنافسية وعروض خاصة</p>
            </div>
          </div>

          <div className="text-gray-900 opacity-80 text-sm text-right relative z-10">
            © 2025 منصة تأجير المعدات. جميع الحقوق محفوظة.
          </div>

          {/* Bottom corner decoration */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-600 rounded-tr-full opacity-30" />
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full md:w-3/5 bg-gray-800 p-8 md:p-12 rtl">
          <AnimatePresence mode="wait">
            {currentForm === "login" ? (
              <Login key="login" switchForm={() => switchForm("register")} />
            ) : (
              <Register key="register" switchForm={() => switchForm("login")} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;