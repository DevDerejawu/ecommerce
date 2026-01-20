import cors from 'cors';
import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import sessionPgk from "express-session";
import MySQLStorePgk from "express-mysql-session";
import dotenv from "dotenv";
dotenv.config();
//route handlers
import getProductsRoute from "./src/routes/route_products.js";
import cartRoutes from './src/routes/route_cart.js';
import catAndSubCategoriesRoute  from './src/routes/route_cat_sub_category.js';
import orderAndOrderItemsRoute from './src/routes/route_order_and_order_items.js';
import authRoute from './src/routes/route_auth.js';
import adminRoute from './src/routes/route_admin.js';
import routeDetailOfProduct from './src/routes/route_detail.js';
import routePayment from './src/routes/route_payment.js';
import routeCheckoutSnapshot from './src/routes/route_checkout_snapshot.js';
import routeOrderConfirmation from './src/routes/route_order_confirmation.js';
import routeAdminDashboard from './src/routes/route_admin_dashboard.js'




const app = express();
const session = sessionPgk.default || sessionPgk;
const MySQLStore = MySQLStorePgk(session);
const sessionStore = new MySQLStore({
  host: process.env?.DB_HOST,
  user: process.env?.DB_USER,
  password: process.env?.DB_PASSWORD,
  database: process.env?.DB_NAME,
  port: 26100,
  checkExpirationInterval: 900000, 
  expiration: 1000 * 60 * 60 * 24 * 90, 
});

app.use(session({
  secret: process.env?.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000*60*60*24*90,
    httpOnly: true,
    secure: true,   
    sameSite: 'none'}
}));


app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process?.env.FRONT_END_DOMAIN_URL, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, 
  })
);
app.set('trust proxy', 1);

app.use(express.static(path.join(process.cwd(), "..", "frontend/dist")));


app.use('/images', express.static(path.join(process.cwd(), 'images')));

//route to get products like featured, new-arrival, top-rated, top-selling and cheap-products.
app.use("/api/products", getProductsRoute);

//a route to handle about cart related things like deleting, updating, adding to cart, getting a cart itemd when the page loads and deleting all cart items;
app.use("/api/cart", cartRoutes);


//getting categories and subcategories from database when the page loads!
app.use("/api", catAndSubCategoriesRoute);

//creating orders and order_items table when a user clicks I'm correct btn after clicking place your order.
app.use("/api/order", orderAndOrderItemsRoute);


//used to handle both signing in and signing up.
app.use("/api/auth", authRoute);

//CRUD and others opreration for admin.
app.use("/api/products", adminRoute);


//used to get detail of a product
app.use("/api/products", routeDetailOfProduct);

//use to make payment
app.use("/api/checkout", routePayment);

//handle checkout snapshot
app.use("/api/checkout", routeCheckoutSnapshot);

//order confirmation
app.use("/api/order", routeOrderConfirmation);

app.use("/api/admin", routeAdminDashboard);

export const PORT = process.env?.PORT || 4000;

app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(process.cwd(), "..", "frontend", "dist", "index.html")
  );
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening at ${PORT}.`);
  }
});
