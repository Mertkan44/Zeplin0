"use client";

import { useState, useEffect, useRef } from "react";

const lines = [
  { text: "// zeplin media", delay: 0, style: "comment" },
  { text: "", delay: 600, style: "blank" },
  { text: "const misyon = {", delay: 1000, style: "code" },
  { text: '  vizyon: "markanızı dijitalde', delay: 1600, style: "string" },
  { text: '          yıldızlara taşımak",', delay: 2400, style: "string" },
  { text: '  tutkumuz: "yaratıcılık",', delay: 3200, style: "string" },
  { text: '  gücümüz: "strateji",', delay: 3900, style: "string" },
  { text: '  sonuç: "başarı"', delay: 4600, style: "string" },
  { text: "};", delay: 5200, style: "code" },
  { text: "", delay: 5500, style: "blank" },
  { text: "zeplin.launch(misyon);", delay: 5800, style: "function" },
  { text: "// hayal et. tasarla. yuksel.", delay: 6600, style: "comment-final" },
];

function TypedLine({
  text,
  style,
  startDelay,
  onComplete,
}: {
  text: string;
  style: string;
  startDelay: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started || text === "") {
      if (started && text === "") {
        setDone(true);
        onComplete?.();
      }
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 35 + Math.random() * 25);

    return () => clearInterval(interval);
  }, [started, text, onComplete]);

  if (!started) return <div className="h-7">&nbsp;</div>;
  if (text === "") return <div className="h-7">&nbsp;</div>;

  const colorMap: Record<string, string> = {
    comment: "text-pink-300/60",
    code: "text-pink-200",
    string: "text-pink-100",
    function: "text-pink-300",
    "comment-final": "text-pink-200/80",
    blank: "",
  };

  return (
    <div className={`h-7 font-mono text-sm md:text-base ${colorMap[style] || "text-pink-100"}`}>
      <span className="whitespace-pre">{displayed}</span>
      {!done && (
        <span className="inline-block w-[2px] h-4 bg-pink-300 ml-[1px] animate-blink align-middle" />
      )}
    </div>
  );
}

export default function HeroBanner() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    lines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video arka plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Ust degrade */}
      <div className="absolute top-0 left-0 right-0 h-40 z-10 bg-gradient-to-b from-white dark:from-zinc-950 to-transparent" />

      {/* Alt degrade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-10 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />

      {/* Sag taraf koyu overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Sag taraftaki kod animasyonlu yazi */}
      <div
        ref={containerRef}
        className="absolute right-0 top-0 bottom-0 w-full md:w-[50%] z-20 flex items-center justify-center px-8 md:px-16"
      >
        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(80, 10, 40, 0.35)",
              backdropFilter: "blur(20px) saturate(1.3)",
              border: "1px solid rgba(244, 114, 182, 0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Pencere baslik bari */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-pink-400/10">
              <div className="w-3 h-3 rounded-full bg-pink-400/60" />
              <div className="w-3 h-3 rounded-full bg-pink-300/40" />
              <div className="w-3 h-3 rounded-full bg-pink-200/30" />
              <span className="ml-3 text-xs text-pink-300/40 font-mono">manifesto.ts</span>
            </div>

            {/* Kod alani */}
            <div className="p-6 md:p-8 min-h-[320px]">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 text-right mr-4 text-pink-400/20 text-sm font-mono select-none shrink-0">
                    {i + 1}
                  </span>
                  {visibleLines.includes(i) ? (
                    <TypedLine
                      text={line.text}
                      style={line.style}
                      startDelay={0}
                    />
                  ) : (
                    <div className="h-7">&nbsp;</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
