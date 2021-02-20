
require('dotenv').config();
const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
  razorpayDetails: {
    userId: String,
    orderId: String,
    paymentId: String,
    signature: String,
  },
  success: Boolean,
}
);

const Payments = mongoose.model('paymentSchema', paymentSchema);

module.exports = Payments;