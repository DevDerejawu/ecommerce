import express from 'express';
import handleMakingPayment from '../controllers/control_payment.js';
const route = express.Router();
route.post("/payment", handleMakingPayment);
export default route;