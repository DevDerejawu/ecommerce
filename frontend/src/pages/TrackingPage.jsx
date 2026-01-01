import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
import dayjs from "dayjs";

const STATUS_PROGRESS = {
  pending: 25,
  processing: 60,
  completed: 100
};

const STATUS_LABEL = {
  pending: "Order Placed",
  processing: "Processing",
  completed: "Delivered"
};

const TrackingPage = () => {
   const [today, setToday] = useState("");
    const [maxDeliveryDate, setMaxDeliveryDate] = useState("");
  const { baseUrl } = useContext(BaseUrlContext);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!order) return <p className="flex items-center justify-center min-h-screen font-bold text-[60px] py-10 text-red-400">{message}</p>;

  const progress = STATUS_PROGRESS[order.status] ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Delivery Progress
        </h1>

        <div className="shadow-lg p-3">
          <div className="flex justify-between items-center">
          <p>Shipping address:</p>
          <p className="text-xl font-semibold">{order.shipping_address}</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Min delievry date:</p>
          <p className="text-xl font-semibold">{today}</p>
        </div>

         <div className="flex justify-between items-center mb-4">
          <p>Max delievry date:</p>
          <p className="text-xl font-semibold">{maxDeliveryDate}</p>
        </div>
        </div>

        <p className="text-gray-700 mb-2">
          <strong>Order ID:</strong> {order.id}
        </p>

        <p className="text-gray-700 mb-6">
          <strong>Status:</strong>
          {STATUS_LABEL[order.status] || order.status}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-3 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {progress}% completed
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 px-4 py-2 cursor-pointer rounded"
          >
            Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded"
          >
            Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrackingPage;
