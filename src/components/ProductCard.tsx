
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Images } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-mithila-gold/20">
      <div className="p-4 flex justify-center bg-mithila-beige relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-48 w-48 object-contain"
        />
        {product.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1" title="Multiple images available">
            <Images className="h-4 w-4 text-mithila-green" />
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-mithila-green mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3 text-sm">{product.shortDescription}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-mithila-blue">₹{product.price}</span>
          <span className="text-sm text-gray-500">{product.weight}</span>
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <Link to={`/product/${product.id}`}>
            <Button variant="outline" className="border-mithila-green text-mithila-green hover:bg-mithila-green hover:text-white">
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
