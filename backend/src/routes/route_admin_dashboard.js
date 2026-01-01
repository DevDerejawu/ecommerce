import express from "express";
import { adminDashboardController } from "../controllers/control_admin_dashboard.js"; 
import { adminMiddleware } from "../middlewares/middle_admin_check.js"; 

const route = express.Router();

route.get(
  "/dashboard",
  adminMiddleware,
  adminDashboardController
);

export default route;
