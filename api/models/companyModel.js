const mongoose = require('mongoose');
const dcompanySchema = new mongoose.Schema(
  {
    name: {
      required: [true, 'must enter name'],
      type: String,
    },
    sall: {
      required: [true, 'must enter sall'],
      type: Number,
      max: 99,
      min: 1,
    },
    descreption: {
      required: [true, 'must enter descreption'],
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Company = mongoose.model('Company', dcompanySchema);
module.exports = Company;
