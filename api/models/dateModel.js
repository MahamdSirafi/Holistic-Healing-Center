const mongoose = require('mongoose');
const dateSchema = new mongoose.Schema(
  {
    canceled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['preview', 'review'],
      default: 'preview',
    },
    fees: {
      type: Number,
      required: [true, 'must enter fees'],
    },
    date: {
      required: [true, 'must enter date'],
      type: Date,
    },
    nextDate: {
      type: Date,
    },
    day: {
      required: [true, 'must enter day'],
      anum: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      type: String,
    },
    hour: {
      required: [true, 'must enter hour'],
      type: Number,
    },
    minute: {
      required: [true, 'must enter minute'],
      type: Number,
    },
    pataint: {
      required: [true, 'must enter pataint'],
      type: mongoose.Schema.ObjectId,
      ref: 'Pataint',
    },
    doctor: {
      required: [true, 'must enter doctor'],
      type: mongoose.Schema.ObjectId,
      ref: 'Doctor',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Dates = mongoose.model('Dates', dateSchema);
module.exports = Dates;
