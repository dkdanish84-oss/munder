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
  }, [heroImages.length]);

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="w-full px-3 pt-4 sm:px-4 sm:pt-6 md:pt-8">
      <div className="flex w-full justify-center">
        <div className="w-full max-w-[1500px]">
          <div
            className="
              relative
              aspect-[16/6]
              min-h-[230px]
              w-full
              overflow-hidden
              rounded-[22px]
              bg-gray-100
              shadow-md
              ring-1
              ring-[#D9EDE1]
              sm:min-h-[300px]
              sm:rounded-[26px]
              md:min-h-[380px]
              lg:rounded-[30px]
            "
          >
            {heroImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Munder Garden ${index + 1}`}
                className={`
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-opacity
                  duration-700
                  ease-in-out
                  ${
                    currentSlide === index
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }
                `}
              />
            ))}

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="
                absolute
                left-3
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-black/40
                text-white
                backdrop-blur-sm
                transition
                hover:bg-black/60
                sm:left-5
                sm:h-12
                sm:w-12
              "
            >
              <ChevronLeft
                size={25}
                strokeWidth={2.5}
                className="sm:h-7 sm:w-7"
              />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="
                absolute
                right-3
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-black/40
                text-white
                backdrop-blur-sm
                transition
                hover:bg-black/60
                sm:right-5
                sm:h-12
                sm:w-12
              "
            >
              <ChevronRight
                size={25}
                strokeWidth={2.5}
                className="sm:h-7 sm:w-7"
              />
            </button>

            <div
              className="
                absolute
                bottom-3
                left-1/2
                z-20
                flex
                -translate-x-1/2
                items-center
                gap-2
                sm:bottom-5
              "
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`
                    h-2.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      currentSlide === index
                        ? "w-7 bg-white"
                        : "w-2.5 bg-white/60"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
