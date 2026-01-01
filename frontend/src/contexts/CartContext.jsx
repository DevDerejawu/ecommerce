import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BaseUrlContext } from "./BaseUrlContext"; 

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const { baseUrl } = useContext(BaseUrlContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchCart() {
    try {
      const res = await axios.get(`${baseUrl}/api/cart/get-all-cart`, {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data);
        if(data.success){
          setProducts(data.data || []);
          setMessage(data.message);
        }else{
          setMessage(data.message);
        }
    } catch (err) {
      setMessage(err.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const cartCount = products.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{ products, cartCount, message, loading, refreshCart: fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
