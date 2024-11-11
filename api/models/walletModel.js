const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0
  },

}, {
  timestamps: true,
  versionKey: false
});
const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
