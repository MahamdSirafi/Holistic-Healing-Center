const User = require('../models/userModel');
const Dates = require('../models/dateModel');
const Wallet = require('../models/walletModel');
const { WeekDay } = require('../class/weekDay');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Doctor = require('../models/doctorModel');
const { dateClass } = require('../class/dateClass');
exports.getdate = handlerFactory.getOne(Dates);
exports.createdate = catchAsync(async (req, res, next) => {
  let lastDate = await Dates.find({
    pataint: req.user._id,
    doctor: req.body.doctor,
  }).sort('-date');
  lastDate = lastDate[0];
  const thisDoctor = await Doctor.findById(req.body.doctor).populate({
    path: 'department',
  });

  const walletUsr = await Wallet.findById(req.user._id);
  console.log(thisDoctor.department);
  let priceDep = thisDoctor.department.price;
  let priceReview = thisDoctor.department.rateForReview;
  if (lastDate && new Date(req.body.date) <= lastDate.nextDate) {
    priceDep = (priceDep * priceReview) / 100;
    req.body.status = 'review';
  } else {
    req.body.status = 'preview';
  }
  if (priceDep > walletUsr.balance)
    return next(
      new AppError(`you don't have balance for this ${req.body.status}`, 400)
    );
  //add for doctor
  const walletDoctor = await Wallet.findById(req.body.doctor);
  walletDoctor.balance +=
    (thisDoctor.department.rateForDoctor / 100) * priceDep;
  await walletDoctor.save();

  //add for admin
  const admin = await User.findOne({ role: 'admin' });
  const walletAdmin = await Wallet.findById(admin._id);
  walletAdmin.balance +=
    priceDep - (thisDoctor.department.rateForDoctor / 100) * priceDep;
  await walletAdmin.save();

  const doc = await Dates.create(req.body);
  res.status(201).json({
    status: 'succsess',
    doc,
  });
});

exports.updatedate = handlerFactory.updateOne(Dates);
exports.deletedate = handlerFactory.deleteOne(Dates);
exports.getAlldate = handlerFactory.getAllpop1(
  Dates,
  { path: 'doctor', select: '-_id first_name last_name' },
  { path: 'pataint', select: '-_id -adderss -photo -insurance' }
);
exports.available = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  const alldate = await Dates.find({
    canceled: false,
    date: { $gte: Date.now() },
  });
  const dateMain = doctor.date;
  if (!doctor) {
    return new AppError('doctor is not found with ID', 400);
  }
  const freeDate = dateFree(dateMain, alldate, doctor.duration);
  res.status(200).json({
    status: 'success',
    count: freeDate.length,
    freeDate,
  });
});

const dateFree = (all, take, duration) => {
  let data = [];
  all.forEach((element) => {
    let numSession = ((element.last - element.first) * 60) / duration; //عدد الجلسات خلال يوم
    for (let k = 0; k < 7; k++) {
      let newDate = new Date();
      newDate.setDate(k + newDate.getDate());
      if (newDate.getDay() === WeekDay[element.day])
        for1: for (let i = 0; i < numSession; i++) {
          //تحديد تاريخ الجلسة
          const setDate = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            newDate.getDate(),
            element.first + Math.trunc((i * duration) / 60),
            (i * duration) % 60,
            0
          );
          for (let i = 0; i < take.length; i++)
            if (setDate.toString() == take[i].date.toString()) {
              continue for1;
            }
          //شرط ليقارن الساعة الحالية ليعيد المواعيد من بعد الساعة الحالية في حال كان هنالك شاغر في نفس اليوم
          if (
            (new Date().getDay() === WeekDay[element.day] &&
              element.first + Math.trunc((i * duration) / 60) <
                new Date().getHours()) ||
            (new Date().getDay() === WeekDay[element.day] &&
              element.first + Math.trunc((i * duration) / 60) ==
                new Date().getHours() &&
              (i * duration) % 60 < new Date().getMinutes())
          )
            continue;
          data.push(
            new dateClass(
              setDate,
              element.day,
              element.first + Math.trunc((i * duration) / 60),
              (i * duration) % 60
            )
          );
        }
    }
  });
  return data;
};
