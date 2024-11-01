const mongoose = require('mongoose');
const pataintSchema = new mongoose.Schema(
  {
    first_name: {
      required: [true, 'must enter first_name'],
      type: String,
    },
    last_name: {
      required: [true, 'must enter last_name'],
      type: String,
    },
    phone: {
      required: [true, 'must enter phone'],
      unique: [true, 'phone must not repit'],
      type: String,
    },
    adderss: {
      required: [true, 'must enter adderss'],
      type: String,
    },
    sex: {
      required: [true, 'must enter adderss'],
      enum: ['mail', 'femail'],
      type: String,
    },
    blood: {
      required: [true, 'must enter adderss'],
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      type: String,
    },
    insurance: {
      default: function () {
        return this.image_insurance != undefined ? true : false;
      },
      type: Boolean,
    },
    image_insurance: {
      type: String,
    },
    birth_day: {
      required: [true, 'must enter birth day'],
      type: Date,
    },
    photo: {
      required: [true, 'must enter birth day'],
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Pataint = mongoose.model('Pataint', pataintSchema);
module.exports = Pataint;
