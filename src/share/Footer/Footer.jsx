import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import TravelLeisureLogo from "../../assets/images/Travel+Leisure-logo.png";

const Footer = () => {
  return (
    <footer className="py-10 text-sm" style={{ backgroundColor: "#ecf4fd" }}>
      <div className="container mx-auto px-4">
        {/* Expedia Group Logo */}
        <div className="flex  mb-4">
          <img src={TravelLeisureLogo} alt="Expedia Group" className="w-40 h-auto" />
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-base font-bold mb-3 text-gray-800">About Us</h3>
            <ul className="space-y-1">
              <li><a href="/about" className="text-gray-600 hover:text-gray-900">Our Story</a></li>
              <li><a href="/careers" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="/press" className="text-gray-600 hover:text-gray-900">Press</a></li>
              <li><a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-base font-bold mb-3 text-gray-800">Explore</h3>
            <ul className="space-y-1">
              <li><a href="/flights" className="text-gray-600 hover:text-gray-900">Flights</a></li>
              <li><a href="/hotels" className="text-gray-600 hover:text-gray-900">Hotels</a></li>
              <li><a href="/car-rentals" className="text-gray-600 hover:text-gray-900">Car Rentals</a></li>
              <li><a href="/activities" className="text-gray-600 hover:text-gray-900">Activities</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-base font-bold mb-3 text-gray-800">Support</h3>
            <ul className="space-y-1">
              <li><a href="/help" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-600 hover:text-gray-900">FAQs</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-base font-bold mb-3 text-gray-800">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Legal Section */}
        <div className="text-center text-gray-600 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Expedia, Inc., an Expedia Group company. All rights reserved.
            Expedia and the Expedia Logo are trademarks or registered trademarks of Expedia, Inc. CST# 2029030-50.
          </p>
          <p className="mt-2">
            <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a> | 
            <a href="/terms" className="hover:text-gray-900"> Terms of Use</a> | 
            <a href="/cookies" className="hover:text-gray-900"> Cookie Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
