const User = require('../models/userModel');
const Pataint = require('../models/pataintModel');
const Company = require('../models/companyModel');
const Dates = require('../models/dateModel');
const Wallet = require('../models/walletModel');
const Doctor = require('../models/doctorModel');
const { WeekDay } = require('../class/weekDay');
const { dateClass } = require('../class/dateClass');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

// ===================== Get One Date =====================
exports.getdate = handlerFactory.getOne(Dates);

// ===================== Create New Date =====================
exports.createdate = catchAsync(async (req, res, next) => {
  const patientId = req.user._id;
  const doctorId = req.body.doctor;
  const requestedDate = new Date(req.body.date);

  // Get the last appointment with this doctor
  let lastDate = await Dates.find({
    pataint: patientId,
    doctor: doctorId,
  }).sort('-date');
  lastDate = lastDate[0];

  // Get doctor and department info
  const doctor = await Doctor.findById(doctorId).populate('department');
  if (!doctor) return next(new AppError('Doctor not found', 404));

  const department = doctor.department;
  const walletUser = await Wallet.findById(patientId);

  if (!walletUser) return next(new AppError('User wallet not found', 404));

  let appointmentType = 'preview';
  let price = department.price;
  console.log('preview :', price);
  if (lastDate && requestedDate <= lastDate.nextDate) {
    price = (price * department.rateForReview) / 100;
    appointmentType = 'review';
    console.log('review :', price);
  }

  // Check for insurance and apply discount if applicable
  const patient = await Pataint.findById(patientId);
  if (patient.insurance) {
    const company = await Company.findOne({ name: patient.insurance });
    if (!company) return next(new AppError('Insurance company not found', 404));
    price = (price * company.sall) / 100;
    console.log('Insurance :', price);
  }

  // Check if user has enough balance
  if (price > walletUser.balance) {
    return next(
      new AppError(
        `Insufficient balance for ${appointmentType} your balance is ${walletUser.balance} The required balance is ${price}`,
        400
      )
    );
  }

  req.body.status = appointmentType;
  req.body.fees = price;

  // Deduct from patient wallet
  walletUser.balance -= price;
  await walletUser.save();

  // Credit doctor wallet
  const walletDoctor = await Wallet.findById(doctorId);

  if (!walletDoctor) return next(new AppError('Doctor wallet not found', 404));

  const doctorShare = (department.rateForDoctor / 100) * price;
  walletDoctor.balance += doctorShare;
  await walletDoctor.save();

  // Credit admin wallet
  const admin = await User.findOne({ role: 'admin' });
  const walletAdmin = await Wallet.findById(admin._id);

  if (!walletAdmin) return next(new AppError('Admin wallet not found', 404));

  walletAdmin.balance += price - doctorShare;
  await walletAdmin.save();

  // Create appointment
  const doc = await Dates.create(req.body);
  res.status(201).json({
    status: 'success',
    doc,
  });
});

// ===================== Update Date =====================
exports.updatedate = handlerFactory.updateOne(Dates);

// ===================== Delete Date =====================
exports.deletedate = handlerFactory.deleteOne(Dates);

// ===================== Get Dates for Doctor =====================
exports.getDateDoctor = catchAsync(async (req, res, next) => {
  const appointments = await Dates.find({
    date: { $gte: Date.now() },
    doctor: req.user._id,
  }).populate({
    path: 'pataint',
    select: 'first_name last_name',
  });

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    doc: appointments,
  });
});

// ===================== Get All Dates (Admin/Manager) =====================
exports.getAlldate = handlerFactory.getAllpop1(
  Dates,
  { path: 'doctor', select: 'first_name last_name -_id' },
  { path: 'pataint', select: '-adderss -photo -insurance -_id ' }
);
exports.getDateUser = catchAsync(async (req, res, next) => {
  const appointments = await Dates.find(
    {
      date: { $gte: Date.now() },
      pataint: req.user._id,
    },
    { pataint: 0 }
  ).populate({
    path: 'doctor',
    select: 'first_name last_name department -_id',
    populate: {
      path: 'department',
      select: 'name -_id',
    },
  });

  const formattedAppointments = appointments.map((appointment) => ({
    ...appointment.toObject(),
    doctor: {
      ...appointment.doctor.toObject(),
      department: appointment.doctor.department.name,
    },
  }));

  res.status(200).json({
    status: 'success',
    results: formattedAppointments.length,
    doc: formattedAppointments,
  });
});
// ===================== Get Available Dates for a Doctor =====================
exports.available = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return next(new AppError('Doctor not found', 404));

  const upcomingAppointments = await Dates.find({
    canceled: false,
    date: { $gte: Date.now() },
  });

  const availableSlots = calculateAvailableDates(
    doctor.date,
    upcomingAppointments,
    doctor.duration
  );

  res.status(200).json({
    status: 'success',
    count: availableSlots.length,
    freeDate: availableSlots,
  });
});

// ===================== Helper: Calculate Available Slots =====================
const calculateAvailableDates = (schedule, takenSlots, duration) => {
  const available = [];

  schedule.forEach((slot) => {
    const sessionsPerDay = ((slot.last - slot.first) * 60) / duration;

    for (let offset = 0; offset < 7; offset++) {
      const candidateDate = new Date();
      candidateDate.setDate(candidateDate.getDate() + offset);

      if (candidateDate.getDay() === WeekDay[slot.day]) {
        sessionLoop: for (let i = 0; i < sessionsPerDay; i++) {
          const hour = slot.first + Math.floor((i * duration) / 60);
          const minute = (i * duration) % 60;

          const sessionDate = new Date(
            candidateDate.getFullYear(),
            candidateDate.getMonth(),
            candidateDate.getDate(),
            hour,
            minute,
            0
          );

          // التأكد من عدم التعارض مع مواعيد محجوزة
          for (let taken of takenSlots) {
            if (sessionDate.getTime() === new Date(taken.date).getTime()) {
              continue sessionLoop;
            }
          }

          // تجاهل الأوقات السابقة في نفس اليوم
          const now = new Date();
          if (
            candidateDate.toDateString() === now.toDateString() &&
            (hour < now.getHours() ||
              (hour === now.getHours() && minute < now.getMinutes()))
          ) {
            continue;
          }

          const finalDate = new Date(sessionDate);

          available.push({
            date: finalDate.toISOString(), // UTC
            day: slot.day,
            hour: finalDate.getUTCHours(), // ✅ UTC
            minute: finalDate.getUTCMinutes(), // ✅ UTC
          });
        }
      }
    }
  });

  return available;
};
