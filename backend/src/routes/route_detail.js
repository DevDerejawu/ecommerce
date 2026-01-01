import detailOfProduct from '../controllers/control_detail.js';
import express from 'express';
const route = express.Router();

route.get("/detail/get/:id", detailOfProduct);

export default route;