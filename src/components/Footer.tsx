
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white pt-8 sm:pt-10 pb-4 sm:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-5">
              <img 
                src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
                alt="Mithila Sattvik Makhana Logo" 
                className="h-8 w-8 sm:h-12 sm:w-12 object-contain bg-white rounded-full p-1 shadow-md"
              />
              <h3 className="text-lg sm:text-xl font-bold">Mithila Sattvik Makhana</h3>
            </Link>
            <p className="text-sm opacity-90 mb-4 sm:mb-5 max-w-md leading-relaxed">
              From the heart of Mithila, to your home. We bring you the finest quality fox nuts (makhana) with traditional methods and values.
            </p>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-mithila-gold">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-mithila-gold hover:underline text-sm transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-mithila-gold hover:underline text-sm transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-mithila-gold hover:underline text-sm transition-colors">About Us</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-mithila-gold hover:underline text-sm transition-colors">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-mithila-gold">Contact Us</h4>
            <address className="not-italic space-y-2 sm:space-y-3">
              <div className="flex flex-col space-y-2">
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm">
                  <span className="text-gray-300">Email:</span>
                  <a href="mailto:mithilasattvikmakhana@gmail.com" className="text-mithila-gold hover:text-yellow-300 hover:underline transition-colors break-all">
                    mithilasattvikmakhana@gmail.com
                  </a>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm">
                  <span className="text-gray-300">Phone:</span>
                  <a href="tel:+919876543210" className="text-mithila-gold hover:text-yellow-300 hover:underline transition-colors">
                    9288205923
                  </a>
                </p>
              </div>
              <p className="text-sm text-gray-300">Darbhanga, Bihar, India</p>
            </address>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="border-t border-gray-600 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-400">
              © {new Date().getFullYear()} Mithila Sattvik Makhana. All rights reserved.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100066819836572"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-md"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/mithila_sattvik_makhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:scale-110 transition-all duration-300 shadow-md"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mithila-sattvik-makhana-3a839b365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-md"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
