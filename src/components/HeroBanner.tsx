"use client";

import { useState, useEffect } from "react";

const sloganLines = [
  { text: "old school kalitesini", delay: 300 },
  { text: "modern dünyaya", delay: 1800 },
  { text: "getiriyoruz.", delay: 3000 },
];

function TypedText({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45 + Math.random() * 30);
    return () => clearInterval(interval);
  }, [started, text]);

  if (!started) return null;

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[0.85em] bg-white/80 ml-[2px] animate-blink align-middle" />
      )}
    </span>
  );
}

export default function HeroBanner() {
  return (
    <section className="relative w-full">
      {/* Video container - kesik köşe */}
      <div
        className="relative w-full h-[65vh] overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
        }}
      >
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Koyu overlay */}
        <div className="absolute inset-0 z-[5] bg-black/35" />

        {/* Alt degrade */}
        <div
          className="absolute -bottom-1 left-0 right-0 h-48 z-10"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
          }}
        />

        {/* Slogan - sağa yaslı, dikey ortalı */}
        <div className="absolute inset-0 z-20 flex items-center justify-end px-8 md:px-16 pt-8">
          <div className="text-right">
            {sloganLines.map((line, i) => (
              <div
                key={i}
                className={`leading-[1.2] tracking-[-0.01em] ${
                  i === 2
                    ? "text-xl md:text-3xl lg:text-4xl font-extrabold text-pink-300 italic"
                    : "text-2xl md:text-4xl lg:text-5xl font-bold text-white"
                }`}
              >
                <TypedText text={line.text} delay={line.delay} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
