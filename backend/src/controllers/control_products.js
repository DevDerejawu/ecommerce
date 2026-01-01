import {
  getFeaturedProducts,
  getTopSellingProducts,
  getTopRatedProducts,
  getCheapProducts,
  getNewArrivalProducts,
  getProductsBySubcategoryId,
  getProducts
} from "../models/model_get_products.js";

 async function handleFeaturedProducts(req, res) {
  try {
    const result = await getFeaturedProducts();
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected server error while fetching featured products",
      error: err.message,
      data: [],
    });
  }
}

async function handleTopSellingProducts(req, res) {
  try {
    const result = await getTopSellingProducts();
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected server error while fetching top selling products",
      error: err.message,
      data: [],
    });
  }
}


 async function handleTopRatedProducts(req, res) {
  try {
    const result = await getTopRatedProducts();
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected server error while fetching top rated products",
      error: err.message,
      data: [],
    });
  }
}

 async function handleCheapProducts(req, res) {
  try {
    const result = await getCheapProducts();
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected server error while fetching cheap products",
      error: err.message,
      data: [],
    });
  }
}

 async function handleNewArrivalProducts(req, res) {
  try {
    const result = await getNewArrivalProducts();
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected server error while fetching new arrival products",
      error: err.message,
      data: [],
    });
  }
}


async function handleGetProductsBySubcategory(req, res) {
  try{
    const { subcategoryId } = req.query;
    const data = await getProductsBySubcategoryId(subcategoryId);
    res.status(data.status).json(data);
  }catch(err){
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to fetch products",
      error: err.message,
      data: []
    })
  }
}

async function handleGettingAllProducts(req, res) {
  try {
    const result = await getProducts();
    return res.status(result.status).json(result);
  } catch (err) {
      console.error(err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to fetch products",
      data: [],
      error: err.message
    });
  }
}
export {
  handleCheapProducts,
  handleFeaturedProducts,
  handleTopRatedProducts,
  handleTopSellingProducts,
  handleNewArrivalProducts,
  handleGetProductsBySubcategory,
  handleGettingAllProducts
};
