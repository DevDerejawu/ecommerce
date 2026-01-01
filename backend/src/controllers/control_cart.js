import { v4 as uuid } from "uuid";
import {
  getAllCart,
  postToCart,
  patchSingleProductOfCart,
  deleteOneProductFromTheCart,
  //deleteAllCartItems,
} from "../models/model_cart.js";


 //Get all cart items
 
async function handleGettingAllCart(req, res) {
  try {
    const sessionId = req.cookies?.sessionId;
    const userId = req.session?.user?.id || null;

    if (!sessionId && !userId) {
  return res.status(200).json({
    success: false,
    status: 400,
    message: "Your cart is empty. Add products to get started!",
    data: [],
    error: null,
  });
}

    const result = await getAllCart({ sessionId, userId });
    

    res.status(result.status).json(result);
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error while fetching cart.",
      data: null,
      error: error.message,
    });
  }
}


 //Add product to cart
 
async function handlePostingToCart(req, res) {
  try {
    let sessionId = req.cookies?.sessionId;

    console.log("req.cookies?.sessionId", req.cookies?.sessionId)

    const userId = req.session?.user?.id || null;

    if(!userId){
      if (!sessionId) {
      sessionId = uuid();
    }
    }else{
      sessionId = null;
    }

    // Persist sessionId in cookie
    res.cookie("sessionId", sessionId, {
      maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    

    const result = await postToCart({
      ...req.body,
      sessionId,
      userId,
    });

    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error while adding to cart.",
      data: null,
      error: error.message,
    });
  }
}


 // Update quantity of a single cart item
 
async function handlePatchSingleProductOfCart(req, res) {
  try {
    const sessionId = req.cookies.sessionId;
    const userId = req.session?.user?.id || null;

    const result = await patchSingleProductOfCart({
      ...req.body,
      sessionId,
      userId,
    });
console.log("result", result, "front", req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error while updating cart item.",
      data: null,
      error: error.message,
    });
  }
}


 // Delete a single product from cart
 
async function handleDeleteOneProductFromTheCart(req, res) {
  try {
    const productId = req.params.id;
    const sessionId = req.cookies.sessionId;
    const userId = req.session?.user?.id || null;

    const result = await deleteOneProductFromTheCart({
      productId,
      sessionId,
      userId,
    });
    console.log("controller",result)
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error while deleting cart item.",
      data: null,
      error: error.message,
    });
  }
}

/*
async function handleDeleteAllCartItems(req, res) {
  try {
    const sessionId = req.cookies.sessionId;
    const userId = req.session?.user?.id || null;

    const result = await deleteAllCartItems({ sessionId, userId });

    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error while clearing cart.",
      data: null,
      error: error.message,
    });
  }
}*/

export {
  handleGettingAllCart,
  handlePostingToCart,
  handlePatchSingleProductOfCart,
  handleDeleteOneProductFromTheCart,
  //handleDeleteAllCartItems,
};
