import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import axios from "axios";

//contexts
import { BaseUrlContext } from "../../contexts/BaseUrlContext";

function SearchInputModal() {
  const navigate = useNavigate();
  const { baseUrl } = useContext(BaseUrlContext);
  const [products, setProducts] = useState([]); //for matched searched products
  const [open, setOpen] = useState(false); // For mobile modal
  const [query, setQuery] = useState(""); //the actull text that is typed in input field.

  useEffect(() => {
    // delaying the api call for searched products
    const timeoutId = setTimeout(async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products/get`);
        const data = res.data;

        if (data.success) {
          setProducts(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.log(err.message || "Unable to filter products from database");
      }
    }, 3000);

    // Cleanup function: clears previous timeout
    return () => clearTimeout(timeoutId);
  }, [query]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <>
      {/* Desktop search (always visible on md plus) */}
      <div className="hidden md:flex items-center border rounded px-2 py-1 w-full max-w-md ">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none px-2"
        />
      </div>

      {/* Mobile search button (shows modal) */}
      <div className="md:hidden">
        <button onClick={() => setOpen((pre) => !pre)} className="p-2">
          <Search className="cursor-pointer" />
        </button>

        {open && (
          <div className="fixed top-14 right-0 left-0 z-50 bg-gray-700 flex justify-center items-start p-4">
            <div className="bg-white w-full rounded-lg mt-3 p-4 flex flex-col overflow-y-auto max-h-[80vh]">
              <div className="flex gap-2">
                <Search className="text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 outline-none px-2"
                />
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {query && (
                <div className="mt-4 flex flex-col border-t pt-2 space-y-2 overflow-y-auto max-h-[50vh]">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <button
                        onClick={() => {
                          setQuery("");
                          setOpen(false);
                          navigate(`/detail-page/${product.id}`);
                        }}
                        key={product.id}
                        className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        {product.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 p-2">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Autocomplete for desktop */}
      {query && (
        <div className="hidden md:flex fixed top-14 px-5 left-0 right-0 bg-blue-200 justify-center z-40 px-10">
          <div className="w-full flex flex-col max-w-[600px] my-4 p-4 space-y-3 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  onClick={() => {
                    setQuery("");
                    navigate(`/detail-page/${product.id}`);
                  }}
                  key={product.id}
                  className="p-2 rounded cursor-pointer hover:bg-gray-100"
                >
                  {product.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchInputModal;
