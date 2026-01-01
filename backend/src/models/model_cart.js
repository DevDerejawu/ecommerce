import db from "../config/db.js";
import rightNow from "../utils/today.js";




 // Fetch all cart items for a user or guest
 
async function getAllCart(data) {
  try {
    const { sessionId, userId } = data;
    let sql, values;
    if(userId){
      sql = `
      SELECT p.front_image, p.back_image, p.name, p.id, p.description, c.delivery_date, c.quantity, c.price
      FROM products as p
      INNER JOIN cart as c ON p.id = c.product_id
      WHERE c.user_id = ?
    `;
    values = [userId];
    }else{
      sql = `
      SELECT p.front_image, p.back_image, p.name, p.id, p.description, c.delivery_date, c.quantity, c.price
      FROM products as p
      INNER JOIN cart as c ON p.id = c.product_id
      WHERE c.session_id = ?
    `;
    values = [sessionId]
    }
    const [rows] = await db.query(sql, values);
    console.log(rows.length)
    if(rows.length === 0){
      return{
      success: true,
      status: 200,
      message: "You don't have any item in your cart.",
      data: rows,
      error: null,
      }
    }
    return {
      success: true,
      status: 200,
      message: "Cart fetched successfully.",
      data: rows,
      error: null,
    };
  } catch (error) {
    
    return {
      success: false,
      status: 500,
      message: "Failed to fetch cart.",
      data: null,
      error: error.message,
    };
  }
}

// Add product to cart
 
async function postToCart(data) {
  try {
    const { productId, quantity, deliveryDate, price, sessionId, userId } = data;
    let sql, values;

    if (userId) {
      sql = `SELECT * FROM cart WHERE product_id = ? AND user_id = ?`;
      values = [productId, userId];
    } else {
      sql = `SELECT * FROM cart WHERE product_id = ? AND session_id = ?`;
      values = [productId, sessionId];
    }

    const [rows] = await db.query(sql, values);

    // Insert new product
    if (rows.length === 0) {
      const insertSql = `
        INSERT INTO cart (product_id, quantity, delivery_date, session_id, user_id, price, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      await db.query(insertSql, [
        productId,
        quantity,
        deliveryDate,
        sessionId,
        userId || null,
        price,
        rightNow()
      ]);

      return {
        success: true,
        status: 201,
        message: "Product added to cart successfully.",
        data: null,
        error: null,
      };
    }

    // Update quantity
    const newQty = rows[0].quantity + quantity;

    await db.query(
      `UPDATE cart SET quantity = ?, updated_at =? WHERE id = ?`,
      [newQty, rightNow(), rows[0].id]
    );

    return {
      success: true,
      status: 200,
      message: "Cart updated successfully.",
      data: null,
      error: null,
    };
  } catch (error) {
   
    return {
      success: false,
      status: 500,
      message: "Unable to add product to cart.",
      data: null,
      error: error.message,
    };
  }
}


async function patchSingleProductOfCart(data) {
  try {
    const { productId, quantity, sessionId, userId, deliveryDate } = data;

    let sql, values;

    if (userId) {
      sql = `
        UPDATE cart
        SET quantity = COALESCE(?, quantity),
            delivery_date = COALESCE(?, delivery_date),
            updated_at = ?
        WHERE (? IS NULL OR product_id = ?) AND user_id = ?
      `;
      values = [quantity, deliveryDate, rightNow(), productId, productId, userId];
    } else {
      sql = `
        UPDATE cart
        SET quantity = COALESCE(?, quantity),
            delivery_date = COALESCE(?, delivery_date),
            updated_at = ?
        WHERE (? IS NULL OR product_id = ?) AND session_id = ?
      `;
      values = [quantity, deliveryDate, rightNow(), productId, productId, sessionId];
    }

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return {
        success: false,
        status: 404,
        message: "Cart item not found.",
        data: null,
        error: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Cart item updated successfully.",
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Failed to update cart item.",
      data: null,
      error: error.message, error
    };
  }
}


 // Delete a single product from cart
 
async function deleteOneProductFromTheCart(data) {
  try {
    const { productId, sessionId, userId } = data;

    let sql, values;

    if (userId) {
      sql = `DELETE FROM cart WHERE product_id = ? AND user_id = ?`;
      values = [productId, userId];
    } else {
      sql = `DELETE FROM cart WHERE product_id = ? AND session_id = ?`;
      values = [productId, sessionId];
    }

    const [result] = await db.query(sql, values);

    console.log("model", result, data)

    if (result.affectedRows === 0) {
     
      return {
        success: false,
        status: 404,
        message: "Product not found in cart.",
        data: null,
        error: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Product removed from cart successfully.",
      data: null,
      error: null,
    };
  } catch (error) {
     console.log(error)
    return {
      success: false,
      status: 500,
      message: "Unable to delete product from cart.",
      data: null,
      error: error.message,
    };
  }
}


/*async function deleteAllCartItems(data) {
  try {
    const { sessionId, userId } = data;

    let sql, values;

    if (userId) {
      sql = `DELETE FROM cart WHERE user_id = ?`;
      values = [userId];
    } else {
      sql = `DELETE FROM cart WHERE session_id = ?`;
      values = [sessionId];
    }

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return {
        success: false,
        status: 200,
        message: "Cart is already empty.",
        data: null,
        error: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "All cart items cleared successfully.",
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Failed to clear cart.",
      data: null,
      error: error.message,
    };
  }
}
*/
export {
  getAllCart,
  postToCart,
  patchSingleProductOfCart,
  deleteOneProductFromTheCart,
  //deleteAllCartItems,
};
