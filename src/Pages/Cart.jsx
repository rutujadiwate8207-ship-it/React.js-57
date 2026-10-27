import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch Cart Function
  const fetchCart = () => {
    const token = localStorage.getItem("token");

    axios
      .post("https://a2zithub.org/dairy/abi/cart_list", {
        token: token,
      })
      .then((res) => {
        console.log("Full API Response:", res.data);

        let cartData = [];

        if (Array.isArray(res.data)) {
          cartData = res.data;
        } else if (Array.isArray(res.data.data)) {
          cartData = res.data.data;
        }

        // Calculate Total using for loop
        let sum = 0;

        for (var i = 0; i < cartData.length; i++) {
          console.log("Price:", cartData[i].price);
          console.log("Qty:", cartData[i].qty);

          sum =
            sum +
            Number(cartData[i].price || 0) *
              Number(cartData[i].qty || 0);
        }

        console.log("Total:", sum);

        setTotal(sum);
        setCart(cartData);
      })
      .catch((err) => {
        console.log("API Error:", err);
        setCart([]);
        setTotal(0);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove Product
  function remove(product_econ_cart_id) {
    const obj = {
      product_econ_cart_id: product_econ_cart_id,
      token: localStorage.getItem("token"),
    };

    axios
      .post("https://a2zithub.org/dairy/abi/remove_cart_qty", obj)
      .then((res) => {
        console.log("Remove Response:", res.data);
        fetchCart();
      })
      .catch((err) => {
        console.log("Remove Error:", err);
      });
  }

  // Increment Quantity
  function increment(product_econ_cart_id) {
    const obj = {
      product_econ_cart_id: product_econ_cart_id,
      token: localStorage.getItem("token"),
    };

    axios
      .post("https://a2zithub.org/dairy/abi/inc_cart_qty", obj)
      .then((res) => {
        console.log("Increment Response:", res.data);
        fetchCart();
      })
      .catch((err) => {
        console.log("Increment Error:", err);
      });
  }

  // Decrement Quantity
  function decrement(product_econ_cart_id) {
    const obj = {
      product_econ_cart_id: product_econ_cart_id,
      token: localStorage.getItem("token"),
    };

    axios
      .post("https://a2zithub.org/dairy/abi/dec_cart_qty", obj)
      .then((res) => {
        console.log("Decrement Response:", res.data);
        fetchCart();
      })
      .catch((err) => {
        console.log("Decrement Error:", err);
      });
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 px-4 py-8">
        <h1 className="my-5 text-center text-4xl font-bold text-gray-900 md:text-5xl">
          Shopping Cart
        </h1>

        <div className="mx-auto max-w-7xl overflow-x-auto rounded-xl bg-white p-4 shadow-md">
          <table className="w-full min-w-[750px] border-collapse text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Sr.No</th>
                <th className="p-4">IMG</th>
                <th className="p-4">NAME</th>
                <th className="p-4">QTY</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">TOTAL</th>
                <th className="p-4">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {cart.length > 0 ? (
                cart.map((val, index) => (
                  <tr
                    className="border-b hover:bg-gray-50"
                    key={val.product_econ_cart_id || index}
                  >
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4">
                      <img
                        src={val.product_img}
                        alt={val.product_name || "Product"}
                        className="mx-auto h-16 w-16 rounded-lg object-cover"
                      />
                    </td>

                    <td className="p-4 font-semibold text-gray-800">
                      {val.product_name}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            decrement(val.product_econ_cart_id)
                          }
                          className="rounded bg-gray-200 px-3 py-1 font-bold hover:bg-gray-300"
                        >
                          -
                        </button>

                        <span className="font-semibold">
                          {val.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increment(val.product_econ_cart_id)
                          }
                          className="rounded bg-yellow-400 px-3 py-1 font-bold hover:bg-yellow-500"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="p-4 font-medium">
                      ₹{Number(val.price || 0)}
                    </td>

                    <td className="p-4 font-bold text-green-700">
                      ₹
                      {Number(val.price || 0) *
                        Number(val.qty || 0)}
                    </td>

                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() =>
                          remove(val.product_econ_cart_id)
                        }
                        className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-gray-500">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total and Checkout */}
<div className="mx-auto mt-6 flex max-w-7xl items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md">
  <h1 className="m-1 text-xl font-bold text-gray-900">
    Total : <span className="text-green-600">₹{total}</span>
  </h1>

 <Link
  to="/checkout"
  className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white shadow transition duration-300 hover:bg-blue-700 active:scale-95"
>
  Checkout
</Link>
</div>
      </section>

      <Footer />
    </>
  );
}

export default Cart;
