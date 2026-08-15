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

      {/* HERO FULL WIDTH */}
      <div className="w-full px-0 py-0">

        {/* MAIN BANNER */}
        <div className="relative w-full overflow-hidden rounded-none shadow-xl">

          {/* DARK GRADIENT */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* HERO IMAGE */}
          <img
            src={heroImages[currentSlide]}
            alt="Munder Garden"
            className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[520px]"
          />

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + heroImages.length) % heroImages.length
              )
            }
            aria-label="Previous project"
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm transition hover:bg-black/55"
          >
            <ChevronLeft size={28} />
          </button>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % heroImages.length)
            }
            aria-label="Next project"
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm transition hover:bg-black/55"
          >
            <ChevronRight size={28} />
          </button>

          {/* SLIDER DOTS */}
          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-2">
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

          {/* HERO TEXT */}
          <div className="absolute bottom-6 left-6 right-6 z-20 text-white">

            <span className="inline-flex items-center rounded-full bg-green-600/90 px-3.5 py-1.5 text-xs font-semibold sm:text-sm">
              🌿 Professional Gardening Services
            </span>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Bring Your Dream Garden to Life
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-200 sm:text-base">
              Expert garden care, custom landscaping, and smart solutions
              delivered right to your doorstep.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
