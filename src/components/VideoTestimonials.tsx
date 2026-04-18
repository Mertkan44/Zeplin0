"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { createPortal } from "react-dom";

/* ── Types ────────────────────────────────────────────────────────── */
interface VideoTestimonial {
  id: string;
  videoSrc: string;
  posterSrc: string;
  brandName: string;
  personName: string;
  personRole: string;
}

interface VideoTestimonialsProps {
  testimonials: VideoTestimonial[];
}

/* ── Constants ────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FONT = { fontFamily: "var(--font-jost), sans-serif" } as const;

const revealVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.985 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: EASE, delay },
  }),
};

/* Desktop asimetrik offset'ler */
const CARD_OFFSETS = [0, 32, 8, 40]; // px (mt-0, mt-8, mt-2, mt-10)

/* ── Play Icon ────────────────────────────────────────────────────── */
function PlayIcon({ size = 56 }: { size?: number }) {
  return (
    <div
      className="video-play-icon flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "rgba(0,0,0,0.5)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <svg
        width={size * 0.36}
        height={size * 0.36}
        viewBox="0 0 24 24"
        fill="white"
        style={{ marginLeft: size * 0.04 }}
      >
        <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
      </svg>
    </div>
  );
}

/* ── Video Card ───────────────────────────────────────────────────── */
function VideoCard({
  testimonial,
  index,
  onClick,
}: {
  testimonial: VideoTestimonial;
  index: number;
  onClick: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      custom={index * 0.1}
      className="flex-shrink-0"
      style={{ marginTop: `${CARD_OFFSETS[index] ?? 0}px` }}
    >
      <button
        type="button"
        onClick={onClick}
        className="video-card group relative block w-[56vw] overflow-hidden rounded-2xl md:w-[200px] md:rounded-3xl lg:w-[220px]"
        style={{ aspectRatio: "9 / 16" }}
      >
        {/* Poster */}
        <img
          src={testimonial.posterSrc}
          alt={`${testimonial.brandName} video`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)",
          }}
        />

        {/* Play icon — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="md:opacity-80 md:transition-all md:duration-[380ms] md:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] md:group-hover:opacity-100 md:group-hover:scale-110">
            <PlayIcon size={48} />
          </div>
        </div>

        {/* Brand info — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="text-[15px] font-bold text-white"
            style={FONT}
          >
            {testimonial.brandName}
          </p>
          <p
            className="mt-0.5 text-[12px] text-white/60"
            style={FONT}
          >
            {testimonial.personName} &middot; {testimonial.personRole}
          </p>
        </div>

        {/* Card shadow — multi-layer, no borders */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: isDark
              ? "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)"
              : "inset 0 0 0 1px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.15)",
          }}
        />
      </button>
    </motion.div>
  );
}

/* ── Fullscreen Video Overlay ─────────────────────────────────────── */
function VideoOverlay({
  testimonial,
  onClose,
}: {
  testimonial: VideoTestimonial;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Body scroll lock + Escape key */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  /* Autoplay when overlay opens */
  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <>
      {/* Scrim — NO backdrop-blur */}
      <motion.button
        type="button"
        aria-label="Kapat"
        className="fixed inset-0 z-[72] bg-black/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={onClose}
      />

      {/* Centered panel */}
      <motion.div
        className="fixed inset-0 z-[73] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-[420px]"
          style={{ aspectRatio: "9 / 16" }}
          initial={{ scale: 0.88, y: 32, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 290, damping: 26 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${testimonial.brandName} video`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="absolute -top-12 right-0 z-10 grid h-9 w-9
                       place-items-center rounded-full border border-white/20
                       bg-white/10 text-white text-sm
                       hover:bg-white/20 transition-colors"
          >
            &#x2715;
          </button>

          {/* Video */}
          <video
            ref={videoRef}
            className="h-full w-full rounded-2xl object-cover"
            playsInline
            controls
            poster={testimonial.posterSrc}
          >
            <source src={testimonial.videoSrc} type="video/mp4" />
          </video>

          {/* Brand info below */}
          <motion.div
            className="mt-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: EASE, delay: 0.09 }}
          >
            <p
              className="text-base font-bold text-white"
              style={FONT}
            >
              {testimonial.brandName}
            </p>
            <p
              className="text-sm text-white/50"
              style={FONT}
            >
              {testimonial.personName} &middot; {testimonial.personRole}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ── Main Section ─────────────────────────────────────────────────── */
export default function VideoTestimonials({
  testimonials,
}: VideoTestimonialsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selected, setSelected] = useState<VideoTestimonial | null>(null);
  const [mounted, setMounted] = useState(false);

  /* Portal needs client-side mount */
  useEffect(() => setMounted(true), []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative px-4 py-16 md:px-12 md:py-20"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(157,23,77,0.04) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244,114,182,0.04) 0%, transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            custom={0}
            className="mb-8 md:mb-12"
          >
            <span
              className="text-[12px] font-medium uppercase tracking-[0.26em] text-[#DB2777] dark:text-[#F472B6]"
              style={FONT}
            >
              Referanslar
            </span>
            <h2
              className="mt-2 text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-zinc-900 dark:text-white md:text-[30px]"
              style={FONT}
            >
              Markalar ne diyor?
            </h2>
          </motion.div>

          {/* ── Mobile: horizontal scroll ── */}
          <div className="relative -mx-4 md:hidden">
            {/* Fade edges */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5"
              style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5"
              style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
            />

            <div
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-2"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              {testimonials.map((t, i) => (
                <div key={t.id} className="snap-center" style={{ marginTop: 0 }}>
                  <VideoCard
                    testimonial={t}
                    index={i}
                    onClick={() => setSelected(t)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Desktop: flex row with asymmetric offsets ── */}
          <div className="hidden items-start justify-center gap-6 md:flex lg:gap-8">
            {testimonials.map((t, i) => (
              <VideoCard
                key={t.id}
                testimonial={t}
                index={i}
                onClick={() => setSelected(t)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Fullscreen overlay (portal) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <VideoOverlay
                key={selected.id}
                testimonial={selected}
                onClose={handleClose}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </MotionConfig>
  );
}
