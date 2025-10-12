import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { useMediaQuery } from '@/hooks/use-mobile';

interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  comment: string;
  rating: number;
  avatar_url: string | null;
}

const TestimonialsSection = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1023px)");
  let slidesToShow = 3;
  if (isMobile) slidesToShow = 1;
  else if (isTablet) slidesToShow = 2;

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };
  return (
    <section id="testimonials" className="py-8 sm:py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mithila-blue mb-3 sm:mb-4">What Our Customers Say</h2>
          <div className="w-16 sm:w-20 h-1 bg-mithila-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4">
            Don't just take our word for it - hear what our satisfied customers have to say about Makhana Mithila products.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Be the first to share your experience!</p>
            <Button onClick={() => navigate('/submit-testimonial')}>
              Write a Review
            </Button>
          </div>
        ) : (
          <>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto px-4 md:px-0"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={testimonial.id}
                    className={
                      slidesToShow === 1
                        ? "basis-full"
                        : slidesToShow === 2
                        ? "md:basis-1/2"
                        : "md:basis-1/2 lg:basis-1/3"
                    }
                  >
                    <Card className="overflow-hidden border-2 border-mithila-gold/20 hover:border-mithila-gold/50 transition-all shadow-md h-full flex flex-col justify-between p-6 bg-mithila-cream">
                      {/* Stars at top */}
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? 'fill-mithila-green text-mithila-green'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {/* Quote icon */}
                      <div className="mb-2">
                        <svg className="w-8 h-8 text-mithila-green/40" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6.17A5.97 5.97 0 0 0 2 12c0 3.31 2.69 6 6 6 1.1 0 2-.9 2-2s-.9-2-2-2c-1.1 0-2-.9-2-2 0-1.3 1.04-2.36 2.34-1.99.66.18 1.34-.19 1.52-.85.18-.66-.19-1.34-.85-1.52A5.97 5.97 0 0 0 7.17 6.17zm9 0A5.97 5.97 0 0 0 11 12c0 3.31 2.69 6 6 6 1.1 0 2-.9 2-2s-.9-2-2-2c-1.1 0-2-.9-2-2 0-1.3 1.04-2.36 2.34-1.99.66.18 1.34-.19 1.52-.85.18-.66-.19-1.34-.85-1.52A5.97 5.97 0 0 0 16.17 6.17z"/></svg>
                      </div>
                      {/* Testimonial comment */}
                      <p className="text-gray-700 text-base mb-6">{testimonial.comment}</p>
                      {/* User info */}
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 rounded-full bg-mithila-green/10 flex items-center justify-center mr-4">
                          <span className="text-lg font-bold text-mithila-green">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-mithila-green text-base">{testimonial.name}</h4>
                          {testimonial.title && (
                            <p className="text-sm text-gray-500">{testimonial.title}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center mt-4 md:mt-6 gap-2">
                <CarouselPrevious className="static transform-none bg-mithila-blue/90 text-white hover:bg-mithila-blue border-none mx-1 h-8 w-8 md:h-10 md:w-10" />
                <CarouselNext className="static transform-none bg-mithila-blue/90 text-white hover:bg-mithila-blue border-none mx-1 h-8 w-8 md:h-10 md:w-10" />
              </div>
            </Carousel>
            <div className="text-center mt-12 mb-16">
              <Button onClick={() => navigate('/submit-testimonial')} variant="outline" className="text-mithila-blue border-mithila-blue hover:bg-mithila-blue/10">
                Share Your Experience
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
