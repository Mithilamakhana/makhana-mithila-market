-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  comment TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for testimonials
-- Anyone can insert (submit testimonials)
CREATE POLICY "Anyone can submit testimonials"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only approved testimonials are publicly viewable
CREATE POLICY "Approved testimonials are viewable by everyone"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (approved = true);

-- Admins can view all testimonials
CREATE POLICY "Admins can view all testimonials"
ON public.testimonials
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update testimonials (approve/reject)
CREATE POLICY "Admins can update testimonials"
ON public.testimonials
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete testimonials
CREATE POLICY "Admins can delete testimonials"
ON public.testimonials
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policy for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can manage all roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));