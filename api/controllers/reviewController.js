const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
exports.createreview = handlerFactory.createOne(Review);
exports.deletereview = handlerFactory.deleteOne(Review);
exports.getAllreview = handlerFactory.getAllpop1(Review, {
  path: 'pataint',
  select: 'first_name last_name -_id',
});
