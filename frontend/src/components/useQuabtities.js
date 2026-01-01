import { useState } from "react";

 function useQuantities() {
  const [quantities, setQuantities] = useState({});

  const increaseQty = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decreaseQty = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) - 1,
    }));
  };

  const getQty = (productId) => quantities[productId] || 1;
  
  return { quantities, getQty, increaseQty, decreaseQty };
}
export default useQuantities;