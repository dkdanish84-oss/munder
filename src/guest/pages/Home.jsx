import HeroSection from "../../components/guest/HeroSection";
import WhyChooseSection from "../../components/guest/WhyChooseSection";
import TestimonialsSection from "../../components/guest/TestimonialsSection";
import FaqSection from "../../components/guest/FaqSection";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <main className="home-center">

      {/* HERO */}
      <HeroSection />

      {/* =========================================================
          GARDEN VISIT - ₹99
         ========================================================= */}
      <section className="w-full px-3 py-4 sm:px-4 sm:py-6 md:py-8">
        <div className="mx-auto w-full max-w-[1500px]">

          <div
            className="
              relative
              overflow-hidden
              rounded-[22px]
              bg-[#F0F9F4]
              px-4
              py-6
              shadow-sm
              ring-1
              ring-[#D9EDE1]
              sm:rounded-[28px]
              sm:px-8
              sm:py-9
              md:px-12
              md:py-10
              lg:px-16
              lg:py-12
            "
          >

            {/* Decorative background */}
            <div
              className="
                pointer-events-none
                absolute
                right-[-50px]
                top-[-50px]
                h-[180px]
                w-[180px]
                rounded-full
                bg-[#DDF2E6]
                opacity-60
                sm:h-[250px]
                sm:w-[250px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-70px]
                left-[-50px]
                h-[180px]
                w-[180px]
                rounded-full
                bg-[#E3F4E9]
                opacity-60
                sm:h-[240px]
                sm:w-[240px]
              "
            />

            <div className="relative z-10">

              {/* Heading */}
              <div className="text-center">

                <p
                  className="
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#087A43]
                    sm:text-[15px]
                    md:text-[17px]
                  "
                >
                  GET EXPERT ADVICE FOR YOUR GARDEN
                </p>

                <h2
                  className="
                    mt-1
                    text-[28px]
                    font-black
                    leading-tight
                    tracking-tight
                    text-[#06452D]
                    sm:mt-2
                    sm:text-[42px]
                    md:text-[50px]
                    lg:text-[56px]
                  "
                >
                  Book a Garden Visit
                </h2>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-[850px]
                    text-[14px]
                    leading-relaxed
                    text-[#355B49]
                    sm:mt-3
                    sm:text-[18px]
                    md:text-[21px]
                  "
                >
                  Our gardening experts will visit your space, understand
                  your needs and suggest the best solutions.
                </p>

              </div>

              {/* Visit information */}
              <div
                className="
                  mx-auto
                  mt-5
                  grid
                  max-w-[1000px]
                  grid-cols-1
                  gap-3
                  sm:mt-7
                  sm:grid-cols-3
                  sm:gap-4
                "
              >

                {/* ₹99 Visit Fee */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-[16px]
                    bg-white
                    px-4
                    py-4
                    ring-1
                    ring-[#D8EDE0]
                    sm:px-5
                    sm:py-5
                  "
                >
                  <div
                    className="
                      flex
                      h-[48px]
                      w-[48px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#087A43]
                      text-white
                      sm:h-[56px]
                      sm:w-[56px]
                    "
                  >
                    <span className="text-[22px] font-black sm:text-[26px]">
                      ₹
                    </span>
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold text-[#527263] sm:text-[15px]">
                      Visit Fee
                    </p>

                    <p className="text-[23px] font-black leading-tight text-[#06452D] sm:text-[27px]">
                      ₹99
                    </p>

                    <p className="text-[11px] text-[#6B8176] sm:text-[12px]">
                      One-time fee
                    </p>
                  </div>
                </div>

                {/* ₹99 Adjustment */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-[16px]
                    bg-white
                    px-4
                    py-4
                    ring-1
                    ring-[#D8EDE0]
                    sm:px-5
                    sm:py-5
                  "
                >
                  <div
                    className="
                      flex
                      h-[48px]
                      w-[48px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#087A43]
                      text-white
                      sm:h-[56px]
                      sm:w-[56px]
                    "
                  >
                    <CreditCard size={25} strokeWidth={2} />
                  </div>

                  <div>
                    <p className="text-[15px] font-bold text-[#06452D] sm:text-[17px]">
                      ₹99 Fully Adjustable
                    </p>

                    <p className="text-[11px] leading-relaxed text-[#527263] sm:text-[13px]">
                      Your visit fee is adjusted
                      when you purchase a MUNDER plan.
                    </p>
                  </div>
                </div>

                {/* No Hidden Charges */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-[16px]
                    bg-white
                    px-4
                    py-4
                    ring-1
                    ring-[#D8EDE0]
                    sm:px-5
                    sm:py-5
                  "
                >
                  <div
                    className="
                      flex
                      h-[48px]
                      w-[48px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#087A43]
                      text-white
                      sm:h-[56px]
                      sm:w-[56px]
                    "
                  >
                    <ShieldCheck size={27} strokeWidth={2} />
                  </div>

                  <div>
                    <p className="text-[15px] font-bold text-[#06452D] sm:text-[17px]">
                      No Hidden Charges
                    </p>

                    <p className="text-[11px] leading-relaxed text-[#527263] sm:text-[13px]">
                      Pay only ₹99 for the garden visit.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div
                className="
                  mx-auto
                  mt-5
                  grid
                  max-w-[1000px]
                  grid-cols-1
                  gap-3
                  sm:mt-7
                  sm:grid-cols-3
                "
              >

                {/* Book Visit */}
                <Link
                  to="/visit"
                  className="
                    flex
                    min-h-[54px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#087A43]
                    px-5
                    py-3
                    text-center
                    text-[15px]
                    font-bold
                    text-white
                    shadow-md
                    transition-all
                    duration-200
                    hover:bg-[#066B3A]
                    hover:shadow-lg
                    sm:min-h-[60px]
                    sm:text-[17px]
                  "
                >
                  <CalendarDays size={21} strokeWidth={2.3} />

                  <span>
                    Book a Garden Visit
                  </span>

                  <ArrowRight size={19} strokeWidth={2.5} />
                </Link>

                {/* Explore Services */}
                <Link
                  to="/garden-maintenance-bhopal"
                  className="
                    flex
                    min-h-[54px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border-2
                    border-[#087A43]
                    bg-white
                    px-5
                    py-3
                    text-center
                    text-[15px]
                    font-bold
                    text-[#087A43]
                    transition-all
                    duration-200
                    hover:bg-[#EAF7EF]
                    sm:min-h-[60px]
                    sm:text-[17px]
                  "
                >
                  <span>
                    Explore Services
                  </span>

                  <ArrowRight size={19} strokeWidth={2.5} />
                </Link>

                {/* Explore Plans */}
                <Link
                  to="/plans"
                  className="
                    flex
                    min-h-[54px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border-2
                    border-[#087A43]
                    bg-white
                    px-5
                    py-3
                    text-center
                    text-[15px]
                    font-bold
                    text-[#087A43]
                    transition-all
                    duration-200
                    hover:bg-[#EAF7EF]
                    sm:min-h-[60px]
                    sm:text-[17px]
                  "
                >
                  <span>
                    Explore Plans
                  </span>

                  <ArrowRight size={19} strokeWidth={2.5} />
                </Link>

              </div>

              {/* Bottom benefits */}
              <div
                className="
                  mx-auto
                  mt-6
                  flex
                  max-w-[850px]
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  text-center
                  sm:mt-8
                  sm:flex-row
                  sm:gap-0
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    text-[13px]
                    font-medium
                    text-[#355B49]
                    sm:text-[14px]
                  "
                >
                  <CalendarDays
                    size={18}
                    className="text-[#087A43]"
                  />
                  Easy Scheduling
                </div>

                <div className="hidden h-5 w-px bg-[#9BBBA8] sm:block" />

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    text-[13px]
                    font-medium
                    text-[#355B49]
                    sm:text-[14px]
                  "
                >
                  <ShieldCheck
                    size={18}
                    className="text-[#087A43]"
                  />
                  Transparent Process
                </div>

                <div className="hidden h-5 w-px bg-[#9BBBA8] sm:block" />

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    text-[13px]
                    font-medium
                    text-[#355B49]
                    sm:text-[14px]
                  "
                >
                  <span className="text-[18px] text-[#087A43]">
                    ♥
                  </span>
                  Expert Guidance
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE MUNDER */}
      <WhyChooseSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* FAQ */}
      <FaqSection />

    </main>
  );
}
