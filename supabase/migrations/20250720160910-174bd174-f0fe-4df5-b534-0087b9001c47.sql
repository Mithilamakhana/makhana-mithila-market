-- Create orders table for storing order details
CREATE TABLE public.orders (
  id bigserial PRIMARY KEY,
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text,
  customer_address text,
  customer_city text,
  customer_state text,
  customer_pin text,
  total_amount numeric NOT NULL,
  order_items jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the edge function)
CREATE POLICY "Allow order insertions" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);