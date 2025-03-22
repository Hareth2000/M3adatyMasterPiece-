import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Truck, 
  CheckCircle, 
  DollarSign, 
  Search, 
  ArrowRight, 
  Wrench, 
  Calendar, 
  MapPin,
  Star,
  Heart,
  Clock,
  Shield,
  BadgeCheck,
  Users,
  Phone,
  ChevronRight,
  ArrowLeft,
  ArrowDown
} from "lucide-react";

const HomePage = () => {
  // حالة السليدر
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // بيانات السليدر
  const heroSlides = [
    {
      image: "src/assets/images/hero1.jpg",
      title: "حلول متكاملة لتأجير المعدات الصناعية",
      description: "نوفر أحدث المعدات وأفضل الخدمات لإنجاز مشاريعك بكفاءة وجودة عالية"
    },
    {
      image: "src/assets/images/hero2.jpg",
      title: "معدات متطورة لمشاريع البناء والإنشاءات",
      description: "استأجر معدات عالية الجودة بأسعار تنافسية وخدمات ما بعد التأجير متميزة"
    }
  ];

  // بيانات التصنيفات
  const categories = [
    {
      id: 1,
      name: "معدات البناء",
      icon: <Wrench size={24} />,
      image: "./pexels-asphotograpy-95687.jpg",
      count: 28
    },
    {
      id: 2,
      name: "الرافعات",
      icon: <Wrench size={24} />,
      image: "src/assets/images/categories/cranes.jpg",
      count: 15
    },
    {
      id: 3,
      name: "الحفارات",
      icon: <Wrench size={24} />,
      image: "src/assets/images/categories/excavators.jpg",
      count: 20
    },
    {
      id: 4,
      name: "المولدات",
      icon: <Wrench size={24} />,
      image: "src/assets/images/categories/generators.jpg",
      count: 12
    }
  ];

  // بيانات المعدات المميزة
  const featuredEquipment = [
    {
      id: 1,
      name: "حفارة هيدروليكية كاتربيلر",
      image: "src/assets/images/equipment/excavator1.jpg",
      category: "حفارات",
      rating: 4.8,
      ratingCount: 56,
      dailyRate: 1200,
      available: true,
      specs: ["قوة 320 حصان", "وزن 20 طن", "عمق حفر 6 متر"],
      location: "الرياض"
    },
    {
      id: 2,
      name: "رافعة شوكية تويوتا",
      image: "src/assets/images/equipment/forklift1.jpg",
      category: "رافعات",
      rating: 4.5,
      ratingCount: 42,
      dailyRate: 800,
      available: true,
      specs: ["قدرة رفع 5 طن", "ارتفاع رفع 6 متر", "محرك ديزل"],
      location: "جدة"
    },
    {
      id: 3,
      name: "شاحنة خلاطة أسمنت مرسيدس",
      image: "src/assets/images/equipment/mixer1.jpg",
      category: "شاحنات",
      rating: 4.7,
      ratingCount: 38,
      dailyRate: 950,
      available: false,
      specs: ["سعة 8 متر مكعب", "موديل 2022", "قوة 400 حصان"],
      location: "الدمام"
    }
  ];

  // بيانات توصيات العملاء
  const testimonials = [
    {
      id: 1,
      name: "م. أحمد القحطاني",
      position: "شركة البناء المتحدة",
      image: "src/assets/images/testimonials/client1.jpg",
      comment: "تجربة ممتازة مع معدات تك! المعدات كانت بحالة ممتازة والتوصيل كان في الموعد المحدد. سأتعامل معهم مجدداً في مشاريعي القادمة.",
      rating: 5
    },
    {
      id: 2,
      name: "م. سمير الهاشمي",
      position: "مقاول مشاريع",
      image: "src/assets/images/testimonials/client2.jpg",
      comment: "توفير المعدات الصناعية بهذه السهولة وفر علينا الكثير من الوقت والجهد. الأسعار كانت تنافسية جداً والدعم الفني كان متواجد طوال الوقت.",
      rating: 5
    }
  ];

  // تحريك السليدر تلقائياً
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // التنقل بين الشرائح
  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  // التنقل للشريحة التالية
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  // التنقل للشريحة السابقة
  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className="font-sans bg-white" dir="rtl">
      {/* قسم الهيرو مع سليدر */}
      <section className="relative h-screen overflow-hidden">
        {/* صور السلايدر */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ))}

        {/* محتوى السلايدر */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/categories"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-md transition-colors duration-300"
              >
                تصفح المعدات
              </Link>
              <Link
                to="/how-it-works"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white border-opacity-40 font-bold px-8 py-3 rounded-md transition-all duration-300"
              >
                كيف تعمل المنصة
              </Link>
            </div>
          </div>
        </div>

        {/* أزرار تنقل السلايدر */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
          aria-label="الشريحة السابقة"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
          aria-label="الشريحة التالية"
        >
          <ArrowRight size={20} />
        </button>

        {/* مؤشرات السلايدر */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-amber-500 w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-70"
              }`}
              aria-label={`الانتقال للشريحة ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* مؤشر سكرول */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <ArrowDown className="text-white" size={28} />
        </div>
      </section>

      {/* قسم البحث عن المعدات */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 -mt-20 relative z-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">ابحث عن المعدات المناسبة لمشروعك</h2>
            <form className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن معدات، آليات، أدوات..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>
              </div>
              <div className="w-full md:w-40">
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none">
                  <option value="">التصنيف</option>
                  <option value="construction">معدات بناء</option>
                  <option value="cranes">رافعات</option>
                  <option value="excavators">حفارات</option>
                  <option value="generators">مولدات</option>
                </select>
              </div>
              <div className="w-full md:w-40">
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none">
                  <option value="">الموقع</option>
                  <option value="riyadh">الرياض</option>
                  <option value="jeddah">جدة</option>
                  <option value="dammam">الدمام</option>
                  <option value="makkah">مكة</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-300"
              >
                بحث
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* قسم المميزات */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">لماذا تختار <span className="text-amber-500">معدات تك</span>؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">معدات بحالة ممتازة</h3>
              <p className="text-gray-600">جميع معداتنا تخضع لفحص شامل وصيانة دورية لضمان عملها بكفاءة</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">توصيل سريع</h3>
              <p className="text-gray-600">نقوم بتوصيل المعدات إلى موقع المشروع خلال 24 ساعة من تأكيد الطلب</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">أسعار تنافسية</h3>
              <p className="text-gray-600">نقدم أفضل الأسعار في السوق مع خصومات خاصة للمشاريع الكبيرة</p>
            </div>
          </div>
          
          {/* إحصائيات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-3xl font-bold text-amber-500 mb-2">150+</h3>
              <p className="text-gray-600">معدة متوفرة</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-3xl font-bold text-amber-500 mb-2">1,200+</h3>
              <p className="text-gray-600">عميل راضٍ</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-3xl font-bold text-amber-500 mb-2">15+</h3>
              <p className="text-gray-600">فرع في المملكة</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-3xl font-bold text-amber-500 mb-2">24/7</h3>
              <p className="text-gray-600">دعم فني متواصل</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم كيف تعمل المنصة */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">كيفية استئجار المعدات في <span className="text-amber-500">4 خطوات بسيطة</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* الخطوة 1 */}
            <div className="relative">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-xl font-bold">1</div>
              </div>
              <div className="hidden md:block absolute top-8 right-full w-full border-t-2 border-dashed border-amber-300"></div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">اختر معداتك</h3>
                <p className="text-gray-600">تصفح المعدات واختر ما يناسب احتياجاتك</p>
              </div>
            </div>
            
            {/* الخطوة 2 */}
            <div className="relative">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-xl font-bold">2</div>
              </div>
              <div className="hidden md:block absolute top-8 right-full w-full border-t-2 border-dashed border-amber-300"></div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">حدد الفترة</h3>
                <p className="text-gray-600">اختر تاريخ الاستلام والإرجاع المناسب لك</p>
              </div>
            </div>
            
            {/* الخطوة 3 */}
            <div className="relative">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-xl font-bold">3</div>
              </div>
              <div className="hidden md:block absolute top-8 right-full w-full border-t-2 border-dashed border-amber-300"></div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">أكمل الحجز</h3>
                <p className="text-gray-600">قم بتأكيد الطلب ودفع التأمين المطلوب</p>
              </div>
            </div>
            
            {/* الخطوة 4 */}
            <div className="relative">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-xl font-bold">4</div>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">استلم معداتك</h3>
                <p className="text-gray-600">نقوم بتوصيل المعدات إلى موقعك أو استلمها من أقرب فرع</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/how-it-works"
              className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-md transition-colors duration-300"
            >
              <span>تعرف على المزيد</span>
              <ChevronRight className="mr-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* قسم التصنيفات */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">تصفح حسب <span className="text-amber-500">التصنيف</span></h2>
            <Link
              to="/categories"
              className="text-amber-500 hover:text-amber-600 transition-colors duration-300 hidden md:flex items-center"
            >
              <span>عرض جميع التصنيفات</span>
              <ArrowLeft className="mr-2" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <div className="group relative h-60 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 right-0 p-6 w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                        <p className="text-white text-sm opacity-80">{category.count} معدة متوفرة</p>
                      </div>
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">
                        {category.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* زر للموبايل */}
          <div className="md:hidden text-center mt-8">
            <Link
              to="/categories"
              className="inline-block text-amber-500 hover:text-amber-600 font-medium"
            >
              عرض جميع التصنيفات
            </Link>
          </div>
        </div>
      </section>

      {/* قسم المعدات المميزة */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">المعدات <span className="text-amber-500">المميزة</span></h2>
            <Link
              to="/categories"
              className="text-amber-500 hover:text-amber-600 transition-colors duration-300 hidden md:flex items-center"
            >
              <span>عرض جميع المعدات</span>
              <ArrowLeft className="mr-2" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEquipment.map((equipment) => (
              <div
                key={equipment.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        equipment.available
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {equipment.available ? "متوفر" : "غير متوفر"}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-white/80 hover:bg-gray-200 rounded-full text-gray-700 transition-colors duration-300">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-500 text-sm font-medium">{equipment.category}</span>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="text-gray-800 text-sm mr-1">{equipment.rating}</span>
                      <span className="text-gray-500 text-xs mr-1">({equipment.ratingCount})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{equipment.name}</h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin size={14} className="ml-1" />
                    <span>{equipment.location}</span>
                  </div>

                  <ul className="mb-4">
                    {equipment.specs.map((spec, index) => (
                      <li key={index} className="text-gray-600 text-sm flex items-center mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-2"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">السعر اليومي</div>
                    <div className="text-xl font-bold text-amber-500">{equipment.dailyRate} ر.س</div>
                  </div>
                  
                  {equipment.available ? (
                    <Link
                      to={`/categories/${equipment.id}`}
                      className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md transition-colors duration-300 font-bold"
                    >
                      تأجير الآن
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="block w-full text-center bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed font-bold"
                    >
                      غير متوفر حالياً
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* زر للموبايل */}
          <div className="md:hidden text-center mt-8">
            <Link
              to="/categories"
              className="inline-block text-amber-500 hover:text-amber-600 font-medium"
            >
              عرض جميع المعدات
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الخدمات */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* زخرفة خلفية */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-70"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">خدماتنا <span className="text-amber-500">المتكاملة</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">نقدم باقة متكاملة من الخدمات لضمان تجربة استئجار مثالية تلبي احتياجاتك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-lg bg-amber-100 flex items-center justify-center mb-6">
                <Truck className="text-amber-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">توصيل وتركيب</h3>
              <p className="text-gray-600 mb-4">نقوم بتوصيل المعدات لموقع العمل وتركيبها وتجهيزها للاستخدام</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>تحديد موعد التوصيل المناسب</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>تركيب وتجهيز بواسطة فنيين مختصين</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>شرح طريقة الاستخدام الآمن للمعدات</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-lg bg-amber-100 flex items-center justify-center mb-6">
                <Shield className="text-amber-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">ضمان وصيانة</h3>
              <p className="text-gray-600 mb-4">نوفر ضمان شامل على جميع المعدات مع خدمة صيانة طارئة</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>ضمان الجودة طوال فترة التأجير</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>استجابة سريعة في حالات الطوارئ</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>توفير بديل في حالة تعطل المعدة</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-lg bg-amber-100 flex items-center justify-center mb-6">
                <Users className="text-amber-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">استشارات فنية</h3>
              <p className="text-gray-600 mb-4">فريق من الخبراء لمساعدتك في اختيار المعدات المناسبة لمشروعك</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>مستشارون متخصصون في مختلف المجالات</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>تقييم احتياجات المشروع بدقة</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="text-amber-500 ml-2" size={16} />
                  <span>اقتراح الحلول الأمثل لتوفير التكاليف</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* قسم آراء العملاء */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">آراء <span className="text-amber-500">عملائنا</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">نفخر بثقة عملائنا وتقييماتهم الإيجابية لخدماتنا المتميزة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-amber-500 ml-4 flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={i < testimonial.rating ? "fill-yellow-400" : ""}
                          size={16}
                        />
                      ))}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mt-4 pr-4 border-r-4 border-amber-200">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center text-amber-500 hover:text-amber-600 font-medium transition-colors duration-300"
            >
              <span>جميع آراء العملاء</span>
              <ArrowLeft className="mr-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* قسم اتصل بنا */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-amber-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">تواصل معنا للحصول على <span className="text-amber-500">استشارة مجانية</span></h2>
                <p className="text-gray-600 mb-8">فريقنا من الخبراء جاهز للإجابة على جميع استفساراتك ومساعدتك في اختيار المعدات المناسبة لمشروعك</p>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center ml-4">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">اتصل بنا على</p>
                    <p className="text-gray-800 text-lg font-bold">+966 123 456 7890</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center ml-4">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">ساعات العمل</p>
                    <p className="text-gray-800 text-lg font-bold">طوال أيام الأسبوع، 8 صباحاً - 8 مساءً</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-10 shadow-xl relative">
                <div className="absolute top-0 right-10 w-20 h-20 bg-amber-100 rounded-full -translate-y-1/2 z-0"></div>
                <form className="space-y-6 relative z-10">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">الاسم الكامل</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full p-3 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full p-3 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="example@domain.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full p-3 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="05xxxxxxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">رسالتك</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full p-3 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="أخبرنا عن مشروعك واحتياجاتك..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-bold transition-colors duration-300"
                  >
                    إرسال الطلب
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم النشرة البريدية */}
      <section className="py-12 bg-amber-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-right">
              <h2 className="text-2xl font-bold text-white mb-2">اشترك في نشرتنا البريدية</h2>
              <p className="text-white text-opacity-90">احصل على آخر العروض والتحديثات مباشرة إلى بريدك الإلكتروني</p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني" 
                  className="flex-grow p-3 rounded-r-md focus:outline-none text-gray-800" 
                />
                <button 
                  type="submit" 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-l-md transition-colors duration-300"
                >
                  اشتراك
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;