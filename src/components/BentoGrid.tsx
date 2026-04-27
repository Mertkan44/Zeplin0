"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import BentoCard from "@/components/BentoCard";

interface Project {
  name: string;
  image: string;
  description?: string;
  imagePosition?: string;
  tags?: string[];
  variant?: "image" | "website";
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

/* ── Oval asterisk yıldız (uçları yuvarlak pill bar) ── */
function ZMStar({ size, spin = 22, glow = 80 }: { size: number; spin?: number; glow?: number }) {
  const w = Math.round(size * 0.15);
  const barStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: size,
    height: w,
    background: "#DB2777",
    borderRadius: 9999,
    transform: "translate(-50%, -50%)",
  };
  return (
    <div
      className="animate-spin"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        position: "relative",
        animationDuration: `${spin}s`,
        filter: `drop-shadow(0 0 ${glow}px rgba(219,39,119,0.6))`,
      }}
      aria-hidden="true"
    >
      <span style={barStyle} />
      <span style={{ ...barStyle, transform: "translate(-50%, -50%) rotate(90deg)" }} />
      <span style={{ ...barStyle, transform: "translate(-50%, -50%) rotate(45deg)" }} />
      <span style={{ ...barStyle, transform: "translate(-50%, -50%) rotate(-45deg)" }} />
    </div>
  );
}

