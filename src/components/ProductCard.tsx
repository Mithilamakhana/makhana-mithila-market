
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Images, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPlusOne, setShowPlusOne] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-mithila-gold/20">
      <Link to={`/product/${product.id}`}>
        <div className="p-3 sm:p-4 relative bg-mithila-beige h-48 sm:h-56 md:h-64 flex justify-center items-center overflow-hidden">
          <div className="relative w-full h-full">
            {product.images.length > 0 && (
              <img 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - View ${currentImageIndex + 1}`} 
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            )}
          </div>
          
          {product.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 sm:p-2 hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-mithila-blue" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 sm:p-2 hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-mithila-blue" />
              </button>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${idx === currentImageIndex ? 'bg-mithila-orange' : 'bg-white/60'}`}
                  />
                ))}
              </div>
              
              <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1" title="Multiple images available">
                <Images className="h-3 w-3 sm:h-4 sm:w-4 text-mithila-blue" />
              </div>
            </>
          )}
        </div>
      </Link>
      
      <div className="p-3 sm:p-5">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-mithila-blue mb-1 sm:mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">{product.shortDescription}</p>
        
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-base sm:text-lg font-bold text-mithila-blue">₹{product.price}</span>
          <span className="text-xs sm:text-sm text-gray-500">{product.weight}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
          <Link to={`/product/${product.id}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-mithila-blue text-mithila-blue hover:bg-mithila-blue hover:text-white text-xs sm:text-sm h-8 sm:h-9">
              View Details
            </Button>
          </Link>
          
          <div className="relative w-full sm:w-auto">
            <Button 
              className="w-full sm:w-auto bg-mithila-orange hover:bg-mithila-gold text-white text-xs sm:text-sm h-8 sm:h-9"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add to Cart
            </Button>
            
            <AnimatePresence>
              {showPlusOne && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: -20, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.8 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 pointer-events-none"
                >
                  <div className="bg-mithila-green text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg">
                    +1
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
