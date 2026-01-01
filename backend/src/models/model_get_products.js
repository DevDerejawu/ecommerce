import db from "../config/db.js";

const successResponse = (data, message) => ({
  success: true,
  status: 200,
  message,
  error: null,
  data,
});

const errorResponse = (message, status, error) => ({
  success: false,
  status,
  message,
  error,
  data: [],
});

async function getFeaturedProducts() {
  try {
    const sql = `
      SELECT * 
      FROM products 
      WHERE featured = 1 
      ORDER BY price ASC 
      LIMIT 20
    `;
    const [rows] = await db.query(sql);

    return successResponse(rows, "Featured products fetched successfully");
  } catch (err) {
    return errorResponse("Unable to fetch featured products", 500, err.message);
  }
}

async function getTopSellingProducts() {
  try {
    const sql = `
      SELECT * 
      FROM products 
      ORDER BY sales DESC 
      LIMIT 20
    `;
    const [rows] = await db.query(sql);

    return successResponse(rows, "Top selling products fetched successfully");
  } catch (err) {
    return errorResponse(
      "Unable to fetch top selling products",
      500,
      err.message
    );
  }
}

async function getTopRatedProducts() {
  try {
    const sql = `
      SELECT * 
      FROM products 
      ORDER BY star_count DESC 
      LIMIT 20
    `;
    const [rows] = await db.query(sql);

    return successResponse(rows, "Top rated products fetched successfully");
  } catch (err) {
    return errorResponse(
      "Unable to fetch top rated products",
      500,
      err.message
    );
  }
}

async function getCheapProducts() {
  try {
    const sql = `
      SELECT * 
      FROM products 
      ORDER BY price ASC 
      LIMIT 20
    `;
    const [rows] = await db.query(sql);

    return successResponse(rows, "Cheap products fetched successfully");
  } catch (err) {
    return errorResponse("Unable to fetch cheap products", 500, err.message);
  }
}

async function getNewArrivalProducts() {
  try {
    const sql = `
      SELECT * 
      FROM products 
      ORDER BY created_at DESC 
      LIMIT 20
    `;
    const [rows] = await db.query(sql);

    return successResponse(rows, "New arrival products fetched successfully");
  } catch (err) {
    return errorResponse(
      "Unable to fetch new arrival products",
      500,
      err.message
    );
  }
}

async function getProductsBySubcategoryId(subcategoryId) {
  try {
    if (!subcategoryId) {
      return {
        success: false,
        status: 400,
        message: "Subcategory ID is required",
        error: "Missing subcategoryId",
        data: [],
      };
    }

    const sql = `
      SELECT 
        id,
        name,
        price,
        front_image,
        back_image,
        star_count,
        rating_star,
        featured,
        stock,
        brand,
        discount_percentage,
        availability_status,
        description,
        sales,
        created_at
      FROM products
      WHERE subcategory_id = ?
    `;

    const [rows] = await db.query(sql, [subcategoryId]);

    return {
      success: true,
      status: 200,
      message: "Products fetched successfully",
      error: null,
      data: rows,
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: "Failed to fetch products",
      error: err.message,
      data: [],
    };
  }
}

async function getProducts() {
  try {
    const [rows] = await db.query(`SELECT * FROM products`);

    if (!rows.length) {
      return {
        success: false,
        status: 404,
        message: " no products found.",
        data: rows,
        error: null,
      };
    }
    return {
      success: true,
      status: 200,
      message: "Products fetched successfully",
      data: rows,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch products",
      data: null,
      error: error.message,
    };
  }
}
export {
  getFeaturedProducts,
  getTopSellingProducts,
  getTopRatedProducts,
  getCheapProducts,
  getNewArrivalProducts,
  getProductsBySubcategoryId,
  getProducts
};
