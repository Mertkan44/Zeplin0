"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import BentoCard from "@/components/BentoCard";
import { useTheme } from "./ThemeProvider";

interface Project {
  name: string;
  image: string;
}

interface Social {
  name: string;
  url: string;
}

interface Block {
  title: string;
  description: string;
  items: string[];
  backgroundImage?: string;
  href?: string;
  projects?: Project[];
  socials?: Social[];
}

interface BentoGridProps {
  blocks: Block[];
  sectionId?: string;
}

/* ── Framer-motion reveal variants ── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.985,
    filter: "blur(6px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.52,
      ease: EASE,
      delay,
    },
  }),
};

/* ── Sosyal medya ikonları ── */
function SocialIcon({ name }: { name: string }) {
  const cls = "w-7 h-7 text-white";
  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Mobil sosyal medya kartları ── */
function SocialRowCards({ block }: { block: Block }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const socials = (block.socials ?? []).slice(0, 3);
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);
  const pulseTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const triggerPulse = useCallback((idx: number) => {
    clearTimeout(pulseTimeoutRef.current);
    setPulseIdx(idx);
    pulseTimeoutRef.current = setTimeout(() => {
      setPulseIdx((prev) => (prev === idx ? null : prev));
    }, 280);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(pulseTimeoutRef.current);
    },
    []
  );

  const getBrandTint = (name: string) => {
    if (isDark) {
      switch (name) {
        case "Instagram":
          return "linear-gradient(160deg, rgba(24, 10, 18, 0.42) 0%, rgba(157, 23, 77, 0.34) 56%, rgba(244, 114, 182, 0.14) 100%)";
        case "LinkedIn":
          return "linear-gradient(160deg, rgba(29, 12, 22, 0.44) 0%, rgba(131, 24, 67, 0.36) 54%, rgba(236, 72, 153, 0.16) 100%)";
        case "WhatsApp":
          return "linear-gradient(160deg, rgba(19, 7, 15, 0.42) 0%, rgba(82, 22, 59, 0.34) 54%, rgba(219, 39, 119, 0.16) 100%)";
        default:
          return "linear-gradient(160deg, rgba(29, 12, 22, 0.42) 0%, rgba(131, 24, 67, 0.34) 100%)";
      }
    }

    switch (name) {
      case "Instagram":
        return "linear-gradient(160deg, rgba(244, 114, 182, 0.28) 0%, rgba(236, 72, 153, 0.22) 52%, rgba(219, 39, 119, 0.16) 100%)";
      case "LinkedIn":
        return "linear-gradient(160deg, rgba(236, 72, 153, 0.24) 0%, rgba(219, 39, 119, 0.28) 56%, rgba(190, 24, 93, 0.2) 100%)";
      case "WhatsApp":
        return "linear-gradient(160deg, rgba(251, 207, 232, 0.22) 0%, rgba(244, 114, 182, 0.24) 54%, rgba(219, 39, 119, 0.2) 100%)";
      default:
        return "linear-gradient(160deg, rgba(244, 114, 182, 0.24) 0%, rgba(219, 39, 119, 0.24) 100%)";
    }
  };

  const flowPositions = ["0% 50%", "50% 50%", "100% 50%"];
  const flowGradient = isDark
    ? "linear-gradient(135deg, #9D174D 0%, #BE185D 40%, #DB2777 100%)"
    : "linear-gradient(135deg, #F472B6 0%, #EC4899 40%, #DB2777 100%)";

  return (
    <div
      className="rounded-2xl bg-foreground/[0.04] p-3.5 md:rounded-3xl md:p-5"
    >
      <div className="grid grid-cols-3 gap-3">
        {socials.map((social, idx) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={() => triggerPulse(idx)}
            onTouchStart={() => triggerPulse(idx)}
            className={`social-card group flex h-[112px] items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/75 md:h-[160px] md:rounded-3xl ${
              pulseIdx === idx ? "is-pressed" : ""
            }`}
            style={
              {
                "--sheen-delay": `${idx * 120}ms`,
                backgroundImage: `${getBrandTint(social.name)}, ${flowGradient}`,
                backgroundSize: "100% 100%, 300% 100%",
                backgroundPosition: `center, ${flowPositions[idx] ?? "50% 50%"}`,
              } as CSSProperties
            }
          >
            <div
              className={`social-icon-wrap relative z-[2] flex h-10 w-10 items-center justify-center rounded-full md:h-14 md:w-14 ${
                isDark ? "bg-black/30" : "bg-pink-900/30"
              }`}
            >
              <SocialIcon name={social.name} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectSlider({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isProgScrollRef = useRef(false);
  const progTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    isProgScrollRef.current = true;
    clearTimeout(progTimer.current);
    progTimer.current = setTimeout(() => { isProgScrollRef.current = false; }, 600);
    const containerCenter = el.offsetWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    el.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isProgScrollRef.current) return;
      const child0 = el.children[0] as HTMLElement | undefined;
      const child1 = el.children[1] as HTMLElement | undefined;
      if (!child0) return;
      const cardW = child0.offsetWidth;
      const gap = child1 ? child1.offsetLeft - child0.offsetLeft - cardW : 0;
      const idx = Math.round(el.scrollLeft / (cardW + gap));
      setActiveIdx(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goPrev = () => {
    const prev = Math.max(0, activeIdx - 1);
    scrollTo(prev);
    setActiveIdx(prev);
  };
  const goNext = () => {
    const next = Math.min(projects.length - 1, activeIdx + 1);
    scrollTo(next);
    setActiveIdx(next);
  };

  return (
    <div>
      {/* Başlık + kontroller */}
      <div className="mb-3 flex items-center gap-2.5 md:mb-5">
        <h3 className="min-w-0 flex-1 text-[clamp(1.65rem,6.2vw,1.95rem)] font-bold text-foreground tracking-tight md:text-[1.95rem]">
          {title}
        </h3>
        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:gap-2">
          {/* Ok butonları — desktop */}
          <div className="hidden items-center gap-1.5 md:flex">
            <button
              type="button"
              aria-label="Önceki proje"
              onClick={goPrev}
              disabled={activeIdx === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/50 transition-all duration-200 hover:bg-foreground/[0.08] hover:text-foreground/80 hover:border-foreground/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12L6 8L10 4" /></svg>
            </button>
            <button
              type="button"
              aria-label="Sonraki proje"
              onClick={goNext}
              disabled={activeIdx === projects.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/50 transition-all duration-200 hover:bg-foreground/[0.08] hover:text-foreground/80 hover:border-foreground/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4L10 8L6 12" /></svg>
            </button>
          </div>
          {/* Dot göstergeleri */}
          <div className="flex items-center gap-1">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Proje ${i + 1}`}
                onClick={() => { scrollTo(i); setActiveIdx(i); }}
                className="flex h-6 w-6 items-center justify-center rounded-full md:h-8 md:w-8"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 md:h-2 ${
                  activeIdx === i ? "w-4 bg-pink-400 md:w-5" : "w-1.5 bg-foreground/20 md:w-2"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slider — full-width */}
      <div className="relative -mx-4 md:-mx-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 md:w-32" style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 md:w-32" style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }} />

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 md:gap-5 md:px-12"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {projects.map((project, i) => {
            const isActive = activeIdx === i;
            return (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-[75vw] h-[220px] rounded-2xl overflow-hidden relative group cursor-pointer md:w-[380px] md:h-[280px] md:rounded-3xl lg:w-[420px] lg:h-[300px]"
                style={{
                  transform: isActive ? "scale(1)" : "scale(0.97)",
                  opacity: isActive ? 1 : 0.7,
                  boxShadow: isActive
                    ? "0 0 0 1.5px rgba(244,114,182,0.4), 0 8px 28px rgba(219,39,119,0.15)"
                    : "none",
                  transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, box-shadow 0.4s ease",
                }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-lg font-bold text-white md:text-xl">{project.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileCard({
  block,
  idx,
  heightClass,
}: {
  block: Block;
  idx: number;
  heightClass: string;
}) {
  const inner = (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      custom={idx * 0.08}
      className={heightClass}
    >
      <BentoCard {...block} mobile />
    </motion.div>
  );

  return block.href ? (
    <Link href={block.href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export default function BentoGrid({ blocks, sectionId }: BentoGridProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id={sectionId}
        className="px-4 pt-8 pb-10 scroll-mt-28 md:px-12 md:pt-20 md:pb-16 md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:gap-10" style={{ overflow: "visible" }}>
            <MobileCard
              block={blocks[0]}
              idx={0}
              heightClass="h-[220px] md:h-[400px]"
            />

            {blocks[1]?.projects && (
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px" }}
                custom={0.1}
              >
                <ProjectSlider
                  title={blocks[1].title}
                  projects={blocks[1].projects}
                />
              </motion.div>
            )}

            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              custom={0.18}
            >
              <SocialRowCards block={blocks[2]} />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
