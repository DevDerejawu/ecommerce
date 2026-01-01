import db from "../config/db.js";
import rightNow from "../utils/today.js";

// Create a new order
async function createOrder(orderData) {
  try {
    const {
      userId,
      sessionId,
      name,
      email,
      phone,
      address,
      city,
      country,
      zip,
      paymentMethod,
      subtotal,
      deliveryFee,
      deliveryDate,
      total,
      taxFee
    } = orderData;

    const [result] = await db.query(
      `
      INSERT INTO orders (
        user_id,
        session_id,
        name,
        email,
        phone,
        shipping_address,
        city,
        country,
        postal_code,
        payment_method,
        subtotal,
        delivery_fee,
        delivery_date,
        total,
        tax_fee,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        sessionId,
        name,
        email,
        phone,
        address,
        city,
        country,
        zip,
        paymentMethod,
        subtotal,
        deliveryFee,
        deliveryDate,
        total,
        taxFee,
        rightNow()
      ]
    );

    return {
      success: true,
      status: 201,
      data: {
        orderId: result.insertId,
      },
      message: "Order created successfully.",
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      data: null,
      message: "Failed to create order.",
      error: error.message,
    };
  }
}


// Create a new order item
async function createOrderItem(orderItemData) {
  try {
    const {
      orderId,
      productId,
      quantity,
      price,
    } = orderItemData;

    const [result] = await db.query(
      `
      INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        price,
        created_at
      ) VALUES (?, ?, ?, ?, ?)
      `,
      [
        orderId,
        productId,
        quantity,
        price,
        rightNow()
      ]
    );

    return {
      success: true,
      status: 201,
      data: {
        orderItemId: result.insertId,
      },
      message: "Order item created successfully.",
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      data: null,
      message: "Failed to create order item.",
      error: error.message,
    };
  }
}


async function deleteAllCartItems(data) {
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


export {createOrder, createOrderItem, deleteAllCartItems};
