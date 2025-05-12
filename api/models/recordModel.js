const mongoose = require('mongoose');
const recordSchema = new mongoose.Schema(
  {
    symptoms: {
      type: String,
    },
    diagnosis: {
      type: Number,
    },
    recipe: [
      {
        name: {
          required: [true, 'must enter name midecal'],
          type: String,
        },
        count: {
          required: [true, 'must enter count of midecal'],
          type: Number,
        },
        details: {
          required: [true, 'must enter details of midecal'],
          type: String,
        },
      },
    ],
    department: {
      required: [true, 'must enter price'],
      type: String,
    },
    dateId: {
      required: [true, 'must enter dateId'],
      type: mongoose.Schema.ObjectId,
      ref: 'Dates',
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
const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
