import db from "../config/db.js";

export const OrderModel = {
  async getOrderById({ orderId, userId, sessionId }) {
    try {
      let sql, values;
      if(userId){
        sql =  `
        SELECT *
        FROM orders
        WHERE id = ?
          AND user_id = ?
        `;
        values = [orderId, userId];
      }else{
        sql =  `
        SELECT *
        FROM orders
        WHERE id = ?
          AND session_id = ?
        `;
        values = [orderId, sessionId];
      }
      const [orders] = await db.query(sql, values);

      if (orders.length === 0) {
        return {
          success: false,
          status: 404,
          message: "Order not found",
          data: null
        };
      }

      const order = orders[0];

      

      const [items] = await db.query(
        `
        SELECT oi.product_id, p.name, p.front_image, oi.quantity, oi.price
        FROM order_items oi
        JOIN products p ON p.id = oi.product_id
        WHERE oi.order_id = ?
        `,
        [orderId]
      );

      return {
        success: true,
        status: 200,
        message: "Order fetched successfully",
        data: { order, items }
      };

    } catch (err) {
      console.error(err);
      return {
        success: false,
        status: 500,
        message: "Database error",
        data: null
      };
    }
  },

  // fetch all orders for a user 
  async getOrders({ userId, sessionId }) {
    try {
      let sql, values;
      if(userId){

       sql = `
        SELECT *
        FROM orders
        WHERE user_id = ?
        `;

        values = [userId];
      }else{
         sql = `
        SELECT *
        FROM orders
        WHERE session_id = ?
       
        `;

        values = [sessionId];
      }
      const [orders] = await db.query(sql, values);
      if(orders.length===0){
        return {
        success: false,
        status: 404,
        message: "Orders not found.",
        data: null
      };
      }

      return {
        success: true,
        status: 200,
        message: "Orders fetched successfully",
        data: orders
      };

    } catch (err) {
      console.error(err);
      return {
        success: false,
        status: 500,
        message: "Database error",
        data: null
      };
    }
  }
};
