const Pataint = require('../models/pataintModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Wallet = require('../models/walletModel');
exports.getpataint = handlerFactory.getOne(Pataint);
exports.createpataint = catchAsync(async (req, res, next) => {
  const doc = await Pataint.create(req.body)
  const wa = await Wallet.create({ _id: doc._id })
  res.status(200).json({
    status: "success",
    doc
  })
})
exports.updatepataint = catchAsync(async (req, res, next) => {
  const doc = await Pataint.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    doc,
  });
});
exports.deletepataint = handlerFactory.deleteOne(Pataint);
exports.getAllpataint = handlerFactory.getAll(Pataint);
