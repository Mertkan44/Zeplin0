"use client";

import { useState } from "react";

interface BentoCardProps {
  title: string;
  description: string;
  items: string[];
  backgroundImage?: string;
  onHoverChange?: (hovered: boolean) => void;
  mobile?: boolean;
}

export default function BentoCard({
  title,
  description,
  items,
  backgroundImage,
  onHoverChange,
  mobile = false,
}: BentoCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseLeave = () => {
    setHovered(false);
    onHoverChange?.(false);
  };

  /* ── MOBİL: Statik kart, hover yok ── */
  if (mobile) {
    return (
      <div
        className="relative h-full overflow-hidden rounded-2xl"
        style={{
          backgroundColor: "#1a1a1a",
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {backgroundImage && (
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* İnce pembe accent çizgi */}
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
          style={{ background: "linear-gradient(180deg, #F472B6, #DB2777)" }}
        />

        <div className="relative z-10 h-full flex flex-col justify-end p-5 pl-6">
          <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
          <p className="text-xs text-white/50 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    );
  }

  /* ── DESKTOP: Mevcut hover davranışı ── */
  return (
    <div
      className="relative h-full overflow-hidden rounded-3xl cursor-pointer"
      onMouseEnter={() => {
        setHovered(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "#1a1a1a",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.22s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 0 1px rgba(244,114,182,0.75), 0 20px 48px rgba(219,39,119,0.2)"
          : "0 0 0 0px transparent",
      }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ backgroundColor: hovered ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.2)" }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {hovered && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            padding: "1px",
            background:
              "linear-gradient(108deg, rgba(244,114,182,0.95) 0%, rgba(236,72,153,0.85) 45%, rgba(219,39,119,0.92) 100%)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      <div className="relative z-10 h-full flex flex-col justify-end p-10">
        <h3 className="text-3xl font-bold text-white mb-3">{title}</h3>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: hovered ? "0px" : "80px",
            opacity: hovered ? 0 : 1,
          }}
        >
          <p className="text-base text-white/60">{description}</p>
        </div>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: hovered ? "220px" : "0px" }}
        >
          <ul className="space-y-2 pt-1">
            {items.map((item, i) => (
              <li
                key={i}
                className="text-base text-white/85 flex items-center gap-2.5 transition-all duration-300"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateY(0)" : "translateY(14px)",
                  transitionDelay: hovered ? `${i * 70}ms` : "0ms",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D78] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
