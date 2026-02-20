"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ── Constants ──────────────────────────────────────────────────────────── */

const FONT = '"kuhlman-vf", "futura-100", "futura-100-book", sans-serif';

const BASE_W = 1000; // widened from 800 to give labels room
const ASPECT = 1912 / 2940;
const BASE_H = Math.round(BASE_W * ASPECT); // ≈ 651

/* Circle visual area within the wider container (centered) */
const CIRCLE_AREA_W = 800; // circles still render at 800px scale
const CIRCLE_OFFSET = (BASE_W - CIRCLE_AREA_W) / 2; // 100px each side

/* ── RichText: **bold** markup ─────────────────────────────────────────── */

function RichText({ text, brightBold }: { text: string; brightBold?: boolean }) {
  return (
    <>
      {text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong
            key={i}
            style={{
              fontWeight: 700,
              color: brightBold ? "#fff" : "rgba(255,255,255,0.95)",
              transition: "color 0.4s ease",
            }}
          >
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── AnimatedLayer — two-phase PNG layer with hover offset ─────────────── */

interface LayerProps {
  src: string;
  entranceDelay: number;
  breatheScale: [number, number, number];
  breatheDuration: number;
  breatheDelay?: number;
  transformOrigin: string;
  zIndex: number;
  hovered: boolean;
  hoverTranslateX?: number;
  hoverScale?: number;
}

function AnimatedLayer({
  src,
  entranceDelay,
  breatheScale,
  breatheDuration,
  breatheDelay = 0,
  transformOrigin,
  zIndex,
  hovered,
  hoverTranslateX = 0,
  hoverScale = 1,
}: LayerProps) {
  const [breathing, setBreathing] = useState(false);

  useEffect(() => {
    const ms = (entranceDelay + 2.5) * 1000;
    const id = setTimeout(() => setBreathing(true), ms);
    return () => clearTimeout(id);
  }, [entranceDelay]);

  const tx = hovered ? hoverTranslateX : 0;
  const hs = hovered ? hoverScale : 1;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        transform: `translateX(${tx}px) scale(${hs})`,
        transformOrigin,
        transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0, transformOrigin }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={
          breathing
            ? { scale: breatheScale, opacity: 1 }
            : { scale: 1, opacity: 1 }
        }
        transition={
          breathing
            ? {
                scale: {
                  duration: breatheDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: breatheDelay,
                },
              }
            : {
                type: "spring",
                stiffness: 55,
                damping: 14,
                delay: entranceDelay,
              }
        }
      >
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </motion.div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          boxShadow: hovered
            ? "0 0 50px rgba(255,45,120,0.12)"
            : "none",
          transition: "box-shadow 0.6s cubic-bezier(0.25,0.1,0.25,1)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── Orbital Particle ──────────────────────────────────────────────────── */

function OrbitalParticle({
  animName,
  duration,
  delay,
}: {
  animName: string;
  duration: number;
  delay: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 3,
        height: 3,
        borderRadius: "50%",
        background: "rgba(255, 45, 120, 0.4)",
        boxShadow: "0 0 6px rgba(255, 45, 120, 0.3)",
        pointerEvents: "none",
        zIndex: 12,
        animation: `${animName} ${duration}s linear ${delay}s infinite`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    />
  );
}

/* ── Typing Dots (Chatbot indicator) ───────────────────────────────────── */

function TypingDots({ bright }: { bright: boolean }) {
  const dotColor = bright
    ? "rgba(255, 45, 120, 0.7)"
    : "rgba(255, 45, 120, 0.4)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "10px 0" }}>
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.6, 1, 0.6] }}
          transition={{
            duration: bright ? 0.7 : 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d,
          }}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: dotColor,
            transition: "background 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ── Audio Waveform Bars (Sesli Asistan indicator) ─────────────────────── */

const WAVE_BARS = [
  { heights: [8, 24, 10, 18, 8], dur: 1.2 },
  { heights: [18, 8, 26, 10, 18], dur: 1.0 },
  { heights: [10, 28, 12, 22, 10], dur: 1.4 },
  { heights: [22, 10, 18, 8, 22], dur: 1.1 },
  { heights: [12, 20, 8, 26, 12], dur: 1.3 },
];

function WaveformBars({ bright }: { bright: boolean }) {
  const barColor = bright
    ? "rgba(255, 45, 120, 0.7)"
    : "rgba(255, 45, 120, 0.35)";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        height: 30,
        margin: "10px 0",
        justifyContent: "flex-end",
      }}
    >
      {WAVE_BARS.map((bar, i) => (
        <motion.div
          key={i}
          animate={{ height: bar.heights }}
          transition={{
            duration: bright ? bar.dur * 0.8 : bar.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 4,
            borderRadius: 2,
            background: barColor,
            transition: "background 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ── Merge Icon (Özel Yazılım — two lines becoming one) ────────────────── */

function MergeIcon({ bright }: { bright: boolean }) {
  return (
    <motion.svg
      width={44}
      height={22}
      viewBox="0 0 44 22"
      style={{ display: "block", margin: "14px auto 0" }}
      animate={{ opacity: bright ? [0.4, 0.6, 0.4] : [0.15, 0.4, 0.15] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.line
        x1={4} y1={2} x2={22} y2={20}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <motion.line
        x1={40} y1={2} x2={22} y2={20}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

/* ── SVG line endpoints (in 1000-wide space, circles centered at 100-900) */

const SVG_LINES = [
  // chatbot: from label (left side) → left circle edge
  { id: "chatbot", x1: 270, y1: 130, x2: 370, y2: 185 },
  // sesli: from label (right side) → right circle edge
  { id: "sesli", x1: 730, y1: 200, x2: 640, y2: 235 },
  // yazilim: from label (left side) → center circle bottom-left edge
  { id: "yazilim", x1: 270, y1: 490, x2: 395, y2: 420 },
];

/* ── Bottom tabs ───────────────────────────────────────────────────────── */

const TABS = [
  { label: "Akıllı\nChatbot", nodeId: "chatbot" },
  { label: "Özel\nYazılım", nodeId: "yazilim" },
  { label: "Sesli\nAsistan", nodeId: "sesli" },
] as const;

/* ── Component ──────────────────────────────────────────────────────────── */

export default function ServiceCircleDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [cw, setCw] = useState(BASE_W);
  const [activeTab, setActiveTab] = useState(0);
  const [pulsingLabel, setPulsingLabel] = useState<string | null>(null);
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  /* ── Parallax ───────────────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const parallaxX = useTransform(springX, [-1, 1], [-12, 12]);
  const parallaxY = useTransform(springY, [-1, 1], [-12, 12]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [mouseX, mouseY]
  );

  /* ── Mouse-position hover detection (FIX 2) ─────────────────── */
  const handleDiagramMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left; // mouse X relative to container
      const my = e.clientY - rect.top;  // mouse Y relative to container
      const w = rect.width;
      const h = rect.height;

      // Normalize to -1..1 from center
      const nx = (mx / w) * 2 - 1; // -1 = left edge, 1 = right edge
      const ny = (my / h) * 2 - 1; // -1 = top, 1 = bottom

      // Check if mouse is roughly within the circles area (elliptical bounds)
      // Circles occupy roughly the center 80% width, 80% height
      const circleAreaX = nx / 0.8;
      const circleAreaY = ny / 0.8;
      const inCircleArea = circleAreaX * circleAreaX + circleAreaY * circleAreaY < 1.2;

      if (!inCircleArea) {
        setHoveredCircle(null);
        return;
      }

      // Determine which circle based on X position
      // Left crescent: nx < -0.08 (left of center)
      // Right crescent: nx > 0.08 (right of center)
      // Center: in between
      if (nx < -0.08) {
        setHoveredCircle("chatbot");
      } else if (nx > 0.08) {
        setHoveredCircle("sesli");
      } else {
        setHoveredCircle("yazilim");
      }
    },
    []
  );

  const handleDiagramMouseLeave = useCallback(() => {
    setHoveredCircle(null);
  }, []);

  /* ── ResizeObserver ─────────────────────────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) => setCw(e.contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Mount ──────────────────────────────────────────────────── */
  useEffect(() => { setMounted(true); }, []);

  const sf = cw / BASE_W;
  const cH = cw * ASPECT;

  /* ── Derived hover — either circle or label triggers both ───── */
  const activeHover = hoveredCircle || hoveredLabel;

  function isHighlighted(id: string) {
    return activeHover === id || pulsingLabel === id;
  }

  function handleTabClick(i: number, nodeId: string) {
    setActiveTab(i);
    setPulsingLabel(nodeId);
    setTimeout(() => setPulsingLabel(null), 750);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 80,
        background: `
          radial-gradient(ellipse 50% 45% at 50% 50%, rgba(255,45,120,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 70% 60% at 50% 45%, rgba(90,20,55,0.35) 0%, transparent 70%),
          radial-gradient(ellipse 40% 50% at 20% 60%, rgba(60,10,40,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 80% 40%, rgba(70,15,45,0.2) 0%, transparent 60%),
          linear-gradient(180deg, #0d0608 0%, #12080c 30%, #150a10 60%, #0d0608 100%)
        `,
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* ── Ambient glow ──────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 50% at 50% 48%, rgba(80,15,45,0.45) 0%, rgba(40,8,25,0.25) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? [0.3, 0.5, 0.3] : 0 }}
        transition={
          mounted
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.8 }
        }
      />

      {/* ── Typography ────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <motion.h2
          className="tk-kuhlman-vf"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{
            fontFamily: '"kuhlman-vf", sans-serif',
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.01em",
            lineHeight: 1.15,
            marginBottom: 12,
            marginTop: 0,
          }}
        >
          Yapay Zeka Hizmetlerimize Göz Atın
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          style={{
            fontSize: "clamp(14px, 1.6vw, 18px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 50,
          }}
        >
          İşletmenizi geleceğe taşıyan yapay zeka çözümleri.
        </motion.p>
      </div>

      {/* ── Diagram area with parallax ────────────────────────────── */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleDiagramMouseMove}
        onMouseLeave={handleDiagramMouseLeave}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: BASE_W,
          height: cH,
          zIndex: 1,
          overflow: "visible",
          x: parallaxX,
          y: parallaxY,
          cursor: "default",
        }}
      >
        {/* ── SVG connecting lines ─────────────────────────────────── */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "visible",
            zIndex: 15,
          }}
          width="100%"
          height={cH}
          viewBox={`0 0 ${cw} ${cH}`}
          overflow="visible"
        >
          {SVG_LINES.map((line) => {
            const lit = isHighlighted(line.id);
            return (
              <motion.path
                key={line.id}
                d={`M ${line.x1 * sf},${line.y1 * sf} L ${line.x2 * sf},${line.y2 * sf}`}
                fill="none"
                style={{
                  stroke: lit
                    ? "rgba(255,45,120,0.5)"
                    : "rgba(255,255,255,0.15)",
                  strokeWidth: lit ? 1.5 : 0.8,
                  transition: "stroke 0.4s ease, stroke-width 0.4s ease",
                }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.5, delay: 1.0, ease: "easeOut" },
                  opacity: { duration: 0.3, delay: 1.0 },
                }}
              />
            );
          })}
        </svg>

        {/* ── PNG circle layers ────────────────────────────────────── */}

        {/* Elips 3 — center circle, BACK layer */}
        <AnimatedLayer
          src="/circles/elips3.png"
          entranceDelay={0.5}
          breatheScale={[1, 1.035, 1]}
          breatheDuration={3.5}
          transformOrigin="50% 44%"
          zIndex={1}
          hovered={activeHover === "yazilim"}
          hoverScale={1.04}
        />

        {/* Elips 2 — right crescent, MIDDLE layer */}
        <AnimatedLayer
          src="/circles/elips2.png"
          entranceDelay={0.8}
          breatheScale={[1, 1.02, 1]}
          breatheDuration={5}
          breatheDelay={1.3}
          transformOrigin="62% 38%"
          zIndex={2}
          hovered={activeHover === "sesli"}
          hoverTranslateX={30}
          hoverScale={1.05}
        />

        {/* Elips 1 — left crescent, FRONT layer */}
        <AnimatedLayer
          src="/circles/elips1.png"
          entranceDelay={0.7}
          breatheScale={[1, 1.02, 1]}
          breatheDuration={5}
          breatheDelay={0.8}
          transformOrigin="38% 50%"
          zIndex={3}
          hovered={activeHover === "chatbot"}
          hoverTranslateX={-30}
          hoverScale={1.05}
        />

        {/* ── CENTER LABEL — Özel Yazılım ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          style={{
            position: "absolute",
            top: "46%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            whiteSpace: "pre-line",
            zIndex: 16,
            pointerEvents: "none",
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 500,
            color: isHighlighted("yazilim")
              ? "#fff"
              : "rgba(255,255,255,0.9)",
            letterSpacing: "0.1em",
            lineHeight: 1.6,
            textShadow: isHighlighted("yazilim")
              ? "0 0 15px rgba(255, 45, 120, 0.3)"
              : "0 0 20px rgba(255, 45, 120, 0.15)",
            transition: "color 0.4s ease, text-shadow 0.4s ease",
          }}
        >
          {"Özel\nYazılım"}
          <MergeIcon bright={isHighlighted("yazilim")} />
        </motion.div>

        {/* ── Orbital particles ────────────────────────────────────── */}
        <OrbitalParticle animName="svc-orbit-1" duration={18} delay={2.5} />
        <OrbitalParticle animName="svc-orbit-2" duration={22} delay={2.8} />
        <OrbitalParticle animName="svc-orbit-3" duration={16} delay={3.0} />
        <OrbitalParticle animName="svc-orbit-4" duration={25} delay={3.3} />

        {/* ── Floating label 1 — far left (Akıllı Chatbot) ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: pulsingLabel === "chatbot" ? [1, 0.4, 1] : 1,
            y: 0,
          }}
          transition={
            pulsingLabel === "chatbot"
              ? { opacity: { duration: 0.7, ease: "easeInOut" } }
              : { duration: 0.6, delay: 1.2, ease: "easeOut" }
          }
          onMouseEnter={() => setHoveredLabel("chatbot")}
          onMouseLeave={() => setHoveredLabel(null)}
          style={{
            position: "absolute",
            top: "12%",
            left: "-28%",
            maxWidth: 270,
            zIndex: 20,
            cursor: "default",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 700,
              color: isHighlighted("chatbot") ? "#fff" : "rgba(255,255,255,0.95)",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              marginBottom: 0,
              textShadow: isHighlighted("chatbot")
                ? "0 0 15px rgba(255, 45, 120, 0.3)"
                : "none",
              transition: "color 0.4s ease, text-shadow 0.4s ease",
            }}
          >
            Akıllı Chatbot
          </p>
          <TypingDots bright={isHighlighted("chatbot")} />
          <p
            style={{
              fontFamily: FONT,
              fontSize: 14.5,
              color: isHighlighted("chatbot")
                ? "rgba(255,255,255,0.75)"
                : "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              transition: "color 0.4s ease",
            }}
          >
            <RichText
              text="**WhatsApp** hesabınıza entegre edilir, müşterilerinizle **7/24** iletişim kurar ve işletmenizin tüm yazışmalarını **profesyonelce** yönetir."
              brightBold={isHighlighted("chatbot")}
            />
          </p>
        </motion.div>

        {/* ── Floating label 2 — far right (Sesli Asistan) ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: pulsingLabel === "sesli" ? [1, 0.4, 1] : 1,
            y: 0,
          }}
          transition={
            pulsingLabel === "sesli"
              ? { opacity: { duration: 0.7, ease: "easeInOut" } }
              : { duration: 0.6, delay: 1.4, ease: "easeOut" }
          }
          onMouseEnter={() => setHoveredLabel("sesli")}
          onMouseLeave={() => setHoveredLabel(null)}
          style={{
            position: "absolute",
            top: "22%",
            right: "-28%",
            maxWidth: 270,
            textAlign: "right",
            zIndex: 20,
            cursor: "default",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 700,
              color: isHighlighted("sesli") ? "#fff" : "rgba(255,255,255,0.95)",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              marginBottom: 0,
              textShadow: isHighlighted("sesli")
                ? "0 0 15px rgba(255, 45, 120, 0.3)"
                : "none",
              transition: "color 0.4s ease, text-shadow 0.4s ease",
            }}
          >
            Sesli Asistan
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <WaveformBars bright={isHighlighted("sesli")} />
          </div>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 14.5,
              color: isHighlighted("sesli")
                ? "rgba(255,255,255,0.75)"
                : "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              transition: "color 0.4s ease",
            }}
          >
            <RichText
              text="**Restoranlar, klinikler** ve işletmeler için telefon üzerinden **rezervasyon** alır, müşterilerinizle doğal bir şekilde konuşur ve size **anlık geri bildirim** sağlar."
              brightBold={isHighlighted("sesli")}
            />
          </p>
        </motion.div>

        {/* ── Floating label 3 — far bottom-left (Özel Yazılım) ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: pulsingLabel === "yazilim" ? [1, 0.4, 1] : 1,
            y: 0,
          }}
          transition={
            pulsingLabel === "yazilim"
              ? { opacity: { duration: 0.7, ease: "easeInOut" } }
              : { duration: 0.6, delay: 1.6, ease: "easeOut" }
          }
          onMouseEnter={() => setHoveredLabel("yazilim")}
          onMouseLeave={() => setHoveredLabel(null)}
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-28%",
            maxWidth: 270,
            zIndex: 20,
            cursor: "default",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 700,
              color: isHighlighted("yazilim") ? "#fff" : "rgba(255,255,255,0.95)",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              marginBottom: 8,
              textShadow: isHighlighted("yazilim")
                ? "0 0 15px rgba(255, 45, 120, 0.3)"
                : "none",
              transition: "color 0.4s ease, text-shadow 0.4s ease",
            }}
          >
            Özel Yazılım
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 14.5,
              color: isHighlighted("yazilim")
                ? "rgba(255,255,255,0.75)"
                : "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              transition: "color 0.4s ease",
            }}
          >
            <RichText
              text="**Chatbot ve sesli asistanın birleşimi** — işletmenizin tüm iletişim süreçlerini **tek bir akıllı sistem**de toplar, size sadece **sonuçları** sunar."
              brightBold={isHighlighted("yazilim")}
            />
          </p>
        </motion.div>
      </motion.div>

      {/* ── Bottom service tabs ────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-start",
          gap: "clamp(20px, 4vw, 40px)",
          marginTop: 55,
          paddingLeft: 24,
          paddingRight: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {TABS.map((tab, i) => {
          const isActive = activeTab === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.8 + i * 0.15,
                ease: "easeOut",
              }}
              whileHover="hover"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                cursor: "pointer",
                fontFamily: FONT,
              }}
              onClick={() => handleTabClick(i, tab.nodeId)}
            >
              {/* Pink accent bar */}
              <motion.div
                variants={{
                  hover: {
                    width: isActive ? 110 : 100,
                    background: "#FF2D78",
                  },
                }}
                animate={{
                  width: isActive ? 110 : 65,
                  background: isActive
                    ? "#FF2D78"
                    : "linear-gradient(to right, #FF2D78, rgba(255,45,120,0.35))",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ height: 4, borderRadius: 2, marginBottom: 10 }}
              />
              {/* Label text */}
              <motion.span
                variants={{
                  hover: { y: -2, color: "rgba(255,255,255,1)" },
                }}
                animate={{
                  y: 0,
                  color: isActive
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.55)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.35,
                  whiteSpace: "pre-line",
                  display: "block",
                }}
              >
                {tab.label}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
