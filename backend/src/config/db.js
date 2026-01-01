
import mysql from "mysql2/promise";


const db = await mysql.createConnection({
  host: process.env?.DB_HOST,
  user: process.env?.DB_USER,
  password: process.env?.DB_PASSWORD,
  database: process.env?.DB_NAME,
});

try {
  await db.connect();
  console.log("database is connected");
} catch (err) {
  console.log(err);
}

export default db;
