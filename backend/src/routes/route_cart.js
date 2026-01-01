import express from 'express';
import {
  handleGettingAllCart,
  handlePostingToCart,
  handlePatchSingleProductOfCart,
  handleDeleteOneProductFromTheCart,
  //handleDeleteAllCartItems,
} from '../controllers/control_cart.js';



const route = express.Router();

route.get("/get-all-cart", handleGettingAllCart);
route.post("/add-to-cart", handlePostingToCart);
route.patch("/update-cart", handlePatchSingleProductOfCart);
route.delete("/delete-single-cart-item/:id", handleDeleteOneProductFromTheCart);
//route.delete("/delete-all-cart-items", handleDeleteAllCartItems);

export default route;