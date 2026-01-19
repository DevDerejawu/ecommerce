import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
import { UsePopUpMessage } from "../contexts/NotificationContext";

const OrdersPage = () => {
  const {showPopUpMessage, Spinner} = UsePopUpMessage();
  const { baseUrl } = useContext(BaseUrlContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/order`, {
          withCredentials: true,
        });

        if (res.data.success) {
          showPopUpMessage(res.data.message)
          setOrders(res.data?.data);
        } else {
          showPopUpMessage(res.data.message, "error");
        }
      } catch (err) {
        if(err.response){
          showPopUpMessage(err.response.data.message, "error")
        }else{
          showPopUpMessage("Unknown error", "error");
        }
        
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [baseUrl]);

  if (loading)
    return <div className="flex xlex-col justify-center items-center gap-[10px]  min-h-screen">Loading...
    <Spinner h={50} w={50}/>
    </div>;
  if (!orders.length)
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <p>{message}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <span className="font-medium">Order #{order.id}</span>
              <span className="text-gray-500 text-sm ml-2">
                (Created on {new Date(order.created_at).toLocaleDateString()})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersPage;