/* ── V6 · Editöryel sosyal medya kartları ── */
function SocialRowCards({ block }: { block: Block }) {
  const socials = (block.socials ?? []).slice(0, 3);

  const meta: Record<string, { sub: string; meta: string }> = {
    Instagram: { sub: "Görsel hikâyemiz", meta: "@zeplin.media" },
    LinkedIn: { sub: "Profesyonel ağımız", meta: "Zeplin Media" },
    WhatsApp: { sub: "Doğrudan iletişim", meta: "Yanıt < 2 dk" },
  };

  return (
    <div
      className="relative overflow-hidden rounded-[24px] px-5 py-6 text-white sm:px-6 sm:py-7 md:rounded-[40px] md:px-12 md:py-12"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, #1C0619 0%, #0D0A0C 65%)",
      }}
    >
      {/* Asterisk star — sağ üstten yarım sarkık, çeyreği görünür */}
      <div
        className="pointer-events-none absolute hidden md:block"
        style={{ right: -110, top: -110, opacity: 0.95 }}
      >
        <ZMStar size={220} spin={26} glow={60} />
      </div>
      <div
        className="pointer-events-none absolute md:hidden"
        style={{ right: -60, top: -60, opacity: 0.95 }}
      >
        <ZMStar size={130} spin={22} glow={36} />
      </div>

      {/* Header */}
      <div className="relative mb-5 flex items-end justify-between gap-4 md:mb-9">
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 md:text-[11px] md:tracking-[0.2em]">
            Bizi takip edin
          </div>
          <h2 className="m-0 text-[24px] font-light leading-[1.04] text-white md:text-[38px]">
            Üç kanal,{" "}
            <em className="font-normal not-italic" style={{ color: "#F472B6", fontStyle: "italic" }}>
              tek hikâye
            </em>
            .
          </h2>
        </div>
        <div className="hidden font-mono text-[11px] text-white/60 md:block">
          ZEPLIN/MEDYA · 2026
        </div>
      </div>

      {/* 3-column grid */}
      <div className="relative grid grid-cols-1 border-t border-white/10 md:grid-cols-3">
        {socials.map((social, i) => {
          const m = meta[social.name] ?? { sub: "", meta: "" };
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col gap-3 px-4 py-5 transition-colors duration-300 hover:bg-pink-500/[0.08] md:gap-4 md:px-6 md:py-7 ${
                i < socials.length - 1
                  ? "border-b border-white/10 md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="grid h-11 w-11 place-items-center rounded-full md:h-[52px] md:w-[52px]"
                  style={{
                    background: "#E91E8C",
                    boxShadow: "0 0 30px rgba(233,30,140,0.45)",
                  }}
                >
                  <SocialIcon name={social.name} />
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white/80 transition-all duration-300 group-hover:border-white/60 group-hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <div>
                <div className="text-[19px] font-medium md:text-[22px]">
                  {social.name}
                </div>
                <div className="mt-0.5 text-[13px] text-white/70">{m.sub}</div>
              </div>
              <div className="mt-auto font-mono text-[10px] uppercase tracking-[0.05em] text-white/50">
                {m.meta}
              </div>
            </a>
          );
        })}
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
      <div className="mb-3 flex flex-col items-start gap-2 md:mb-5 md:flex-row md:items-center md:gap-2.5">
        <h3 className="min-w-0 flex-1 text-[1.6rem] font-bold text-foreground md:text-[1.95rem]">
          {title}
        </h3>
        <div className="flex w-full shrink-0 items-center justify-start gap-1.5 md:ml-auto md:w-auto md:justify-end md:gap-2">
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
                className="flex h-5 w-5 items-center justify-center rounded-full md:h-8 md:w-8"
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
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 md:w-20" style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 md:w-20" style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }} />

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 md:gap-5 md:px-12"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {projects.map((project, i) => {
            const isActive = activeIdx === i;
            const isWebsite = project.variant === "website";
            return (
              <div
                key={i}
                className="snap-center relative h-[210px] w-[78vw] max-w-[320px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl group md:h-[280px] md:w-[380px] md:max-w-none md:rounded-3xl lg:h-[300px] lg:w-[420px]"
                style={{
                  transform: isActive ? "scale(1)" : "scale(0.97)",
                  opacity: isActive ? 1 : 0.9,
                  boxShadow: isActive
                    ? "0 0 0 1.5px rgba(244,114,182,0.4), 0 8px 28px rgba(219,39,119,0.15)"
                    : "none",
                  transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, box-shadow 0.4s ease",
                }}
              >
                {isWebsite ? (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fbff_0%,#e8f1ff_48%,#ffffff_100%)]" />
                    <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-[#2B61B4]/12 blur-2xl md:h-56 md:w-56" />
                    <div className="absolute left-5 top-5 h-2 w-16 rounded-full bg-[#2B61B4]/45" />

                    <div className="absolute right-4 top-8 h-[118px] w-[230px] overflow-hidden rounded-2xl border border-[#2B61B4]/12 bg-white shadow-[0_18px_46px_rgba(30,64,175,0.18)] transition-transform duration-500 group-hover:-translate-y-1 md:right-6 md:top-9 md:h-[152px] md:w-[292px] lg:w-[312px]">
                      <div className="flex h-6 items-center gap-1.5 border-b border-slate-200/80 bg-white px-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <span className="ml-2 h-2 w-20 rounded-full bg-slate-100" />
                      </div>
                      <div
                        className="h-[calc(100%-1.5rem)] bg-cover"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          backgroundPosition: project.imagePosition ?? "center top",
                        }}
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      {project.tags && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[#2B61B4]/18 bg-[#2B61B4]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2B61B4]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-lg font-bold leading-tight text-slate-950 md:text-xl">{project.name}</p>
                      {project.description && (
                        <p className="mt-1 max-w-[28ch] text-sm font-medium leading-snug text-slate-500 md:text-[15px]">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: project.imagePosition ?? "center",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      {project.tags && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/78 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-lg font-bold text-white md:text-xl">{project.name}</p>
                      {project.description && (
                        <p className="mt-1 max-w-[28ch] text-sm font-medium leading-snug text-white/68 md:text-[15px]">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </>
                )}
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
      initial={idx === 0 ? "visible" : "hidden"}
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
        className="px-4 pt-8 pb-8 scroll-mt-28 md:px-12 md:pt-16 md:pb-12 md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-7 md:gap-9" style={{ overflow: "visible" }}>
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
