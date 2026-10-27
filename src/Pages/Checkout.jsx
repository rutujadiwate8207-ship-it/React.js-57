
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

function Checkout() {
  const [form, setForm] = useState({
    area: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    payment_type: "COD",
  });

  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Handle input changes
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // API 2: Get Order List
  async function fetchOrders() {
    if (!token) {
      setOrders([]);
      setMessage("Please login to view your orders.");
      return;
    }

    setOrdersLoading(true);

    try {
      const res = await axios.post(
        "https://a2zithub.org/dairy/abi/order_list",
        { token }
      );

      console.log("Order List Response:", res.data);

      // Actual API response: { order_det: [...] }
      const data = res.data;
      let orderData = [];

      if (Array.isArray(data)) {
        orderData = data;
      } else if (Array.isArray(data?.order_det)) {
        orderData = data.order_det;
      } else if (Array.isArray(data?.data)) {
        orderData = data.data;
      }

      console.log("First Order:", orderData[0]);
      setOrders(orderData);
    } catch (err) {
      console.log(
        "Order List Error:",
        err.response?.data || err.message
      );

      setOrders([]);
      setMessage(
        !navigator.onLine
          ? "Internet connection check kara."
          : "Unable to load orders. Please try again."
      );
    } finally {
      setOrdersLoading(false);
    }
  }

  // API 1: Place Order
  async function placeOrder(e) {
    e.preventDefault();

    if (!token) {
      setMessage("Please login before placing an order.");
      return;
    }

    setLoading(true);
    setMessage("");
    setOrderDetails(null);

    const obj = {
      area: form.area.trim(),
      city: form.city.trim(),
      district: form.district.trim(),
      state: form.state.trim(),
      country: form.country.trim(),
      pincode: form.pincode.trim(),
      payment_type: form.payment_type,
      token,
    };

    try {
      const res = await axios.post(
        "https://a2zithub.org/dairy/abi/place_order",
        obj
      );

      console.log("Place Order Response:", res.data);

      const status = String(res.data?.status ?? "").toLowerCase();

      if (
        status === "failed" ||
        status === "error" ||
        res.data?.success === false
      ) {
        setMessage(
          res.data?.message ||
            "Order failed. Check the API response in Console."
        );
        return;
      }

      setMessage(
        res.data?.message || "Order request submitted. Refreshing orders..."
      );

      // Reload orders after a non-failure response
      await fetchOrders();
    } catch (err) {
      console.log(
        "Place Order Error:",
        err.response?.data || err.message
      );

      setMessage(
        err.response?.data?.message ||
          (!navigator.onLine
            ? "Internet connection check kara."
            : "Unable to place order. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  }

  // API 3: Get Order Details
  async function getOrderDetails(orderId) {
    if (!token || orderId === null || orderId === undefined || orderId === "") {
      setMessage("Order ID is not available.");
      return;
    }

    try {
      const res = await axios.post(
        "https://a2zithub.org/dairy/abi/order_det",
        {
          token,
          order_id: orderId,
        }
      );

      console.log("Order Details Response:", res.data);
      setOrderDetails(res.data);
      setMessage("");
    } catch (err) {
      console.log(
        "Order Details Error:",
        err.response?.data || err.message
      );

      setMessage("Unable to fetch order details.");
    }
  }

  // Read order ID from the API record
  function getOrderId(order) {
    return (
      order.product_order_id ??
      order.order_id ??
      order.order_tbl_id ??
      order.order_econ_id ??
      order.id ??
      null
    );
  }

  // Load orders when page opens
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 px-4 py-8">
        <h1 className="my-6 text-center text-4xl font-bold text-gray-900">
          Checkout Page
        </h1>

        {/* Delivery Address */}
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-5 text-2xl font-bold">
            Delivery Address
          </h2>

          <form onSubmit={placeOrder}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { name: "area", label: "Area" },
                { name: "city", label: "City" },
                { name: "district", label: "District" },
                { name: "state", label: "State" },
                { name: "country", label: "Country" },
                { name: "pincode", label: "Pincode" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-1 block font-medium text-gray-700">
                    {field.label}
                  </label>

                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                    placeholder={`Enter ${field.label}`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="mb-1 block font-medium text-gray-700">
                Payment Type
              </label>

              <select
                name="payment_type"
                value={form.payment_type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-3"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>

          {message && (
            <p className="mt-4 rounded-lg bg-gray-100 p-3 text-center">
              {message}
            </p>
          )}
        </div>

        {/* My Orders */}
        <div className="mx-auto mt-8 max-w-5xl rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">My Orders</h2>

            <button
              type="button"
              onClick={fetchOrders}
              disabled={ordersLoading}
              className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
            >
              {ordersLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {ordersLoading && orders.length === 0 ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3">Sr.No</th>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, index) => {
                    const orderId = getOrderId(order);

                    return (
                      <tr
                        key={orderId ?? index}
                        className="border-b"
                      >
                        <td className="p-3">{index + 1}</td>

                        <td className="p-3">
                          {orderId ?? "ID not available"}
                        </td>

                        <td className="p-3">
                          <button
                            type="button"
                            disabled={orderId === null}
                            onClick={() => getOrderDetails(orderId)}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>

        {/* Order Details */}
        {orderDetails !== null && (
          <div className="mx-auto mt-6 max-w-5xl rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">
              Order Details
            </h2>

            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-100 p-4 text-sm">
              {JSON.stringify(orderDetails, null, 2)}
            </pre>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Checkout;
