import db from "../config/db.js";
import {createOrder, createOrderItem, deleteAllCartItems} from '../models/model_order_and_order_items.js'

export async function createOrderWithItemsController(req, res) {
  try {
    let sessionId = req.cookies?.sessionId;
    const userId = req.session?.user?.id || null;

    if (userId) {
      sessionId = null;
    } else {
      if (!sessionId) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Session expired at this time. If you logged in before, plese sign in again to resfresh the cookies, otherwise add to cart from scratch.",
          data: null,
          error: null,
        });
      }

      // Extend existing session cookie for guest
      res.cookie("sessionId", sessionId, {
        maxAge: 1000 * 60 * 60 * 24 * 90, 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
      });
    }
    const { orderItems, restOrderData, orderBillingInfo } = req.body;
    const order = {...{userId, sessionId}, ...orderBillingInfo, ...restOrderData};
    await db.beginTransaction();

    const orderResult = await createOrder(order);

    if (!orderResult.success) {
      throw new Error(orderResult.message);
    }

    const orderId = orderResult.data.orderId;

    for (const item of orderItems) {
      const itemResult = await createOrderItem({
        ...item,
         orderId,
      });

      if (!itemResult.success) {
        throw new Error(itemResult.message);
      }
    }


    // Commit transaction
    await db.commit();

    const deleteResult = await deleteAllCartItems({sessionId, userId});

    if(!deleteResult.success){
      return res.status(deleteResult.status).json(deleteResult);
    }

    return res.status(201).json({
      success: true,
      status: 201,
      data: { orderId },
      message: "Order and order items created successfully.",
      error: null,
    });
  } catch (error) {
    await db.rollback();
    console.log(error);
    return res.status(500).json({
      success: false,
      status: 500,
      data: null,
      message: "Failed to create order and order items.",
      error: error.message,
    });
  }
}
