"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const contactDetails = [
  "Levent, Istanbul",
  "Turkiye",
  "+90 545 940 76 90",
  "info@zeplinmedia.com",
];

const socialLinks = [
  { href: "https://www.instagram.com/zeplin.media/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/zeplin-media/", label: "LinkedIn" },
  { href: "https://wa.me/905459407690", label: "WhatsApp" },
];

const quickLinksLeft = [
  { href: "/", label: "Ana sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/operasyonlar", label: "Operasyonlar" },
];

const quickLinksRight = [
  { href: "/blog", label: "Zeplin blog" },
  { href: "/hakkimizda", label: "Hakkimizda" },
  { href: "/galeri", label: "Galeri" },
];

const panelContours = [
  "M28 54C64 18 126 12 180 42C238 74 270 136 268 208C266 284 296 356 314 428C332 500 328 570 294 640",
  "M74 18C28 66 20 134 42 206C64 278 110 348 132 432C152 508 152 582 124 652",
  "M156 6C208 40 240 96 240 166C240 238 274 308 314 378C356 452 372 530 356 628",
  "M338 -2C302 70 302 152 326 240C350 332 360 430 350 526C344 590 348 652 366 722",
  "M522 -6C482 72 478 162 496 254C516 354 524 454 516 556C510 624 516 694 538 768",
  "M704 -8C670 76 668 168 682 262C698 362 704 466 696 574C692 646 696 716 714 790",
  "M892 -2C864 86 862 186 874 288C886 394 890 500 882 606C876 680 880 744 896 808",
  "M1062 0C1038 96 1038 204 1052 316C1066 432 1070 548 1064 664C1060 736 1062 800 1076 870",
];

function FooterStar({ starRef }: { starRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={starRef}
      className="absolute left-1/2 top-0 z-20 will-change-transform"
      style={{ transform: "translate(-50%, -51%) rotate(0deg)" }}
      aria-hidden="true"
    >
      <div className="animate-spin [animation-duration:14s]">
        <svg
          viewBox="0 0 180 180"
          className="h-[120px] w-[120px] drop-shadow-[0_20px_34px_rgba(157,23,77,0.28)] md:h-[146px] md:w-[146px]"
        >
        <defs>
          <linearGradient id="footer-star-fill" x1="18" y1="22" x2="158" y2="162" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffc0e4" />
            <stop offset="0.48" stopColor="#f25db0" />
            <stop offset="1" stopColor="#ab1656" />
          </linearGradient>
          <radialGradient id="petal-depth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
          </radialGradient>
          <linearGradient id="petal-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <g transform="translate(90 90)">
          <g>
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#footer-star-fill)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#petal-depth)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#petal-sheen)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="none" stroke="#ffe3f3" opacity="0.2" />
          </g>
          <g transform="rotate(60)">
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#footer-star-fill)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#petal-depth)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#petal-sheen)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="none" stroke="#ffe3f3" opacity="0.2" />
          </g>
          <g transform="rotate(120)">
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#footer-star-fill)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#petal-depth)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="url(#petal-sheen)" />
            <rect x="-20" y="-70" width="40" height="140" rx="12" fill="none" stroke="#ffe3f3" opacity="0.2" />
          </g>
        </g>
        </svg>
      </div>
    </div>
  );
}

function PanelPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 620"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {panelContours.map((path) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(255,243,248,0.07)"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
      ))}
      <path
        d="M14 52C67 8 147 12 200 54C253 96 289 169 287 244C284 320 245 401 196 455C146 510 134 569 162 618"
        fill="none"
        stroke="rgba(255,243,248,0.055)"
        strokeWidth="1.05"
      />
      <path
        d="M932 -10C910 86 914 186 927 286C942 397 942 497 932 620"
        fill="none"
        stroke="rgba(255,243,248,0.055)"
        strokeWidth="1.05"
      />
    </svg>
  );
}

function ScoreBadges() {
  return (
    <div className="mt-6 flex flex-wrap items-end gap-3">
      <div className="rounded-full bg-[#ec4899] px-2.5 py-1 text-[11px] font-semibold leading-none text-white shadow-[0_8px_18px_rgba(236,72,153,0.22)]">
        360°
      </div>
      <span className="text-[11px] text-[#f5e8f0]">operasyon modeli</span>
      <div className="flex gap-1.5">
        <span className="grid h-4 w-6 place-items-center rounded-[3px] bg-[#f59e0b] text-[8px] font-semibold text-[#201d1c]">SM</span>
        <span className="grid h-4 w-6 place-items-center rounded-[3px] bg-[#f7ecf4] text-[8px] font-semibold text-[#201d1c]">AI</span>
        <span className="grid h-4 w-8 place-items-center rounded-[3px] bg-[linear-gradient(90deg,#fbcfe8_0%,#fde7f3_48%,#7dd3fc_100%)] text-[8px] font-semibold text-[#201d1c]">WEB</span>
        <span className="grid h-4 w-8 place-items-center rounded-[3px] bg-[linear-gradient(90deg,#fb7185_0%,#ffffff_49%,#60a5fa_100%)] text-[8px] font-semibold text-[#201d1c]">ADS</span>
      </div>
    </div>
  );
}

