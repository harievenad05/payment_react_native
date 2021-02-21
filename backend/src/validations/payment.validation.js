const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPayment = {
  body: Joi.object()
    .keys({
      amount: Joi.number().required(),
      currency: Joi.string().required(),
      receipt: Joi.string().required(),
    }),
};

const getPayments = {
  query: Joi.object().keys({
    userId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createPaymentSuccess = {
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId),
      orderCreationId: Joi.string().required(),
      razorpayPaymentId: Joi.string().required(),
      razorpayOrderId: Joi.string().required(),
      razorpaySignature: Joi.string().required(),
    }),
};

const getPaymentbyUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPayment,
  createPaymentSuccess,
  getPayments,
  getPaymentbyUserId
};
