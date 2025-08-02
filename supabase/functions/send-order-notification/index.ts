
// This file is part of the Mithila Sattvik Makhana project.
import { serve } from "https://deno.land/std@0.224.0/http/mod.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

// Mithila painting CSS styles for email borders and decorations
const mithilaBorderStyles = `
  <style>
    .mithila-border {
      border: 8px solid transparent;
      border-image: linear-gradient(45deg, #D4AF37, #B8860B, #DAA520, #FFD700, #F0E68C) 1;
      background: linear-gradient(white, white) padding-box, 
                  linear-gradient(45deg, #D4AF37, #B8860B, #DAA520, #FFD700, #F0E68C) border-box;
      position: relative;
    }
    
    .mithila-border::before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      background: repeating-linear-gradient(
        0deg,
        #D4AF37 0px,
        #D4AF37 2px,
        transparent 2px,
        transparent 8px
      ),
      repeating-linear-gradient(
        90deg,
        #B8860B 0px,
        #B8860B 2px,
        transparent 2px,
        transparent 8px
      );
      z-index: -1;
    }
    
    .mithila-pattern {
      background-image: 
        radial-gradient(circle at 25% 25%, #D4AF37 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, #B8860B 2px, transparent 2px);
      background-size: 20px 20px;
      background-position: 0 0, 10px 10px;
      padding: 10px;
    }
    
    .mithila-header {
      background: linear-gradient(135deg, #2E7D32, #4CAF50, #66BB6A);
      color: white;
      text-align: center;
      padding: 20px;
      border-bottom: 4px solid #D4AF37;
      position: relative;
    }
    
    .mithila-header::after {
      content: '🪷 ॐ 🪷';
      display: block;
      font-size: 14px;
      margin-top: 5px;
      color: #FFD700;
    }
    
    .mithila-footer {
      background: linear-gradient(135deg, #D4AF37, #B8860B);
      color: white;
      text-align: center;
      padding: 15px;
      border-top: 4px solid #2E7D32;
    }
    
    .lotus-divider {
      text-align: center;
      margin: 20px 0;
      font-size: 20px;
      color: #D4AF37;
    }
  </style>
`;

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

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { customerData, items, totalAmount }: OrderNotificationRequest = await req.json();

    console.log("Processing order notification for:", customerData.name);
    console.log("Customer email:", customerData.email);

    // Insert order into database
    console.log("Inserting order into database...");
    const { data: insertedOrder, error: insertError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerData.name,
        customer_email: customerData.email,
        customer_phone: customerData.phone,
        customer_address: customerData.address,
        customer_city: customerData.city,
        customer_state: customerData.state,
        customer_pin: customerData.pincode,
        total_amount: totalAmount,
        order_items: items
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting order:", insertError);
      throw insertError;
    }

    console.log("Order inserted successfully:", insertedOrder);

    // Generate order items HTML
    const orderItemsHtml = items.map(item => `
      <tr style="border-bottom: 1px solid #D4AF37;">
        <td style="padding: 12px; text-align: left; border-right: 1px solid #F0E68C;">${item.product.name}</td>
        <td style="padding: 12px; text-align: center; border-right: 1px solid #F0E68C;">${item.product.weight}</td>
        <td style="padding: 12px; text-align: center; border-right: 1px solid #F0E68C;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right; border-right: 1px solid #F0E68C;">₹${item.product.price}</td>
        <td style="padding: 12px; text-align: right;">₹${item.product.price * item.quantity}</td>
      </tr>
    `).join('');

    // Business notification email with Mithila design
    const businessEmailHtml = `
      <html>
        <head>
          ${mithilaBorderStyles}
        </head>
        <body style="font-family: 'Georgia', serif; line-height: 1.6; color: #333; background-color: #FFF8DC; margin: 0; padding: 20px;">
          <div class="mithila-border" style="max-width: 650px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden;">
            <div class="mithila-header">
              <h1 style="margin: 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🕉️ नया ऑर्डर प्राप्त हुआ! 🕉️</h1>
              <h2 style="margin: 5px 0 0 0; font-size: 20px;">New Order Received!</h2>
            </div>
            
            <div class="mithila-pattern" style="background-color: #FFF8DC;">
              <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px; border: 2px solid #D4AF37;">
                <p style="margin: 0; color: #856404; text-align: center;"><strong>📧 ध्यान दें:</strong> Customer will receive confirmation email directly from verified domain</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px; border: 3px solid #2E7D32;">
                <h2 style="color: #2E7D32; margin-top: 0; text-align: center; font-size: 22px;">🙏 ग्राहक विवरण | Customer Information 🙏</h2>
                <div class="lotus-divider">🪷 ❋ 🪷</div>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px; font-weight: bold; color: #2E7D32; width: 30%;">नाम | Name:</td><td style="padding: 8px;">${customerData.name}</td></tr>
                  <tr style="background-color: #f0f8f0;"><td style="padding: 8px; font-weight: bold; color: #2E7D32;">ईमेल | Email:</td><td style="padding: 8px;">${customerData.email}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold; color: #2E7D32;">फोन | Phone:</td><td style="padding: 8px;">${customerData.phone}</td></tr>
                  <tr style="background-color: #f0f8f0;"><td style="padding: 8px; font-weight: bold; color: #2E7D32;">पता | Address:</td><td style="padding: 8px;">${customerData.address}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold; color: #2E7D32;">शहर | City:</td><td style="padding: 8px;">${customerData.city}</td></tr>
                  <tr style="background-color: #f0f8f0;"><td style="padding: 8px; font-weight: bold; color: #2E7D32;">राज्य | State:</td><td style="padding: 8px;">${customerData.state}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold; color: #2E7D32;">पिन | PIN:</td><td style="padding: 8px;">${customerData.pincode}</td></tr>
                </table>
              </div>

              <div style="margin: 20px;">
                <h2 style="color: #2E7D32; text-align: center; font-size: 22px;">🛒 ऑर्डर विवरण | Order Details 🛒</h2>
                <div class="lotus-divider">🪷 ❋ 🪷</div>
                <table style="width: 100%; border-collapse: collapse; border: 2px solid #D4AF37; border-radius: 8px; overflow: hidden;">
                  <thead>
                    <tr style="background: linear-gradient(135deg, #2E7D32, #4CAF50); color: white;">
                      <th style="padding: 15px; text-align: left;">उत्पाद | Product</th>
                      <th style="padding: 15px; text-align: center;">वजन | Weight</th>
                      <th style="padding: 15px; text-align: center;">मात्रा | Quantity</th>
                      <th style="padding: 15px; text-align: right;">कीमत | Price</th>
                      <th style="padding: 15px; text-align: right;">कुल | Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orderItemsHtml}
                  </tbody>
                </table>
              </div>

              <div style="background: linear-gradient(135deg, #e8f5e8, #c8e6c9); padding: 20px; border-radius: 8px; text-align: center; margin: 20px; border: 3px solid #4CAF50;">
                <h3 style="color: #2E7D32; margin: 0; font-size: 24px;">💰 कुल राशि | Total Amount: ₹${totalAmount} 💰</h3>
              </div>

              <div style="margin: 20px; padding: 20px; background: linear-gradient(135deg, #fff3cd, #ffeaa7); border-radius: 8px; border: 2px solid #D4AF37;">
                <p style="margin: 0; color: #856404; text-align: center; font-size: 16px;"><strong>🎯 कार्य आवश्यक | Action Required:</strong><br>कृपया ग्राहक से संपर्क करें | Please contact customer at ${customerData.email} or ${customerData.phone}</p>
              </div>
            </div>

            <div class="mithila-footer">
              <p style="margin: 0; font-size: 16px;">🕉️ मिथिला सात्विक मखाना | Mithila Sattvik Makhana 🕉️</p>
              <p style="margin: 5px 0 0 0; font-size: 12px;">प्राकृतिक स्वास्थ्य का खजाना | Natural Health Treasure</p>
            </div>
          </div>
        </body>
      </html>
    `;

    let businessEmailSuccess = false;
    let businessEmailResponse = null;
    let businessEmailError = null;

    // Send email to business
    try {
      console.log("Sending business email to: mithilasattvikmakhan@gmail.com");
      businessEmailResponse = await resend.emails.send({
        from: "Mithila Sattvik Makhana <orders@mithilasattvikmakhana.com>",
        to: ["mithilasattvikmakhan@gmail.com"],
        subject: `🕉️ New Order from ${customerData.name} (${customerData.email}) - ₹${totalAmount}`,
        html: businessEmailHtml,
      });
      
      console.log("Business email sent successfully:", businessEmailResponse);
      businessEmailSuccess = true;
    } catch (error) {
      console.error("Failed to send business email:", error);
      businessEmailError = error;
    }

    // Send confirmation email to customer
    let customerEmailSuccess = false;
    let customerEmailResponse = null;
    let customerEmailError = null;
    
    try {
      console.log("Sending customer confirmation to:", customerData.email);
      
      const customerEmailHtml = `
        <html>
          <head>
            ${mithilaBorderStyles}
          </head>
          <body style="font-family: 'Georgia', serif; line-height: 1.6; color: #333; background-color: #FFF8DC; margin: 0; padding: 20px;">
            <div class="mithila-border" style="max-width: 650px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden;">
              <div class="mithila-header">
                <h1 style="margin: 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🕉️ ऑर्डर की पुष्टि! 🕉️</h1>
                <h2 style="margin: 5px 0 0 0; font-size: 20px;">Order Confirmation!</h2>
              </div>
              
              <div class="mithila-pattern" style="background-color: #FFF8DC; padding: 30px;">
                <p style="font-size: 18px; text-align: center; color: #2E7D32;"><strong>प्रिय ${customerData.name} जी | Dear ${customerData.name},</strong></p>
                
                <div class="lotus-divider">🪷 ❋ 🪷</div>
                
                <p style="font-size: 16px; text-align: center;">आपके ऑर्डर के लिए धन्यवाद! | Thank you for your order!</p>
                <p style="font-size: 16px; text-align: center;">यहाँ आपके ऑर्डर का विवरण है | Here are your order details:</p>
                
                <div style="margin: 30px 0;">
                  <table style="width: 100%; border-collapse: collapse; border: 2px solid #D4AF37; border-radius: 8px; overflow: hidden;">
                    <thead>
                      <tr style="background: linear-gradient(135deg, #2E7D32, #4CAF50); color: white;">
                        <th style="padding: 15px; text-align: left;">उत्पाद | Product</th>
                        <th style="padding: 15px; text-align: center;">वजन | Weight</th>
                        <th style="padding: 15px; text-align: center;">मात्रा | Quantity</th>
                        <th style="padding: 15px; text-align: right;">कीमत | Price</th>
                        <th style="padding: 15px; text-align: right;">कुल | Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderItemsHtml}
                    </tbody>
                  </table>
                </div>

                <div style="background: linear-gradient(135deg, #e8f5e8, #c8e6c9); padding: 20px; border-radius: 8px; text-align: center; border: 3px solid #4CAF50;">
                  <h3 style="color: #2E7D32; margin: 0; font-size: 24px;">💰 कुल राशि | Total Amount: ₹${totalAmount} 💰</h3>
                </div>

                <div class="lotus-divider">🪷 ❋ 🪷</div>

                <div style="background-color: #e1f5fe; padding: 20px; border-radius: 8px; border: 2px solid #2E7D32; text-align: center;">
                  <p style="margin: 0; color: #1565c0; font-size: 16px;">
                    <strong>🤝 हम जल्द ही आपसे संपर्क करेंगे | We will contact you soon</strong><br>
                    आपके ऑर्डर की पुष्टि और डिलिवरी की व्यवस्था के लिए<br>
                    To confirm your order and arrange delivery
                  </p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                  <p style="font-size: 18px; color: #2E7D32;"><strong>मिथिला सात्विक मखाना चुनने के लिए धन्यवाद!</strong></p>
                  <p style="font-size: 16px; color: #555;">Thank you for choosing Mithila Sattvik Makhana!</p>
                  <div style="font-size: 20px; color: #D4AF37; margin: 10px 0;">🙏 नमस्ते 🙏</div>
                </div>
              </div>

              <div class="mithila-footer">
                <p style="margin: 0; font-size: 16px;">🕉️ मिथिला सात्विक मखाना | Mithila Sattvik Makhana 🕉️</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">प्राकृतिक स्वास्थ्य का खजाना | Natural Health Treasure</p>
              </div>
            </div>
          </body>
        </html>
      `;

      customerEmailResponse = await resend.emails.send({
        from: "Mithila Sattvik Makhana <orders@mithilasattvikmakhana.com>",
        to: [customerData.email],
        subject: `🕉️ Order Confirmation for ${customerData.name} - ₹${totalAmount}`,
        html: customerEmailHtml,
      });
      
      console.log("Customer email sent successfully:", customerEmailResponse);
      customerEmailSuccess = true;
    } catch (error) {
      console.error("Failed to send customer email:", error);
      customerEmailError = error;
    }

    // Return response indicating email status
    return new Response(JSON.stringify({ 
      success: businessEmailSuccess || customerEmailSuccess,
      message: (businessEmailSuccess && customerEmailSuccess) 
        ? "Order notifications sent successfully to both business and customer." 
        : businessEmailSuccess 
        ? "Order notification sent to business. Customer will be contacted directly."
        : "Order received but notifications failed. Please contact customer manually.",
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
