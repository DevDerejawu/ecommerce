import express from "express";
import parse from "../utils/parse.js";
import {
  handleCreatingProduct,
  handleGettingAllProducts,
  handleUpdatingProduct,
  handleDeletingProduct
} from "../controllers/control_admin.js";

import { uploadImages } from "../middlewares/middle_validate_upload_images.js";
import { validateImageUrl } from "../middlewares/middle_validate_image_url.js";
import { validateInputValues } from "../middlewares/middle_validate_input_values.js";

const route = express.Router();

function parseMiddle(req, res, next) {
  try {
    if (req.body.data) {
      req.body = { ...req.body, ...parse(req.body.data) }; 
       
    }
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON data",
      error: err.message
    });
  }
}
// Get all products per page
route.get("/page", handleGettingAllProducts);

// Create product
route.post(
  "/post",
  uploadImages,
  parseMiddle,
  validateImageUrl,
  validateInputValues,
  handleCreatingProduct
);

// Update product
route.patch(
  "/update/:id",
  uploadImages,
  parseMiddle,
  validateImageUrl,
  validateInputValues,
  handleUpdatingProduct
);

// Delete product
route.delete(
  "/delete/:id",
  handleDeletingProduct
);

export default route;
