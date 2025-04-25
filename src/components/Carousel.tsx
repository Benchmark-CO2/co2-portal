import { useEffect, useState } from "react";

export default function ImageCarousel({ images }: { images: string[] } ) {
  const total = images.length;
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const slideWidthRem = 16; // w-64 = 16rem
  const gapRem = 2.5;       // gap-10 = 2.5rem
  const offsetRem = slideWidthRem + gapRem;

  const nextSlide = () => setIndex((prev) => prev + 1);
  const prevSlide = () => setIndex((prev) => prev - 1);

  useEffect(() => {
    if (index === 0 || index === extendedImages.length - 1) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setIndex(index === 0 ? total : 1);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setTransition(true);
    }
  }, [index]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl">
      <div
        className="flex gap-10"
        style={{
          transform: `translateX(-${index * offsetRem}rem)`,
          transition: transition ? "transform 0.3s ease-in-out" : "none",
        }}
      >
        {extendedImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i}`}
            className="w-64 h-64 flex-shrink-0 object-cover rounded-md"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/50 rounded-full shadow w-10 h-14 backdrop-blur-sm text-foreground text-3xl"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/50 rounded-full shadow w-10 h-14 backdrop-blur-sm text-foreground text-3xl"
      >
        ›
      </button>
    </div>
  );
}
