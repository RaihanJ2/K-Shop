import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth";
import { useTheme } from "../context/ThemeContext";
import { UserType } from "../types";

const Login: React.FC = () => {
  const [form, setForm] = useState<UserType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginUser(form);
      login(res.user);
      navigate("/");
    } catch (error) {
      console.error("Error logging in user", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <i
              className={`fa-solid fa-dragon text-4xl ${
                isDarkMode ? "text-amber-400" : "text-amber-600"
              }`}
            ></i>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-amber-600 hover:text-amber-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.email
                    ? "border-red-300 text-red-900 placeholder-red-300"
                    : "border-gray-300 placeholder-gray-500"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                  errors.password
                    ? "border-red-300 text-red-900 placeholder-red-300"
                    : "border-gray-300 placeholder-gray-500"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-100 ${
                isDarkMode
                  ? "bg-amber-700 hover:bg-amber-800 focus:ring-amber-500"
                  : "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
