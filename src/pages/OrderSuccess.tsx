
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | 'pending'>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const verifyAndNotify = async () => {
      const orderId = searchParams.get('order_id');
      
      if (!orderId) {
        setVerificationStatus('error');
        setErrorMessage('No order ID found. Please contact support.');
        setIsVerifying(false);
        return;
      }

      try {
        console.log('Verifying payment for order:', orderId);

        // Verify payment
        const { data: verificationResult, error: verificationError } = await supabase.functions.invoke('verify-cashfree-payment', {
          body: { order_id: orderId }
        });

        if (verificationError || !verificationResult?.isValid) {
          console.error('Payment verification failed:', verificationError);
          setVerificationStatus('error');
          setErrorMessage('Payment verification failed. Please contact support with your order ID.');
          setIsVerifying(false);
          return;
        }

        console.log('Payment verified successfully');

        // Get cart and customer data from sessionStorage
        const cartData = sessionStorage.getItem('pendingOrder');
        if (!cartData) {
          setVerificationStatus('error');
          setErrorMessage('Order data not found. Payment was successful, but we couldn\'t send confirmation. Please contact support.');
          setIsVerifying(false);
          return;
        }

        const { items, formData, totalAmount } = JSON.parse(cartData);

        // Send order notification emails
        console.log('Sending order notifications...');
        const { data: notificationData, error: notificationError } = await supabase.functions.invoke('send-order-notification', {
          body: {
            customerData: formData,
            items: items,
            totalAmount: totalAmount,
            paymentId: verificationResult.orderDetails.cf_order_id,
            orderId: orderId
          }
        });

        if (notificationError) {
          console.error('Error sending order notification:', notificationError);
          toast({
            title: "Payment Successful",
            description: "Payment completed but there was an issue sending confirmation emails. We'll contact you soon!",
          });
        } else {
          console.log('Order notification sent successfully:', notificationData);
          toast({
            title: "Order Complete!",
            description: "Payment successful and confirmation emails sent!",
          });
        }

        // Clear pending order data
        sessionStorage.removeItem('pendingOrder');
        
        setVerificationStatus('success');
        setIsVerifying(false);

      } catch (error: any) {
        console.error('Error in verification process:', error);
        setVerificationStatus('error');
        setErrorMessage('An error occurred while processing your order. Please contact support.');
        setIsVerifying(false);
      }
    };

    verifyAndNotify();
  }, [searchParams, toast]);

  if (isVerifying) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center bg-mithila-cream">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center border border-border">
            <Loader2 className="h-20 w-20 text-mithila-green mx-auto animate-spin mb-6" />
            <h1 className="text-2xl md:text-3xl font-bold text-mithila-green mb-4">Verifying Payment...</h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment and send order confirmations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center bg-mithila-cream">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center border border-border">
            <AlertCircle className="h-20 w-20 text-destructive mx-auto mb-6" />
            <h1 className="text-2xl md:text-3xl font-bold text-destructive mb-4">Verification Issue</h1>
            <p className="text-muted-foreground mb-8">{errorMessage}</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-mithila-green hover:bg-mithila-blue text-white w-full md:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-mithila-cream">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center border border-border">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-mithila-green mx-auto" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-mithila-green mb-4">Order Placed Successfully!</h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for shopping with Mithila Sattvik Makhana. Your order has been received and 
            is now being processed. You will receive confirmation emails shortly. We will contact you with the delivery details.
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
    </div>
  );
};

export default OrderSuccess;
