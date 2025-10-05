import { serve } from "https://deno.land/std@0.224.0/http/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CreateOrderRequest {
  amount: number;
  customer_details: {
    customer_id: string;
    customer_email: string;
    customer_phone: string;
    customer_name: string;
  };
  order_meta?: {
    return_url?: string;
    notify_url?: string;
  };
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

    const { amount, customer_details, order_meta }: CreateOrderRequest = await req.json();
    
    console.log("Creating Cashfree order for amount:", amount);

    // Cashfree expects amount in the same currency denomination
    const order_id = `order_${Date.now()}`;
    
    const cashfreeOrderData = {
      order_id,
      order_amount: amount,
      order_currency: "INR",
      customer_details,
      order_meta: {
        ...order_meta,
        notify_url: order_meta?.notify_url || null,
        payment_methods: null
      },
      order_note: "Order from Mithila Sattvik Makhana",
    };

    // Create order on Cashfree
    const cashfreeResponse = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(cashfreeOrderData),
    });

    if (!cashfreeResponse.ok) {
      const errorText = await cashfreeResponse.text();
      console.error("Cashfree API error:", errorText);
      throw new Error(`Cashfree order creation failed: ${errorText}`);
    }

    const cashfreeOrder = await cashfreeResponse.json();
    console.log("Cashfree order created successfully:", cashfreeOrder.order_id);

    return new Response(JSON.stringify(cashfreeOrder), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in create-cashfree-order function:", error);
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
