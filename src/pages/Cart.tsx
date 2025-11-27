import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext.tsx";
import { Button } from "../components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx";
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from "../components/ui/use-toast.ts";
import { supabase } from "../integrations/supabase/client.ts";
import MascotFloating from "../components/MascotFloating.tsx";
import { indianStates, citiesByState } from "../data/indianStatesAndCities.ts";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getSubtotal, getDiscount, getDeliveryCharge, getTotalItems, clearCart } = useCart();
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
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    pincode: ''
  });
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    return phoneRegex.test(phone);
  };

  const validatePincode = (pincode: string): boolean => {
    const pincodeRegex = /^\d{6}$/; // 6-digit pincode
    return pincodeRegex.test(pincode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof typeof formData;
    const value = target.value;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear previous errors and validate on change
    const newErrors = { ...formErrors };
    
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        newErrors.email = '';
      }
    }
    
    if (name === 'phone') {
      if (value && !validatePhone(value)) {
        newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
      } else {
        newErrors.phone = '';
      }
    }

    if (name === 'pincode') {
      if (value && !validatePincode(value)) {
        newErrors.pincode = 'Please enter a valid 6-digit PIN code';
      } else {
        newErrors.pincode = '';
      }
    }
    
    setFormErrors(newErrors);
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      state: value,
      city: '' // Reset city when state changes
    }));
    setAvailableCities(citiesByState[value] || []);
  };

  const handleCityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      city: value
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = { email: '', phone: '', pincode: '' };
    let hasErrors = false;

    // Check if all required fields are filled
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

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
      hasErrors = true;
    }

    // Validate pincode
    if (!validatePincode(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
      hasErrors = true;
    }

    setFormErrors(newErrors);

    if (hasErrors) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderAmount = getTotalPrice();
      const tempOrderId = `ORD${Date.now()}`;
      
      // STEP 1: Send order confirmation emails FIRST
      toast({
        title: "Processing Order",
        description: "Sending order confirmation...",
      });
      
      const { data: notificationData, error: notificationError } = await supabase.functions.invoke('send-order-notification', {
        body: {
          customerData: formData,
          items: items,
          totalAmount: orderAmount,
          paymentId: 'PENDING',
          orderId: tempOrderId
        }
      });

      if (notificationError) {
        console.error('Error sending order notification:', notificationError);
        
        // Check if it's a connection error (ngrok offline, etc.)
        const errorMessage = notificationError.message || '';
        if (errorMessage.includes('offline') || errorMessage.includes('ERR_NGROK') || errorMessage.includes('Failed to fetch')) {
          toast({
            title: "Connection Error",
            description: "Unable to connect to our servers. Please check your internet connection and try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Notification Failed",
            description: "We couldn't send the order confirmation. Please contact support or try again.",
            variant: "destructive"
          });
        }
        setIsProcessing(false);
        return;
      }

      console.log('Order notification sent successfully:', notificationData);
      
      toast({
        title: "Order Confirmed",
        description: "Email sent! Proceeding to payment...",
      });

      // STEP 2: Now proceed to payment gateway
      const returnUrl = `${window.location.origin}/order-success`;
      
      const { data: cashfreeOrder, error: cashfreeError } = await supabase.functions.invoke('create-cashfree-order', {
        body: {
          amount: orderAmount,
          customer_details: {
            customer_id: `cust_${Date.now()}`,
            customer_email: formData.email,
            customer_phone: formData.phone,
            customer_name: formData.name,
          },
          order_meta: {
            return_url: returnUrl,
          }
        }
      });

      if (cashfreeError) {
        console.error('Error creating Cashfree order:', cashfreeError);
        
        const errorMessage = cashfreeError.message || '';
        if (errorMessage.includes('offline') || errorMessage.includes('ERR_NGROK') || errorMessage.includes('Failed to fetch')) {
          toast({
            title: "Connection Error",
            description: "Unable to connect to payment gateway. Please check your internet connection.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Payment Setup Failed",
            description: "Unable to initialize payment. Please try again or contact support.",
            variant: "destructive"
          });
        }
        setIsProcessing(false);
        return;
      }

      console.log('Cashfree order created:', cashfreeOrder);

      // Initialize Cashfree Checkout
      const cashfree = (window as any).Cashfree({
        mode: "production"
      });

      const checkoutOptions = {
        paymentSessionId: cashfreeOrder.payment_session_id,
        returnUrl: returnUrl,
        redirectTarget: "_modal",
        appearance: {
          primary_color: "#D97706",
          merchant_name: "Mithila Sattvik Makhana",
        },
        components: {
          order_details: {
            show_order_details: true,
            amount: orderAmount,
            currency: "INR"
          }
        }
      };

      // Open Cashfree payment modal
      cashfree.checkout(checkoutOptions).then(async (result: any) => {
        if (result.error) {
          console.error('Payment error:', result.error);
          toast({
            title: "Payment Failed",
            description: "Unable to process payment. Please try again or contact support.",
            variant: "destructive"
          });
          setIsProcessing(false);
          return;
        }

        if (result.redirect) {
          console.log('Payment redirect initiated');
        }

        // Verify payment
        const { data: verificationResult, error: verificationError } = await supabase.functions.invoke('verify-cashfree-payment', {
          body: {
            order_id: cashfreeOrder.order_id,
          }
        });

        if (verificationError || !verificationResult.isValid) {
          console.error('Payment verification failed:', verificationError);
          toast({
            title: "Payment Verification Failed",
            description: "We couldn't verify your payment. Please contact support with your order details.",
            variant: "destructive"
          });
          setIsProcessing(false);
          return;
        }

        // Payment successful
        toast({
          title: "Payment Successful!",
          description: "Your order has been confirmed and you'll receive updates via email.",
        });
        
        // Clear cart and redirect
        clearCart();
        navigate('/order-success');
      });

    } catch (error: any) {
      console.error('Checkout error:', error);
      
      // User-friendly error message
      const errorMessage = error?.message || '';
      if (errorMessage.includes('offline') || errorMessage.includes('ERR_NGROK') || errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        toast({
          title: "Connection Error",
          description: "Unable to connect to our servers. Please check your internet connection and try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Order Processing Failed",
          description: "Something went wrong. Please try again or contact our support team for help.",
          variant: "destructive"
        });
      }
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
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-400 text-sm line-through">₹{item.product.price}</p>
                        <p className="text-mithila-blue font-semibold">₹{item.product.price - 100}</p>
                      </div>
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
                  <span>₹{getSubtotal()}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({getTotalItems()} × ₹100)</span>
                    <span>- ₹{getTotalItems() * 100}</span>
                  </div>
                  {getTotalItems() >= 3 && (
                    <div className="flex justify-between text-green-600">
                      <span>Bonus Discount (3+ packets)</span>
                      <span>- ₹100</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span>{getDeliveryCharge() === 0 ? 'FREE' : `₹${getDeliveryCharge()}`}</span>
                </div>
                
                {getTotalItems() === 1 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mt-2">
                    <p className="text-green-700 text-sm font-semibold flex items-center gap-2">
                      🎉 Add one more packet and get FREE shipping!
                    </p>
                  </div>
                )}
                
                {getTotalItems() === 2 && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 mt-2">
                    <p className="text-amber-700 text-sm font-semibold flex items-center gap-2">
                      🎁 Add one more packet and get ₹100 extra discount!
                    </p>
                  </div>
                )}
                
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
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
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
                      placeholder="10-digit mobile number"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                    )}
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
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <Select value={formData.state} onValueChange={handleStateChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Select value={formData.city} onValueChange={handleCityChange} disabled={!formData.state}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      placeholder="6-digit PIN code"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mithila-green ${
                        formErrors.pincode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {formErrors.pincode && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>
                    )}
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
