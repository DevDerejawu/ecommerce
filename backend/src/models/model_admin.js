import db from "../config/db.js";
import rightNow from "../utils/today.js";
const Product = {
  create: async (data) => {
    try {
      const sql = `
        INSERT INTO products (
          name,
          price,
          subcategory_id,
          featured,
          stock,
          brand,
          discount_percentage,
          availability_status,
          weight,
          width,
          height,
          depth,
          return_policy,
          description,
          back_image,
          front_image,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.name,
        data.price,
        data.subcategory_id,
        data.featured ?? false,
        data.stock ?? 0,
        data.brand,
        data.discount_percentage,
        data.availability_status,
        data.weight,
        data.width,
        data.height,
        data.depth,
        data.return_policy,
        data.description,
        data.back_image,
        data.front_image,
        rightNow()
      ];

      const [result] = await db.query(sql, values);

      if (!result.insertId) {
        return {
          success: false,
          status: 400,
          message: "Unable to create product",
          data: null,
          error: "INSERT_FAILED"
        };
      }

      return {
        success: true,
        status: 201,
        message: "Product created successfully",
        data: { productId: result.insertId },
        error: null
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Database error while creating product",
        data: null,
        error: error.message
      };
    }
  },

  
  getAll: async ({ limit = 20, offset }) => {
    try {
      // Get total count
      const [[countResult]] = await db.query(
        "SELECT COUNT(*) AS total FROM products"
      );

      // Get paginated data
      const [rows] = await db.query(
        `
        SELECT *
        FROM products
        ORDER BY id DESC
        LIMIT ? OFFSET ?
        `,
        [limit, offset]
      );

      return {
        success: true,
        status: 200,
        message: "Products fetched successfully",
        data: rows,
        totalRow: countResult.total,
        error: null
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        status: 500,
        message: "Failed to fetch products",
        data: null,
        error: error.message
      };
    }
  },

  update: async (id, data) => {
    try {
      const sql = `
        UPDATE products SET
          name = ?,
          price = ?,
          subcategory_id = ?,
          featured = ?,
          stock = ?,
          brand = ?,
          discount_percentage = ?,
          availability_status = ?,
          weight = ?,
          width = ?,
          height = ?,
          depth = ?,
          return_policy = ?,
          description = ?,
          back_image = COALESCE(?, back_image),
          front_image = COALESCE(?, front_image),
          updated_at = ?
        WHERE id = ?
      `;

      const values = [
        data.name,
        data.price,
        data.subcategory_id,
        data.featured,
        data.stock,
        data.brand,
        data.discount_percentage,
        data.availability_status,
        data.weight,
        data.width,
        data.height,
        data.depth,
        data.return_policy,
        data.description,
        data.back_image,
        data.front_image,
        rightNow(),
        id
      ];

      const [result] = await db.query(sql, values);

      if (!result.affectedRows) {
        return {
          success: false,
          status: 404,
          message: "Product not found",
          data: null,
          error: null
        };
      }

      return {
        success: true,
        status: 200,
        message: "Product updated successfully",
        data: { updated: result.affectedRows },
        error: null
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        status: 500,
        message: "Failed to update product",
        data: null,
        error: error.message
      };
    }
  },

  
   //Delete product
   
  delete: async (id) => {
    try {
      const [result] = await db.query(
        "DELETE FROM products WHERE id = ?",
        [id]
      );

      if (!result.affectedRows) {
        return {
          success: false,
          status: 404,
          message: "Product not found",
          data: null,
          error: null
        };
      }

      return {
        success: true,
        status: 200,
        message: "Product deleted successfully",
        data: { deleted: result.affectedRows },
        error: null
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        status: 500,
        message: "Failed to delete product",
        data: null,
        error: error.message
      };
    }
  }
};

export default Product;
