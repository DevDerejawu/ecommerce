import {
  getSubcategories,
  getCategoriesWithSubcategories,
} from "../models/model_cat_sub_category.js";

// Get all categories
// async function handleGetCategories(req, res) {
//   try {
//     const result = await getCategories();
//     res.status(result.status).json(result);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       status: 500,
//       message: err.message || "Unknown server error fetching categories.",
//       data: [],
//     });
//   }
// }

// Get all subcategories
async function handleGetSubcategories(req, res) {
  try {
    const result = await getSubcategories();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Unknown server error fetching subcategories.",
      data: [],
    });
  }
}

// Get categories with nested subcategories
async function handleGetCategoriesWithSubcategories(req, res) {
  try {
    const result = await getCategoriesWithSubcategories();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Unknown server error fetching categories with subcategories.",
      data: [],
    });
  }
}

export {
  //handleGetCategories,
  handleGetSubcategories,
  handleGetCategoriesWithSubcategories,
};
