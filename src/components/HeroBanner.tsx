"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 0,
    title: (
      <>
        <span className="block md:whitespace-nowrap">
          <span className="bg-gradient-to-r from-pink-300 to-pink-400 bg-clip-text text-transparent">old school</span>{" "}
          kalitesini
        </span>
        <span className="block md:whitespace-nowrap">modern dünyaya</span>
        <span className="block">getiriyoruz</span>
      </>
    ),
    description: "Markanı dijitalde büyütmek için strateji, içerik ve operasyonu tek yerde topluyoruz.",
    cta: "Hizmetlerimiz →",
  },
  {
    id: 1,
    title: (
      <>
        <span className="block md:whitespace-nowrap">
          <span className="bg-gradient-to-r from-pink-300 to-pink-400 bg-clip-text text-transparent">markanızı</span>{" "}
          zirveye
        </span>
        <span className="block md:whitespace-nowrap">çıkarmaya hazır</span>
        <span className="block">mısınız?</span>
      </>
    ),
    description: "İhtiyacına uygun paketi dakikalar içinde oluştur ve ekibimizle hemen başla.",
    cta: "Paketi Oluştur →",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 2);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full -mb-px">

      {/* ══════════════════════════════════════════════
          MOBİL: Split layout — üst görsel, alt içerik
          ══════════════════════════════════════════════ */}
      <div className="relative md:hidden">

        {/* ── ÜST YARI: Görsel / Video ── */}
        <div className="relative h-[50svh] min-h-[280px] w-full overflow-hidden">
          {/* Slayt 0: Video */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 0 ? "opacity-100" : "opacity-0"}`}>
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center">
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Slayt 1: Fotoğraf */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 1 ? "opacity-100" : "opacity-0"}`}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/hero-foto.png')",
                backgroundSize: "cover",
                backgroundPosition: "34% center",
                animation: "none",
              }}
            />
          </div>

          {/* Alt gradient — görselden koyu zemine geçiş */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 z-10"
            style={{
              background: "linear-gradient(to top, #18181b 0%, rgba(24,24,27,0.6) 50%, transparent 100%)",
            }}
          />

          {/* Slide indicator'lar — görselin alt kısmında */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((slide) => (
              <button
                key={`dot-m-${slide.id}`}
                type="button"
                aria-label={`Slayt ${slide.id + 1}`}
                onClick={() => setActiveSlide(slide.id)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === slide.id
                    ? "w-7 bg-pink-400"
                    : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── ALT YARI: Koyu zemin + tipografi ── */}
        <div
          className="relative px-6 pb-12 pt-4"
          style={{ background: "#18181b" }}
        >
          {/* İçerik — her slaytın kendi bloğu */}
          {slides.map((slide) => (
            <div
              key={`text-m-${slide.id}`}
              className={`text-center transition-opacity duration-700 ${
                activeSlide === slide.id
                  ? "relative opacity-100"
                  : "absolute inset-x-6 top-4 opacity-0 pointer-events-none"
              }`}
            >
              <h1 className="text-[2rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.4rem]">
                {slide.title}
              </h1>
              <button
                type="button"
                className="mt-6 rounded-2xl bg-[#DB2777] px-7 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(219,39,119,0.35)] transition-transform duration-200 active:scale-[0.97]"
              >
                {slide.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Alt dalga — koyu zeminden site arka planına geçiş */}
        <div className="relative z-10 -mt-px -mb-px pointer-events-none" style={{ background: "#18181b" }}>
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-16 w-full translate-y-px" aria-hidden="true">
            <path
              d="M0 38 C220 16 360 82 560 70 C740 58 870 108 1080 88 C1240 72 1320 42 1440 26 V140 H0 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP: Full-screen overlay (mevcut)
          ══════════════════════════════════════════════ */}
      <div className="relative hidden w-full overflow-hidden md:block md:h-[72vh] md:min-h-[540px]">
        {/* Arka plan: Video */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 0 ? "opacity-100" : "opacity-0"}`}>
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-[7] bg-[linear-gradient(to_left,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.26)_34%,rgba(0,0,0,0.08)_56%,transparent_72%)]" />
        </div>

        {/* Arka plan: Fotoğraf */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 1 ? "opacity-100" : "opacity-0"}`}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/hero-foto.png')",
              backgroundSize: "cover",
              backgroundPosition: "left 40%",
              animation: "hero-pan 16s ease-in-out infinite alternate",
            }}
          />
          <div className="absolute inset-0 z-[5] bg-black/28" />
          <div className="absolute inset-0 z-[7] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.12)_35%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        {/* İçerik */}
        {slides.map((slide) => (
          <div
            key={`content-d-${slide.id}`}
            className={`absolute inset-0 z-20 flex items-start justify-end px-16 pt-52 transition-opacity duration-700 ${
              activeSlide === slide.id ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="hero-text-float">
              <h1 className="hero-headline max-w-none text-right text-[3.1rem] font-bold leading-[1.02] tracking-[-0.02em] text-white lg:text-[3.35rem]">
                {slide.title}
              </h1>
            </div>
          </div>
        ))}

        {/* Alt gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36 z-10"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.2) 48%, transparent 100%)",
          }}
        />

        {/* Slide indicator'lar */}
        <div className="absolute left-10 bottom-24 z-30 flex gap-2">
          {slides.map((slide) => (
            <button
              key={`dot-d-${slide.id}`}
              type="button"
              aria-label={`Slayt ${slide.id + 1}`}
              onClick={() => setActiveSlide(slide.id)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === slide.id
                  ? "w-8 bg-pink-300"
                  : "w-2.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Alt dalga SVG */}
        <div className="absolute -bottom-px left-0 right-0 z-30 pointer-events-none">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-20 w-full" aria-hidden="true">
            <path
              d="M0 38 C220 16 360 82 560 70 C740 58 870 108 1080 88 C1240 72 1320 42 1440 26 V140 H0 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
