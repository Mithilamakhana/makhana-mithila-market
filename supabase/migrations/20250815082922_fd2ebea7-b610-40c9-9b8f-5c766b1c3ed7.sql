-- Enable Row Level Security on Customer_details table
ALTER TABLE public.Customer_details ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view only their own customer details
-- This assumes the user_id should be linked to customer records
-- For now, we'll restrict all access since there's no user_id column
CREATE POLICY "Restrict all customer details access" 
ON public.Customer_details 
FOR ALL 
USING (false);

-- Create a security definer function to allow the send-order-notification function
-- to access customer details when processing orders
CREATE OR REPLACE FUNCTION public.get_customer_details_for_order(customer_email_param text)
RETURNS TABLE(
  id bigint,
  name text,
  email text,
  phone numeric,
  address numeric,
  city numeric,
  state numeric,
  pin numeric
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT cd.id, cd.name, cd.email, cd.phone, cd.address, cd.city, cd.state, cd.pin
  FROM public.Customer_details cd
  WHERE cd.email = customer_email_param;
$$;