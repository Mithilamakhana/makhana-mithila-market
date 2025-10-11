import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <section id="testimonials" className="section bg-white">
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
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
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex-[0_0_calc(25%-18px)] min-w-0">
                      <Card className="bg-secondary border-none h-full">
                        <CardContent className="p-8">
                          <div className="flex flex-col h-full">
                            <div className="mb-4 flex gap-1">
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
                            <div className="mb-6">
                              <svg
                                className="w-10 h-10 text-primary/30"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10.7 25.4c-1.9 0-3.5-0.7-4.8-2-1.3-1.3-2-3-2-4.9 0-1.6 0.4-3.2 1.3-4.7 0.9-1.5 2-2.8 3.4-3.9 1.5-1.1 2.9-1.9 4.3-2.5 1.4-0.6 3-1 4.7-1.2l0.4 2.5c-2.3 0.2-4.3 0.8-6 1.8-1.8 1-3 2.3-3.7 3.9 0.3-0.2 0.7-0.3 1.2-0.4 0.4-0.1 0.8-0.2 1.2-0.2 1.8 0 3.2 0.6 4.4 1.7 1.1 1.1 1.7 2.6 1.7 4.4 0 1.8-0.6 3.3-1.8 4.5-1.1 1.3-2.6 1.9-4.3 1.9z"></path>
                                <path d="M24.7 25.4c-1.9 0-3.5-0.7-4.8-2-1.3-1.3-2-3-2-4.9 0-1.6 0.4-3.2 1.3-4.7 0.9-1.5 2-2.8 3.4-3.9 1.5-1.1 2.9-1.9 4.3-2.5 1.4-0.6 3-1 4.7-1.2l0.4 2.5c-2.3 0.2-4.3 0.8-6 1.8-1.8 1-3 2.3-3.7 3.9 0.3-0.2 0.7-0.3 1.2-0.4 0.4-0.1 0.8-0.2 1.2-0.2 1.8 0 3.2 0.6 4.4 1.7 1.1 1.1 1.7 2.6 1.7 4.4 0 1.8-0.6 3.3-1.8 4.5-1.1 1.3-2.6 1.9-4.3 1.9z"></path>
                              </svg>
                            </div>
                            <p className="text-lg mb-6 flex-grow">{testimonial.comment}</p>
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                <span className="text-lg font-bold text-primary">
                                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-bold">{testimonial.name}</h4>
                                {testimonial.title && (
                                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={scrollPrev}
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button onClick={() => navigate('/submit-testimonial')} variant="outline">
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
