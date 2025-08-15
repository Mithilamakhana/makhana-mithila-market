-- Fix the security definer function to have immutable search path
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
SET search_path = ''
AS $$
  SELECT cd.id, cd."Name", cd."Email", cd."Phone", cd."Address", cd."City", cd."State", cd."Pin"
  FROM public."Customer_details" cd
  WHERE cd."Email" = customer_email_param;
$$;