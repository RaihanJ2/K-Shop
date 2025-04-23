import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  clearCart,
  fetchCart,
  removeFromCart,
  updateCart,
} from "../services/cart";
import { fetchAddress, setAddress } from "../services/address";
import Payment from "../components/Payment";
import { AddressType, CartType, UserType } from "../types";
import { createHistory } from "../services/history";
import { getCurrentUser } from "../services/auth";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await fetchCart();
        setCart(data);
      } catch (error) {
        console.error("fetchCart error:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    const fetchAddresses = async () => {
      try {
        const data = await fetchAddress();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
    getCart();
    fetchUser();
  }, []);

  const handleDecreaseQty = async (ProductId: string) => {
    try {
      await updateCart(ProductId, -1);
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };

  const handleIncreaseQty = async (ProductId: string) => {
    try {
      await updateCart(ProductId, 1);
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  const handleRemoveItem = async (ProductId: string) => {
    try {
      await removeFromCart(ProductId);
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await setAddress(addressId);
      const updatedAddresses = await fetchAddress();
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const subtotal = cart
    ? cart.items.reduce(
        (total, item) => total + item.ProductId.price * item.quantity,
        0
      )
    : 0;

  const handlePaymentSuccess = async () => {
    console.log("Payment successful!");
    try {
      const data = {
        userId: user?._id || "",
        items:
          cart?.items?.map((item) => ({
            productId: item.ProductId._id,
            title: item.ProductId.title,
            category: item.ProductId.category,
            image: item.ProductId.image,
            quantity: item.quantity,
            price: item.ProductId.price,
          })) || [],
        totalAmount: subtotal,
        addressId: addresses.find((address) => address.isDefault)?._id || "",
      };

      const historyResponse = await createHistory(data);
      console.log("History creation response:", historyResponse);

      // Clear the cart
      await clearCart();
      console.log("Cart cleared successfully.");

      await clearCart();

      setCart(null);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <section className="m-14">
      <div className="w-full h-full">
        <h1 className="uppercase text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Cart
        </h1>
        <p className="text-center underline p-2">
          <Link to="/" className="capitalize text-gray-800 dark:text-gray-100">
            Continue Shopping
          </Link>
        </p>

        <div className="border-b-2 pb-4 border-gray-800 dark:border-gray-100 my-4">
          <div className="uppercase text-l font-bold grid grid-cols-5 pb-2 border-b-2 border-gray-800 dark:border-gray-100">
            <p className="col-span-2">Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-right">Total</p>
          </div>
          {loading ? (
            <p>Loading cart...</p>
          ) : cart && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <div
                className="grid grid-cols-5 min-h-72 py-8 px-6 text-gray-800 dark:text-gray-100"
                key={item.ProductId._id}
              >
                <Link
                  to={`/details/${item.ProductId._id}`}
                  className="flex flex-row col-span-2 bg-gray-100 text-gray-800 rounded gap-4 items-center hover:opacity-80 duration-200"
                >
                  <img
                    className="w-2/6 rounded p-4"
                    src={item.ProductId.image}
                    alt={item.ProductId.title}
                  />
                  <div className="w-full h-full uppercase flex flex-col lg:text-base md:text-sm text-xs items-start justify-center gap-4">
                    <p>{item.ProductId.title}</p>
                  </div>
                </Link>
                <p className="flex justify-center items-center">
                  ${item.ProductId.price.toFixed(2)}
                </p>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-1/2 flex flex-row justify-center  text-gray-800 dark:text-gray-100 text-center rounded">
                    <button
                      onClick={() => handleDecreaseQty(item.ProductId._id)}
                      className="border-2 hover:scale-105 active:scale-95 duration-200 border-gray-800 w-1/4 dark:border-gray-100 p-2 rounded"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      className="pl-1 w-1/3 bg-inherit text-center"
                      value={item.quantity}
                      readOnly
                      disabled
                    />
                    <button
                      onClick={() => handleIncreaseQty(item.ProductId._id)}
                      className="border-2 hover:scale-105 active:scale-95 duration-200 border-gray-800 w-1/4 dark:border-gray-100 p-2 rounded"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.ProductId._id)}
                    className="w-1/6 py-2 uppercase rounded bg-red-600 text-gray-100 hover:scale-105 duration-200"
                  >
                    <i className="fa-regular fa-trash-can text-xl"></i>
                  </button>
                </div>
                <p className="flex justify-end items-center">
                  ${(item.ProductId.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-1/2 p-4 flex gap-4 flex-col ">
            <h1 className="text-3xl font-bold">Your Addresses</h1>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/address"
                className="border-2 p-4 rounded-md cursor-pointer text-center text-sm border-gray-800 dark:border-gray-100"
              >
                <i className="text-4xl fa-solid fa-plus"></i>
              </Link>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div
                    key={index}
                    onClick={() => handleSetDefaultAddress(address._id!)}
                    className={`border-2 p-4 rounded-md cursor-pointer 
                      text-sm 
                      ${
                        address.isDefault
                          ? "dark:text-gray-800 text-gray-100 bg-gray-800 dark:bg-gray-100 border-blue-600 border-4"
                          : "border-gray-800 dark:border-gray-100"
                      }`}
                  >
                    <p>
                      <strong>Name:</strong> {address.name}
                    </p>
                    <p>
                      <strong>Street:</strong> {address.street}
                    </p>
                    <p>
                      <strong>City:</strong> {address.city}
                    </p>
                    <p>
                      <strong>State:</strong> {address.state}
                    </p>
                    <p>
                      <strong>Zipcode:</strong> {address.zipcode}
                    </p>
                    <p>
                      <strong>Phone:</strong> {address.phone}
                    </p>
                  </div>
                ))
              ) : (
                <p>No addresses found.</p>
              )}
            </div>
          </div>
          <div className="w-1/2 text-right">
            <p className="mb-6 capitalize text-right font-bold">Subtotal</p>
            <p className="mb-6 uppercase text-2xl text-right">
              ${subtotal.toFixed(2)} USD
            </p>
            <div className="mb-6 float-right w-full">
              {user && (
                <Payment
                  amount={subtotal}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => console.log("Payment canceled.")}
                  userId={user?._id || ""}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
