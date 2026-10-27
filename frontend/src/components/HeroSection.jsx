import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  BarChart3,
} from 'lucide-react';

export default function HeroSection({
  onReviewRiskClick,
  onAdminClick,
  stats
}) {
  return (
    <section id="hero-section" className="relative w-full overflow-hidden bg-gradient-to-r from-[#F5F1FE] via-[#F8F5FF] to-[#EAE0FE] min-h-[400px] lg:min-h-[440px] flex items-center border-b border-purple-100/60 scroll-mt-20">
      
      {/* Soft ambient violet background glows & curved shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E9D5FF]/30 blur-3xl" />
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#DDD6FE]/25 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full bg-[#EDE9FE]/50 blur-2xl" />
      </div>

      {/* Hero Content Container - Full screen width with balanced edge padding */}
      <div className="w-full relative z-10 px-6 sm:px-10 lg:px-14 xl:px-20 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          
          {/* =========================================================
              LEFT COLUMN — Category badge, headline, paragraph, CTAs
          ========================================================== */}
          <div className="w-full lg:w-[50%] xl:w-[48%] space-y-4 lg:space-y-5 text-left shrink-0 z-10">
            
            {/* Category label / pill badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ECE7FE] border border-purple-200/80 text-[#7C3AED] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span>Rural Maternal Healthcare Decision Support System</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-0.5">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#111827] tracking-tight leading-[1.14]">
                A Healthier Tomorrow
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.14] text-[#8B5CF6]">
                For Every Mother &amp; Baby
              </h2>
            </div>

            {/* Subtitle description paragraph */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-[15.5px] max-w-xl leading-relaxed font-normal">
              Precision clinical decision support, real-time risk assessment,
              and integrated hospital healthcare analytics for rural maternal
              well-being.
            </p>

            {/* Call-to-action buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1 sm:pt-2">
              <button
                onClick={onReviewRiskClick}
                className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm sm:text-base shadow-md shadow-purple-500/25 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Review High Risk Cases</span>
                <ArrowRight className="w-4 h-4 ml-1 stroke-[2.5]" />
              </button>

              <button
                onClick={onAdminClick}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-purple-50/70 text-[#7C3AED] font-semibold text-sm sm:text-base border border-purple-200 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
              >
                <span>Hospital Facility Stats</span>
              </button>
            </div>

            {/* Micro-stats information indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center space-x-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>WHO Clinical Protocols</span>
              </div>

              <div className="flex items-center space-x-1.5 font-medium">
                <Users className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span>32 Active ASHA Workers</span>
              </div>

              <div className="flex items-center space-x-1.5 font-medium">
                <BarChart3 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span>Real-time Analytics</span>
              </div>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN — Mother & baby illustration stretching wide
              to the right edge and blending seamlessly into the left
          ========================================================== */}
          <div className="w-full lg:w-[50%] xl:w-[52%] lg:absolute lg:right-0 lg:bottom-0 lg:top-0 flex items-end justify-end pointer-events-none select-none z-0">
            <div className="relative w-full h-full max-w-[620px] xl:max-w-[700px] 2xl:max-w-[760px] flex items-end justify-end">
              <img
                src="/images/hero_doctor_clean.png"
                alt="Doctor holding sleeping newborn baby"
                className="w-full h-auto max-h-[380px] sm:max-h-[410px] lg:max-h-[440px] xl:max-h-[460px] object-contain object-bottom-right"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}