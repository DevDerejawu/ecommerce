import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BaseUrlContext } from "../contexts/BaseUrlContext";
//https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg
//https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif

export default function ProductForm({ product, onSuccess }) {
  const [typeOfImage, setTypeOfImage] = useState("");
  const [showImageForm, setShowImageForm] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImageOpend, setIsImageOpened] = useState(false);

  const { baseUrl } = useContext(BaseUrlContext);

  function clearImageErrors() {
    setErrors((prev) => {
      const { front_image, back_image, images, ...rest } = prev;
      return rest;
    });
  }

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const res = await axios.get(`${baseUrl}/api/subcategories`);
        const data = res.data;

        setSubcategories(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSubcategories();
  }, []);
  const [form, setForm] = useState({
    name: "",
    price: "",
    subcategory_id: "",
    featured: false,
    stock: "",
    brand: "",
    front_image: "",
    back_image: "",
    discount_percentage: "",
    availability_status: "",
    weight: "",
    width: "",
    height: "",
    depth: "",
    return_policy: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        subcategory_id: product.subcategory_id,
        featured: product.featured,
        stock: product.stock,
        brand: product.brand,
        front_image: "",
        back_image: "",
        discount_percentage: product.discount_percentage,
        availability_status: product.availability_status,
        weight: product.weight,
        width: product.width,
        height: product.height,
        depth: product.depth,
        return_policy: product.return_policy,
        description: product.description,
      });
    }
  }, [product]);

  // Handle input changes
  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      if (name === "front_image") setFrontFile(files[0]);
      if (name === "back_image") setBackFile(files[0]);
    } else if (type === "number") {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else if (name === "subcategory_id") {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  //input validations
  const validate = () => {
    const errs = {};

    // Name
    if (!form.name || form.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    // Price
    if (form.price === "" || isNaN(form.price)) {
      errs.price = "Price must be a valid number";
    }

    // Subcategory
    if (!form.subcategory_id) {
      errs.subcategory_id = "Subcategory ID is required";
    }

    // Stock
    if (form.stock === "" || isNaN(form.stock)) {
      errs.stock = "Stock must be a valid number";
    }

    // Brand
    if (!form.brand || form.brand.trim().length < 2) {
      errs.brand = "Brand is required";
    }

    // Discount
    if (
      form.discount_percentage === "" ||
      isNaN(form.discount_percentage) ||
      form.discount_percentage < 0 ||
      form.discount_percentage > 100
    ) {
      errs.discount_percentage = "Discount must be between 0 and 100";
    }

    // Availability
    if (
      !form.availability_status ||
      form.availability_status.trim().length < 2
    ) {
      errs.availability_status = "Availability status is required";
    }

    ["weight", "width", "height", "depth"].forEach((field) => {
      if (form[field] === "" || isNaN(form[field])) {
        errs[field] = `${field} must be a valid number`;
      }
    });

    // Return policy
    if (!form.return_policy || form.return_policy.trim().length < 5) {
      errs.return_policy = "Return policy is required";
    }

    // Description
    if (!form.description || form.description.trim().length < 5) {
      errs.description = "Description is required";
    }

    // Image validation
    const urlPattern = /^https?:\/\/.*\.(jpeg|jpg|png|webp|gif|bmp)$/i;

    if (!product) {
      if (!isImageOpend) {
        errs.images = "Back and front image is required.";
      }
    }
    if (!product) {
      if (typeOfImage === "upload") {
        if (!frontFile) errs.front_image = "Uploading Front image is required";
        if (!backFile) errs.back_image = "Uploading Back image is required";
      }

      if (typeOfImage === "remoteUrl") {
        if (!form.front_image) errs.front_image = "Front image URL is required";
        if (!form.back_image) errs.back_image = "Back image URL is required";
      }
    }

    // URL validation only in remote mode
    if (typeOfImage === "remoteUrl") {
      if (form.front_image && !urlPattern.test(form.front_image)) {
        errs.front_image = "Front image URL is invalid";
      }
      if (form.back_image && !urlPattern.test(form.back_image)) {
        errs.back_image = "Back image URL is invalid";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit form
  const handleSubmit = async () => {
    console.log("before validate");
    console.log(errors);
    if (!validate()) return;
    console.log("after validation");

    try {
      setLoading(true);
      const data = new FormData();
      data.append("data", JSON.stringify(form));
      if (frontFile) data.append("front_image", frontFile);
      if (backFile) data.append("back_image", backFile);

      console.log("data", data);
      let response;
      if (product?.id) {
        console.log("in side update");
        // Update
        response = await axios.patch(
          `${baseUrl}/api/products/update/${product.id}`,
          data
        );
        console.log("After axios patch");
      } else {
        // Create
        console.log("in side create");
        response = await axios.post(`${baseUrl}/api/products/post`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("After create");
      }
      console.log("outside both");
      console.log("heyyyyyyy");
      setMessage(response.data.message);
      if (response.data.success) {
        setTimeout(() => {
          onSuccess?.();
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setMessage(err.response?.data?.message || "Unknown error");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold">
        {product ? "Update Product" : "Add Product"}
      </h2>

      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
      </div>
      <h1 className="text-center text-xl">Select Subcategory </h1>
      <select
        name="subcategory_id"
        value={form.subcategory_id}
        onChange={handleChange}
        className="w-full p-3 border-lg bg-orange-200 cursor-pointer"
      >
        <option value="">Select subcategory</option>

        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id} className="cursor-pointer">
            {sub.name}
          </option>
        ))}
      </select>

      {errors.subcategory_id && (
        <p className="text-red-500">{errors.subcategory_id}</p>
      )}

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          <span>Featured</span>
        </label>

        <label className="flex items-center space-x-2">
          <span>Stock</span>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="border p-1 rounded w-20"
          />
        </label>
        {errors.stock && <p className="text-red-500">{errors.stock}</p>}
      </div>

      <div>
        <label className="block font-medium">Brand</label>
        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        {errors.brand && <p className="text-red-500">{errors.brand}</p>}
      </div>

      <div>
        <label className="block font-medium">Discount %</label>
        <input
          type="number"
          name="discount_percentage"
          value={form.discount_percentage}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        {errors.discount_percentage && (
          <p className="text-red-500">{errors.discount_percentage}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Availability Status</label>
        <input
          type="text"
          name="availability_status"
          value={form.availability_status}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        {errors.availability_status && (
          <p className="text-red-500">{errors.availability_status}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Weight</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.weight && <p className="text-red-500">{errors.weight}</p>}
        </div>
        <div>
          <label className="block font-medium">Width</label>
          <input
            type="number"
            name="width"
            value={form.width}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.width && <p className="text-red-500">{errors.width}</p>}
        </div>
        <div>
          <label className="block font-medium">Height</label>
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.height && <p className="text-red-500">{errors.height}</p>}
        </div>
        <div>
          <label className="block font-medium">Depth</label>
          <input
            type="number"
            name="depth"
            value={form.depth}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.depth && <p className="text-red-500">{errors.depth}</p>}
        </div>
      </div>

      <div>
        <label className="block font-medium">Return Policy</label>
        <textarea
          name="return_policy"
          value={form.return_policy}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        ></textarea>

        {errors.return_policy && (
          <p className="text-red-500">{errors.return_policy}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        ></textarea>

        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 justify-between gap-4 items-center">
        <button
          className="p-2 text-[18px] bg-orange-500 cursor-pointer"
          type="button"
          onClick={() => {
            setTypeOfImage("upload");
            setShowImageForm(true);
            setIsImageOpened(true);
            setForm((prev) => ({
              ...prev,
              front_image: "",
              back_image: "",
            }));
            clearImageErrors();
          }}
        >
          Upload image
        </button>
        <button
          type="button"
          className="p-2 text-[18px] bg-orange-500 cursor-pointer"
          onClick={() => {
            setTypeOfImage("remoteUrl");
            setShowImageForm(true);
            setIsImageOpened(true);
            setFrontFile(null);
            setBackFile(null);
            clearImageErrors();
          }}
        >
          Enter remote image url
        </button>
      </div>

      {errors.images && <p className="text-red-500">{errors.images}</p>}

      {showImageForm && typeOfImage === "upload" && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Front Image</label>
            <input
              type="file"
              name="front_image"
              onChange={handleChange}
              accept="image/*"
              className="border p-2 w-full rounded cursor-pointer"
            />
            {errors.front_image && (
              <p className="text-red-500">{errors.front_image}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Back Image</label>
            <input
              type="file"
              name="back_image"
              onChange={handleChange}
              accept="image/*"
              className="border p-2 w-full rounded cursor-pointer"
            />
            {errors.back_image && (
              <p className="text-red-500">{errors.back_image}</p>
            )}
          </div>
        </div>
      )}

      {/* Remote URL inputs */}
      {showImageForm && typeOfImage === "remoteUrl" && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Front Image</label>
            <input
              type="text"
              name="front_image"
              value={form.front_image}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.front_image && (
              <p className="text-red-500">{errors.front_image}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Back Image</label>
            <input
              type="text"
              name="back_image"
              value={form.back_image}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.back_image && (
              <p className="text-red-500">{errors.back_image}</p>
            )}
          </div>
        </div>
      )}

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="bg-blue-500 text-white disabled:bg-gray-500 disabled:cursor-not-allowed px-4 py-2 cursor-pointer rounded hover:bg-blue-600"
      >
        {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
      <p className="text-center text-[18px text-blue-400] mb-7">{message}</p>
    </div>
  );
}
