
import mysql from "mysql2/promise";


const db = await mysql.createConnection({
  host: process.env?.DB_HOST || "localhost",
  user: process.env?.DB_USER || "root",
  password: process.env?.DB_PASSWORD || "root",
  database: process.env?.DB_NAME || "portfolio_ecommerce_db",
});

try {
  await db.connect();
  console.log("database is connected");
} catch (err) {
  console.log(err);
}

export default db;
