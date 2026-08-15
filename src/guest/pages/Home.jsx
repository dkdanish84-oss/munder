import HeroSection from "../../components/guest/HeroSection";
import WhyChooseSection from "../../components/guest/WhyChooseSection";
import TestimonialsSection from "../../components/guest/TestimonialsSection";
import FaqSection from "../../components/guest/FaqSection";
import { Link } from "react-router-dom";
import { CheckCircle2, Gift, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="home-center">

      {/* HERO */}
      <HeroSection />

      {/* =========================================================
          FREE GARDEN VISIT
         ========================================================= */}
      <section className="w-full px-0 py-0 sm:px-4 sm:py-4 md:py-6">
        <div className="mx-auto w-full max-w-[1500px]">

          {/* MAIN GREEN BOX */}
          <div
            className="
              relative
              w-full
              overflow-hidden
              rounded-[0px]
              bg-[#00552D]
              px-2
              pt-2
              pb-2
              shadow-lg

              sm:rounded-[28px]
              sm:px-8
              sm:py-9
              md:px-12
              md:py-10
              lg:px-14
              lg:py-12
            "
          >

            {/* =====================================================
                DECORATIVE LEAVES
               ===================================================== */}
            <div
              className="
                pointer-events-none
                absolute
                right-[-18px]
                top-[45px]
                z-0
                opacity-20

                sm:right-[-20px]
                sm:top-[80px]
                md:right-0
              "
            >
              <div className="flex rotate-[-15deg] items-end gap-1">

                <div
                  className="
                    h-[95px]
                    w-[30px]
                    rotate-[25deg]
                    rounded-[70%_20%_70%_20%]
                    bg-green-400/60

                    sm:h-[150px]
                    sm:w-[55px]
                  "
                />

                <div
                  className="
                    h-[125px]
                    w-[38px]
                    rotate-[-5deg]
                    rounded-[70%_20%_70%_20%]
                    bg-green-500/60

                    sm:h-[190px]
                    sm:w-[65px]
                  "
                />

                <div
                  className="
                    h-[85px]
                    w-[28px]
                    rotate-[-35deg]
                    rounded-[70%_20%_70%_20%]
                    bg-green-300/60

                    sm:h-[130px]
                    sm:w-[50px]
                  "
                />

              </div>
            </div>

            {/* =====================================================
                YELLOW DECORATIVE LINES
               ===================================================== */}
            <div
              className="
                pointer-events-none
                absolute
                right-2
                top-2
                z-20

                sm:right-4
                sm:top-5
              "
            >
              <div className="flex rotate-[18deg] gap-2 sm:gap-3">

                <span
                  className="
                    h-6
                    w-1.5
                    rounded-full
                    bg-yellow-400

                    sm:h-10
                    sm:w-2
                  "
                />

                <span
                  className="
                    mt-3
                    h-4
                    w-1.5
                    rounded-full
                    bg-yellow-400

                    sm:mt-5
                    sm:h-6
                    sm:w-2
                  "
                />

                <span
                  className="
                    h-7
                    w-1.5
                    rounded-full
                    bg-yellow-400

                    sm:h-12
                    sm:w-2
                  "
                />

              </div>
            </div>

            {/* =====================================================
                TOP CONTENT
               ===================================================== */}
            <div
              className="
                relative
                z-10
                flex
                flex-row
                items-start
                gap-2

                sm:gap-5
                md:gap-8
              "
            >

              {/* ===================================================
                  100% FREE BOX
                 =================================================== */}
              <div className="shrink-0">

                <div
                  className="
                    flex
                    h-[108px]
                    w-[88px]
                    flex-col
                    items-center
                    justify-center
                    rounded-[20px]
                    bg-yellow-400
                    text-[#00552D]
                    shadow-md

                    sm:h-[175px]
                    sm:w-[140px]
                    sm:rounded-[32px]
                  "
                >

                  <Gift
                    size={24}
                    strokeWidth={2.5}
                    className="mb-1 sm:mb-2 sm:h-[38px] sm:w-[38px]"
                  />

                  <div
                    className="
                      text-[27px]
                      font-black
                      leading-none
                      sm:text-[42px]
                    "
                  >
                    100%
                  </div>

                  <div
                    className="
                      mt-0.5
                      text-[23px]
                      font-black
                      leading-none
                      sm:mt-1
                      sm:text-[34px]
                    "
                  >
                    FREE
                  </div>

                </div>
              </div>

              {/* ===================================================
                  RIGHT SIDE CONTENT
                 =================================================== */}
              <div
                className="
                  min-w-0
                  flex-1
                  pt-0
                  text-left
                "
              >

                {/* HEADING */}
                <h2
                  className="
                    whitespace-nowrap
                    font-black
                    uppercase
                    leading-[0.95]
                    tracking-tight
                  "
                >
                  <span
                    className="
                      text-[23px]
                      text-yellow-400
                      sm:text-[52px]
                      md:text-[58px]
                      lg:text-[66px]
                    "
                  >
                    FREE
                  </span>{" "}
                  <span
                    className="
                      text-[23px]
                      text-white
                      sm:text-[52px]
                      md:text-[58px]
                      lg:text-[66px]
                    "
                  >
                    GARDEN VISIT
                  </span>
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-1
                    max-w-[700px]
                    text-[11px]
                    leading-[1.2]
                    text-white

                    sm:mt-4
                    sm:text-[21px]
                    sm:leading-relaxed
                    md:text-[24px]
                    lg:text-[26px]
                  "
                >
                  Book your free visit & get expert
                  <br />
                  advice from our specialists.
                </p>

                {/* =================================================
                    BENEFITS
                   ================================================= */}
                <div
                  className="
                    mt-2
                    flex
                    flex-nowrap
                    items-center
                    gap-1

                    sm:mt-6
                    sm:flex-wrap
                    sm:gap-3
                  "
                >

                  {/* NO COST */}
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      rounded-full
                      bg-[#087A43]
                      px-1.5
                      py-1
                      text-white

                      sm:gap-2
                      sm:px-5
                      sm:py-3
                    "
                  >
                    <CheckCircle2
                      size={17}
                      strokeWidth={2.5}
                      className="
                        shrink-0
                        rounded-full
                        bg-white
                        text-[#087A43]

                        sm:h-[34px]
                        sm:w-[34px]
                      "
                      fill="white"
                    />

                    <span
                      className="
                        whitespace-nowrap
                        text-[8px]
                        font-semibold

                        sm:text-[21px]
                      "
                    >
                      No Cost
                    </span>
                  </div>

                  {/* NO OBLIGATION */}
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      rounded-full
                      bg-[#087A43]
                      px-1.5
                      py-1
                      text-white

                      sm:gap-2
                      sm:px-5
                      sm:py-3
                    "
                  >
                    <CheckCircle2
                      size={17}
                      strokeWidth={2.5}
                      className="
                        shrink-0
                        rounded-full
                        bg-white
                        text-[#087A43]

                        sm:h-[34px]
                        sm:w-[34px]
                      "
                      fill="white"
                    />

                    <span
                      className="
                        whitespace-nowrap
                        text-[8px]
                        font-semibold

                        sm:text-[21px]
                      "
                    >
                      No Obligation
                    </span>
                  </div>

                  {/* EXPERT ADVICE */}
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      rounded-full
                      bg-[#087A43]
                      px-1.5
                      py-1
                      text-white

                      sm:gap-2
                      sm:px-5
                      sm:py-3
                    "
                  >
                    <CheckCircle2
                      size={17}
                      strokeWidth={2.5}
                      className="
                        shrink-0
                        rounded-full
                        bg-white
                        text-[#087A43]

                        sm:h-[34px]
                        sm:w-[34px]
                      "
                      fill="white"
                    />

                    <span
                      className="
                        whitespace-nowrap
                        text-[8px]
                        font-semibold

                        sm:text-[21px]
                      "
                    >
                      Expert Advice
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                BOOK FREE VISIT BUTTON
               ===================================================== */}
            <div
              className="
                relative
                z-20
                mt-2

                sm:mt-8
                md:mt-10
              "
            >

              <Link
                to="/visit"
                className="
                  flex
                  min-h-[62px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[18px]
                  bg-white
                  px-3
                  py-2
                  text-[#00552D]
                  shadow-xl
                  transition-all
                  duration-200
                  hover:scale-[1.01]
                  hover:shadow-2xl

                  sm:min-h-[105px]
                  sm:gap-4
                  sm:px-8
                  md:min-h-[120px]
                "
              >

                <span
                  className="
                    whitespace-nowrap
                    text-center
                    text-[21px]
                    font-black
                    leading-none

                    sm:text-[45px]
                    md:text-[56px]
                    lg:text-[64px]
                  "
                >
                  BOOK FREE VISIT
                </span>

                <span
                  className="
                    flex
                    h-[40px]
                    w-[40px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#00552D]
                    text-white

                    sm:h-[72px]
                    sm:w-[72px]
                    md:h-[82px]
                    md:w-[82px]
                  "
                >

                  <ArrowRight
                    size={28}
                    strokeWidth={2.5}
                    className="sm:hidden"
                  />

                  <ArrowRight
                    size={48}
                    strokeWidth={2.5}
                    className="hidden sm:block md:hidden"
                  />

                  <ArrowRight
                    size={56}
                    strokeWidth={2.5}
                    className="hidden md:block"
                  />

                </span>

              </Link>

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