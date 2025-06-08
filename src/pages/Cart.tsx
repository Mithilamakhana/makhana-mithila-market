
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext.tsx";
import { Button } from "../components/ui/button.tsx";
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from "../components/ui/use-toast.ts";
import { supabase } from "../integrations/supabase/client.ts";
import MascotFloating from "../components/MascotFloating.tsx";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof typeof formData;
    const value = target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === '') {
        toast({
          title: "Error",
          description: "Please fill all the required fields",
          variant: "destructive"
        });
        return;
      }
    }

    setIsProcessing(true);
    
    try {
      // Send order notification email
      const { data, error } = await supabase.functions.invoke('send-order-notification', {
        body: {
          customerData: formData,
          items: items,
          totalAmount: getTotalPrice()
        }
      });

      if (error) {
        console.error('Error sending order notification:', error);
        toast({
          title: "Order Placed",
          description: "Your order has been received, but there was an issue with the notification. We'll contact you shortly.",
        });
      } else {
        console.log('Order notification sent successfully:', data);
        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. We'll contact you shortly.",
        });
      }
      
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Order Placed",
        description: "Your order has been received. We'll contact you shortly.",
      });
      clearCart();
      navigate('/order-success');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-8">
              <ShoppingCart className="mx-auto h-16 w-16 text-mithila-green opacity-50" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-mithila-green mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button 
              className="bg-mithila-orange hover:bg-mithila-gold text-white"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
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
        
        <h1 className="text-2xl md:text-3xl font-bold text-mithila-green mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-mithila-green">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-20 w-20 object-contain bg-mithila-beige p-2 rounded-md"
                    />
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-mithila-green">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm">{item.product.weight}</p>
                      <p className="text-mithila-blue font-semibold mt-1">₹{item.product.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          className="px-2 py-1 border-r border-gray-300 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-mithila-green mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹0</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold text-mithila-green">
                    <span>Total</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Including GST</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-mithila-green mb-4">Customer Information</h2>
              
              <form onSubmit={handleCheckout}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input 
                        type="text" 
                        id="state" 
                        name="state" 
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code
                    </label>
                    <input 
                      type="text" 
                      id="pincode" 
                      name="pincode" 
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-mithila-green hover:bg-mithila-blue text-white py-2"
                    >
                      {isProcessing ? 'Processing Order...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <MascotFloating />
    </div>
  );
};

export default Cart;
