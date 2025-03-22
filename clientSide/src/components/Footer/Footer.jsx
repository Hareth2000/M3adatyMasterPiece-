import React from 'react';
import { Youtube, Twitter, Linkedin, Instagram, Facebook, Phone, MapPin, Clock, Mail, Wrench , Truck } from 'lucide-react';

const Footer = () => {
  return (
    <div className="font-sans bg-gray-900">
      {/* Main Footer Section */}
      <div className="w-full border-t border-amber-500 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Right Column */}
            <div className="text-right text-white">
              <h3 className="font-bold text-lg mb-4">عن المعدات الذهبية</h3>
              <ul className="space-y-2">
                <li><a href="/about-us" className="hover:text-amber-500">نبذة عن الشركة</a></li>
                <li><a href="/equipment" className="hover:text-amber-500">معدات للتأجير</a></li>
                <li><a href="/machinery" className="hover:text-amber-500">آليات للتأجير</a></li>
                <li><a href="/partners" className="hover:text-amber-500">شركاؤنا</a></li>
              </ul>
            </div>

            {/* Middle Column */}
            <div className="text-right text-white">
              <h3 className="font-bold text-lg mb-4">خدماتنا</h3>
              <ul className="space-y-2">
                <li><a href="/services" className="hover:text-amber-500">خدمات التأجير</a></li>
                <li><a href="/offers" className="hover:text-amber-500">العروض الخاصة</a></li>
                <li><a href="/register-partner" className="hover:text-amber-500">انضم كشريك</a></li>
                <li><a href="/contact-us" className="hover:text-amber-500">تواصل معنا</a></li>
              </ul>
            </div>

            {/* Left Column - Contact Information */}
            <div className="text-right text-white">
              <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-end items-center gap-2">
                  <span>+962 79 123 4567</span>
                  <Phone size={16} className="text-amber-500" />
                </div>
                <div className="flex justify-end items-center gap-2">
                  <span>info@golden-equipment.com</span>
                  <Mail size={16} className="text-amber-500" />
                </div>
                <div className="flex justify-end items-center gap-2">
                  <span>عمان، الأردن - شارع الصناعة</span>
                  <MapPin size={16} className="text-amber-500" />
                </div>
                <div className="flex justify-end items-center gap-2">
                  <span>السبت - الخميس: 8:00 - 17:00</span>
                  <Clock size={16} className="text-amber-500" />
                </div>
              </div>
              
              <div className="flex justify-end items-center gap-2 mt-4">
                <Wrench  size={24} className="text-amber-500" />
                <span className="text-xl font-bold">المعدات<span className="text-amber-500">الذهبية</span></span>
                <Truck size={24} className="text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer Section */}
      <div className="bg-gray-950 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Icons */}
            <div className="flex font-bold space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-amber-500 transition-colors"><Youtube size={20} /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Facebook size={20} /></a>
            </div>
            
            {/* Copyright */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-xs">
              <a href="/privacy-policy" className="hover:text-amber-500 text-right">سياسة الخصوصية</a>
              <a href="/terms" className="hover:text-amber-500 text-right">الشروط والأحكام</a>
              <span className="text-right">جميع الحقوق محفوظة لشركة المعدات الذهبية © 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;