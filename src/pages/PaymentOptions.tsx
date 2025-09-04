import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { ArrowLeft, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { toast } from "../components/ui/use-toast";
import { supabase } from "../integrations/supabase/client";
import MascotFloating from "../components/MascotFloating";

interface LocationState {
  customerData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: any[];
  totalAmount: number;
}

const PaymentOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const orderData = location.state as LocationState;

  // Redirect to cart if no order data
  if (!orderData) {
    navigate('/cart');
    return null;
  }

  const { customerData, items, totalAmount } = orderData;

  const handlePaymentOption = async (paymentMethod: string) => {
    setIsProcessing(true);
    
    try {
      // Process order with selected payment method
      const { data, error } = await supabase.functions.invoke('send-order-notification', {
        body: {
          customerData,
          items,
          totalAmount,
          paymentMethod,
          paymentId: `${paymentMethod.toUpperCase()}_${Date.now()}`,
          orderId: `ORDER_${Date.now()}`
        }
      });

      if (error) {
        console.error('Error processing order:', error);
        toast({
          title: "Order Processing Error",
          description: "There was an error processing your order. Please try again.",
          variant: "destructive"
        });
      } else {
        console.log('Order placed successfully:', data);
        toast({
          title: "Order Placed Successfully!",
          description: `Your order has been placed with ${paymentMethod}. We'll contact you shortly.`,
        });
        
        // Clear cart and redirect to success page
        clearCart();
        navigate('/order-success', {
          state: {
            paymentMethod,
            orderId: `ORDER_${Date.now()}`,
            totalAmount
          }
        });
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Error",
        description: "There was an error processing your payment option. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentOptions = [
    {
      id: 'paytm',
      name: 'Paytm',
      icon: Smartphone,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Pay using Paytm wallet or UPI'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: Smartphone,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Pay using PhonePe wallet or UPI'
    },
    {
      id: 'gpay',
      name: 'Google Pay',
      icon: Smartphone,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Pay using Google Pay'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Banknote,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Pay when your order is delivered'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-mithila-green hover:text-mithila-blue"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-mithila-green mb-6">Choose Payment Method</h1>
          
          {/* Order Summary */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-lg font-semibold text-mithila-green mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items ({items.length})</span>
                <span className="text-gray-600">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="text-gray-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-mithila-green pt-2 border-t">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h3 className="text-lg font-semibold text-mithila-green mb-3">Delivery Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {customerData.name}</p>
              <p><strong>Email:</strong> {customerData.email}</p>
              <p><strong>Phone:</strong> {customerData.phone}</p>
              <p><strong>Address:</strong> {customerData.address}, {customerData.city}, {customerData.state} - {customerData.pincode}</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mithila-green mb-4">Select Payment Method</h3>
            
            {paymentOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handlePaymentOption(option.name)}
                  disabled={isProcessing}
                  className={`w-full p-4 rounded-lg border-2 border-gray-200 hover:border-mithila-green transition-colors duration-200 text-left group ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${option.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-mithila-green">{option.name}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    <div className="text-mithila-green">
                      <ArrowLeft className="h-5 w-5 rotate-180" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {isProcessing && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-mithila-green bg-mithila-beige">
                <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-mithila-green">
                  <CreditCard className="h-5 w-5" />
                </div>
                Processing your order...
              </div>
            </div>
          )}
        </div>
      </div>
      
      <MascotFloating />
    </div>
  );
};

export default PaymentOptions;