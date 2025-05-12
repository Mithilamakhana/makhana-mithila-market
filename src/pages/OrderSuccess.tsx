
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, ShoppingCart } from 'lucide-react';
import MascotFloating from '@/components/MascotFloating';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-mithila-green mb-4">Order Placed Successfully!</h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for shopping with Mithila Sattvik Makhana. Your order has been received and 
            is now being processed. We will contact you shortly with the delivery details.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-mithila-green hover:bg-mithila-blue text-white w-full md:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <Link to="/products">
              <Button 
                variant="outline" 
                className="border-mithila-orange text-mithila-orange hover:bg-mithila-orange hover:text-white w-full md:w-auto"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <MascotFloating />
    </div>
  );
};

export default OrderSuccess;
