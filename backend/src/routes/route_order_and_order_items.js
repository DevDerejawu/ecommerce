import {createOrderWithItemsController} from '../controllers/control_order_and_order_items.js'
import express from 'express';
import {validateBilling} from '../middlewares/middle_checkout_validate.js';
const route = express.Router();
route.post("/order-order-items", validateBilling, createOrderWithItemsController);
export default route;