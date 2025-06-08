
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-gradient-to-r from-mithila-green to-mithila-blue text-white py-3 sm:py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white rounded-full p-1 shadow-md">
            <img 
              src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
              alt="Mithila Sattvik Makhana Logo" 
              className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs xs:text-sm sm:text-lg md:text-xl font-semibold leading-tight">
              Mithila Sattvik
            </span>
            <span className="text-xs xs:text-sm sm:text-lg md:text-xl font-semibold leading-tight">
              Makhana
            </span>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="sm:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors"
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
          <Link to="/" className="hover:text-mithila-gold transition-colors text-sm md:text-base font-medium">Home</Link>
          <Link to="/products" className="hover:text-mithila-gold transition-colors text-sm md:text-base font-medium">Products</Link>
          <Link to="/about" className="hover:text-mithila-gold transition-colors text-sm md:text-base font-medium">About Us</Link>
          
          <Link to="/cart">
            <Button variant="outline" className="relative bg-mithila-orange text-white hover:bg-mithila-gold hover:text-mithila-blue border-2 border-mithila-orange hover:border-mithila-gold h-9 px-3 md:h-10 md:px-4 font-medium shadow-md">
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
              <span className="text-sm md:text-base">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>

          {/* User Authentication */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem disabled className="text-xs text-gray-600">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-mithila-green to-mithila-blue shadow-xl py-3 flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out border-t border-white/20">
            <Link to="/" className="w-full text-center py-3 hover:bg-white/10 font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="w-full text-center py-3 hover:bg-white/10 font-medium" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/about" className="w-full text-center py-3 hover:bg-white/10 font-medium" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/cart" className="w-full text-center py-3 hover:bg-white/10 flex justify-center items-center gap-2 font-medium" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({getTotalItems()})</span>
            </Link>
            
            {user ? (
              <div className="w-full border-t border-white/20 pt-3">
                <div className="text-center py-2 text-xs text-white/70">
                  {user.email}
                </div>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-center py-3 hover:bg-white/10 font-medium text-red-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/auth" className="w-full text-center py-3 hover:bg-white/10 font-medium border-t border-white/20" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
