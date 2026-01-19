import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BaseUrlContext } from "../contexts/BaseUrlContext";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useContext(BaseUrlContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${baseUrl}/api/checkout/checkout_snapshot/post`,
        data,
        { withCredentials: true }
      );
      const response = res.data;
      if (response.success) {
        navigate("/payment");
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^(?=.{5,})([A-Z][a-z]+) ([A-Z][a-z]+)$/,
                      message:
                        "Enter full name with 2 words, starting with capital letters, at least 5 characters",
                    },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-start my-2 text-[16px]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.(com|org|net)$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-start my-2 text-[16px]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Phone must be 10-15 digits",
                    },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-start my-2 text-[16px]">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Country"
                  {...register("country", {
                    required: "Country is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                    maxLength: { value: 60, message: "Max 60 characters" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.country && (
                  <p className="text-red-500 text-start my-2 text-[16px]">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="col-span-1 md:col-span-2">
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address", {
                    required: "Address is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                    maxLength: { value: 60, message: "Max 60 characters" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && (
                  <p className="text-red-500 text-start my-2 text-[16px]">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  {...register("city", {
                    required: "City is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                    maxLength: { value: 60, message: "Max 60 characters" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.city && (
                  <p className="text-red-500 text-start my-2 text-[16px]">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="ZIP Code"
                  {...register("zip", {
                    required: "ZIP Code is required",
                    pattern: {
                      value: /^[0-9]{4,10}$/,
                      message: "Invalid ZIP code",
                    },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.zip && (
                  <p className="text-red-500 text-start my-2 text-[16px]">
                    {errors.zip.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            className="w-full bg-blue-800 text-white p-3 cursor-pointer rounded-md font-semibold hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleSubmitForm)}
            disabled={loading}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
