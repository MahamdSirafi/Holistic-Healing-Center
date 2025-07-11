const mongoose = require('mongoose');
const User = require('./userModel');
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
    date: [
      {
        first: {
          required: [true, 'must enter first time'],
          type: Number,
        },
        last: {
          required: [true, 'must enter last time'],
          type: Number,
        },
        day: {
          required: [true, 'must enter day'],
          enum: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          type: String,
        },
      },
    ],
    photo: {
      required: [true, 'must enter last photo'],
      type: String,
    },
    duration: {
      required: [true, 'must enter last duration'],
      type: Number,
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
doctorSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await User.findByIdAndDelete(doc._id);
  }
});
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
