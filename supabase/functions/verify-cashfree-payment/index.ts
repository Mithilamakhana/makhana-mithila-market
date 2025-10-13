import { serve } from "https://deno.land/std@0.224.0/http/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface VerifyPaymentRequest {
  order_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
    const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");
    
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      console.error("Cashfree credentials not configured");
      return new Response(
        JSON.stringify({ error: "Payment gateway not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { order_id }: VerifyPaymentRequest = await req.json();
    
    console.log("Verifying Cashfree payment for order:", order_id);

    // Fetch order details from Cashfree
    let orderDetails = null;
    let attempts = 0;
    const maxAttempts = 5;
    const delayMs = 2000;
    let lastStatus = null;
    const validStatuses = ["PAID", "SUCCESS", "COMPLETED"];
    while (attempts < maxAttempts) {
      const cashfreeResponse = await fetch(`https://sandbox.cashfree.com/pg/orders/${order_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      });
      if (!cashfreeResponse.ok) {
        const errorText = await cashfreeResponse.text();
        console.error("Cashfree API error:", errorText);
        throw new Error(`Payment verification failed: ${errorText}`);
      }
      orderDetails = await cashfreeResponse.json();
      lastStatus = orderDetails.order_status;
      console.log(`Attempt ${attempts + 1}: Payment verification for order ${order_id}:`, lastStatus);
      if (validStatuses.includes(lastStatus)) {
        break;
      }
      if (lastStatus !== "ACTIVE") {
        break;
      }
      attempts++;
      if (attempts < maxAttempts) {
        // Wait before next attempt
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
    const isValid = validStatuses.includes(lastStatus);
    console.log("Final Cashfree order status:", lastStatus, "isValid:", isValid, "orderDetails:", orderDetails);

    return new Response(JSON.stringify({ 
      isValid,
      order_id,
      order_status: orderDetails.order_status,
      payment_details: orderDetails,
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in verify-cashfree-payment function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
