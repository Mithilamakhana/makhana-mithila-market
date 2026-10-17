
-- Fix 1: user_roles privilege escalation
-- Drop the overly broad ALL policy and replace with scoped policies
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Tighten testimonials INSERT policy
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;

CREATE POLICY "Authenticated users can submit testimonials"
ON public.testimonials
FOR INSERT
TO authenticated
WITH CHECK (
  char_length(name) <= 100
  AND char_length(comment) <= 2000
  AND (rating IS NULL OR (rating >= 1 AND rating <= 5))
);
