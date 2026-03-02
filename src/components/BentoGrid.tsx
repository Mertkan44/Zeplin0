"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import BentoCard from "@/components/BentoCard";

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
function SocialRowCards({
  block,
  refCb,
}: {
  block: Block;
  refCb: (el: HTMLDivElement | null) => void;
}) {
  const socials = (block.socials ?? []).slice(0, 3);

  return (
    <div
      ref={refCb}
      className="rounded-2xl bg-foreground/[0.04] p-3.5"
    >
      <div className="grid grid-cols-3 gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[112px] items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(160deg, #F0679E 0%, #DB2777 40%, #A21D56 100%)",
              boxShadow:
                "0 6px 20px rgba(157, 23, 77, 0.25), 0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-900/30">
              <SocialIcon name={social.name} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

const PARALLAX_STRENGTH = 0.06;
const AUTO_SLIDE_INTERVAL = 3500;

function ProjectSlider({
  title,
  projects,
  refCb,
}: {
  title: string;
  projects: Project[];
  refCb: (el: HTMLDivElement | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const visibleRef = useRef(false);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const containerCenter = el.offsetWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    el.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
  }, []);

  const startAutoSlide = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % projects.length;
        scrollTo(next);
        return next;
      });
    }, AUTO_SLIDE_INTERVAL);
  }, [projects.length, scrollTo]);

  const stopAutoSlide = useCallback(() => {
    clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAutoSlide();
        } else {
          stopAutoSlide();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const child0 = el.children[0] as HTMLElement | undefined;
      const child1 = el.children[1] as HTMLElement | undefined;
      if (!child0) return;
      const cardWidth = child0.offsetWidth;
      const gap = child1 ? child1.offsetLeft - child0.offsetLeft - cardWidth : 0;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIdx(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleInteraction = () => {
    if (visibleRef.current) startAutoSlide();
  };

  return (
    <div ref={(el) => { containerRef.current = el; refCb(el); }}
      className="rounded-2xl bg-foreground/[0.04] p-4"
    >
      <div className="mb-4 flex flex-nowrap items-center gap-2.5">
        <h3 className="min-w-0 flex-1 text-[clamp(1.65rem,6.2vw,1.95rem)] font-bold text-foreground tracking-tight">
          {title}
        </h3>
        <div className="ml-auto flex shrink-0 flex-nowrap items-center gap-1 whitespace-nowrap">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Proje ${i + 1}`}
              onClick={() => { scrollTo(i); setActiveIdx(i); handleInteraction(); }}
              className="flex h-6 w-6 items-center justify-center rounded-full sm:h-8 sm:w-8"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${
                activeIdx === i ? "w-4 bg-pink-400 sm:w-5" : "w-1.5 bg-foreground/20 sm:w-2"
              }`} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        onTouchStart={handleInteraction}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", scrollPaddingInline: "16px" }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 w-[75vw] h-[220px] rounded-2xl overflow-hidden relative"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-lg font-bold text-white">{project.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCard({
  block,
  idx,
  height,
  refCb,
  offset,
}: {
  block: Block;
  idx: number;
  height: string;
  refCb: (idx: number, el: HTMLDivElement | null) => void;
  offset: number;
}) {
  const inner = (
    <motion.div
      ref={(el) => refCb(idx, el)}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -14% 0px" }}
      custom={idx * 0.08}
      style={{ height }}
    >
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s linear",
          height: "100%",
        }}
      >
        <BentoCard {...block} mobile />
      </div>
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

export default function BentoGrid({ blocks }: BentoGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement[]>([]);
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>([0, 0, 0]);

  const updateParallax = useCallback(() => {
    const cards = mobileCardsRef.current;
    if (!cards.length) return;

    const vh = window.innerHeight;
    const newOffsets = cards.map((card) => {
      if (!card) return 0;
      const rect = card.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const distance = (center - viewportCenter) / vh;
      return distance * rect.height * PARALLAX_STRENGTH;
    });

    setParallaxOffsets(newOffsets);
  }, []);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(updateParallax);
    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateParallax]);

  const [row1Left, row1Right] = useMemo(() => {
    if (hoveredIndex === 0) return [3.8, 1.2];
    if (hoveredIndex === 1) return [1.2, 3.8];
    return [3, 2];
  }, [hoveredIndex]);

  const handleHoverChange = (index: number, isHovered: boolean) => {
    setHoveredIndex((prev) => {
      if (isHovered) return index;
      if (prev === index) return null;
      return prev;
    });
  };

  const setMobileCardRef = (idx: number, el: HTMLDivElement | null) => {
    if (el) mobileCardsRef.current[idx] = el;
  };

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} className="px-4 pt-8 pb-10 md:px-12 md:pt-20 md:pb-16">
        <div className="mx-auto max-w-6xl">
          {/* ── MOBILE ── */}
          <div className="md:hidden flex flex-col gap-3" style={{ overflow: "visible" }}>
            <MobileCard
              block={blocks[0]}
              idx={0}
              height="220px"
              refCb={setMobileCardRef}
              offset={parallaxOffsets[0]}
            />

            {blocks[1]?.projects && (
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -14% 0px" }}
                custom={0.08}
              >
                <ProjectSlider
                  title={blocks[1].title}
                  projects={blocks[1].projects}
                  refCb={(el) => setMobileCardRef(1, el)}
                />
              </motion.div>
            )}

            <SocialRowCards block={blocks[2]} refCb={(el) => setMobileCardRef(2, el)} />
          </div>

          {/* ── DESKTOP ── */}
          <div className="hidden flex-col gap-5 md:flex">
            <div className="flex h-[420px] gap-5">
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -14% 0px" }}
                custom={0}
                style={{
                  flex: `${row1Left} 1 0%`,
                  transition: "flex 480ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <BentoCard
                  {...blocks[0]}
                  onHoverChange={(isHovered) => handleHoverChange(0, isHovered)}
                />
              </motion.div>
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -14% 0px" }}
                custom={0.09}
                style={{
                  flex: `${row1Right} 1 0%`,
                  transition: "flex 480ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <BentoCard
                  {...blocks[1]}
                  onHoverChange={(isHovered) => handleHoverChange(1, isHovered)}
                />
              </motion.div>
            </div>

            {/* Satır 2: hakkımızda — tam genişlik */}
            <div className="h-[250px]">
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -14% 0px" }}
                custom={0.18}
                className="h-full"
              >
                <BentoCard
                  {...blocks[2]}
                  onHoverChange={(isHovered) => handleHoverChange(2, isHovered)}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
