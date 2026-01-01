import express from "express";

import {
  handleCheapProducts,
  handleFeaturedProducts,
  handleTopRatedProducts,
  handleTopSellingProducts,
  handleNewArrivalProducts,
  handleGetProductsBySubcategory,
  handleGettingAllProducts
} from "../controllers/control_products.js";

const route = express.Router();

route.get('/cheap_products', handleCheapProducts);
route.get("/featured_products", handleFeaturedProducts);
route.get("/top_rated_products", handleTopRatedProducts);
route.get("/top_selling_products", handleTopSellingProducts);
route.get("/new_arrival_products", handleNewArrivalProducts);
route.get("/", handleGetProductsBySubcategory);
route.get("/get", handleGettingAllProducts);

export default route;