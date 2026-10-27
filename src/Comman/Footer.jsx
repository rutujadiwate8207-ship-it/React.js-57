import { Link } from 'react-router-dom';

import {
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterXLine,
  RiLinkedinFill,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
} from "@remixicon/react";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo */}
          <div>
            <h1 className="text-3xl font-bold text-blue-400 mb-4">
              MyLogo
            </h1>

            <p className="text-gray-400 leading-7">
            We provide quality product and 
            services to make your life easier and 
            better.
            </p>

            {/* Social Media (External Links use 'a' tag) */}
            <div className="flex gap-4 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="hover:text-blue-400">
                <RiFacebookFill size={24} />
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="hover:text-pink-400">
                <RiInstagramLine size={24} />
              </a>

              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="hover:text-blue-400">
                <RiTwitterXLine size={24} />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="hover:text-blue-400">
                <RiLinkedinFill size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links (Internal Links use 'Link' component) */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About
                </Link>
              </li>

              <li>
                <Link to="/product" className="hover:text-blue-400">
                  Product
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Our Services
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>App Development</li>
              <li>Support</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Contact Us
            </h2>

            <div className="space-y-4 text-gray-400">

              <p className="flex items-center gap-3">
                <RiMapPinLine size={22} />
                Ahmednagar, Maharashtra, India
              </p>

               <p className="flex items-center gap-3">
                <RiPhoneLine size={22} />
               +91 00000 00000
              </p>

              <p className="flex items-center gap-3">
                <RiMailLine size={22} />
                info@example.com
              </p>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto pt-6 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; 2026 MyLogo. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gray-400 transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;