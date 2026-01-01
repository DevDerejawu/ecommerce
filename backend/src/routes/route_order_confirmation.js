import express from "express";
import { OrderController } from "../controllers/controle_order_confirmation.js"; 

const route = express.Router();
route.get("/" ,OrderController.getOrders);
route.get("/:orderId", OrderController.getOrder);

export default route;
