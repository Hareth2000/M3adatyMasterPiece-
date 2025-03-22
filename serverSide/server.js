// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const partnerRoutes = require("./routes/partnerRoutes");

dotenv.config();

const app = express();

// وسائط الأساسية
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// تكوين CORS
app.use(
  cors({
    origin: "http://localhost:5173", // عنوان تطبيق الواجهة الأمامية
    credentials: true,
  })
);

// المجلد العمومي للملفات الثابتة
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// وسيط لسجلات الطلبات
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB متصل بنجاح"))
  .catch((err) => console.log("❌ خطأ في اتصال MongoDB:", err));

// ربط مسارات API
app.use("/api/users", userRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/partners", partnerRoutes);


// معالج الأخطاء العام
app.use((err, req, res, next) => {
  console.error("خطأ عام:", err);
  res.status(500).json({
    message: "حدث خطأ في الخادم",
    error:
      process.env.NODE_ENV === "development" ? err.message : "حدث خطأ داخلي",
  });
});

// مسار غير موجود
app.use((req, res) => {
  res.status(404).json({ message: "المسار غير موجود" });
});

// بدء تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
});
