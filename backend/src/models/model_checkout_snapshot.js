import db from "../config/db.js";
import rightNow from "../utils/today.js";

async function saveCheckoutSnapshot(data) {
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
    } = data;

    if (userId) {
      await db.query(
        `DELETE FROM checkout_snapshot WHERE user_id = ?`,
        [userId]
      );
    } else {
      await db.query(
        `DELETE FROM checkout_snapshot WHERE session_id = ?`,
        [sessionId]
      );
    }

    const sql = `
      INSERT INTO checkout_snapshot
        (user_id, session_id, name, email, phone, address, city, country, zip, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userId,
      sessionId,
      name,
      email,
      phone,
      address,
      city,
      country,
      zip,
      rightNow()
    ];

    const [result] = await db.query(sql, values);

    return {
      success: true,
      status: 201,
      message: "Checkout snapshot saved successfully.",
      data: {
        id: result.insertId,
        userId,
        sessionId,
      },
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      message: "Failed to save checkout snapshot.",
      data: null,
      error: error.message,
    };
  }
}


 // Fetch checkout snapshot for a user or guest session
 
async function getCheckoutSnapshot({ userId, sessionId }) {
  try {
    let sql, values;

    if (userId) {
      sql = `SELECT name, email, phone, address, city, country, zip FROM checkout_snapshot WHERE user_id = ?`;
      values = [userId];
    } else {
      sql = `SELECT name, email, phone, address, city, country, zip FROM checkout_snapshot WHERE session_id = ?`;
      values = [sessionId];
    }

    const [rows] = await db.query(sql, values);

    if (rows.length===0) {
      return {
        success: false,
        status: 404,
        message: "No checkout snapshot found, please fill the billing info first.",
        data: [],
        error: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Checkout snapshot fetched successfully.",
      data: rows[0],
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch checkout snapshot.",
      data: null,
      error: error.message,
    };
  }
}

export { saveCheckoutSnapshot, getCheckoutSnapshot };
