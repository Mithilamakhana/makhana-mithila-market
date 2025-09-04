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

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      amount: totalAmount,
      subMethods: [
        { id: 'scan_qr', name: 'Scan the QR code & pay via any UPI app', hasQR: true },
        { id: 'enter_upi', name: 'Enter UPI ID', hasInput: true, placeholder: 'Enter UPI ID' }
      ]
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      amount: totalAmount,
      subMethods: []
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: CreditCard,
      amount: totalAmount,
      subMethods: []
    },
    {
      id: 'partial_cod',
      name: 'Partial COD',
      icon: Banknote,
      amount: 50,
      description: `Pay Balance ₹${totalAmount} at Delivery`,
      subMethods: []
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Banknote,
      amount: totalAmount,
      description: 'Pay when your order is delivered',
      subMethods: []
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
            <h3 className="text-lg font-semibold text-mithila-green mb-4">Pay via</h3>
            
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              const isSelected = selectedPayment === method.id;
              
              return (
                <div key={method.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedPayment(isSelected ? null : method.id)}
                    disabled={isProcessing}
                    className={`w-full p-4 text-left transition-colors duration-200 ${
                      isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
                          {isSelected && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                        </div>
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{method.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">₹{method.amount}</div>
                        {method.description && (
                          <div className="text-xs text-gray-500">{method.description}</div>
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {isSelected && method.subMethods.length > 0 && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      {method.subMethods.map((subMethod, index) => (
                        <div key={subMethod.id} className={index > 0 ? 'mt-4' : ''}>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            </div>
                            <span className="text-sm text-gray-700">{subMethod.name}</span>
                          </div>
                          
                          {subMethod.hasQR && (
                            <div className="ml-7">
                              <div className="bg-white p-4 rounded border text-center">
                                <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                                  <span className="text-xs text-gray-500">QR Code</span>
                                </div>
                                <div className="text-center mt-3">
                                  <span className="text-sm font-medium">OR</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {subMethod.hasInput && (
                            <div className="ml-7 mt-2">
                              <input
                                type="text"
                                placeholder={subMethod.placeholder}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <Button 
                        onClick={() => handlePaymentOption(method.name)}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                        disabled={isProcessing}
                      >
                        Pay ₹{method.amount}
                      </Button>
                    </div>
                  )}
                  
                  {isSelected && method.subMethods.length === 0 && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <Button 
                        onClick={() => handlePaymentOption(method.name)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isProcessing}
                      >
                        {method.id === 'cod' || method.id === 'partial_cod' ? 'Place Order' : `Pay ₹${method.amount}`}
                      </Button>
                    </div>
                  )}
                </div>
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