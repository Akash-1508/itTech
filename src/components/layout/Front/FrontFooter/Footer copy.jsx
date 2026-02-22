import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">TailorTouch</h3>
            <p className="text-gray-300 mb-6">
              Connecting customers with skilled tailors for custom clothing and alterations. 
              Experience quality craftsmanship and personalized service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-primary-400">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400">
                  Custom Suits
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400">
                  Alterations
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400">
                  Wedding Attire
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400">
                  Corporate Wear
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400">
                  Casual Wear
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <FaPhone className="w-5 h-5 text-primary-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="w-5 h-5 text-primary-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">info@tailortouch.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 text-primary-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">123 Main Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 TailorTouch. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-primary-400 text-sm">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 