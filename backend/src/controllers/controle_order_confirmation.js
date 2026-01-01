import { OrderModel } from "../models/model_order_confirmation.js";

export const OrderController = {
  async getOrder(req, res) {
    const { orderId } = req.params;
    let sessionId = req.cookies?.sessionId;
    const userId = req.session?.user?.id || null;

    if (userId) {
      sessionId = null;
    } else {
      if (!sessionId) {
        return res.status(401).json({
          success: false,
          status: 401,
          message:
            "Session expired at this time. If you logged in before, plese sign in again to resfresh the cookies.",
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

    const result = await OrderModel.getOrderById({ orderId, userId, sessionId });
    res.status(result.status).json(result);
  },

  async getOrders(req, res) {
    let sessionId = req.cookies?.sessionId;
    const userId = req.session?.user?.id || null;
    if (userId) {
      sessionId = null;
    } else {
      if (!sessionId) {
        return res.status(401).json({
          success: false,
          status: 401,
          message:
            "Session expired at this time. If you logged in before, plese sign in again to resfresh the cookies.",
          data: null,
          error: null,
        });
      }
    }

    const result = await OrderModel.getOrders({ userId, sessionId });
    res.status(result.status).json(result);
  },
};
