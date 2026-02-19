"use client";

import { useState } from "react";

interface BentoCardProps {
  title: string;
  description: string;
  items: string[];
  backgroundImage?: string;
}

export default function BentoCard({
  title,
  description,
  items,
  backgroundImage,
}: BentoCardProps) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "#1a1a1a",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered
          ? "transform 0.08s ease-out, box-shadow 0.3s ease"
          : "transform 0.5s ease-out, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 0 1.5px #FF2D78, 0 0 50px 10px rgba(255, 45, 120, 0.25)"
          : "0 0 0 0px transparent",
      }}
    >
      {/* Background image overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ backgroundColor: hovered ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.2)" }}
        />
      )}

      {/* Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Pulsing glow border */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none animate-glow-pulse"
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {title}
        </h3>

        {/* Description — collapses on hover */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: hovered ? "0px" : "80px",
            opacity: hovered ? 0 : 1,
          }}
        >
          <p className="text-sm md:text-base text-white/60">{description}</p>
        </div>

        {/* List — reveals on hover with stagger */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: hovered ? "220px" : "0px" }}
        >
          <ul className="space-y-2 pt-1">
            {items.map((item, i) => (
              <li
                key={i}
                className="text-sm md:text-base text-white/85 flex items-center gap-2.5 transition-all duration-300"
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
