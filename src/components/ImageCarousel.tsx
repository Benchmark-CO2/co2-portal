import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type useEmblaCarousel from 'embla-carousel-react';
import * as React from "react";

interface Image {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [api, setApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1] | null>(null);

  React.useEffect(() => {
    if (api) {
      api.on("select", () => {
        setSelectedIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    api?.scrollTo(index);
  };

  return (
    <section className="w-full mt-5">
      <Carousel
        setApi={(carouselApi) => {
          setApi(carouselApi);
        }}
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-1/2 max-md:w-full object-cover rounded-md mx-auto"
                  />

                </div>
              </div>
              {image.caption && (
                <div className="text-primary p-3 text-sm text-center">
                  {image.caption}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex gap-3 mt-4 flex-wrap mx-auto justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={cn(
              "relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
              selectedIndex === index
                ? "border-primary opacity-100"
                : "border-transparent opacity-50 grayscale"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel;
