import { BaseUrlContext } from "../contexts/BaseUrlContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export const deliveryOptions = [
  { price: 20, range: "Within 3 days" },
  { price: 15, range: "Within 5 days" },
  { price: 10, range: "Within 7 days" },
  { price: 0, range: "After 7 days" },
];

function CartPage() {
  const { baseUrl } = useContext(BaseUrlContext);
  const { products, cartCount, message, loading, refreshCart } =
    useContext(CartContext);

  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryFeeCents, setDeliveryFeeCents] = useState(1500);
  const [subTotalCents, setSubTotalCents] = useState(0);
  const [taxFeeCents, setTaxFeeCents] = useState(0);
  const [totalCents, setTotalCents] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    refreshCart();
  }, []);
  useEffect(() => {
    if (loading) return;
  }, [loading, products]);
  useEffect(() => {
    setDeliveryOption(products[0]?.delivery_date);
    const subtotal = products.reduce(
      (acc, item) => acc + Number(item.price) * 100 * Number(item.quantity),
      0
    );
    setSubTotalCents(subtotal);

    const productIdWithItsQuantity = products.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(productIdWithItsQuantity);

    const tax = Math.round(subtotal * 0.15);
    setTaxFeeCents(tax);
  }, [products]);

  useEffect(() => {
    setTotalCents(subTotalCents + taxFeeCents + deliveryFeeCents);
  }, [subTotalCents, taxFeeCents, deliveryFeeCents]);

  useEffect(() => {
    const selectedOption = deliveryOptions.find(
      (obj) => obj.range === deliveryOption
    );
    setDeliveryFeeCents(selectedOption?.price * 100);
  }, [deliveryOption]);

  function useQuantities() {
    const increaseQty = (product) => {
      setQuantities((prev) => ({
        ...prev,
        [product.id]: prev[product.id] + 1,
      }));
    };

    const decreaseQty = (product) => {
      setQuantities((prev) => ({
        ...prev,
        [product.id]: prev[product.id] - 1,
      }));
    };

    const getQty = (product) => quantities[product.id];

    return { getQty, increaseQty, decreaseQty };
  }

  const { getQty, increaseQty, decreaseQty } = useQuantities();

  async function deleteSingleItemOfCart(id) {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/cart/delete-single-cart-item/${id}`,
        { withCredentials: true }
      );

      const data = res.data;
      if (data.success) {
        refreshCart();
      }
      console.log(data.message);
    } catch (err) {
      console.log(err.message, err);
    }
  }

  //save updated product quantity
  async function saveChangedCart(product, determine) {
    let deliveryDate, quantity, productId;
    if (determine === "quantity") {
      quantity = getQty(product);
      deliveryDate = null;
      productId = product.id;
    } else {
      quantity = null;
      productId = null;
      deliveryDate = product;
      console.log("gdggd", deliveryDate);
    }
    try {
      const res = await axios.patch(
        `${baseUrl}/api/cart/update-cart`,
        {
          productId,
          quantity,
          deliveryDate,
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data;

      if (data.success) {
        console.log(data.message);
        refreshCart();
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  if (loading) {
    return (
      <p className="text-center text-[18px] text-blue-700 my-7 mx-4">
        Loading...
      </p>
    );
  }

  return (
    <>
      {cartCount ? (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-8 text-center">Shopping Cart</h1>

          {/* Delivery Options*/}
          <div className="border rounded-lg p-5 mb-8 w-[96%] mx-auto">
            <h3 className="font-semibold mb-4 text-center">Delivery Options</h3>

            <div className="flex flex-col sm:flex-row gap-4 w-[96%] justify-center items-center mx-auto">
              {deliveryOptions.map((obj) => (
                <label
                  key={obj.price}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={obj.range}
                    onChange={(e) => {
                      const value = e.target.value;
                      saveChangedCart(value, "notquantity");
                    }}
                    checked={deliveryOption === obj.range}
                  />
                  <span className="text-sm">
                    <span className="font-medium">{obj.range}</span>
                    <p className="text-gray-500">{`$${obj.price}`}</p>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Item */}
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 border rounded-lg p-4"
                >
                  <img
                    src={product.front_image}
                    alt="Product"
                    className="w-28 h-28 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{product.name}</h2>
                    <p className="text-sm text-gray-500">
                      {product.descroption}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                      <span className="font-semibold">{product.price}</span>

                      <div className="flex items-center gap-2 mb-7">
                        <button
                          className="border px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer rounded"
                          disabled={getQty(product) === 1}
                          onClick={() => decreaseQty(product)}
                        >
                          -
                        </button>
                        <span className="min-w-[24px] text-center">
                          {getQty(product)}
                        </span>
                        <button
                          className="border cursor-pointer px-2 py-1 rounded"
                          onClick={() => increaseQty(product)}
                        >
                          +
                        </button>
                        <button
                          className="bg-white border py-1 px-2 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer"
                          disabled={getQty(product) === product.quantity}
                          onClick={() => saveChangedCart(product, "quantity")}
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <button
                      className="px-4 cursor-pointer py-2 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50"
                      onClick={() => deleteSingleItemOfCart(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*Order Summary */}
            <div className="border rounded-lg p-6 h-fit">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{`$${(subTotalCents / 100).toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{`$${(deliveryFeeCents / 100).toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>15%</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax fee</span>
                  <span>{`$${(taxFeeCents / 100).toFixed(2)}`}</span>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>{`$${(totalCents / 100).toFixed(2)}`}</span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full mt-6 bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <p className="flex justify-center text-red-600 bg-orange-50 items-between p-20 shadow my-6 mx-4 min-h-screen font-bold text-[60px]">
          {message}
        </p>
      )}
    </>
  );
}

export default CartPage;
