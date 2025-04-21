import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HistoryType } from "../../types";
import { fetchOrderById } from "../../services/history";
import RippleButton from "../../components/Layout/RippleButton";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<HistoryType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const order = await fetchOrderById(orderId!);
        setOrder(order);
        setError(null);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center m-14">
        <p>Loading order details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center m-14">
        <p className="text-xl mb-6 text-red-600">{error}</p>
        <RippleButton>
          <Link to="/account">Back to Account</Link>
        </RippleButton>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="flex flex-col items-center justify-center m-14">
        <p className="text-xl mb-6">Order not found</p>
        <RippleButton>
          <Link to="/account">Back to Account</Link>
        </RippleButton>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center m-14">
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <Link to="/account" className="text-amber-400">
            &larr; Back to Account
          </Link>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-2xl font-bold capitalize mb-4 text-gray-900">
            order details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-medium text-gray-900">{order._id}</p>
            </div>
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium text-gray-900">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-bold text-lg text-gray-900">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Items</p>
              <p className="font-medium text-gray-900">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b text-gray-900">
            Order Items
          </h3>

          <div className="divide-y">
            {order.items.map((item, index) => (
              <div
                key={`item-${index}`}
                className="p-4 flex items-center gap-4"
              >
                {item.image && (
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title || "Product"}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">
                    {item.title || "Product not found"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.category && `Category: ${item.category}`}
                  </p>
                </div>
                <div className="text-right text-gray-900">
                  <p>
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                  <p className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 border-t">
            <div className="flex justify-between text-lg">
              <p className="font-semibold text-gray-900">Order Total:</p>
              <p className="font-bold text-gray-900">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
