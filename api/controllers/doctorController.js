const Doctor = require('../models/doctorModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.getdoctor = handlerFactory.getOne(Doctor, {
  path: 'department',
  select: '-_id',
});
exports.createdoctor = handlerFactory.createOne(Doctor);
exports.updatedoctor = handlerFactory.updateOne(Doctor);
exports.deletedoctor = handlerFactory.deleteOne(Doctor);
exports.getAlldoctor = handlerFactory.getAll(Doctor, {
  path: 'department',
  select: '-_id',
});
