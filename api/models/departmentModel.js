const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema(
  {
    name: {
      required: [true, 'must enter '],
      type: String,
    },
    price: {
      required: [true, 'must enter price'],
      type: Number,
    },
    rate: {
      required: [true, 'must enter price'],
      type: Number,
      max: 99,
      min:1
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
