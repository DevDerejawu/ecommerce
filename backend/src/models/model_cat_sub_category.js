import db from "../config/db.js";

// Fetch all categories
// async function getCategories() {
//   try {
//     const sql = `SELECT id, name FROM categories ORDER BY name`;
//     const [rows] = await db.query(sql);

//     return {
//       success: true,
//       status: 200,
//       message: "Categories fetched successfully.",
//       data: rows,
//     };
//   } catch (err) {
//     return {
//       success: false,
//       status: 500,
//       message: "Unknown server issue while fetching categories.",
//       data: [],
//     };
//   }
// }

// Fetch all subcategories
async function getSubcategories() {
  try {
    const sql = `SELECT id, name FROM subcategories ORDER BY name`;
    const [rows] = await db.query(sql);

    return {
      success: true,
      status: 200,
      message: "Subcategories fetched successfully.",
      data: rows,
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: "Unknown server issue while fetching subcategories.",
      data: [],
    };
  }
}

// Fetch categories with nested subcategories
async function getCategoriesWithSubcategories() {
  try {
    const [categories] = await db.query(`SELECT id, name FROM categories ORDER BY name`);
    const [subcategories] = await db.query(`SELECT id, name, category_id FROM subcategories ORDER BY name`);

    const result = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      subcategories: subcategories
        .filter((sub) => sub.category_id === cat.id)
        .map((sub) => ({ id: sub.id, name: sub.name })),
    }));

    return {
      success: true,
      status: 200,
      message: "Categories with subcategories fetched successfully.",
      data: result,
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: "Unknown server issue while fetching categories with subcategories.",
      data: [],
    };
  }
}

export { 
  //getCategories, 
    getSubcategories, 
    getCategoriesWithSubcategories };
