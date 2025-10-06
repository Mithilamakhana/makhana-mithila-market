import { serve } from "https://deno.land/std@0.224.0/http/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
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
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    if (!RAZORPAY_KEY_SECRET) {
      console.error("Razorpay secret not configured");
      return new Response(
        JSON.stringify({ error: "Razorpay secret not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature }: VerifyPaymentRequest = await req.json();
    
    console.log("Verifying Razorpay payment:", razorpay_payment_id);

    // Create the signature string
    const signatureBody = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    // Create HMAC SHA256 signature using Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(RAZORPAY_KEY_SECRET);
    const messageData = encoder.encode(signatureBody);
    
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
    
    // Convert signature to hex string
    const expectedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Compare signatures
    const isValid = expectedSignature === razorpay_signature;
    
    console.log(`Payment verification ${isValid ? 'successful' : 'failed'} for payment:`, razorpay_payment_id);

    return new Response(JSON.stringify({ 
      isValid,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in verify-razorpay-payment function:", error);
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