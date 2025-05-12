const Record = require('../models/recordModel');
const Dates = require('../models/dateModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getRecord = handlerFactory.getOne(
  Record,
  {
    path: 'doctor',
    select: 'first_name last_name -_id',
  },
  {
    path: 'dateId',
    select: 'status date nextDate -_id',
  }
);
exports.createRecord = catchAsync(async (req, res, next) => {
  const date = await Dates.findById(req.body.dateId);
  req.body.pataint = date.pataint;
  req.body.doctor = req.user._id;
  const doc = await Record.create(req.body);
  res.status(201).json({
    status: 'success',
    doc,
  });
});
exports.updateRecord = handlerFactory.updateOne(Record);
exports.deleteRecord = handlerFactory.deleteOne(Record);
exports.getAllRecord = handlerFactory.getAllpop1(
  Record,
  {
    path: 'doctor',
    select: 'first_name last_name -_id',
  },
  {
    path: 'dateId',
    select: 'status date nextDate -_id',
  }
);
