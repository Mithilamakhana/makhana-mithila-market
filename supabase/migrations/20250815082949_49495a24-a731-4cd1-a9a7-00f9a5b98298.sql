-- Enable Row Level Security on Customer_details table (correct case)
ALTER TABLE public."Customer_details" ENABLE ROW LEVEL SECURITY;

-- Create policy to restrict all access to customer details
-- This prevents any public access to sensitive customer information
CREATE POLICY "Restrict all customer details access" 
ON public."Customer_details" 
FOR ALL 
USING (false);

-- Create a security definer function to allow backend functions
-- to access customer details when needed for order processing
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
  SELECT cd.id, cd."Name", cd."Email", cd."Phone", cd."Address", cd."City", cd."State", cd."Pin"
  FROM public."Customer_details" cd
  WHERE cd."Email" = customer_email_param;
$$;