
// This file is part of the Mithila Sattvik Makhana project.
import { serve } from "https://deno.land/std@0.224.0/http/mod.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface OrderNotificationRequest {
  customerData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      weight: string;
    };
    quantity: number;
  }>;
  totalAmount: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  // Authorization header check
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return new Response(
      JSON.stringify({ code: 401, message: "Missing authorization header" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    // Check if RESEND_API_KEY is available
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const { customerData, items, totalAmount }: OrderNotificationRequest = await req.json();

    console.log("Processing order notification for:", customerData.name);
    console.log("Customer email:", customerData.email);

    // Generate order items HTML
    const orderItemsHtml = items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px; text-align: left;">${item.product.name}</td>
        <td style="padding: 10px; text-align: center;">${item.product.weight}</td>
        <td style="padding: 10px; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; text-align: right;">₹${item.product.price}</td>
        <td style="padding: 10px; text-align: right;">₹${item.product.price * item.quantity}</td>
      </tr>
    `).join('');

    // Business notification email
    const businessEmailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2E7D32; text-align: center;">New Order Received!</h1>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #2E7D32; margin-top: 0;">Customer Information</h2>
              <p><strong>Name:</strong> ${customerData.name}</p>
              <p><strong>Email:</strong> ${customerData.email}</p>
              <p><strong>Phone:</strong> ${customerData.phone}</p>
              <p><strong>Address:</strong> ${customerData.address}</p>
              <p><strong>City:</strong> ${customerData.city}</p>
              <p><strong>State:</strong> ${customerData.state}</p>
              <p><strong>PIN Code:</strong> ${customerData.pincode}</p>
            </div>

            <div style="margin: 20px 0;">
              <h2 style="color: #2E7D32;">Order Details</h2>
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                <thead>
                  <tr style="background-color: #2E7D32; color: white;">
                    <th style="padding: 12px; text-align: left;">Product</th>
                    <th style="padding: 12px; text-align: center;">Weight</th>
                    <th style="padding: 12px; text-align: center;">Quantity</th>
                    <th style="padding: 12px; text-align: right;">Price</th>
                    <th style="padding: 12px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                </tbody>
              </table>
            </div>

            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; text-align: right;">
              <h3 style="color: #2E7D32; margin: 0;">Total Amount: ₹${totalAmount}</h3>
            </div>

            <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-radius: 8px;">
              <p style="margin: 0; color: #856404;"><strong>Action Required:</strong> Please contact the customer to confirm the order and arrange delivery.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Customer confirmation email
    const customerEmailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2E7D32; text-align: center;">Order Confirmation</h1>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h2 style="color: #2E7D32; margin-top: 0;">Thank you for your order, ${customerData.name}!</h2>
              <p style="margin: 5px 0;">We have received your order and will contact you shortly to confirm the details and arrange delivery.</p>
            </div>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2E7D32; margin-top: 0;">Delivery Information</h3>
              <p><strong>Name:</strong> ${customerData.name}</p>
              <p><strong>Phone:</strong> ${customerData.phone}</p>
              <p><strong>Address:</strong> ${customerData.address}, ${customerData.city}, ${customerData.state} - ${customerData.pincode}</p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #2E7D32;">Your Order Details</h3>
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                <thead>
                  <tr style="background-color: #2E7D32; color: white;">
                    <th style="padding: 12px; text-align: left;">Product</th>
                    <th style="padding: 12px; text-align: center;">Weight</th>
                    <th style="padding: 12px; text-align: center;">Quantity</th>
                    <th style="padding: 12px; text-align: right;">Price</th>
                    <th style="padding: 12px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                </tbody>
              </table>
            </div>

            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; text-align: right;">
              <h3 style="color: #2E7D32; margin: 0;">Total Amount: ₹${totalAmount}</h3>
            </div>

            <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #666;"><strong>What's Next?</strong></p>
              <p style="margin: 5px 0; color: #666;">Our team will contact you within 24 hours to confirm your order and arrange delivery. Thank you for choosing Mithila Sattvik Makhana!</p>
            </div>

            <div style="margin-top: 30px; text-align: center; color: #888; font-size: 12px;">
              <p>If you have any questions, please contact us at mithilasattvikmakhan@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    let businessEmailSuccess = false;
    let customerEmailSuccess = false;
    let businessEmailResponse = null;
    let customerEmailResponse = null;
    let businessEmailError = null;
    let customerEmailError = null;

    // Send email to business
    try {
      console.log("Sending business email to: mithilasattvikmakhan@gmail.com");
      businessEmailResponse = await resend.emails.send({
        from: "Mithila Sattvik Makhana <onboarding@resend.dev>",
        to: ["mithilasattvikmakhan@gmail.com"],
        subject: `New Order from ${customerData.name} - ₹${totalAmount}`,
        html: businessEmailHtml,
      });
      
      console.log("Business email sent successfully:", businessEmailResponse);
      businessEmailSuccess = true;
    } catch (error) {
      console.error("Failed to send business email:", error);
      businessEmailError = error;
    }

    // Send confirmation email to customer
    try {
      console.log("Sending customer email to:", customerData.email);
      customerEmailResponse = await resend.emails.send({
        from: "Mithila Sattvik Makhana <onboarding@resend.dev>",
        to: [customerData.email],
        subject: `Order Confirmation - Thank you for your purchase!`,
        html: customerEmailHtml,
      });
      
      console.log("Customer email sent successfully:", customerEmailResponse);
      customerEmailSuccess = true;
    } catch (error) {
      console.error("Failed to send customer email:", error);
      customerEmailError = error;
    }

    // Return detailed response about email status
    return new Response(JSON.stringify({ 
      success: businessEmailSuccess || customerEmailSuccess,
      businessEmail: {
        success: businessEmailSuccess,
        emailId: businessEmailResponse?.data?.id,
        error: businessEmailError?.message
      },
      customerEmail: {
        success: customerEmailSuccess,
        emailId: customerEmailResponse?.data?.id,
        error: customerEmailError?.message
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-order-notification function:", error);
    return new Response(
      JSON.stringify({ error: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
