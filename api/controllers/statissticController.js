const User = require('../models/userModel');
const Pataint = require('../models/pataintModel');
const Dates = require('../models/dateModel');
const Doctor = require('../models/doctorModel');
const catchAsync = require('../utils/catchAsync');
exports.getstatstic = catchAsync(async (req, res, next) => {
  let doctor = await Doctor.find();
  let pataint = await Pataint.find();
  let newdate = await Dates.find();
  res.status(200).json({
    status: 'succses',
    pataint: pataint.length,
    doctor: doctor.length,
    date: newdate.length,
  });
});
