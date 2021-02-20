const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const config = require('../config/config');
const { Payments } = require('../models');

const createPayment = catchAsync(async (req, res) => {
  try {
      const instance = new Razorpay({
          key_id: config.razorkey,
          key_secret: config.razorsecret,
      });
      // const {amount, currency,receipt} = req.body
      const options = {
        amount: 50000, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
    };
      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send("Some error occured");

      res.json(order);
  } catch (error) {
      res.status(500).send(error);
  }
});

const paymentSuccess = catchAsync(async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      userId
    } = req.body;

    const shasum = crypto.createHmac('sha256', config.razorsecret);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not legit!' });

      const newPayment = Payments({
        razorpayDetails: {
          userId: userId,
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
        success: true,
      });
      await paymentService.createNewPaymentSuccess(newPayment);
      // res.send(payment);
    res.json({
      msg: 'success',
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = {
  createPayment,
  paymentSuccess
};

