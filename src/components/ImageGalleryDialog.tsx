import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

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
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
        <div className="relative w-full h-full flex items-center justify-center bg-black/95">
          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-full">
              {images.map((image, index) => (
                <CarouselItem key={index} className="flex items-center justify-center h-full">
                  <img
                    src={image}
                    alt={`${productName} - Image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </>
            )}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryDialog;
