
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-mithila-blue text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
                alt="Mithila Sattvik Makhana Logo" 
                className="h-12 w-12 object-contain bg-white rounded-full p-1"
              />
              <h3 className="text-xl font-bold">Mithila Sattvik Makhana</h3>
            </Link>
            <p className="text-sm opacity-80 mb-4">
              From the heart of Mithila, to your home. We bring you the finest quality fox nuts (makhana) with traditional methods and values.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-mithila-gold hover:underline">Home</Link></li>
              <li><Link to="/products" className="text-mithila-gold hover:underline">Products</Link></li>
              <li><Link to="/about" className="text-mithila-gold hover:underline">About Us</Link></li>
              <li><Link to="/cart" className="text-mithila-gold hover:underline">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic space-y-2">
              <p className="flex items-center gap-2">
                <span>Email:</span>
                <a href="mailto:info@mithilamakhana.com" className="text-mithila-gold hover:underline">
                  info@mithilamakhana.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>Phone:</span>
                <a href="tel:+919876543210" className="text-mithila-gold hover:underline">
                  +91 98765 43210
                </a>
              </p>
              <p>Mithila Region, Bihar, India</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-mithila-gold/30 mt-8 pt-6 text-center">
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Mithila Sattvik Makhana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
