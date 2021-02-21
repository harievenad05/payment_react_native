
require('dotenv').config();
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
  razorpayDetails: {
    userId: String,
    orderId: String,
    paymentId: String,
    signature: String,
  },
  userId: {
    type: String,
    trim: true,
  },
  success: Boolean,
}
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * @typedef paymentSchema
 */

const Payments = mongoose.model('paymentSchema', paymentSchema);

module.exports = Payments;