import db from "../config/db.js";

// View details of a single product
async function getDetailOfSingleProduct(productId) {
  try {
    const [rows] = await db.query(
      `
      SELECT *
      FROM products
      WHERE id = ?
      `,
      [productId]
    );

    if (rows.length === 0) {
      return {
        success: false,
        status: 404,
        data: null,
        message: "Product not found or currently out of stock.",
        error: null,
      };
    }

    return {
      success: true,
      status: 200,
      data: rows[0],
      message: "Product details fetched successfully.",
      error: null,
    };
  } catch (error) {
    console.log(err)
    return {
      status: 500,
      data: null,
      message: "Failed to fetch product details.",
      error: error.message,
    };
  }
}

export default getDetailOfSingleProduct;
