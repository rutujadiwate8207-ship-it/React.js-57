import { RiIdCardFill, RiShoppingCart2Fill } from "@remixicon/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              MyLogo
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/product"
              className="text-gray-700 hover:text-blue-600"
            >
              Product
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>

          {
            localStorage.getItem("token")
            ?
              <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="text-white  rounded bg-blue-600 hover:text-black hover:bg-white transition"
            >
              <RiShoppingCart2Fill />
            </Link>

            <Link
              to="/profile"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <RiIdCardFill />
            </Link>
          </div>
            :
               <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
            }
          {/* Login and Register Buttons */}
       

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
