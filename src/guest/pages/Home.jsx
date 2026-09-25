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
  Sparkles,
  FileText,
  Leaf,
} from "lucide-react";

import gardenHome from "../../assets/munder/extra-photo-03.jpeg";
import maintenance from "../../assets/munder/extra-photo-12.jpg";
import gardenLandscape from "../../assets/munder/extra-photo-16.jpg";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <HeroSection />


      {/* =====================================================
          BOOK + EXPLORE
      ====================================================== */}
      <section
        className="w-full bg-white"
        style={{
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
      >

        {/* MAIN CENTERED CONTAINER */}
        <div
          style={{
            width: "100%",
            maxWidth: "1500px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >

          {/* =================================================
              BOOK A GARDEN VISIT
          ================================================== */}
          <div
            className="relative w-full overflow-hidden rounded-[30px] border border-[#A8D9BA] shadow-[0_18px_50px_rgba(0,107,56,0.18)]"
          >

            {/* BACKGROUND IMAGE */}
            <img
              src={maintenance}
              alt="MUNDER garden visit"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-[#063F2B]/60" />

            <div className="absolute inset-0 bg-gradient-to-br from-[#063F2B]/80 via-[#08733F]/45 to-[#063F2B]/55" />


            {/* CONTENT */}
            <div
              className="relative z-10"
              style={{
                paddingTop: "40px",
                paddingBottom: "32px",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
            >

              {/* HEADING */}
              <div className="mx-auto w-full max-w-5xl text-center">

                <div className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/90 sm:text-xs">

                  <span className="h-px w-10 bg-white/60 sm:w-16" />

                  Get Expert Advice For Your Garden

                  <span className="h-px w-10 bg-white/60 sm:w-16" />

                </div>


                <h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Book a Garden Visit
                </h2>


                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium leading-relaxed text-white/90 sm:text-base md:text-lg">
                  Our gardening experts will visit your space, understand your
                  needs and suggest the best solutions.
                </p>

              </div>


              {/* =================================================
                  WHITE VISIT CARD
              ================================================== */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "1150px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "36px",
                }}
              >

                <div className="w-full rounded-[26px] border border-white/50 bg-white/95 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.15)] backdrop-blur-sm sm:p-5 md:p-6">

                  {/* TOP ROW */}
                  <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto]">

                    <div className="flex items-center gap-4 sm:gap-5">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#08733F] text-white sm:h-16 sm:w-16">
                        <CalendarDays size={29} strokeWidth={2.4} />
                      </div>


                      <div>
                        <h3 className="text-xl font-black text-[#075B36] sm:text-2xl">
                          Book a Garden Visit
                        </h3>

                        <p className="mt-1 text-sm font-medium text-[#60756C] sm:text-base">
                          Get expert advice at your doorstep
                        </p>
                      </div>

                    </div>


                    {/* VISIT FEE */}
                    <div className="rounded-[18px] bg-[#F1FAF4] px-5 py-3 text-left sm:min-w-[180px]">

                      <p className="text-xs font-semibold text-[#64786F]">
                        Visit Fee
                      </p>

                      <p className="text-3xl font-black leading-tight text-[#075B36]">
                        ₹99
                      </p>

                      <p className="text-xs text-[#64786F]">
                        One-time fee
                      </p>

                    </div>

                  </div>


                  {/* =================================================
                      INFORMATION BOXES
                  ================================================== */}
                  <div className="mt-5 grid grid-cols-1 divide-y divide-[#D9E9DE] rounded-[20px] border border-[#E0ECE4] bg-[#FBFEFC] md:grid-cols-3 md:divide-x md:divide-y-0">

                    {/* VISIT FEE */}
                    <div className="flex items-center gap-4 px-4 py-4 sm:px-5">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E1F4E8] text-[#08733F]">
                        <IndianRupee size={22} strokeWidth={2.6} />
                      </div>


                      <div>

                        <p className="text-xs font-semibold text-[#61766C]">
                          Visit Fee
                        </p>

                        <p className="text-xl font-black text-[#063F2B]">
                          ₹99
                        </p>

                        <p className="text-xs text-[#71837B]">
                          One-time fee
                        </p>

                      </div>

                    </div>


                    {/* ADJUSTABLE */}
                    <div className="flex items-center gap-4 px-4 py-4 sm:px-5">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E1F4E8] text-[#08733F]">
                        <CreditCard size={22} strokeWidth={2.4} />
                      </div>


                      <div>

                        <p className="text-base font-extrabold text-[#063F2B]">
                          ₹99 Fully Adjustable
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-[#61766C]">
                          Your visit fee is adjusted when you purchase a MUNDER plan.
                        </p>

                      </div>

                    </div>


                    {/* NO HIDDEN CHARGES */}
                    <div className="flex items-center gap-4 px-4 py-4 sm:px-5">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E1F4E8] text-[#08733F]">
                        <ShieldCheck size={22} strokeWidth={2.4} />
                      </div>


                      <div>

                        <p className="text-base font-extrabold text-[#063F2B]">
                          No Hidden Charges
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-[#61766C]">
                          Pay only ₹99 for the garden visit.
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      CTA
                  ================================================== */}
                  <div className="mt-5 flex justify-center">

                    <Link
                      to="/visit"
                      className="group inline-flex min-h-[58px] w-full max-w-[500px] items-center justify-center gap-3 rounded-full bg-[#007A43] px-7 py-4 text-base font-black text-white shadow-[0_9px_24px_rgba(0,122,67,0.25)] transition duration-200 hover:-translate-y-1 hover:bg-[#006A39] sm:text-lg"
                    >

                      <CalendarDays size={23} />

                      Book a Garden Visit

                      <ArrowRight
                        size={22}
                        className="transition group-hover:translate-x-1"
                      />

                    </Link>

                  </div>

                </div>

              </div>


              {/* =================================================
                  BOTTOM FEATURES
              ================================================== */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-bold text-white/90 sm:text-sm">

                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Easy Scheduling
                </span>

                <span className="hidden h-4 w-px bg-white/50 sm:block" />

                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Transparent Process
                </span>

                <span className="hidden h-4 w-px bg-white/50 sm:block" />

                <span className="flex items-center gap-2">
                  <Sparkles size={16} />
                  Expert Guidance
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              EXPLORE SERVICES + PLANS
          ================================================== */}
          <div className="mt-7 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">

            {/* SERVICES */}
            <Link
              to="/garden-maintenance-bhopal"
              className="group relative min-h-[360px] w-full overflow-hidden rounded-[28px] border border-[#BFDCCB] shadow-[0_10px_30px_rgba(0,107,56,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,107,56,0.20)] sm:min-h-[400px]"
            >

              <img
                src={gardenLandscape}
                alt="MUNDER garden landscaping services"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#063F2B]/75 via-[#063F2B]/40 to-black/10" />

              <div className="relative z-10 flex min-h-[360px] flex-col items-center justify-center p-7 text-center sm:min-h-[400px] sm:p-10">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 text-[#08733F] shadow-lg">
                  <Leaf size={30} strokeWidth={2.3} />
                </div>

                <h3 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                  Explore Services
                </h3>

                <p className="mt-3 max-w-[500px] text-sm font-medium leading-relaxed text-white/95 sm:text-base">
                  Complete garden solutions for every space from maintenance
                  to landscaping, plantation and more.
                </p>

                <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#08733F] px-7 py-3.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.20)]">

                  Explore Services

                  <ArrowRight
                    size={19}
                    className="transition group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>


            {/* PLANS */}
            <Link
              to="/plans"
              className="group relative min-h-[360px] w-full overflow-hidden rounded-[28px] border border-[#DCCFA5] shadow-[0_10px_30px_rgba(116,94,31,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(116,94,31,0.18)] sm:min-h-[400px]"
            >

              <img
                src={gardenHome}
                alt="MUNDER garden maintenance plans"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#3D3216]/70 via-[#3D3216]/35 to-black/10" />

              <div className="relative z-10 flex min-h-[360px] flex-col items-center justify-center p-7 text-center sm:min-h-[400px] sm:p-10">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 text-[#08733F] shadow-lg">
                  <FileText size={30} strokeWidth={2.3} />
                </div>

                <h3 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                  Explore Plans
                </h3>

                <p className="mt-3 max-w-[500px] text-sm font-medium leading-relaxed text-white/95 sm:text-base">
                  Flexible maintenance plans designed for your garden's needs
                  and your peace of mind.
                </p>

                <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#08733F] px-7 py-3.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.20)]">

                  Explore Plans

                  <ArrowRight
                    size={19}
                    className="transition group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          OTHER HOME SECTIONS
      ====================================================== */}
      <WhyChooseSection />
      <TestimonialsSection />
      <FaqSection />

    </main>
  );
}