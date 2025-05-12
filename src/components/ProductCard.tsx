
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Images, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-mithila-gold/20">
      <Link to={`/product/${product.id}`}>
        <div className="p-4 relative bg-mithila-beige h-64 flex justify-center items-center overflow-hidden">
          <div className="relative w-48 h-48">
            {product.images.length > 0 && (
              <img 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - View ${currentImageIndex + 1}`} 
                className="h-full w-full object-contain transition-opacity duration-300"
              />
            )}
          </div>
          
          {product.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 text-mithila-blue" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 text-mithila-blue" />
              </button>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-mithila-orange' : 'bg-white/60'}`}
                  />
                ))}
              </div>
              
              <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1" title="Multiple images available">
                <Images className="h-4 w-4 text-mithila-blue" />
              </div>
            </>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-mithila-blue mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3 text-sm">{product.shortDescription}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-mithila-blue">₹{product.price}</span>
          <span className="text-sm text-gray-500">{product.weight}</span>
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <Link to={`/product/${product.id}`}>
            <Button variant="outline" className="border-mithila-blue text-mithila-blue hover:bg-mithila-blue hover:text-white">
              View Details
            </Button>
          </Link>
          
          <Button 
            className="bg-mithila-orange hover:bg-mithila-gold text-white"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
