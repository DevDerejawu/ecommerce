import {
  manageSigningup,
  manageSigningin,
} from "../models/model_auth.js";

import mergeCarts from "../utils/merge_guest_logged_in_user_cart.js";


 // Handle user registration
 
async function handleManageSigningup(req, res) {
  console.log("front end reach here at sign up");
  try {
    const result = await manageSigningup(req.body);

    console.log(req.body)
    console.log(result)

    return res.status(result.status).json(result);

  } catch (err) {
    console.error("controller", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error. Please try again.",
      data: null,
    });
  }
}


 // Handle user login
 
async function handleManageSigningin(req, res) {
  try {
    const result = await manageSigningin(req.body);

    if (!result.success) {
      return res.status(result.status).json(result);
    }

    req.session.user = {
      id: result.data.userId,
      role: result.data.role,
    };

    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 90;

    req.session.save(async (err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Session save failed",
          data: null,
        });
      }

      const sessionId = req.cookies.sessionId;
      await mergeCarts(result.data.userId, sessionId);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          userId: result.data.userId,
          role: result.data.role,
        },
      });
    });

  } catch (err) {
    console.error("controller", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error. Please try again.",
      data: null,
    });
  }
}

export {
  handleManageSigningup,
  handleManageSigningin,
};
