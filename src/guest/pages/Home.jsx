import HeroSection from "../../components/guest/HeroSection";
import WhyChooseSection from "../../components/guest/WhyChooseSection";
import TestimonialsSection from "../../components/guest/TestimonialsSection";
import FaqSection from "../../components/guest/FaqSection";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CreditCard, ShieldCheck, IndianRupee, Sparkles, CheckCircle2, FileText, Leaf } from "lucide-react";
import gardenHome from "../../assets/munder/extra-photo-03.jpeg";
import lawnProject from "../../assets/munder/extra-photo-04.jpeg";
import topiaryGarden from "../../assets/munder/extra-photo-08.jpeg";
import maintenance from "../../assets/munder/extra-photo-12.jpg";
import flowers from "../../assets/munder/extra-photo-13.jpg";
import gardenLandscape from "../../assets/munder/extra-photo-16.jpg";

export default function Home() {
  const serviceItems = ["Garden Maintenance", "Landscaping & Design", "Plantation & Irrigation", "Seasonal Care"];
  const planItems = ["Affordable Plans", "Regular Maintenance", "Customizable as per your Space", "Long-term Garden Health"];

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <HeroSection />
      <section className="w-full bg-white px-3 py-6 sm:px-5 sm:py-8 md:py-12">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="relative overflow-hidden rounded-[30px] border border-[#B9DFC7] bg-gradient-to-br from-[#F4FCF5] via-[#EAF8EE] to-[#DFF3E5] px-4 py-7 shadow-[0_14px_40px_rgba(0,107,56,0.14)] sm:px-7 sm:py-9 md:px-10 md:py-11 lg:px-14">
            <div className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full bg-[#CDEFD8] opacity-70 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#C8EED5] opacity-80 blur-3xl" />
            <div className="relative z-10">
              <div className="mx-auto max-w-5xl text-center">
                <div className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#08733F] sm:text-xs"><span className="h-px w-10 bg-[#63B989] sm:w-16" />Get Expert Advice For Your Garden<span className="h-px w-10 bg-[#63B989] sm:w-16" /></div>
                <h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-tight text-[#063F2B] sm:text-5xl md:text-6xl lg:text-7xl">Book a Garden Visit</h2>
                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium leading-relaxed text-[#557066] sm:text-base md:text-lg">Our gardening experts will visit your space, understand your needs and suggest the best solutions.</p>
              </div>
              <div className="mx-auto mt-7 max-w-[1100px] rounded-[26px] border border-[#D0E8D9] bg-white/95 p-4 shadow-[0_8px_28px_rgba(0,107,56,0.10)] sm:mt-9 sm:p-5 md:p-6">
                <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto]">
                  <div className="flex items-center gap-4 sm:gap-5"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#08733F] text-white shadow-[0_6px_16px_rgba(0,107,56,0.20)] sm:h-16 sm:w-16"><CalendarDays size={29} strokeWidth={2.4} /></div><div><h3 className="text-xl font-black text-[#075B36] sm:text-2xl">Book a Garden Visit</h3><p className="mt-1 text-sm font-medium text-[#60756C] sm:text-base">Get expert advice at your doorstep</p></div></div>
                  <div className="rounded-[18px] bg-[#F1FAF4] px-5 py-3 text-left sm:min-w-[180px]"><p className="text-xs font-semibold text-[#64786F]">Visit Fee</p><p className="text-3xl font-black leading-tight text-[#075B36]">₹99</p><p className="text-xs text-[#64786F]">One-time fee</p></div>
                </div>
                <div className="mt-5 grid grid-cols-1 divide-y divide-[#D9E9DE] rounded-[20px] border border-[#E0ECE4] bg-[#FBFEFC] md:grid-cols-3 md:divide-x md:divide-y-0">
                  <div className="flex items-center gap-4 px-4 py-4 sm:px-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E1F4E8] text-[#08733F]"><IndianRupee size={22} strokeWidth={2.6} /></div><div><p className="text-xs font-semibold text-[#61766C]">Visit Fee</p><p className="text-xl font-black text-[#063F2B]">₹99</p><p className="text-xs text-[#71837B]">One-time fee</p></div></div>
                  <div className="flex items-center gap-4 px-4 py-4 sm:px-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E1F4E8] text-[#08733F]"><CreditCard size={22} strokeWidth={2.4} /></div><div><p className="text-base font-extrabold text-[#063F2B]">₹99 Fully Adjustable</p><p className="mt-1 text-xs leading-relaxed text-[#61766C]">Your visit fee is adjusted when you purchase a MUNDER plan.</p></div></div>
                  <div className="flex items-center gap-4 px-4 py-4 sm:px-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E1F4E8] text-[#08733F]"><ShieldCheck size={22} strokeWidth={2.4} /></div><div><p className="text-base font-extrabold text-[#063F2B]">No Hidden Charges</p><p className="mt-1 text-xs leading-relaxed text-[#61766C]">Pay only ₹99 for the garden visit.</p></div></div>
                </div>
                <div className="mt-5 flex justify-center"><Link to="/visit" className="group inline-flex min-h-[58px] w-full max-w-[500px] items-center justify-center gap-3 rounded-full bg-[#007A43] px-7 py-4 text-base font-black text-white shadow-[0_9px_24px_rgba(0,122,67,0.25)] transition duration-200 hover:-translate-y-1 hover:bg-[#006A39] sm:text-lg"><CalendarDays size={23} />Book a Garden Visit<ArrowRight size={22} className="transition group-hover:translate-x-1" /></Link></div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-bold text-[#4E6D5D] sm:text-sm"><span className="flex items-center gap-2"><CalendarDays size={16} className="text-[#08733F]" />Easy Scheduling</span><span className="hidden h-4 w-px bg-[#9DC9AE] sm:block" /><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#08733F]" />Transparent Process</span><span className="hidden h-4 w-px bg-[#9DC9AE] sm:block" /><span className="flex items-center gap-2"><Sparkles size={16} className="text-[#08733F]" />Expert Guidance</span></div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Link to="/garden-maintenance-bhopal" className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-[#CFE7D8] bg-[#F0FAF4] shadow-[0_8px_25px_rgba(0,107,56,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,107,56,0.15)]">
              <img src={gardenLandscape} alt="MUNDER garden landscaping" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/15" />
              <div className="relative z-10 flex min-h-[360px] max-w-[620px] flex-col justify-center p-6 sm:p-8 md:p-9"><div className="flex items-start gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DDF3E5] text-[#08733F]"><Leaf size={28} strokeWidth={2.3} /></div><div><h3 className="text-2xl font-black text-[#063F2B] sm:text-3xl">Explore Services</h3><p className="mt-2 text-sm leading-relaxed text-[#4F675C] sm:text-base">Complete garden solutions for every space from maintenance to landscaping, plantation and more.</p></div></div><div className="mt-5 grid grid-cols-1 gap-2 text-sm font-semibold text-[#385B4A] sm:grid-cols-2">{serviceItems.map(item => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={17} className="shrink-0 text-[#08733F]" />{item}</span>)}</div><div className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-[#08733F] px-6 py-3.5 text-sm font-black text-white shadow-[0_7px_18px_rgba(0,107,56,0.16)]">Explore Services<ArrowRight size={19} className="transition group-hover:translate-x-1" /></div></div>
            </Link>
            <Link to="/plans" className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-[#E8DFC2] bg-[#FFFDF5] shadow-[0_8px_25px_rgba(116,94,31,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(116,94,31,0.14)]">
              <img src={gardenHome} alt="MUNDER garden maintenance plan" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF5] via-[#FFFDF5]/90 to-white/15" />
              <div className="relative z-10 flex min-h-[360px] max-w-[620px] flex-col justify-center p-6 sm:p-8 md:p-9"><div className="flex items-start gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F4EECF] text-[#08733F]"><FileText size={28} strokeWidth={2.3} /></div><div><h3 className="text-2xl font-black text-[#063F2B] sm:text-3xl">Explore Plans</h3><p className="mt-2 text-sm leading-relaxed text-[#5C7167] sm:text-base">Flexible maintenance plans designed for your garden's needs and your peace of mind.</p></div></div><div className="mt-5 grid grid-cols-1 gap-2 text-sm font-semibold text-[#385B4A] sm:grid-cols-2">{planItems.map(item => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={17} className="shrink-0 text-[#08733F]" />{item}</span>)}</div><div className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-[#08733F] px-6 py-3.5 text-sm font-black text-white shadow-[0_7px_18px_rgba(0,107,56,0.16)]">Explore Plans<ArrowRight size={19} className="transition group-hover:translate-x-1" /></div></div>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{[[maintenance,"Garden Maintenance"],[flowers,"Plant & Flower Care"],[topiaryGarden,"Topiary & Design"],[lawnProject,"Lawn Development"]].map(([src,label]) => <div key={src} className="group relative h-40 overflow-hidden rounded-2xl sm:h-48"><img src={src} alt="MUNDER landscaping work" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3 text-xs font-bold text-white">{label}</div></div>)}</div>
        </div>
      </section>
      <WhyChooseSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
