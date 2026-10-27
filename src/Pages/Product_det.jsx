import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import { useParams, useNavigate , Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product_det() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [product_det, setProduct_det] = useState({});

  // Load Product Details
  useEffect(() => {
    const obj = {
      product_id: product_id,
      token: localStorage.getItem("token"),
    };

    axios
      .post("https://a2zithub.org/dairy/abi/product_by_id", obj)
      .then((res) => {
        console.log("Product Response:", res.data);

        setProduct_det(
          res.data.data?.[0] || res.data.data || res.data
        );
      })
      .catch((err) => {
        console.log("Product Error:", err);
        toast.error("Product load failed");
      });
  }, [addToCart]);

  // Add To Cart
  function addToCart() {
    const token = localStorage.getItem("token");

    if (!localStorage.getItem("token")) {
    navigate("/login");
    }

    const obj = {
      product_id: product_id,
      token: token,
    };

    axios
      .post("https://a2zithub.org/dairy/abi/addtocart", obj)
      .then((res) => {
        console.log("Cart Response:", res.data);

        toast.success("Added To Cart");
      })
      .catch((err) => {
        console.log("Cart Error:", err);
        toast.error("Unable to add product to cart");
      });
  }

  // Go To Cart
  function goToCart() {
    navigate("/cart");
  }

  // Buy Now
  function buyNow() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first");
      navigate("/login");
      return;
    }

    const obj = {
      product_id: product_id,
      token: token,
    };

    axios
      .post("https://a2zithub.org/dairy/abi/addtocart", obj)
      .then((res) => {
        console.log("Cart Response:", res.data);
        toast.success("Added To Cart");
        navigate("/cart");
      })
      .catch((err) => {
        console.log("Cart Error:", err);
        toast.error("Unable to add product to cart");
      });
  }

  return (
    <>
      <Navbar />

      <ToastContainer position="top-right" autoClose={2000} />

      <section className="min-h-screen bg-gray-50 px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Product Details
        </h1>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 rounded-xl bg-white p-6 shadow-md md:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product_det.product_img}
              alt={product_det.product_name || "Product"}
              className="h-96 w-full object-cover"
            />
          </div>

          {/* Product Information */}
          <div>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              In Stock
            </span>

            <h2 className="mb-4 mt-3 text-3xl font-bold text-gray-900">
              {product_det.product_name}
            </h2>

            <p className="mt-4 text-2xl font-bold text-indigo-600">
              ₹{product_det.price}
            </p>

            <p className="mt-4 text-gray-600">
              {product_det.details}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {product_det.cart === "Yes" ? (
               <Link
    to="/cart"
    className="flex-1 rounded-md bg-green-700 px-5 py-3 text-center font-semibold text-white transition duration-300 hover:bg-green-900"
  >
    Go To Cart
  </Link>
              ) : (
                <button
                  onClick={addToCart}
                  className="flex-1 rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-800"
                >
                  Add To Cart
                </button>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Product_det;
