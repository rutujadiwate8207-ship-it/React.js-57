
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import ProductCart from "../Comman/ProductCart";
import axios from "axios";
import { useEffect, useState } from "react";

function Product() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://a2zithub.org/dairy/abi/product_det")
      .then((res) => {
        console.log("Response", res.data);

        // API madhun products array milavnyasathi
        const data = res.data.data || res.data;
        setProduct(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.log("Product API Error:", error);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900 sm:text-5xl">
          Product Page
        </h1>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.map((val, index) => (
            <ProductCart
              key={val.product_id || index}
              data={val}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Product;
