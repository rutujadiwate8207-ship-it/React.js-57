import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Product from "./Pages/Product.jsx";
import Contact from "./Pages/Contact.jsx";
import Product_det from "./Pages/Product_det.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/Product_det/:product_id"
          element={<Product_det />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
