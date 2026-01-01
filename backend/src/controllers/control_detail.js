import getDetailOfSingleProduct from "../models/model_detail.js"

async function handleDetailPage(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Product ID is required.",
        error: null,
      });
    }

    const response = await getDetailOfSingleProduct(id);

    return res.status(response.status).json(response);
  } catch (error) {
     console.log(err)
    return res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

export default handleDetailPage;
