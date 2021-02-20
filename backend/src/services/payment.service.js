const httpStatus = require('http-status');
const { Payments } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create new payment
 * @param {ObjectId} userId
 * @param {Object} paymentDetails
 * @returns {Promise<Payments>}
 */

const createNewPayment = async (userId, paymentDetails) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const payDetails = paymentDetails;
  return payDetails;
};

const createNewPaymentSuccess = async (paymentDetails) => {
  const payment = await paymentDetails.save();
  return payment;
};

module.exports = {
  createNewPayment,
  createNewPaymentSuccess
};