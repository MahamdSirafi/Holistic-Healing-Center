const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    message: {
      required: [true, 'must enter message'],
      type: String,
    },
    rate: {
      required: [true, 'must enter rate'],
      max: 5,
      min: 1,
      type: Number,
    },
    pataint: {
      required: [true, 'must enter pataint'],
      type: mongoose.Schema.ObjectId,
      ref: 'Pataint',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
