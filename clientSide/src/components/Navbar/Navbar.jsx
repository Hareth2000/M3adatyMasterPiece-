import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User, ShoppingCart, Menu, X } from "lucide-react";

const publicPages = [
  { name: "الرئيسية", href: "/" },
  { name: "التصنيفات", href: "/categories" },
  { name: "من نحن", href: "/about" },
  { name: "تواصل معنا", href: "/contact" },
  { name: "تسجيل الدخول", href: "/Auth" },
];

const customerPages = [
  { name: "الرئيسية", href: "/" },
  { name: "التصنيفات", href: "/categories" },
  { name: "تفاصيل المعدات", href: "/equipment/:id" },
  { name: "المفضلة", href: "/favorites" },
  { name: "ملفي الشخصي", href: "/profile" },
  { name: "تسجيل شريك", href: "/register-partner" },
  { name: "الدفع", href: "/payment" },
];

const partnerPages = [
  { name: "الرئيسية", href: "/" },
  { name: "ملف الشريك", href: "/partner/:id" },
  { name: "من نحن", href: "/about" },
  { name: "تواصل معنا", href: "/contact" },
  { name: "الدفع", href: "/payment" },
  { name: "إنشاء معدات", href: "/create-equipment" },

];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/get-role",
          { withCredentials: true }
        );
        setUserRole(response.data.role);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    fetchUserRole();
  }, []);

  const getNavigationLinks = () => {
    if (!isAuthenticated) return publicPages;
    if (userRole === "customer") return customerPages;
    if (userRole === "partner") return partnerPages;
    return publicPages;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          تأجير المعدات
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {getNavigationLinks().map((item) => (
            <Link key={item.name} to={item.href} className="text-gray-700 hover:text-amber-500">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <Link to="/profile">
                <User className="text-gray-700 hover:text-amber-500" size={24} />
              </Link>
              <Link to="/cart">
                <ShoppingCart className="text-gray-700 hover:text-amber-500" size={24} />
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {getNavigationLinks().map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-2 px-4 text-gray-700 hover:bg-amber-500 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
