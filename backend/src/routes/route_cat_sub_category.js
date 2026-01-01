import express from "express";
import {
  //handleGetCategories,
  handleGetSubcategories,
  handleGetCategoriesWithSubcategories,
} from "../controllers/control_cat_sub_category.js";

const route = express.Router();

// Fetch all categories
//route.get("/categories", handleGetCategories);

// Fetch all subcategories
route.get("/subcategories", handleGetSubcategories);

// Fetch categories with nested subcategories (recommended for frontend dropdowns)
route.get("/categories-with-subcategories", handleGetCategoriesWithSubcategories);

export default route;
