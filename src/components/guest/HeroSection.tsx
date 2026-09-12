import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const heroImages = [
    "/images/projects/slide01.jpg",
    "/images/projects/slide02.png",
    "/images/projects/slide03.jpg",
    "/images/projects/slide04.jpg",
    "/images/projects/slide05.jpg",
    "/images/projects/slide06.jpg",
    "/images/projects/slide07.jpg",
    "/images/projects/slide08.jpg",
    "/images/projects/slide09.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-20">
      <div className="w-full px-0 py-0">
        <div className="relative w-full overflow-hidden rounded-none shadow-xl">

          <img
            src={heroImages[currentSlide]}
            alt="Munder Garden"
            className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[520px]"
          />

          <button
            type="button"
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev - 1 + heroImages.length) % heroImages.length
              )
            }
            aria-label="Previous project"
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 sm:left-5 sm:p-3"
          >
            <ChevronLeft size={28} className="sm:h-8 sm:w-8" />
          </button>

          <button
            type="button"
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev + 1) % heroImages.length
              )
            }
            aria-label="Next project"
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 sm:right-5 sm:p-3"
          >
            <ChevronRight size={28} className="sm:h-8 sm:w-8" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-5">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to project ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlide === index
                    ? "w-7 bg-white"
                    : "w-2.5 bg-white/60"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
