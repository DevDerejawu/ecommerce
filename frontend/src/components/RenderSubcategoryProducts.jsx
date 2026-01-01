import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import {SubcategoryIdContext} from "../contexts/SubcategoryIdContext";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
import { useNavigate } from "react-router-dom";
function RenderSubcategoryProducts(){
  const {subcategoryId} = useContext(SubcategoryIdContext);
  const {baseUrl} = useContext(BaseUrlContext);
  const [subcategoryProducts, setSubcategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchSubcategoryProducts() {
      try {
        const res = await axios.get(
          `${baseUrl}/api/products?subcategoryId=${subcategoryId}`
        );
        const data = res.data;
        if(data.success){
          setSubcategoryProducts(data.data);
        }else{
          throw new Error(data.message);
        }
        
      } catch (err) {
        console.log(err.message || "Uknown error happened.");
      } finally {
        setLoading(false);
      }
    }

    fetchSubcategoryProducts();
  }, [subcategoryId]);
 if (loading) return <p className="text-[40px] flex items-center justify-center min-h-screen">Loading products...</p>;
 if (!subcategoryProducts?.length) navigate("/");
  return(<>
  <p className="text-[20px] text-center my-3 text-green-600">Products base on your dropdown selection.</p>
  <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 px-6">
     {subcategoryProducts.map((product)=>(
      <ProductCard key ={product.id} product={product}/>
     ))}
    </div>
  </>)
}

export default RenderSubcategoryProducts;