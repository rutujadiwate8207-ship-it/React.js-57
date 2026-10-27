import React, { useState, useEffect } from "react";
import ProductCart from "../Comman/ProductCart";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";


function Home() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [feature,setfeature] = useState([]);
  const [newProduct,setNewProduct] = useState([]);
  const [best_selling_product,setbest_selling_product] = useState([]);

  useEffect(()=>{
    axios.get("https://a2zithub.org/dairy/abi/best_selling_product").then((res)=>{
      console.log("response",res.data)
      setbest_selling_product(res.data)
    })
  },[])

  useEffect(()=>{
    axios.get("https://a2zithub.org/dairy/abi/new_product").then((res)=>{
      console.log("response",res.data)
      setNewProduct(res.data)
    })
  },[])

  useEffect(()=>{
    axios.get("https://a2zithub.org/dairy/abi/feature_product").then((res)=>{
      console.log("response",res.data)
      setfeature(res.data)
    })
  },[])

  useEffect(() => {
    axios.get("https://a2zithub.org/dairy/abi/slider_det").then((res) => {
      setSlides(res.data);
    });
  }, []);

  useEffect(() => {
    const time = setInterval(() => {
      setIndex((prv) => (prv + 1) % slides.length);
    }, 3000);

    return () => clearInterval(time);
  }, [slides.length]);

  return (
    <>
      <Navbar />
      <section className="relative w-full overflow-hidden bg-gray-900">
        <div className="relative h-[350px] sm:h-[450px] lg:h-[600px]">
            {slides.length > 0 && (
      <img
        src={slides[index].slider_img}
        alt="Slider"
        className="absolute inset-0 h-full w-full object-cover"
      />
)}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          </div>
        </div>
      </section>
      
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Feature Product
          </h2>

          <Link
            to="/Product"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View All →
          </Link>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {feature.map((val, index) => (
  <ProductCart key={val.id || index} data={val} />
))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            New Product
          </h2>

          <Link
            to="/Product"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View All →
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
           {newProduct.map((val, index) => (
  <ProductCart key={val.id || index} data={val} />
))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Best Selling Product
          </h2>

          <Link
            to="/Product"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View All →
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
           {best_selling_product.map((val, index) => (
  <ProductCart key={val.id || index} data={val} />
))}
        </div>
      </section>
      
      <Footer />
    </>
  );
}

export default Home;