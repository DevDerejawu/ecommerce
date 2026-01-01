import db from "../config/db.js";
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(55) NOT NULL,
  email VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULLCURRENT_TIMESTAMP
)`;

const creteCategoryTable = `
 CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(79) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULLCURRENT_TIMESTAMP
)`;

const createSubcategoriesTable = `
 CREATE TABLE IF NOT EXISTS subcategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL,
  UNIQUE (name, category_id),
  FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
)`;

const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(56) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  subcategory_id INT NOT NULL,
  back_image VARCHAR(247),
  front_image VARCHAR(243) NOT NULL,
  star_count INT DEFAULT 0,
  rating_star DECIMAL(2,1) DEFAULT 0.0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  stock INT NOT NULL DEFAULT 0,
  brand VARCHAR(76),
  discount_percentage DECIMAL(6,2),
  availability_status TEXT,
  weight DECIMAL(6,2),
  width DECIMAL(6,2),
  height DECIMAL(5,2),
  depth DECIMAL(5,2),
  return_policy TEXT,
  description TEXT,
  sales INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL,
  FOREIGN KEY (subcategory_id)
    REFERENCES subcategories(id)
    ON DELETE CASCADE
)`;

const createCartTable = `
  CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  session_id VARCHAR(89),
  user_id INT,
  delivery_date VARCHAR(40),
  price DECIMAL(10, 2) NOT NULL,
  c created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL,
  CHECK (
    (user_id IS NOT NULL AND session_id IS NULL)
    OR
    (user_id IS NULL AND session_id IS NOT NULL)
  ),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  session_id VARCHAR(100),
  name VARCHAR(65) NOT NULL,
  email VARCHAR(65) NOT NULL,
  phone VARCHAR(14) NOT NULL,
  shipping_address VARCHAR(150) NOT NULL,
  city VARCHAR(60) NOT NULL,
  country VARCHAR(56),
  postal_code VARCHAR(20) NOT NULL,
  payment_method VARCHAR(56) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(4, 2) NOT NULL,
  tax_fee DECIMAL(10, 2),
  delivery_date VARCHAR(30) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status ENUM('pending','processing','completed') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
)`;


const createOrderItemsTable = `
  CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL,
  FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,
  FOREIGN KEY (product_id)
    REFERENCES products(id)
)`;


const createRiviewTable = `CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL,
  UNIQUE (product_id, user_id),
  FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
)`;

const checkoutSnapshot = `CREATE TABLE checkout_snapshot (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,           
    session_id VARCHAR(100),    
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
  updated_at DATETIME NULL
)`

async function CreateTables(){
  try{
    
    //await db.query(createUsersTable);
    //await db.query(creteCategoryTable);
    //await db.query(createSubcategoriesTable);
    //await db.query(createProductsTable);
    //await db.query(createCartTable);
    //await db.query(checkoutSnapshot);
    //await db.query(createOrdersTable);
    //await db.query(createOrderItemsTable);

    console.log("8 tables are created.")
  }catch(err){console.log(err)}
}

//await CreateTables();