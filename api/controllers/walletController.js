const Wallet = require('../models/walletModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getwallet = handlerFactory.getOne(Wallet);
exports.getAllwallet = handlerFactory.getAll(Wallet);
exports.updatewallet = handlerFactory.updateOne(Wallet);
exports.deposit = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
  const doc = await Wallet.findById(req.user._id);
  const doc2 = await Wallet.findByIdAndUpdate(
    req.user._id,
    {
      balance: doc.balance + req.body.balance,
    },
    { new: true }
  );
  res.status(200).json({ status: 'succsess', doc2 });
});
exports.withdrawal = catchAsync(async (req, res, next) => {
  const doc = await Wallet.findById(req.user._id);
  if (req.body.balance > doc.balance)
    return next(new AppError("you don't have this balance", 400));
  const doc2 = await Wallet.findByIdAndUpdate(
    req.user._id,
    {
      balance: doc.balance - req.body.balance,
    },
    { new: true }
  );
  res.status(200).json({ status: 'succsess', doc2 });
});
