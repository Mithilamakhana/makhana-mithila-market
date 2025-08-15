-- Create proper RLS policies for orders table to secure customer data
-- First, drop the existing overly permissive policy
DROP POLICY IF EXISTS "Allow order insertions" ON public.orders;

-- Create secure policies for orders table
-- Only allow authenticated users to view their own orders (when we have user_id)
-- For now, restrict all SELECT access since orders don't have user_id column
CREATE POLICY "Restrict all order access" 
ON public.orders 
FOR ALL 
USING (false);

-- Create a security definer function to allow backend functions to access orders
-- This will be used by the send-order-notification function
CREATE OR REPLACE FUNCTION public.get_orders_for_admin()
RETURNS SETOF public.orders
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT * FROM public.orders;
$$;

-- Create a function to insert orders (used by edge functions)
CREATE OR REPLACE FUNCTION public.insert_order(
  order_items_param jsonb,
  total_amount_param numeric,
  customer_name_param text,
  customer_email_param text DEFAULT NULL,
  customer_phone_param text DEFAULT NULL,
  customer_address_param text DEFAULT NULL,
  customer_city_param text DEFAULT NULL,
  customer_state_param text DEFAULT NULL,
  customer_pin_param text DEFAULT NULL
)
RETURNS bigint
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
  INSERT INTO public.orders (
    order_items, total_amount, customer_name, customer_email, 
    customer_phone, customer_address, customer_city, customer_state, customer_pin
  )
  VALUES (
    order_items_param, total_amount_param, customer_name_param, customer_email_param,
    customer_phone_param, customer_address_param, customer_city_param, customer_state_param, customer_pin_param
  )
  RETURNING id;
$$;