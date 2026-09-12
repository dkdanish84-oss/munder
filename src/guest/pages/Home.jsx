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
  IndianRupee,
} from "lucide-react";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-white">

      {/* =========================================================
          HERO
         ========================================================= */}
      <HeroSection />

      {/* =========================================================
          GARDEN VISIT
         ========================================================= */}
      <section className="w-full px-3 py-4 sm:px-4 sm:py-6 md:py-8">
        
        {/* IMPORTANT: CENTER THE COMPLETE CARD */}
        <div className="flex w-full justify-center">
          
          <div className="w-full max-w-[1500px]">
            
            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-[22px]
                bg-[#F0F9F4]
                px-4
                py-6
                shadow-md
                ring-1
                ring-[#D9EDE1]
                sm:rounded-[26px]
                sm:px-8
                sm:py-9
                md:px-12
                md:py-10
                lg:rounded-[30px]
                lg:px-16
                lg:py-11
              "
            >

              {/* DECORATIVE TOP RIGHT */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-60px]
                  top-[-60px]
                  h-[180px]
                  w-[180px]
                  rounded-full
                  bg-[#DDF2E6]
                  opacity-70
                  sm:h-[240px]
                  sm:w-[240px]
                  lg:h-[280px]
                  lg:w-[280px]
                "
              />

              {/* DECORATIVE BOTTOM LEFT */}
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-80px]
                  left-[-60px]
                  h-[190px]
                  w-[190px]
                  rounded-full
                  bg-[#E3F4E9]
                  opacity-70
                  sm:h-[250px]
                  sm:w-[250px]
                "
              />

              <div className="relative z-10 w-full">

                {/* =================================================
                    HEADING
                   ================================================= */}
                <div className="mx-auto w-full max-w-[950px] text-center">

                  <p
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#087A43]
                      sm:text-[14px]
                      md:text-[15px]
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
                      sm:text-[40px]
                      md:text-[48px]
                      lg:text-[54px]
                    "
                  >
                    Book a Garden Visit
                  </h2>

                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-[820px]
                      text-[13px]
                      leading-relaxed
                      text-[#355B49]
                      sm:mt-3
                      sm:text-[17px]
                      md:text-[19px]
                    "
                  >
                    Our gardening experts will visit your space, understand
                    your needs and suggest the best solutions.
                  </p>

                </div>


                {/* =================================================
                    INFORMATION CARDS
                   ================================================= */}
                <div
                  className="
                    mx-auto
                    mt-5
                    grid
                    w-full
                    max-w-[1100px]
                    grid-cols-1
                    gap-3
                    sm:mt-7
                    sm:grid-cols-3
                    sm:gap-4
                  "
                >

                  {/* VISIT FEE */}
                  <div
                    className="
                      flex
                      min-w-0
                      min-h-[82px]
                      items-center
                      gap-3
                      rounded-[16px]
                      bg-white
                      px-4
                      py-4
                      ring-1
                      ring-[#D8EDE0]
                      sm:min-h-[92px]
                      sm:px-5
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
                      <IndianRupee
                        size={25}
                        strokeWidth={2.5}
                      />
                    </div>

                    <div className="min-w-0 text-left">
                      <p className="text-[12px] font-semibold text-[#527263] sm:text-[14px]">
                        Visit Fee
                      </p>

                      <p className="text-[23px] font-black leading-tight text-[#06452D] sm:text-[27px]">
                        99
                      </p>

                      <p className="text-[10px] text-[#6B8176] sm:text-[12px]">
                        One-time fee
                      </p>
                    </div>
                  </div>


                  {/* FULLY ADJUSTABLE */}
                  <div
                    className="
                      flex
                      min-w-0
                      min-h-[82px]
                      items-center
                      gap-3
                      rounded-[16px]
                      bg-white
                      px-4
                      py-4
                      ring-1
                      ring-[#D8EDE0]
                      sm:min-h-[92px]
                      sm:px-5
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
                      <CreditCard
                        size={25}
                        strokeWidth={2}
                      />
                    </div>

                    <div className="min-w-0 text-left">
                      <p className="text-[14px] font-bold text-[#06452D] sm:text-[16px]">
                        99 Fully Adjustable
                      </p>

                      <p className="text-[10px] leading-relaxed text-[#527263] sm:text-[12px]">
                        Your visit fee is adjusted when you purchase a MUNDER plan.
                      </p>
                    </div>
                  </div>


                  {/* NO HIDDEN CHARGES */}
                  <div
                    className="
                      flex
                      min-w-0
                      min-h-[82px]
                      items-center
                      gap-3
                      rounded-[16px]
                      bg-white
                      px-4
                      py-4
                      ring-1
                      ring-[#D8EDE0]
                      sm:min-h-[92px]
                      sm:px-5
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
                      <ShieldCheck
                        size={27}
                        strokeWidth={2}
                      />
                    </div>

                    <div className="min-w-0 text-left">
                      <p className="text-[14px] font-bold text-[#06452D] sm:text-[16px]">
                        No Hidden Charges
                      </p>

                      <p className="text-[10px] leading-relaxed text-[#527263] sm:text-[12px]">
                        Pay only 99 for the garden visit.
                      </p>
                    </div>
                  </div>

                </div>


                {/* =================================================
                    ACTION BUTTONS
                   ================================================= */}
                <div
                  className="
                    mx-auto
                    mt-4
                    grid
                    w-full
                    max-w-[1100px]
                    grid-cols-1
                    gap-3
                    sm:mt-5
                    sm:grid-cols-3
                  "
                >

                  {/* BOOK VISIT */}
                  <Link
                    to="/visit"
                    className="
                      flex
                      min-w-0
                      w-full
                      min-h-[52px]
                      items-center
                      justify-center
                      gap-2
                      overflow-hidden
                      rounded-full
                      bg-[#087A43]
                      px-4
                      py-3
                      text-center
                      text-[14px]
                      font-bold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-[#066B3A]
                      hover:shadow-md
                      sm:min-h-[58px]
                      sm:px-5
                      sm:text-[16px]
                    "
                  >
                    <CalendarDays
                      size={20}
                      className="shrink-0"
                    />

                    <span className="min-w-0 truncate">
                      Book a Garden Visit
                    </span>

                    <ArrowRight
                      size={18}
                      className="shrink-0"
                    />
                  </Link>


                  {/* SERVICES */}
                  <Link
                    to="/garden-maintenance-bhopal"
                    className="
                      flex
                      min-w-0
                      w-full
                      min-h-[52px]
                      items-center
                      justify-center
                      gap-2
                      overflow-hidden
                      rounded-full
                      border-2
                      border-[#087A43]
                      bg-white
                      px-4
                      py-3
                      text-center
                      text-[14px]
                      font-bold
                      text-[#087A43]
                      transition
                      hover:bg-[#EAF7EF]
                      sm:min-h-[58px]
                      sm:px-5
                      sm:text-[16px]
                    "
                  >
                    <span className="min-w-0 truncate">
                      Explore Services
                    </span>

                    <ArrowRight
                      size={18}
                      className="shrink-0"
                    />
                  </Link>


                  {/* PLANS */}
                  <Link
                    to="/plans"
                    className="
                      flex
                      min-w-0
                      w-full
                      min-h-[52px]
                      items-center
                      justify-center
                      gap-2
                      overflow-hidden
                      rounded-full
                      border-2
                      border-[#087A43]
                      bg-white
                      px-4
                      py-3
                      text-center
                      text-[14px]
                      font-bold
                      text-[#087A43]
                      transition
                      hover:bg-[#EAF7EF]
                      sm:min-h-[58px]
                      sm:px-5
                      sm:text-[16px]
                    "
                  >
                    <span className="min-w-0 truncate">
                      Explore Plans
                    </span>

                    <ArrowRight
                      size={18}
                      className="shrink-0"
                    />
                  </Link>

                </div>


                {/* =================================================
                    BENEFITS
                   ================================================= */}
                <div
                  className="
                    mx-auto
                    mt-5
                    flex
                    w-full
                    max-w-[900px]
                    flex-wrap
                    items-center
                    justify-center
                    gap-y-3
                    text-center
                    sm:mt-6
                    sm:flex-nowrap
                    sm:gap-0
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      px-3
                      text-[12px]
                      font-medium
                      text-[#355B49]
                      sm:px-4
                      sm:text-[13px]
                    "
                  >
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-[#087A43]"
                    />
                    Easy Scheduling
                  </div>

                  <div className="hidden h-5 w-px bg-[#9BBBA8] sm:block" />

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      px-3
                      text-[12px]
                      font-medium
                      text-[#355B49]
                      sm:px-4
                      sm:text-[13px]
                    "
                  >
                    <ShieldCheck
                      size={17}
                      className="shrink-0 text-[#087A43]"
                    />
                    Transparent Process
                  </div>

                  <div className="hidden h-5 w-px bg-[#9BBBA8] sm:block" />

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      px-3
                      text-[12px]
                      font-medium
                      text-[#355B49]
                      sm:px-4
                      sm:text-[13px]
                    "
                  >
                    <span className="text-[17px] text-[#087A43]">
                      
                    </span>

                    Expert Guidance
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          WHY CHOOSE MUNDER
         ========================================================= */}
      <WhyChooseSection />


      {/* =========================================================
          TESTIMONIALS
         ========================================================= */}
      <TestimonialsSection />


      {/* =========================================================
          FAQ
         ========================================================= */}
      <FaqSection />

    </main>
  );
}
