import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryDialogProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const ImageGalleryDialog = ({ images, initialIndex, isOpen, onClose, productName }: ImageGalleryDialogProps) => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (api && isOpen) {
      api.scrollTo(initialIndex);
    }
  }, [api, isOpen, initialIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] w-full h-screen max-h-screen p-0 border-0 rounded-none">
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          {/* Large Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="h-8 w-8" />
          </Button>

          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-full items-center">
              {images.map((image, index) => (
                <CarouselItem key={index} className="flex items-center justify-center p-4 sm:p-8 md:p-12">
                  <img
                    src={image}
                    alt={`${productName} - Image ${index + 1}`}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2 sm:left-4 h-12 w-12 bg-white/10 hover:bg-white/20 text-white border-white/20" />
                <CarouselNext className="right-2 sm:right-4 h-12 w-12 bg-white/10 hover:bg-white/20 text-white border-white/20" />
              </>
            )}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryDialog;
