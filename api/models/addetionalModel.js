const mongoose = require('mongoose');
const addetionalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must enter name addditonal'],
    },
    type: {
      type: String,
      enum: ['تصوير', 'تحليل'],
      required: [true, 'must enter name status'],
    },
    file: {
      type: String,
    },
    recourd: {
      required: [true, 'must enter recourd'],
      type: mongoose.Schema.ObjectId,
      ref: 'Recourd',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Addetionals = mongoose.model('Addetionals', addetionalSchema);
module.exports = Addetionals;
