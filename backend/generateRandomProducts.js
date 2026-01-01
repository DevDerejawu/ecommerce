
import db from "./src/config/db.js";

const categoriesData = [
  {
    name: "Electronics",
    subcategories: [
      "Mobile Phones",
      "Laptops",
      "Tablets",
      "Headphones",
      "Smart Watches",
      "Cameras",
      "Speakers",
      "Computer Accessories",
      "Chargers",
      "Power Banks",
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      "Men Clothing",
      "Women Clothing",
      "Kids Clothing",
      "Shoes",
      "Bags",
      "Watches",
      "Jewelry",
      "Sunglasses",
      "Traditional Wear",
      "Sportswear",
    ],
  },
  {
    name: "Home & Living",
    subcategories: [
      "Furniture",
      "Kitchen Appliances",
      "Cookware",
      "Home Decor",
      "Lighting",
      "Bedding",
      "Bathroom Accessories",
      "Cleaning Supplies",
      "Storage & Organization",
      "Garden & Outdoor",
    ],
  },
  {
    name: "Sports & Outdoors",
    subcategories: [
      "Fitness Equipment",
      "Sports Shoes",
      "Gym Wear",
      "Outdoor Gear",
      "Cycling",
      "Camping",
      "Team Sports",
      "Yoga & Pilates",
      "Water Sports",
      "Sports Accessories",
    ],
  },
  {
    name: "Beauty & Personal Care",
    subcategories: [
      "Skincare",
      "Haircare",
      "Makeup",
      "Fragrances",
      "Men Grooming",
      "Personal Hygiene",
      "Beauty Tools",
      "Organic Beauty",
      "Nail Care",
      "Body Care",
    ],
  },
  {
    name: "Health & Wellness",
    subcategories: [
      "Vitamins & Supplements",
      "Medical Devices",
      "First Aid",
      "Fitness Supplements",
      "Health Monitors",
      "Ayurvedic Products",
      "Weight Management",
      "Mental Wellness",
      "Pain Relief",
      "Sexual Wellness",
    ],
  },
  {
    name: "Toys & Games",
    subcategories: [
      "Action Figures",
      "Educational Toys",
      "Board Games",
      "Puzzles",
      "Remote Control Toys",
      "Dolls",
      "Outdoor Toys",
      "Building Blocks",
      "Video Games",
      "Kids Vehicles",
    ],
  },
  {
    name: "Books & Stationery",
    subcategories: [
      "Fiction",
      "Non-Fiction",
      "Academic Books",
      "Children Books",
      "Notebooks",
      "Pens & Pencils",
      "Office Supplies",
      "Art Supplies",
      "Exam Preparation",
      "Magazines",
    ],
  },
  {
    name: "Automotive",
    subcategories: [
      "Car Accessories",
      "Bike Accessories",
      "Car Electronics",
      "Car Care",
      "Motorbike Gear",
      "Helmets",
      "Vehicle Tools",
      "Tires",
      "Lubricants",
      "Spare Parts",
    ],
  },
  {
    name: "Groceries",
    subcategories: [
      "Rice & Grains",
      "Snacks",
      "Beverages",
      "Cooking Oil",
      "Spices",
      "Dairy Products",
      "Frozen Foods",
      "Organic Foods",
      "Breakfast Items",
      "Dry Fruits",
    ],
  },
];


const randomPrice = () => parseFloat((Math.random() * 900 + 100).toFixed(2));
const randomRating = () => parseFloat((Math.random() * 4 + 1).toFixed(1));
const randomStars = () => Math.floor(Math.random() * 500);
const randomFeatured = () => Math.random() < 0.3;
const randomDecimal = (max) => parseFloat((Math.random() * max).toFixed(2));
const randomInt = (max) => Math.floor(Math.random() * max);

const generateRandomProducts = async () => {
  try {
    await db.beginTransaction();

    for (const category of categoriesData) {
      const [categoryResult] = await db.query(
        `INSERT INTO categories (name) VALUES (?)`,
        [category.name]
      );
      const categoryId = categoryResult.insertId;

      for (const subName of category.subcategories) {
        
        const [subResult] = await db.query(
          `INSERT INTO subcategories (name, category_id) VALUES (?, ?)`,
          [subName, categoryId]
        );
        const subcategoryId = subResult.insertId;

        
        for (let i = 1; i <= 8; i++) {
          const productName = `${subName} Product ${i}`;
          const dummyFrontImage = `https://picsum.photos/300/300?random=${subcategoryId}-${i}-front`;
          const dummyBackImage = `https://picsum.photos/300/300?random=${subcategoryId}-${i}-back`;

          await db.query(
            `
            INSERT INTO products (
              name, price, subcategory_id, back_image, front_image,
              star_count, rating_star, featured, stock, brand,
              discount_percentage, availability_status,
              weight, width, height, depth,
              return_policy, description, sales
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
              productName,         
              randomPrice(),       
              subcategoryId,       
              dummyBackImage,      
              dummyFrontImage,     
              randomStars(),       
              randomRating(),      
              randomFeatured(),
              randomInt(100),      
              "Generic Brand",     
              randomDecimal(30),   
              "In Stock",          
              randomDecimal(5),    
              randomDecimal(50),   
              randomDecimal(50),   
              randomDecimal(50),   
              `${Math.floor(Math.random()* 40 + 10)}-day return policy`,                 
              `Dummy description for ${productName}`, 
              randomInt(1000),     
            ]
          );
        }
      }
    }

    await db.commit();
    console.log("Categories, subcategories, and products created successfully!");
  } catch (err) {
    await db.rollback();
    console.error("Seeding failed:", err.message);
  } 
};

//generateRandomProducts();
