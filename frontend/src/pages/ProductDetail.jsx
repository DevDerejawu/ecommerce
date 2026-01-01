import { useParams } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";

//contexts
import { CartContext } from "../contexts/CartContext";
import { useQuantitiesContext } from "../contexts/QuantitiesContext";
import { BaseUrlContext } from "../contexts/BaseUrlContext";

const ProductDetail = () => {
  const { refreshCart } = useContext(CartContext);
  const { getQty, increaseQty, decreaseQty } = useQuantitiesContext();
  const [loadingPosting, setLoadingPosting] = useState(true);
  const [message, setMessage] = useState("");

  async function handleAddToCart(product) {
    const price = product.price;
    const productId = product.id;
    setLoadingPosting(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/cart/add-to-cart`,
        {
          productId,
          quantity: getQty(productId),
          deliveryDate: "Within 5 days",
          price,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage("Added to cart.");
      } else {
        setMessage("Unable to add to cart.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to add to cart.");
    } finally {
      setLoadingPosting(false);
      setTimeout(() => setMessage(""), 1000);
    }
  }

  const [product, setProduct] = useState(null);
  const { baseUrl } = useContext(BaseUrlContext);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios(`${baseUrl}/api/products/detail/get/${id}`);
        const data = res.data;

        if (data.success) {
          setProduct(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        if (err.response) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Unknown error");
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product || product?.length === 0)
    return (
      <p className="text-center text-red-700 text-[21px] my-5">{message}</p>
    );
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div className="relative h-[300px] group overflow-hidden">
        {/* Front image */}
        <img
          src={product.front_image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Back image */}
        <img
          src={product.back_image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold text-green-600">
          ${product.price}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(product.rating_star)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </span>
          <span className="text-gray-600">({product.star_count})</span>
        </div>

        {/* Stock, Brand, Discount, Availability */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Stock:</span> {product.stock}
          </div>
          <div>
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <div>
            <span className="font-semibold">Discount:</span>{" "}
            {product.discount_percentage}%
          </div>
          <div>
            <span className="font-semibold">Availability:</span>{" "}
            {product.availability_status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Weight:</span> {product.weight}
          </div>
          <div>
            <span className="font-semibold">Height:</span> {product.height}
          </div>
          <div>
            <span className="font-semibold">Width:</span> {product.width}
          </div>
          <div>
            <span className="font-semibold">Depth:</span> {product.depth}
          </div>
        </div>

        {/* Return Policy */}
        <p>
          <span className="font-semibold">Return Policy:</span>{" "}
          {product.return_policy}
        </p>

        {/* Description */}
        <p className="text-gray-700">{product.description}</p>

        {/* Sales */}
        <p className="text-gray-600">
          <span className="font-semibold">Sales:</span> {product.sales}
        </p>

        <div className="flex flex-row gap-[8px] justify-center items-center mt-[6px]">
          <button
            className="border px-2 py-1 cursor-pointer rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => decreaseQty(product.id)}
            disabled={getQty(product.id) === 1}
          >
            -
          </button>
          <span className="min-w-[24px] text-center">{getQty(product.id)}</span>
          <button
            className="border cursor-pointer px-2 py-1 rounded"
            onClick={() => increaseQty(product.id)}
          >
            +
          </button>
        </div>

        <p className="text-center text-[18px] text-blue-700">
          {loadingPosting ? loadingPosting : message}
        </p>

        {/* Add to Cart Button */}
        <button
          className="mt-4 bg-blue-600 cursor-pointer text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          onClick={async () => {
            await handleAddToCart(product);
            refreshCart();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
