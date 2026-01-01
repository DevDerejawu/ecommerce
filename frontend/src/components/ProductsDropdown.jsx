import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { SubcategoryIdContext } from "../contexts/SubcategoryIdContext";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
import { useNavigate } from "react-router-dom";

export default function ProductsDropdown({
  openMobileCategory,
  setOpenMobileCategory,
}) {
  const navigate = useNavigate();
  const { baseUrl } = useContext(BaseUrlContext);

  const { setSubcategoryId } = useContext(SubcategoryIdContext);
  const randomRoute =
    "route_176717332462hhhhhhhhhhhhhhfffffffffvvvvvvvv4-1767173318657-480613543-1767173318657-91989926-1767173318657-889659689-1767173318657-527696932-1767173318657-523634770-1767173318657-926033260";
  const [categories, setCategories] = useState([]);
  const [openSubcategory, setOpenSubcategory] = useState(false);

  useEffect(() => {
    async function fetchCategoriesWithSubcategories() {
      try {
        const res = await axios.get(
          `${baseUrl}/api/categories-with-subcategories`
        );
        const data = res.data;
        if (data.success) {
          setCategories(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.log(
          err.message || "Can't load categories with its subcategories."
        );
      }
    }
    fetchCategoriesWithSubcategories();
  }, []);

  function handleFetchSubcategoryProducts(subcategoryId) {
    setSubcategoryId(subcategoryId);
  }

  return (
    <>
      {/*Desktop*/}
      <nav className="hidden md:flex items-center gap-6 justify-center relative">
        {categories.map((cat) => (
          <div key={cat.id} className="relative group">
            <button className="flex items-center gap-1 font-medium">
              {cat.name}
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown */}
            <div className="absolute left-0 top-4 mt-2 hidden group-hover:block bg-white shadow-lg rounded p-4 z-40 min-w-[220px]">
              <ul className="space-y-2">
                {cat.subcategories.map((sub) => (
                  <li
                    onClick={() => {
                      navigate(randomRoute);
                      handleFetchSubcategoryProducts(sub.id);
                    }}
                    key={sub.id}
                    className="text-sm hover:text-blue-600 cursor-pointer"
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </nav>

      {/*Mobile*/}
      {openMobileCategory && (
        <div className="md:hidden">
          {categories.map((cat) => (
            <div key={cat.id} className="border-b">
              <button
                onClick={() =>
                  setOpenSubcategory(
                    openSubcategory === cat.name ? false : cat.name
                  )
                }
                className="w-full flex justify-between items-center p-4 font-medium"
              >
                {cat.name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSubcategory === cat.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSubcategory === cat.name && (
                <ul className="pl-6 pb-4 space-y-2 text-sm">
                  {cat.subcategories.map((sub) => (
                    <li
                      onClick={() => {
                        handleFetchSubcategoryProducts(sub.id);
                        setOpenMobileCategory(false);
                      }}
                      key={sub.id}
                      className="hover:text-blue-600 cursor-pointer"
                    >
                      {sub.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
