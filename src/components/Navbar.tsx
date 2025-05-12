
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-mithila-green text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
            alt="Mithila Sattvik Makhana Logo" 
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-semibold hidden md:inline">Mithila Sattvik Makhana</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-mithila-gold transition-colors">Home</Link>
          <Link to="/products" className="hover:text-mithila-gold transition-colors">Products</Link>
          <Link to="/about" className="hover:text-mithila-gold transition-colors">About Us</Link>
          <Link to="/cart">
            <Button variant="outline" className="relative bg-mithila-orange text-white hover:bg-mithila-gold border-none">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-mithila-blue text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-mithila-green shadow-lg py-4 flex flex-col items-center space-y-4">
            <Link to="/" className="w-full text-center py-2 hover:bg-mithila-blue" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="w-full text-center py-2 hover:bg-mithila-blue" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/about" className="w-full text-center py-2 hover:bg-mithila-blue" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/cart" className="w-full text-center py-2 hover:bg-mithila-blue" onClick={() => setIsMenuOpen(false)}>
              Cart ({getTotalItems()})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
