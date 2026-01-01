import express from "express";
import {validateBilling} from '../middlewares/middle_checkout_validate.js'
import  { handleCheckoutSnapshot, handleGetCheckoutSnapshot   } from "../controllers/control_checkout_snapshot.js";

const route = express.Router();

route.post("/checkout_snapshot/post", validateBilling, handleCheckoutSnapshot);
route.get("/checkout_snapshot/get", handleGetCheckoutSnapshot);

export default route;