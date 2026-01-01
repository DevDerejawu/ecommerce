import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BaseUrlContext } from "../contexts/BaseUrlContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isConfirmError, setIsConfirmError] = useState(false);
  const [okay, setOkay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const { baseUrl } = useContext(BaseUrlContext);

  async function handleAuth(authData) {
    setIsConfirmError(false);
    let dataAuthInfo;
    if (!isLogin) {
      const { password, name, email } = authData;
      dataAuthInfo = { password, name, email };
    } else {
      dataAuthInfo = authData;
    }
    if (!isLogin && authData.password !== authData.confirmPassword) {
      setIsConfirmError(true);
      setTimeout(() => {
        setIsConfirmError(false);
      }, 3000);
      return;
    }

    const url = isLogin
      ? `${baseUrl}/api/auth/login`
      : `${baseUrl}/api/auth/register`;

    try {
      setLoading(true);

      const res = await axios.post(url, dataAuthInfo, {
        withCredentials: true,
      });

      const data = res.data;
      setMessage(data.message);

      if (data.success) {
        setOkay(true);
        if (isLogin) {
          setTimeout(() => {
            navigate("/");
          }, 3100);
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        setMessage(err.response?.data?.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^(?=.{5,})([A-Z][a-z]+) ([A-Z][a-z]+)$/,
                    message:
                      "Enter full name with 2 words, starting with capital letters, at least 5 characters",
                  },
                })}
                className="w-full border px-3 py-2 rounded outline-none focus:ring"
              />
              {errors.name && (
                <p className="text-red-500 text-start my-2 text-[16px]">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.(com|org|net)$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            />
            {errors.email && (
              <p className="text-red-500 text-start my-2 text-[16px]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "password is required",
                pattern: {
                  values: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{5,}$/,
                  message:
                    "Include uppercase, lowercase, number, and at least 5 characters.",
                },
              })}
              className="w-full border px-3 py-2 rounded outline-none focus:ring"
            />
            {errors.password && (
              <p className="text-red-500 text-start my-2 text-[16px]">
                {errors.password.message}
              </p>
            )}

            {isConfirmError && (
              <p className="text-red-500 text-start my-2 text-[16px]">
                Confirm password must match with the original password.
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  pattern: {
                    values: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{5,}$/,
                    message:
                      "Include uppercase, lowercase, number, and at least 5 characters.",
                  },
                })}
                className="w-full border px-3 py-2 rounded outline-none focus:ring"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-start my-2 text-[16px]">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleAuth)}
            disabled={loading}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </div>

        <p className="text-sm text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
        <p
          className={`text-center py-3 text-[18px] ${
            okay ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
