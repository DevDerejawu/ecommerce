const IMAGE_URL_REGEX =
  /^(https?:\/\/.*\.(?:jpeg|jpg|png|webp|gif|bmp))$/i;

function validateImageUrl(req, res, next) {
  try{
    const { front_image, back_image } = req.body;

  if (front_image && !IMAGE_URL_REGEX.test(front_image)) {
    return res.status(400).json({
      success: false,
      message: "Front image URL is invalid."
    });
  }

  if (back_image && !IMAGE_URL_REGEX.test(back_image)) {
    return res.status(400).json({
      success: false,
      message: "Back image URL is invalid."
    });
  }
console.log("pass the image url validation")
  next();
  }catch(err){
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Caught by image url validation."
    });
  }
}

export { validateImageUrl };
