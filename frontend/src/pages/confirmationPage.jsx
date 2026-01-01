import { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrlContext } from "../contexts/BaseUrlContext";

const ConfirmationPage = () => {
  const { baseUrl } = useContext(BaseUrlContext);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [today, setToday] = useState("");
  const [maxDeliveryDate, setMaxDeliveryDate] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);

        const res = await axios.get(
          `${baseUrl}/api/order/${orderId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setOrder(res.data.data?.order);
          setItems(res.data.data?.items);
        } else {
          setMessage(res.data.message);
        }
      } catch (err) {
        if (err.response) {
    setMessage(err.response.data.message);
  } else {
    setMessage("Network error. Please try again.");
  }
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);


  useEffect(() => {
  setToday(dayjs(order?.created_at).format("MMMM D, YYYY"));

  const days = [3, 5, 7];
  const currentDay = dayjs();

  for (const d of days) {
    if (order?.delivery_date.includes(d)) {
      setMaxDeliveryDate(currentDay.add(d, "day").format("MMMM D, YYYY"));
    }
  }
}, [order]); 
  if (loading) return <p>Loading...</p>;
  if (!order) return <p className="flex justify-center items-center text-red-800 my-5 min-h-screen font-bold text-[60px]">{message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        <h1 className="text-2xl text-center font-bold text-green-600 mb-2">
          Order Confirmation
        </h1>
        <h1 className="text-2xl text-center font-bold text-green-600 mb-2">Thank you {order.name} for your purchase!</h1>
        <h1 className="text-center text-[19px] text-text-blue-600">You get your products within {order.delivery_date}: <br/>  That means between <strong className="text-green-700 text-[22px]">{today}</strong> and <strong className="text-green-700 text-[22px]">{maxDeliveryDate}</strong></h1>
        <p className="text-gray-600 text-center my-3">
          <strong>Order ID:#</strong> {order.id}
        </p>
        <p className="text-gray-600 text-center">
          <strong>Status:</strong> {order.status}
        </p>

        <hr className="my-4" />

        <h2 className="text-lg font-semibold mb-3">Ordered Products</h2>

        {items.map(item => (
          <div key={item.product_id} className="flex justify-between py-3 border-b">
            <div className="flex gap-4">
              <img
                src={item.front_image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <hr className="my-8" />

        <div className="flex justify-between font-semibold px-5">
          <span>Delivery fee</span>
          <span>${order.delivery_fee}</span>
        </div>
        <div className="flex justify-between font-semibold px-5">
          <span>Tax fee</span>
          <span>${order.tax_fee}</span>
        </div>
        <div className="flex justify-between font-semibold px-5">
          <span>Total</span>
          <span>${order.total}</span>
        </div>


        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(`/order/${order.id}/tracking`)}
            className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded"
          >
            Track Order
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 px-4 py-2 cursor-pointer rounded"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationPage;
