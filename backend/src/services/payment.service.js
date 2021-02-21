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

/**
 * Query for payments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPayments = async (filter, options) => {
  const payments = await Payments.paginate(filter, options);
  return payments;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getPaymentByuserId = async (id) => {
  return Payments.find({"userId" : id});
};

const createNewPaymentSuccess = async (paymentDetails) => {
  const payment = await Payments.create(paymentDetails);
  return payment;
};

module.exports = {
  createNewPayment,
  createNewPaymentSuccess,
  queryPayments,
  getPaymentByuserId
};