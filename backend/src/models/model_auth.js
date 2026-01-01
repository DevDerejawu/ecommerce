import db from "../config/db.js";
import bcrypt from "bcrypt";
import rightNow from "../utils/today.js";

 // Register user
 
async function manageSigningup(data) {
  try {
    const { name, email, password } = data;
    console.log(data);

    // Check if email already exists
    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return {
        success: false,
        status: 409,
        message: "Email already registered",
        data: null,
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, rightNow()]
    );

    return {
      success: true,
      status: 201,
      message: "You are registered successfully!",
      data: {
        userId: result.insertId,
      },
    };

  } catch (err) {
    console.error("model",err);
    return {
      success: false,
      status: 500,
      message: "Unable to register due to server issue. Please try again.",
      data: null,
    };
  }
}

 // Login user
 
async function manageSigningin(data) {
  try {
    const { email, password } = data;

    console.log(data);

    const [rows] = await db.query(
      "SELECT id, password, role FROM users WHERE email = ?",
      [email]
    );

    
    if (rows.length === 0) {
      return {
        success: false,
        status: 404,
        message: "Email not found",
        data: null,
      };
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
       console.error("model",err);
      return {
        success: false,
        status: 401,
        message: "Invalid password",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Logged in successfully!",
      data: {
        userId: rows[0].id,
        role: rows[0].role,
      },
    };

  } catch (err) {
    console.error(err)
    return {
      success: false,
      status: 500,
      message: "Server error. Please try again later.",
      data: null,
    };
  }
}

export {
  manageSigningup,
  manageSigningin,
};
