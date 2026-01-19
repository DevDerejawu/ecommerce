import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { seQuantitiesContext } from "../contexts/QuantitiesContext";
import { UsePopUpMessage } from "../contexts/NotificationContext";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
import { cartContext } from "../contexts/CartContext";
function ProductCard({ product }) {
  const {Spinner, showPopUpMessage} = UsePopUpMessage();
  const { refreshCart } = useContext(cartContext);
  const { baseUrl } = useContext(BaseUrlContext);
  const { getQty, increaseQty, decreaseQty } = useQuantitiesContext();
  const [lodingPosting, setLoadingPosting] = useState(false);


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
        showPopUpMessage(res.data.message);
      } else {
        showPopUpMessage(res.data.message, "error");
      }
    } catch (error) {
    if(error.response){
    showPopUpMessage(error.response.data.message, "error");
  }else{
    showPopUpMessage("Unknown error", "error");
    } finally {
      setLoadingPosting(false);
    }
  }

  return (
    <div className="group relative cursor-pointer border rounded-lg overflow-hidden bg-white pb-3">
      {/* Image wrapper */}
      <div className="relative h-64 overflow-hidden">
        {/* Front image */}
        <img
          src={product.front_image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        <img
          src={product.back_image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <Link
          to={`/detail-page/${product.id}`}
          className="absolute cursor-pointer bottom-0 w-full text-center  bg-black border px-3 py-3 text-sm rounded opacity-0 text-white group-hover:opacity-100 transition"
        >
          View Detail
        </Link>
      </div>

      {/* Add to Cart (card hover) */}
      <button
        className="absolute cursor-pointer top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-2 text-sm rounded opacity-0 group-hover:opacity-100 transition"
        onClick={async () => {
          await handleAddToCart(product);
          refreshCart();
        }}
        disabled={lodingPosting}
      >
        {lodingPosting?<Spinner />: "Add to Cart"}
      </button>

      {/* Product info */}
      <div className="p-4 text-center">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>

         <p className="text-center text-[19px] text-green-400">
        {lodingPosting ? lodingPosting : message}
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
      </div>
      <div className="flex items-center space-x-2 justify-center">
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
    </div>
  );
}

export default ProductCard;
