const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  verifyPayment,
  getPaymentsByStudent,
  getPaymentsByTutor,
} = require("../controllers/payment.controller");

router.post("/create-checkout-session", createCheckoutSession);
router.post("/verify-payment", verifyPayment);
router.get("/payments/student/:email", getPaymentsByStudent);
router.get("/payments/tutor/:email", getPaymentsByTutor);

module.exports = router;
