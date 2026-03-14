"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

/* ── Types ─────────────────────────────────────────────────────────── */

export interface Brand {
  name: string;
  logo?: string; // path to logo image — when set, renders <img>
}

interface BrandMarqueeProps {
  brands: Brand[];
}

/* ── Brand Tile (square mini-bento) ───────────────────────────────── */

function BrandTile({
  brand,
  isDark,
}: {
  brand: Brand;
  isDark: boolean;
}) {
  return (
    <div
      className="brand-tile flex-shrink-0 flex items-center justify-center"
      style={{
        /* Square */
        width:  "clamp(72px, 9vw, 110px)",
        height: "clamp(72px, 9vw, 110px)",
        borderRadius: "clamp(14px, 2vw, 20px)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.07)",
        background: isDark
          ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)"
          : "linear-gradient(135deg, rgba(0,0,0,0.035) 0%, rgba(0,0,0,0.01) 100%)",
        backdropFilter: "blur(6px)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          draggable={false}
          className="pointer-events-none select-none"
          style={{
            width: "60%",
            height: "60%",
            objectFit: "contain",
            filter: isDark ? "brightness(0) invert(1)" : "none",
            opacity: isDark ? 0.6 : 0.5,
          }}
        />
      ) : (
        /* Placeholder: brand initial + name */
        <div className="flex flex-col items-center gap-[3px] select-none pointer-events-none">
          <span
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
              lineHeight: 1,
              color: isDark
                ? "rgba(244,114,182,0.45)"
                : "rgba(236,72,153,0.35)",
            }}
          >
            {brand.name.charAt(0)}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontWeight: 500,
              fontSize: "clamp(0.42rem, 0.75vw, 0.6rem)",
              letterSpacing: "0.04em",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: "85%",
              color: isDark
                ? "rgba(255,255,255,0.30)"
                : "rgba(0,0,0,0.25)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {brand.name}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Marquee Row ──────────────────────────────────────────────────── */

function MarqueeRow({
  brands,
  direction,
  speed,
  isDark,
}: {
  brands: Brand[];
  direction: "left" | "right";
  speed: number;
  isDark: boolean;
}) {
  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="relative w-full overflow-hidden" style={{ padding: "10px 0" }}>
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: "clamp(48px, 8vw, 120px)",
          background: isDark
            ? "linear-gradient(to right, #0d0608, transparent)"
            : "linear-gradient(to right, #ffffff, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: "clamp(48px, 8vw, 120px)",
          background: isDark
            ? "linear-gradient(to left, #0d0608, transparent)"
            : "linear-gradient(to left, #ffffff, transparent)",
        }}
      />

      <div
        className="flex items-center brand-marquee-strip"
        style={{
          gap: "clamp(12px, 2vw, 20px)",
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* 3 copies for seamless loop */}
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            className="flex items-center"
            style={{ gap: "clamp(12px, 2vw, 20px)" }}
          >
            {brands.map((b, i) => (
              <BrandTile key={`${copy}-${i}`} brand={b} isDark={isDark} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────────── */

export default function BrandMarquee({ brands }: BrandMarqueeProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver for entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        padding: "clamp(40px, 7vw, 80px) 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Soft pink glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(190,24,93,0.08), transparent)"
            : "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(244,114,182,0.05), transparent)",
        }}
      />

      {/* Pink gradient separator — top */}
      <div
        className="mx-auto mb-8 md:mb-12"
        style={{
          width: "clamp(140px, 28vw, 320px)",
          height: 2,
          borderRadius: 1,
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(244,114,182,0.50), transparent)"
            : "linear-gradient(90deg, transparent, rgba(236,72,153,0.35), transparent)",
        }}
      />

      {/* Rows */}
      <div className="flex flex-col" style={{ gap: "clamp(12px, 2vw, 20px)" }}>
        <MarqueeRow
          brands={brands}
          direction="left"
          speed={28}
          isDark={isDark}
        />
        <MarqueeRow
          brands={[...brands].reverse()}
          direction="right"
          speed={36}
          isDark={isDark}
        />
      </div>

      {/* Pink gradient separator — bottom */}
      <div
        className="mx-auto mt-8 md:mt-12"
        style={{
          width: "clamp(140px, 28vw, 320px)",
          height: 2,
          borderRadius: 1,
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(244,114,182,0.50), transparent)"
            : "linear-gradient(90deg, transparent, rgba(236,72,153,0.35), transparent)",
        }}
      />

      {/* Keyframes + hover styles */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-marquee-strip { animation-play-state: paused !important; }
        }
        .brand-marquee-strip:hover {
          animation-play-state: paused;
        }
        .brand-tile:hover {
          border-color: rgba(244,114,182,0.35) !important;
          box-shadow: 0 0 20px rgba(244,114,182,0.12), 0 4px 12px rgba(0,0,0,0.20);
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
