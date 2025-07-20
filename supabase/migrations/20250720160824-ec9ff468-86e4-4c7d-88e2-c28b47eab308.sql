-- Fix Customer_details table structure
ALTER TABLE public.Customer_details 
ALTER COLUMN City TYPE text USING City::text,
ALTER COLUMN Pin TYPE text USING Pin::text,
ALTER COLUMN Address TYPE text USING Address::text,
ALTER COLUMN State TYPE text USING State::text,
ALTER COLUMN Phone TYPE text USING Phone::text,
ALTER COLUMN id SET DEFAULT nextval('Customer_details_id_seq'::regclass);

-- Create sequence if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS Customer_details_id_seq OWNED BY Customer_details.id;

-- Enable RLS
ALTER TABLE public.Customer_details ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the edge function)
CREATE POLICY "Allow order insertions" 
ON public.Customer_details 
FOR INSERT 
WITH CHECK (true);