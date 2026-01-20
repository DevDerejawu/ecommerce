import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [adminLoading, setAdminLoading] = useState(false);
  const { baseUrl } = useContext(BaseUrlContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkIsAdmin() {
      try {
        setAdminLoading(true);
        const res = await axios.get(`${baseUrl}/api/admin/dashboard`, {
          withCredentials: true,
        });

        if (!res.data.success) {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
      } finally {
        setAdminLoading(false);
      }
    }

    checkIsAdmin();
  }, []);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //add ner products
  function addNewProduct() {
    setShowForm(true);
    setSelectedProduct(null);
  }

  //update the existing product
  function updateTheProduct(product) {
    setShowForm(true);
    setSelectedProduct(product);
  }

  async function deleteTheProduct(id) {
    try {
      const res = await axios.delete(`${baseUrl}/api/products/delete/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }

  //close product form
  function closeProductForm() {
    setShowForm(false);
  }

  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/products/page`, {
        params: { page: pageNumber, limit: 20 },
      });
      const data = response.data;
      if (data?.success) {
        setProducts(data.data);
        setTotal(data.totalRow);
        setPage(pageNumber);
        setMessage(data.message);
      } else {
        setMessage(data?.message);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.log("Errrrrrrrrr", err.response);
        setMessage(err.response.data.message);
      } else {
        setMessage("Unknown error");
      }
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, []);

  const totalPages = Math.ceil(total / limit);

  if (!products?.length) return <p>{message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Product Dashboard</h1>

      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
        onClick={addNewProduct}
      >
        Add Product
      </button>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4 flex md:space-x-40 space-x-3">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                      onClick={() => updateTheProduct(product)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => {
                        deleteTheProduct(product.id);
                        fetchProducts();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* page numbers */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`px-3 py-1 cursor-pointer rounded ${
                  p === page ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => fetchProducts(p)}
              >
                {p}
              </button>
            ))}

            {message && <p className="text-center">{message}</p>}
          </div>

          {showForm && (
            <div className="fixed  mb-4 top-[60px] h-[95vh] left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-2/3 max-w-xl relative h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={closeProductForm}
                >
                  ✖
                </button>
                <ProductForm
                  product={selectedProduct}
                  onSuccess={() => {
                    fetchProducts();
                    closeProductForm();
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
