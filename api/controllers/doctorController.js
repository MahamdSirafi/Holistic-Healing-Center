const Doctor = require('../models/doctorModel');
const Department = require('../models/departmentModel'); // تأكد من استيراد نموذج القسم
const Dates = require('../models/dateModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Wallet = require('../models/walletModel');
exports.getdoctor = handlerFactory.getOne(Doctor, {
  path: 'department',
  select: 'name price -_id',
});
exports.createdoctor = catchAsync(async (req, res, next) => {
  const doctorDoc = await Doctor.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    sex: req.body.sex,
    phone: req.body.phone,
    expertise: req.body.expertise,
    photo: req.body.photo,
    date: req.body.date,
    department: req.body.department,
    duration: req.body.duration,
  });
  const authUser = await User.create({
    email: req.body.email,
    password: '123454321',
    role: 'doctor',
    photo: req.body.photo,
    _id: doctorDoc._id,
  });
  const walletDoc = await Wallet.create({
    _id: doctorDoc._id,
  });
  res.status(200).json({
    status: 'success',
    doctorDoc,
  });
});
exports.updatedoctor = handlerFactory.updateOne(Doctor);
exports.deletedoctor = handlerFactory.deleteOne(Doctor);
exports.getAlldoctor = handlerFactory.getAllpop1(Doctor, {
  path: 'department',
  select: 'name price -_id',
});

exports.getStatistics = catchAsync(async (req, res, next) => {
  const doctorId = req.user._id;

  // استعلام واحد للحصول على كل البيانات المطلوبة
  const dates = await Dates.find({
    doctor: doctorId,
    canceled: false,
  });

  // استخدام Map لتخزين المرضى الفريدين
  const uniquePatients = new Map();

  dates.forEach((date) => {
    if (date.pataint) {
      uniquePatients.set(date.pataint.toString(), true);
    }
  });

  res.status(200).json({
    status: 'success',
    doc: {
      number_of_reservations: dates.length,
      number_of_patients: uniquePatients.size,
    },
  });
});

exports.getAlldoctorDates = catchAsync(async (req, res, next) => {
  const departments = await Department.find(); // استرجاع جميع الأقسام

  const results = await Promise.all(
    departments.map(async (department) => {
      const doctors = await Doctor.find({
        department: department._id,
      }).select('first_name last_name date');

      return {
        department: department.name,
        doctors: doctors.map((doctor) => ({
          first_name: doctor.first_name,
          last_name: doctor.last_name,
          schedule: doctor.date,
        })),
      };
    })
  );

  res.status(200).json({
    status: 'success',
    data: results,
  });
});
