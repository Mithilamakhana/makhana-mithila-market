
import React, { useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useMediaQuery } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

interface SlideInfo {
  image: string;
  title: string;
  description: string;
}

const slides: SlideInfo[] = [
  {
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    title: "Premium Makhana",
    description: "Our fox nuts are 100% organic and carefully selected for the highest quality."
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Grown in Natural Waters",
    description: "Makhana thrives in the pristine, unpolluted waters of the Mithila region."
  },
  {
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "Sustainable Harvesting",
    description: "We follow traditional methods that preserve the environment and support local communities."
  },
  {
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    title: "Packed with Nutrients",
    description: "Low in calories, high in protein and antioxidants - the perfect superfood snack."
  },
];

const MakhanaSlideshow = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [api, setApi] = React.useState<any>(null);
  
  useEffect(() => {
    if (!api) return;
    
    // Start autoplay
    let autoplayInterval: ReturnType<typeof setInterval>;
    
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        api.scrollNext();
      }, 4000); // Change slide every 4 seconds
    };
    
    startAutoplay();
    
    // Pause autoplay on hover/touch
    const onMouseEnter = () => clearInterval(autoplayInterval);
    const onMouseLeave = () => startAutoplay();
    
    const element = api.containerNode();
    if (element) {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
      element.addEventListener("touchstart", onMouseEnter, { passive: true });
      element.addEventListener("touchend", onMouseLeave);
    }
    
    // Cleanup
    return () => {
      clearInterval(autoplayInterval);
      if (element) {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
        element.removeEventListener("touchstart", onMouseEnter);
        element.removeEventListener("touchend", onMouseLeave);
      }
    };
  }, [api]);

  return (
    <Carousel 
      setApi={setApi}
      className="w-full max-w-5xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden border-2 border-mithila-gold/20 hover:border-mithila-gold/50 transition-all">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img 
                    src={slide.image}
                    alt={slide.title} 
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 bg-mithila-cream">
                  <h3 className="font-semibold text-mithila-blue text-xl mb-1">{slide.title}</h3>
                  <p className="text-gray-600">{slide.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {!isMobile && (
        <>
          <CarouselPrevious className="left-0 md:-left-5 bg-mithila-blue/90 text-white hover:bg-mithila-blue border-none" />
          <CarouselNext className="right-0 md:-right-5 bg-mithila-blue/90 text-white hover:bg-mithila-blue border-none" />
        </>
      )}
    </Carousel>
  );
};

export default MakhanaSlideshow;
