function validateInputValues(req, res, next) {
  try {
    const productData = req.body;

    if (!productData || typeof productData !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid product data.",
      });
    }

    for (const [key, value] of Object.entries(productData)) {
      if (value === undefined || value === null || value === "") {
        if (key !== "front_image" && key !== "back_image") {
          return res.status(400).json({
            success: false,
            message: `The field "${key}" is required.`,
          });
        }
      }

      // Price validation
      if (key === "price" && (isNaN(value) || Number(value) < 0)) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid non-negative number.",
        });
      }

      // String validation
      if (typeof value === "string" && value.trim().length < 2) {
        if(key !== "front_image" && key !== "back_image"){
          return res.status(400).json({
          success: false,
          message: `The field "${key}" must be at least 2 characters long.`,
        });
        }
      }
    }
    console.log("passed inputs validation middleware.");
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `Caught by input validation middleware.`,
    });
  }
}

export { validateInputValues };
