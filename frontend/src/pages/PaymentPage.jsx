import { useState, useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { deliveryOptions } from "../deliveryOptions";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
import { cartContext } from "../contexts/CartContext";

// Stripe test key
const stripePromise = loadStripe(
  "pk_test_51ShdImBK9b48KQu2IM6LuVn1TbzFAL1hNzBZrF5f20SmMImV11FoD9Tz3NRjZ1tfIuXZ8HxUChmpDyWx8eW88uzj00WaXjI6fw"
);

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { products, refreshCart } = useContext(cartContext);
  useEffect(() => {
    refreshCart();
  }, []);
  const [totalCents, setTotalCents] = useState(0);
  const [deliveryFeeCents, setDeliveryFeeCents] = useState(0);
  const [subTotalCents, setSubTotalCents] = useState(0);
  const [taxCents, setTaxCents] = useState(0);

  useEffect(() => {
    if (!products || products.length === 0) {
      navigate("/");
    }

    const selectedDeliveryRange = deliveryOptions.find(
      (item) => item.range === products[0]?.delivery_date
    );

    const subtotal = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const subtotalCent = subtotal * 100;
    const taxCent = subtotalCent * 0.15;
    const deliveryFeeCent = (selectedDeliveryRange?.price || 0) * 100;
    const totalCent = subtotalCent + taxCents + deliveryFeeCent;
    setTaxCents(taxCent);
    setDeliveryFeeCents(deliveryFeeCent);
    setSubTotalCents(subtotalCent);
    setTotalCents(totalCent);
  }, [products]);

  const { baseUrl } = useContext(BaseUrlContext);
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    const res = await fetch(`${baseUrl}/api/checkout/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceAmount: Math.round(totalCents) }),
    });
    const data = await res.json();
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setIsProcessing(false);

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
    }
  };

  const finishOrder = async () => {
    setOrderLoading(true);

    const orderItems = products.map(({ id, quantity, price }) => ({
      productId: id,
      quantity,
      price,
    }));

    try {
      const resCheckoutSnapshot = await axios.get(
        `${baseUrl}/api/checkout/checkout_snapshot/get`,
        { withCredentials: true }
      );
      const resCheckout = resCheckoutSnapshot.data;

      if (!resCheckout.success) {
        setTimeout(() => {
          navigate("/checkout");
        }, 3000);
        throw new Error(resCheckout.message);
      }

      const res = await axios.post(
        `${baseUrl}/api/order/order-order-items`,
        {
          orderBillingInfo: resCheckout.data,
          restOrderData: {
            paymentMethod: "card",
            subtotal: (subTotalCents / 100).toFixed(2),
            deliveryFee: (deliveryFeeCents / 100).toFixed(2),
            deliveryDate: products[0].delivery_date,
            total: (totalCents / 100).toFixed(2),
            taxFee: (taxCents / 100).toFixed(2),
          },
          orderItems,
        },
        { withCredentials: true }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      const { orderId } = res.data.data;
      setOrderMessage(res.data.message);

      setTimeout(() => {
        navigate(`/order/${orderId}`);
        refreshCart();
      }, 3000);
    } catch (err) {
      setOrderMessage(err.message || "Something went wrong");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="bg-black md:p-6  p-2">
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg m-5">
        <p className="text-[19px] text-start text-red-300 my-3">
          ⚠️ This is a test payment. Use a Stripe test card. Enter in order:
        </p>
        <p className="text-[19px] text-start text-blue-400 my-3">
          1 First 16 digits: 4242 4242 4242 4242
        </p>
        <p className="text-[19px] text-start text-blue-400 my-3">
          2 Expiry date: any future month/year
        </p>
        <p className="text-[19px] text-start text-blue-400 my-3">
          3 CVC: any 3 digits
        </p>
        <p className="text-[19px] text-start text-blue-400 my-3">
          4 ZIP code: any five digits
        </p>

        <CardElement className="p-2 border rounded mb-4 w-full py-[10px] mt-[40px]" />

        <button
          disabled={!stripe || isProcessing}
          className="text-[18px] bg-blue-700 hover:bg-blue-600 w-full rounded mb-5 p-2 cursor-pointer"
          onClick={handleSubmit}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>

        {message && <p className="text-[19px] text-center mb-4">{message}</p>}

        {message === "Payment successful!" && (
          <button
            onClick={finishOrder}
            className="bg-green-600 hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-300 w-full text-white p-2 rounded cursor-pointer"
            disabled={orderLoading}
          >
            Finish Your Order
          </button>
        )}

        {orderMessage && (
          <p className="text-[19px] text-center mb-4">{orderMessage}</p>
        )}
      </div>
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPayment />
  </Elements>
);

export default PaymentPage;
