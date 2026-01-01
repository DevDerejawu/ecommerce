import { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
function FeaturedProducts({ endpoint, heading }) {
  const { baseUrl } = useContext(BaseUrlContext);
  const [featuredProducts, setFeaturedProduct] = useState([]);
  useEffect(() => {
    async function fetchFeaturedRelatedProducts() {
      try {
        const res = await axios.get(`${baseUrl}/api/products${endpoint}`);
        const data = res.data;
        if (data.success) {
          setFeaturedProduct(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.log(
          err.message || "Unknow error occured to fetch such products"
        );
      }
    }

    fetchFeaturedRelatedProducts();
  }, [endpoint]);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 px-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default FeaturedProducts;
