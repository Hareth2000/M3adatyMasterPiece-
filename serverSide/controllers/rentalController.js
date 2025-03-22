// controllers/rentalController.js
const Rental = require("../models/Rental");

// إنشاء طلب تأجير جديد (موجود عندك سابقاً)
exports.createRental = async (req, res) => {
  try {
    const {
      userId,
      equipmentId,
      startDate,
      endDate,
      phoneNumber,
      address,
    } = req.body;

    // التحقق من القيم الأساسية
    if (!userId || !equipmentId || !startDate || !endDate) {
      return res.status(400).json({ message: "بيانات مفقودة" });
    }

    // إنشاء وثيقة جديدة
    const newRental = new Rental({
      user: userId,
      equipment: equipmentId,
      startDate,
      endDate,
      phoneNumber,
      address,
      status: "pending",
    });

    await newRental.save();

    res.status(201).json({
      message: "تم إنشاء طلب التأجير بنجاح",
      rentalId: newRental._id,
    });
  } catch (error) {
    console.error("خطأ في إنشاء طلب التأجير:", error);
    res.status(500).json({ message: "حدث خطأ عند إنشاء طلب التأجير" });
  }
};

// الدالة: جلب الطلبات الخاصة بمؤجّر محدد (عبر ownerId)
exports.getRentalsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.query;
    if (!ownerId) {
      return res
        .status(400)
        .json({ message: "يجب توفير معرف المالك (ownerId)" });
    }

    // نجلب جميع الطلبات ونضمّن (populate) حقل equipment
    // مع  match: { ownerId } => يعني المعدات التي يملكها صاحب المعرف ownerId
    const allRentals = await Rental.find()
      .populate({
        path: "equipment",
        match: { ownerId },
      })
      .populate("user", "name email phoneNumber"); // جلب بيانات المستأجر أيضاً

    // قد يعود equipment = null لو لم يطابق الشرط، فلنأخذ فقط ما ليس null
    const filtered = allRentals.filter((r) => r.equipment !== null);

    return res.json(filtered);
  } catch (error) {
    console.error("خطأ في جلب الطلبات:", error);
    res.status(500).json({ message: "حدث خطأ عند جلب الطلبات" });
  }
};

// تحديث حالة الطلب (قبول / رفض / مدفوع / ملغي...)
exports.updateRentalStatus = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const { status } = req.body; // مثلاً "accepted" أو "rejected"

    // تحقّق إن كانت الحالة ضمن القيم المسموح بها
    const allowedStatuses = ["pending", "accepted", "rejected", "paid", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "قيمة حالة الطلب غير صالحة." });
    }

    const rental = await Rental.findByIdAndUpdate(
      rentalId,
      { status },
      { new: true } // نريد الوثيقة بعد التحديث
    );

    if (!rental) {
      return res.status(404).json({ message: "لم يتم العثور على الطلب" });
    }

    return res.json({
      message: "تم تحديث حالة الطلب بنجاح",
      rental,
    });
  } catch (error) {
    console.error("خطأ في تحديث حالة الطلب:", error);
    return res
      .status(500)
      .json({ message: "فشل في تحديث حالة الطلب", error: error.message });
  }
};
