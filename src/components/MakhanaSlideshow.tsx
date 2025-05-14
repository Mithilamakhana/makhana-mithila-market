
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
    description: "Our fox nuts are 100% organic and carefully selected for the highest quality. Each batch is handpicked to ensure only the best reach your table."
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Grown in Natural Waters",
    description: "Makhana thrives in the pristine, unpolluted waters of the Mithila region. The unique ecosystem creates perfect conditions for growth."
  },
  {
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "Sustainable Harvesting",
    description: "We follow traditional methods that preserve the environment and support local communities. Our harvesting practices have been perfected over generations."
  },
  {
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    title: "Packed with Nutrients",
    description: "Low in calories, high in protein and antioxidants - makhana contains essential minerals like potassium, magnesium, and phosphorus for your wellbeing."
  },
  {
    image: "https://images.unsplash.com/photo-1587411768638-ec71f8e33b78",
    title: "Versatile Superfood",
    description: "Makhana can be enjoyed in multiple ways - as a roasted snack, added to curries, or ground into flour for healthy baking alternatives."
  }
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
      }, 3500); // Change slide every 3.5 seconds
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
    <div className="py-4 md:py-8">
      <Carousel 
        setApi={setApi}
        className="w-full max-w-6xl mx-auto px-4 md:px-0"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="overflow-hidden border-2 border-mithila-gold/20 hover:border-mithila-gold/50 transition-all shadow-md h-full">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img 
                    src={slide.image}
                    alt={slide.title} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 font-bold text-white text-xl sm:text-2xl drop-shadow-md">{slide.title}</h3>
                </div>
                <CardContent className="p-3 sm:p-4 bg-mithila-cream">
                  <p className="text-sm sm:text-base text-gray-700">{slide.description}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center mt-4 md:mt-6 gap-2">
          <CarouselPrevious className="static transform-none bg-mithila-blue/90 text-white hover:bg-mithila-blue border-none mx-1 h-8 w-8 md:h-10 md:w-10" />
          <CarouselNext className="static transform-none bg-mithila-blue/90 text-white hover:bg-mithila-blue border-none mx-1 h-8 w-8 md:h-10 md:w-10" />
        </div>
      </Carousel>
    </div>
  );
};

export default MakhanaSlideshow;
