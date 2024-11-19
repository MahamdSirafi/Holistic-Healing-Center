const Doctor = require('../models/doctorModel');
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
  })
  const authUser = await User.create({
    email: req.body.email,
    password: "123454321",
    role: "doctor",
    photo: req.body.photo,
    _id: doctorDoc._id
  })
  const walletDoc = await Wallet.create({
    _id: doctorDoc._id
  })
  res.status(200).json({
    status: "success",
    doctorDoc
  })
})
exports.updatedoctor = handlerFactory.updateOne(Doctor);
exports.deletedoctor = handlerFactory.deleteOne(Doctor);
exports.getAlldoctor = handlerFactory.getAllpop1(Doctor, {
  path: 'department',
  select: 'name price -_id',
});
