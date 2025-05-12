
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import MascotFloating from '@/components/MascotFloating';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-mithila-green mb-4">Product Not Found</h1>
        <Button onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-mithila-green hover:text-mithila-blue"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-mithila-beige rounded-lg p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-64 w-64 md:h-80 md:w-80 object-contain"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-mithila-green mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.shortDescription}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-mithila-blue">₹{product.price}</span>
              <span className="text-gray-500">{product.weight}</span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <Button 
                className="bg-mithila-orange hover:bg-mithila-gold text-white"
                onClick={() => addToCart(product, quantity)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            
            <div className="bg-mithila-beige rounded-lg p-4">
              <h3 className="font-semibold text-mithila-green mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-mithila-gold/20">
            <h2 className="text-xl font-semibold text-mithila-green mb-4">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-mithila-gold/20">
            <h2 className="text-xl font-semibold text-mithila-green mb-4">Nutritional Information</h2>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div className="border-b border-gray-200 py-2">Calories</div>
              <div className="border-b border-gray-200 py-2">{product.nutritionalInfo.calories}</div>
              
              <div className="border-b border-gray-200 py-2">Protein</div>
              <div className="border-b border-gray-200 py-2">{product.nutritionalInfo.protein}</div>
              
              <div className="border-b border-gray-200 py-2">Fat</div>
              <div className="border-b border-gray-200 py-2">{product.nutritionalInfo.fat}</div>
              
              <div className="border-b border-gray-200 py-2">Carbohydrates</div>
              <div className="border-b border-gray-200 py-2">{product.nutritionalInfo.carbohydrates}</div>
              
              <div className="border-b border-gray-200 py-2">Fiber</div>
              <div className="border-b border-gray-200 py-2">{product.nutritionalInfo.fiber}</div>
            </div>
          </div>
        </div>
      </div>

      <MascotFloating />
    </div>
  );
};

export default ProductDetail;
