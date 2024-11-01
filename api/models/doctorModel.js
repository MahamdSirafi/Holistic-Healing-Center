const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema(
  {
    first_name: {
      required: [true, 'must enter first_name'],
      type: String,
    },
    last_name: {
      required: [true, 'must enter last_name'],
      type: String,
    },
    email: {
      required: [true, 'must enter email'],
      unique: [true, 'email must not repit'],
      type: String,
    },
    phone: {
      required: [true, 'must enter phone'],
      unique: [true, 'phone must not repit'],
      type: String,
    },
    sex: {
      required: [true, 'must enter sex'],
      type: String,
    },
    expertise: {
      required: [true, 'must enter expertise'],
      type: Number,
    },
    specialization: {
      required: [true, 'must enter specialization'],
      type: String,
    },
    date: {
      type: String,
    },
    department: {
      required: [true, 'must enter department'],
      type: mongoose.Schema.ObjectId,
      ref: 'Department',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
