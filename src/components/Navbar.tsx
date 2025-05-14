
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-mithila-blue text-white py-3 sm:py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white rounded-full p-1">
            <img 
              src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
              alt="Mithila Sattvik Makhana Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            />
          </div>
          <span className="text-lg sm:text-xl font-semibold hidden sm:inline-block">Mithila Sattvik Makhana</span>
          <span className="text-sm font-semibold sm:hidden">Mithila</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="sm:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6">
          <Link to="/" className="hover:text-mithila-gold transition-colors text-sm md:text-base">Home</Link>
          <Link to="/products" className="hover:text-mithila-gold transition-colors text-sm md:text-base">Products</Link>
          <Link to="/about" className="hover:text-mithila-gold transition-colors text-sm md:text-base">About Us</Link>
          <Link to="/cart">
            <Button variant="outline" className="relative bg-mithila-orange text-white hover:bg-mithila-gold border-none h-9 px-3 md:h-10 md:px-4">
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
              <span className="text-sm md:text-base">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-mithila-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 bg-mithila-blue shadow-lg py-3 flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out">
            <Link to="/" className="w-full text-center py-3 hover:bg-mithila-blue/80" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="w-full text-center py-3 hover:bg-mithila-blue/80" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/about" className="w-full text-center py-3 hover:bg-mithila-blue/80" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/cart" className="w-full text-center py-3 hover:bg-mithila-blue/80 flex justify-center items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({getTotalItems()})</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
