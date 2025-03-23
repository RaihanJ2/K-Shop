import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../services/user";
import { fetchAddress } from "../services/address";
import { fetchHistory } from "../services/history";
import { AddressType, HistoryType, UserType } from "../types";

const Account: React.FC = () => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [history, setHistory] = useState<HistoryType[] | undefined>(undefined);
  const [defaultAddress, setDefaultAddress] = useState<AddressType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = await fetchCurrentUser();
        setUser(user);

        const addresses = await fetchAddress();
        const defaultAddr = addresses.find(
          (addr: AddressType) => addr.isDefault
        );
        setDefaultAddress(defaultAddr);

        const histories = await fetchHistory();
        setHistory(histories);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-6 md:px-6 md:py-8 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              My Account
            </h1>
            <Link
              to="/login"
              className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
              Log out
            </Link>
          </div>

          <div>
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "profile"
                      ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <i className="fa-regular fa-user mr-2"></i>
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === "orders"
                      ? "border-b-2 border-amber-500 text-amber-600 dark:text-amber-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <i className="fa-regular fa-clipboard mr-2"></i>
                  Order History
                </button>
              </nav>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-amber-500"></div>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Loading your information...
                </p>
              </div>
            ) : (
              <div className="p-4 md:p-6">
                {activeTab === "profile" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white">
                            <i className="fa-solid fa-user text-xl"></i>
                          </div>
                          <div className="ml-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                              {user?.username}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        <hr className="my-4 border-gray-200 dark:border-gray-600" />

                        <Link
                          to="#"
                          className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium"
                        >
                          Change Password
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Shipping Address
                          </h3>
                          <Link
                            to="/address"
                            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium"
                          >
                            Manage Addresses
                          </Link>
                        </div>

                        {defaultAddress ? (
                          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                            <div className="flex justify-between">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {defaultAddress.name}
                              </p>
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                Default
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                              {defaultAddress.street}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {defaultAddress.city}, {defaultAddress.state}{" "}
                              {defaultAddress.zipcode}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                              <i className="fa-solid fa-phone mr-2"></i>
                              {defaultAddress.phone}
                            </p>
                          </div>
                        ) : (
                          <div className="border border-gray-200 dark:border-gray-600 border-dashed rounded-lg p-6 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                              No default address found
                            </p>
                            <Link
                              to="/address"
                              className="mt-2 inline-block text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                            >
                              Add an address
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Order History
                    </h3>

                    {history && history.length > 0 ? (
                      <div className="space-y-4">
                        {history.map((order) => (
                          <Link
                            to={`/order/${order._id}`}
                            key={order._id}
                            className="block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 flex flex-col md:flex-row md:justify-between md:items-center">
                              <div className="mb-3 md:mb-0">
                                <div className="flex items-center">
                                  <i className="fa-solid fa-bag-shopping text-amber-500 mr-2"></i>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    Order placed: {formatDate(order.createdAt)}
                                  </p>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  Order ID: {order._id}
                                </p>
                              </div>
                              <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                                <div className="text-right">
                                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                                    ${order.totalAmount.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {order.items.length}{" "}
                                    {order.items.length === 1
                                      ? "item"
                                      : "items"}
                                  </p>
                                </div>
                                <div className="ml-4 text-amber-600 dark:text-amber-400">
                                  <i className="fa-solid fa-chevron-right"></i>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                        <div className="inline-block rounded-full bg-gray-100 dark:bg-gray-600 p-3 mb-4">
                          <i className="fa-regular fa-clipboard text-gray-500 dark:text-gray-400 text-xl"></i>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          You haven't placed any orders yet
                        </p>
                        <Link
                          to="/"
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
