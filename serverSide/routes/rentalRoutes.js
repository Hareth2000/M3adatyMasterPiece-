// routes/rentalRoutes.js
const express = require("express");
const router = express.Router();
const {
  createRental,
  getRentalsByOwner,
  updateRentalStatus,
} = require("../controllers/rentalController");

// إنشاء طلب تأجير جديد
router.post("/", createRental);

// جلب الطلبات الخاصة بمعدات مؤجر معين
router.get("/by-owner", getRentalsByOwner);

// تحديث حالة طلب التأجير (قبول/رفض... إلخ)
router.patch("/:rentalId", updateRentalStatus);

module.exports = router;
