import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-mithila-blue text-white pt-8 sm:pt-10 pb-4 sm:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-5">
              <img 
                src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
                alt="Mithila Sattvik Makhana Logo" 
                className="h-8 w-8 sm:h-12 sm:w-12 object-contain bg-white rounded-full p-1"
              />
              <h3 className="text-lg sm:text-xl font-bold">Mithila Sattvik Makhana</h3>
            </Link>
            <p className="text-sm opacity-80 mb-4 sm:mb-5 max-w-md">
              From the heart of Mithila, to your home. We bring you the finest quality fox nuts (makhana) with traditional methods and values.
            </p>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/" className="text-mithila-gold hover:underline text-sm">Home</Link></li>
              <li><Link to="/products" className="text-mithila-gold hover:underline text-sm">Products</Link></li>
              <li><Link to="/about" className="text-mithila-gold hover:underline text-sm">About Us</Link></li>
              <li><Link to="/cart" className="text-mithila-gold hover:underline text-sm">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">Contact Us</h4>
            <address className="not-italic space-y-2 sm:space-y-3">
              <p className="flex items-center gap-2 text-sm">
                <span>Email:</span>
                <a href="mailto:info@mithilamakhana.com" className="text-mithila-gold hover:underline">
                  info@mithilamakhana.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <span>Phone:</span>
                <a href="tel:+919876543210" className="text-mithila-gold hover:underline">
                  +91 98765 43210
                </a>
              </p>
              <p className="text-sm">Mithila Region, Bihar, India</p>
            </address>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="border-t border-mithila-gold/30 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs sm:text-sm opacity-70">
              © {new Date().getFullYear()} Mithila Sattvik Makhana. All rights reserved.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-mithila-gold/20 flex items-center justify-center hover:bg-mithila-gold hover:text-mithila-blue transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-mithila-gold/20 flex items-center justify-center hover:bg-mithila-gold hover:text-mithila-blue transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-mithila-gold/20 flex items-center justify-center hover:bg-mithila-gold hover:text-mithila-blue transition-colors"
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