export default function Footer() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const updateStar = () => {
      rafId = 0;
      if (!starRef.current) return;
      const rotation = window.scrollY * 0.16;
      starRef.current.style.transform = `translate(-50%, -51%) rotate(${rotation}deg)`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateStar);
    };

    updateStar();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer className="px-3 pb-4 pt-20 md:px-4 md:pb-8 md:pt-24">
      <div className="mx-auto w-full max-w-[min(1680px,calc(100vw-24px))] pt-[24px] md:pt-[34px]">
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-0 top-[-148px] z-0 h-[148px] opacity-75"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.14) 1.2px, transparent 1.2px)",
              backgroundSize: "28px 28px",
              maskImage:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.42) 48%, rgba(0,0,0,1) 88%, rgba(0,0,0,1) 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.42) 48%, rgba(0,0,0,1) 88%, rgba(0,0,0,1) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[8px] z-0 h-[96px] w-[38%] -translate-x-1/2 rounded-[999px] blur-[26px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(242,93,176,0.18) 0%, rgba(255,215,235,0.08) 38%, rgba(255,255,255,0.02) 56%, transparent 76%)",
            }}
          />
          <FooterStar starRef={starRef} />

          <section className="relative z-10 overflow-hidden rounded-[34px] bg-[#211d20] px-6 pb-6 pt-[4.1rem] shadow-[0_26px_60px_rgba(0,0,0,0.2)] md:px-12 md:pb-8 md:pt-[5.1rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(236,72,153,0.06),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0)_18%)]" />
            <PanelPattern />

            <div className="relative grid gap-12 md:grid-cols-[1fr_1.16fr_1fr] md:items-end md:gap-10">
              <div className="md:pt-[72px]">
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-8">
                  <div>
                    <h3 className="text-[18px] font-semibold leading-none tracking-[-0.035em] text-[#fff4f8] md:text-[19px]">
                      Iletisim
                    </h3>
                    <div className="mt-4 space-y-1.5 text-[13px] leading-[1.2] tracking-[-0.01em] text-[#f5e8f0] md:text-[13.5px]">
                      {contactDetails.map((line, index) =>
                        index === contactDetails.length - 1 ? (
                          <a
                            key={line}
                            href="mailto:info@zeplinmedia.com"
                            className="block underline decoration-[#f5e8f0]/55 underline-offset-[3px]"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line}>{line}</p>
                        )
                      )}
                    </div>
                    <ScoreBadges />
                  </div>

                  <div className="pt-8">
                    <div className="space-y-[0.55rem] text-[13px] leading-none tracking-[-0.01em] text-[#f5e8f0] md:text-[13.5px]">
                      {socialLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <span>{item.label}</span>
                          <span className="text-[#f472b6]">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-end text-center md:pb-1">
                <h2 className="text-[46px] font-semibold leading-[0.88] tracking-[-0.072em] text-[#fff5fa] md:text-[72px]">
                  Zeplin
                  <br />
                  Media
                </h2>
                <p className="mt-4 max-w-[24ch] font-serif text-[15px] italic leading-[1.48] tracking-[-0.01em] text-[#f7ecf3] md:text-[16px]">
                  Old school kaliteyi modern dijital sistemlerle bulusturuyoruz.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
                  <a
                    href="https://wa.me/905459407690"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff7ac5_0%,#ec4899_45%,#db2777_100%)] px-6 py-3 text-[14px] font-medium text-white shadow-[0_14px_30px_rgba(236,72,153,0.24)]"
                  >
                    Projeni anlat
                    <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#2a1121] text-[11px] text-[#fbcfe8]">
                      →
                    </span>
                  </a>
                  <Link
                    href="/hizmetler"
                    className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-6 py-3 text-[14px] font-medium text-[#fff3f8]"
                  >
                    Hizmetleri gor
                    <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#ec4899] text-[11px] text-white">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              <div className="md:pt-[78px]">
                <div className="mx-auto grid max-w-[320px] grid-cols-2 gap-x-10 text-left md:ml-auto md:mr-0">
                  <div>
                    <h3 className="text-[18px] font-semibold leading-[0.93] tracking-[-0.035em] text-[#fff4f8] md:text-[19px]">
                      Hizli
                      <br />
                      erisim
                    </h3>
                    <div className="mt-4 space-y-[0.55rem] text-[13px] leading-[1.2] tracking-[-0.01em] text-[#f5e8f0] md:text-[13.5px]">
                      {quickLinksLeft.map((item) => (
                        <Link key={item.href} href={item.href} className="block">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-[30px]">
                    <div className="space-y-[0.55rem] text-[13px] leading-[1.2] tracking-[-0.01em] text-[#f5e8f0] md:text-[13.5px]">
                      {quickLinksRight.map((item) => (
                        <Link key={item.href} href={item.href} className="block">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 flex justify-start md:mt-6 md:justify-end">
              <div className="flex flex-wrap gap-1.5">
                <a href="/cerez" className="rounded-[4px] bg-[#efe8bc] px-3 py-1.5 text-[11px] leading-none text-[#242220]">
                  Cookies policy
                </a>
                <a href="/gizlilik" className="rounded-[4px] bg-[#efe8bc] px-3 py-1.5 text-[11px] leading-none text-[#242220]">
                  Privacy policy
                </a>
                <span className="rounded-[4px] bg-[#efe8bc] px-3 py-1.5 text-[11px] leading-none text-[#242220]">
                  ©2026
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
