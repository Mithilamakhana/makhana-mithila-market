
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
    title: "Healthy Snacking",
    description: "Enjoy makhana as a guilt-free snack straight from the bowl. Perfect for movie nights, office breaks, or whenever you need a nutritious crunch."
  },
  {
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    title: "Breakfast Addition",
    description: "Add roasted makhana to your morning cereals, yogurt bowls, or smoothies for an extra protein boost and delightful texture."
  },
  {
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    title: "Cooking Ingredient",
    description: "Use makhana in curries, stir-fries, and traditional Indian dishes. They absorb flavors beautifully while adding nutritional value."
  },
  {
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    title: "Baking Alternative",
    description: "Ground makhana can be used as a healthy flour substitute in baking, making your desserts more nutritious without compromising taste."
  },
  {
    image: "https://images.unsplash.com/photo-1587411768638-ec71f8e33b78",
    title: "Trail Mix Base",
    description: "Combine makhana with nuts, dried fruits, and seeds to create the perfect trail mix for hiking, travel, or gym sessions."
  }
];

const VersatileSuperfoodSlideshow = () => {
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
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
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
          <CarouselPrevious className="static transform-none bg-mithila-green/90 text-white hover:bg-mithila-green border-none mx-1 h-8 w-8 md:h-10 md:w-10" />
          <CarouselNext className="static transform-none bg-mithila-green/90 text-white hover:bg-mithila-green border-none mx-1 h-8 w-8 md:h-10 md:w-10" />
        </div>
      </Carousel>
    </div>
  );
};

export default VersatileSuperfoodSlideshow;
