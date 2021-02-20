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

module.exports = {
  createPayment,
  createPaymentSuccess
};
