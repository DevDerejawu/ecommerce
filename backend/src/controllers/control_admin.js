import Product from "../models/model_admin.js";
import compressImages from "../utils/compress_image.js";


 //Create product
 
async function handleCreatingProduct(req, res) {
  try {
    const body = req.body;
    
    if (!body) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Product data is required",
        data: null
      });
    }

     let frontImagePath = body.front_image;
    let backImagePath = body.back_image;

    // If uploaded as file => compress & save
    if (req.files?.front_image?.[0]) {
      frontImagePath = await compressImages(
        req.files.front_image[0]
      );
    }

    if (req.files?.back_image?.[0]) {
      backImagePath = await compressImages(
        req.files.back_image[0]
      );
    }
    if (!frontImagePath || !backImagePath) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Both front and back images are required",
        data: null
      });
    }

    const result = await Product.create({
      ...body,
      front_image:frontImagePath,
      back_image:backImagePath
    });

    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to create product",
      data: null,
      error: err.message
    });
  }
}


async function handleGettingAllProducts(req, res) {
  try {
    const page = Number(req.query.page)|| 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    console.log("Number(req.query.page)", Number(req.query.page))
    console.log("page", page, "limit", limit)

    const result = await Product.getAll({ limit, offset });

    return res.status(result.status).json({...result, ...{page, limit, offset}});
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


 //Update product
 
async function handleUpdatingProduct(req, res) {
  try {
    console.log("runs");
    const { id } = req.params;
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Product data is required",
        data: null
      });
    }

     let frontImagePath = body.front_image || null;
    let backImagePath = body.back_image || null;

  //if there is uploaded file
    if (req.files?.front_image?.[0]) {
      frontImagePath = await compressImages(
        req.files.front_image[0]
      );
    }

    if (req.files?.back_image?.[0]) {
      backImagePath = await compressImages(
        req.files.back_image[0]
      );
    }
    const result = await Product.update(id, {
      ...body,
      front_image:frontImagePath,
      back_image:backImagePath
    });
console.log(result);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to update product",
      data: null,
      error: err.message
    });
  }
}


 // Delete product
 
async function handleDeletingProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await Product.delete(id);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to delete product",
      data: null,
      error: err.message
    });
  }
}

export {
  handleCreatingProduct,
  handleGettingAllProducts,
  handleUpdatingProduct,
  handleDeletingProduct
};
