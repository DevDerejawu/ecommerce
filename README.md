🛍️ E-Commerce Full-Stack Portfolio Project
A complete e-commerce platform built with React, Node.js, Express, and MySQL. Features user authentication, product management, shopping cart, order processing, and Stripe payment integration.

📋 Table of Contents
Tech Stack

Features

Project Structure

Database Schema

API Endpoints

Context Providers

🚀 Tech Stack
Frontend
React 18 - UI library

React Router DOM - Routing

Tailwind CSS - Styling

React Hook Form - Form validation

Axios - HTTP requests

Stripe.js - Payment processing

Lucide React - Icons

Day.js - Date formatting

Backend
Node.js - Runtime environment

Express - Web framework

MySQL - Database

mysql2/promise - Database driver

Express Session - Session management

Express MySQL Session - Session store

bcrypt - Password hashing

Joi - Input validation

Multer - File upload handling

Stripe - Payment processing

CORS - Cross-origin resource sharing

Cookie Parser - Cookie handling

UUID - Unique ID generation

dotenv - Environment variables

✨ Features
User Features
🔐 User registration and login with session management

👤 Guest checkout with session tracking

🛒 Shopping cart (persists for guests and logged-in users)

🔍 Product search with debounced autocomplete

📱 Responsive design for all devices

⭐ Product ratings and reviews

📦 Order history and tracking

💳 Stripe payment integration

📧 Email confirmation (simulated)

Admin Features
📊 Admin dashboard

➕ Create new products 

✏️ Update existing products

🗑️ Delete products

📋 Paginated product management

Product Features
🖼️ Front/back image hover effect

🔄 Quantity controls

⭐ Star rating display

🏷️ Categories and subcategories

📦 Product dimensions and specifications

💰 Discount percentage

🗄️ Database Schema
Tables (8 total)
users - User accounts (id, name, email, password, role)

categories - Product categories (id, name)

subcategories - Product subcategories (id, name, category_id)

products - Product details (20+ fields including images, pricing, dimensions)

cart - Shopping cart items (product_id, quantity, session_id/user_id)

orders - Order information (shipping, payment, totals)

order_items - Products within orders (order_id, product_id, quantity, price)

checkout_snapshot - Temporary checkout data storage

Key Relationships
categories → subcategories (one-to-many)

subcategories → products (one-to-many)

users → orders (one-to-many)

users → cart (one-to-many)

orders → order_items (one-to-many)

products → order_items (one-to-many)

🔌 API Endpoints
Products (8 endpoints)
GET /api/products?subcategoryId={id} - Filter by subcategory

GET /api/products/get - All products

GET /api/products/page - Paginated products

GET /api/products/detail/get/:id - Single product

GET /api/products/{endpoint} - Featured (featured, new_arrival, top_selling, top_rated, cheap)

POST /api/products/post - Create product

PATCH /api/products/update/:id - Update product

DELETE /api/products/delete/:id - Delete product

Categories (2 endpoints)
GET /api/subcategories - All subcategories

GET /api/categories-with-subcategories - Categories with nested subcategories

Cart (4 endpoints)
GET /api/cart/get-all-cart - Get cart items

POST /api/cart/add-to-cart - Add to cart

PATCH /api/cart/update-cart - Update item

DELETE /api/cart/delete-single-cart-item/:id - Remove item

Auth (2 endpoints)
POST /api/auth/register - User registration

POST /api/auth/login - User login

Checkout (2 endpoints)
POST /api/checkout/checkout_snapshot/post - Save billing info

GET /api/checkout/checkout_snapshot/get - Get billing info

Orders (3 endpoints)
POST /api/order/order-order-items - Create order

GET /api/order - Get all orders

GET /api/order/:orderId - Get single order

Payment (1 endpoint)
POST /api/checkout/payment - Create Stripe payment intent

Admin (1 endpoint)
GET /api/admin/dashboard - Verify admin access

Total: 23 endpoints

🧩 Context Providers
BaseUrlContext - Provides API base URL to all components

CartContext - Global cart state with fetch, refresh, and cartCount

NotificationContext - Popup messages with auto-hide (success/error)

QuantitiesContext - Manages product quantities across components

SubcategoryIdContext - Tracks selected subcategory for filtering


