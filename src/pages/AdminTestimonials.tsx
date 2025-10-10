import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  comment: string;
  rating: number;
  approved: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchTestimonials();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Please log in to access admin panel');
      navigate('/auth');
      return;
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (error || !data) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }

    setIsAdmin(true);
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ approved: true })
        .eq('id', id);

      if (error) throw error;

      toast.success('Testimonial approved');
      fetchTestimonials();
    } catch (error) {
      console.error('Error approving testimonial:', error);
      toast.error('Failed to approve testimonial');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Testimonial rejected and deleted');
      fetchTestimonials();
    } catch (error) {
      console.error('Error rejecting testimonial:', error);
      toast.error('Failed to reject testimonial');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Testimonials</h1>
          <p className="text-muted-foreground">
            Review and approve customer testimonials
          </p>
        </div>

        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No testimonials to review
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{testimonial.name}</CardTitle>
                      {testimonial.title && (
                        <CardDescription>{testimonial.title}</CardDescription>
                      )}
                    </div>
                    <Badge variant={testimonial.approved ? 'default' : 'secondary'}>
                      {testimonial.approved ? 'Approved' : 'Pending'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm">{testimonial.comment}</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted on {new Date(testimonial.created_at).toLocaleDateString()}
                    </p>
                    {!testimonial.approved && (
                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={() => handleApprove(testimonial.id)}
                          className="flex-1"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(testimonial.id)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
