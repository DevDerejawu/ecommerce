import { saveCheckoutSnapshot, getCheckoutSnapshot } from "../models/model_checkout_snapshot.js";


async function handleCheckoutSnapshot(req, res) {
  try {
    let sessionId = req.cookies?.sessionId;
    const userId = req.session?.user?.id || null;

    // If user is logged in
    if (userId) {
      sessionId = null;
    } else {
      // If guest and no sessionId exists
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
        maxAge: 1000 * 60 * 60 * 24 * 90, // extend 90 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
      });
    }

    // Save checkout snapshot
    const result = await saveCheckoutSnapshot({
      ...req.body,
       sessionId,
       userId,
    });

    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error while saving checkout snapshot.",
      data: null,
      error: error.message,
    });
  }
}

 
async function handleGetCheckoutSnapshot(req, res) {
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

    // Fetch the latest checkout snapshot
    const result = await getCheckoutSnapshot({
       userId,
      sessionId,
    });

    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Unexpected error while fetching checkout snapshot.",
      data: null,
      error: error.message,
    });
  }
}



export { handleCheckoutSnapshot, handleGetCheckoutSnapshot  };
