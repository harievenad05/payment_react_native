require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();


router
  .route('/').post(auth('payments'), paymentController.createPayment);
  router
  .route('/success').post(auth('payments'), validate(paymentValidation.createPaymentSuccess), paymentController.paymentSuccess);

module.exports = router;