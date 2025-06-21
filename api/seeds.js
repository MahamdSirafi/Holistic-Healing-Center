const mongoose = require('mongoose');
const User = require('./models/userModel');
const dotenv = require('dotenv').config();
const Wallet = require('./models/walletModel');
const admin = {
  name: 'admin',
  email: 'admin@gmail.com',
  password: '123454321',
  role: 'admin',
};
if (process.env.NODE_ENV === 'development') {
  mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(async (result) => {
      const user = await User.create(admin);
      console.log('create admin is success');
      await Wallet.create({ _id: user._id, balance: 0 });
      console.log('create admin wallet is success');
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  mongoose
    .connect(process.env.DATABASE)
    .then(async (result) => {
      await User.create(admin);
      console.log('create admin is success');
    })
    .catch((err) => {
      console.log(err);
    });
}
