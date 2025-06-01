
import React, { useEffect , useState} from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useMediaQuery } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import preminummakhana from '/pictures/PremiumMakhana.jpg'
import GrowninNaturalWaters from '/pictures/GrowninNaturalWaters.webp'
import harvested  from '/pictures/harvested.jpg'
import Nutrients  from '/pictures/Nutrients.jpg'
import Kheer  from '/pictures/Kheer.jpg'
import roasted  from '/pictures/roasted.jpg'
import curry  from '/pictures/curry.jpg'
// import roasted  from '/pictures/roasted.jpg'
// import roasted  from '/pictures/roasted.jpg'


interface SlideInfo {
  image?: string;
  images?: string[];
  title: string;
  description: string;
}

const slides: SlideInfo[] = [
  {
    image: preminummakhana,
    title: "Premium Makhana",
    description: "Our fox nuts are 100% organic and carefully selected for the highest quality. Each batch is handpicked to ensure only the best reach your table. Trusted by health enthusiasts, loved by all."
  },
  {
    image: GrowninNaturalWaters,
    title: "Grown in Natural Waters",
    description: "Makhana thrives in the pristine, unpolluted waters of the Mithila region. Harvested from clean, natural ponds for authentic flavor. The unique ecosystem creates perfect conditions for growth."
  },
  {
    image: harvested,
    title: "Sustainable Harvesting",
    description: "We follow traditional methods that preserve the environment and support local communities. Our harvesting practices have been perfected over generations."
  },
  {
    image: Nutrients,
    title: "Packed with Nutrients",
    description: "Low in calories, high in protein and antioxidants - makhana contains essential minerals like potassium, magnesium, and phosphorus for your wellbeing."
  },
  {
    images: [Kheer,roasted,curry],
    title: "Versatile Superfood",
    description: "Makhana is a wholesome snack, enjoyed roasted, spiced, or sweetened for every craving. Beyond snacking, it's used in curries, desserts, and even festive delicacies."
  }
];

const MakhanaSlideshow = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [api, setApi] = React.useState<any>(null);
  
  const [versatileIndex, setVersatileIndex] = useState(0);

useEffect(() => {
    const versatileSlide = slides.find(s => s.title === "Versatile Superfood");
    if (!versatileSlide?.images) return;
    const interval = setInterval(() => {
      setVersatileIndex(i => (i + 1) % versatileSlide.images!.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="overflow-hidden border-2 border-mithila-gold/20 hover:border-mithila-gold/50 transition-all shadow-md h-full">
                <div className="relative aspect-video w-full overflow-hidden">
                  {slide.images ? (
                    <img
                      src={slide.images[versatileIndex]}
                      alt={slide.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  )}
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
