"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ── Constants ──────────────────────────────────────────────────────────── */

const FONT = '"kuhlman-vf", "futura-100", "futura-100-book", sans-serif';

const BASE_W = 800;
const ASPECT = 1912 / 2940;
const BASE_H = Math.round(BASE_W * ASPECT); // ≈ 520

/* ── RichText: **bold** markup ─────────────────────────────────────────── */

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── AnimatedLayer — two-phase PNG layer ───────────────────────────────── */

interface LayerProps {
  src: string;
  entranceDelay: number;
  breatheScale: [number, number, number];
  breatheDuration: number;
  breatheDelay?: number;
  transformOrigin: string;
  zIndex: number;
}

function AnimatedLayer({
  src,
  entranceDelay,
  breatheScale,
  breatheDuration,
  breatheDelay = 0,
  transformOrigin,
  zIndex,
}: LayerProps) {
  const [breathing, setBreathing] = useState(false);

  useEffect(() => {
    const ms = (entranceDelay + 2.5) * 1000;
    const id = setTimeout(() => setBreathing(true), ms);
    return () => clearTimeout(id);
  }, [entranceDelay]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        transformOrigin,
        pointerEvents: "none",
      }}
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
    <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "6px 0" }}>
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.6, 1, 0.6] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d,
          }}
          style={{
            width: 5,
            height: 5,
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
  { heights: [6, 18, 8, 14, 6], dur: 1.2 },
  { heights: [14, 6, 20, 8, 14], dur: 1.0 },
  { heights: [8, 22, 10, 18, 8], dur: 1.4 },
  { heights: [18, 8, 14, 6, 18], dur: 1.1 },
  { heights: [10, 16, 6, 20, 10], dur: 1.3 },
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
        gap: 3,
        height: 24,
        margin: "8px 0",
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
            width: 3,
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
      width={40}
      height={20}
      viewBox="0 0 40 20"
      style={{ display: "block", margin: "12px auto 0" }}
      animate={{ opacity: bright ? [0.4, 0.6, 0.4] : [0.15, 0.4, 0.15] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.line
        x1={4}
        y1={2}
        x2={20}
        y2={18}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <motion.line
        x1={36}
        y1={2}
        x2={20}
        y2={18}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

/* ── SVG line endpoints (base 800 × 520 space) ────────────────────────── */

const SVG_LINES = [
  { id: "chatbot", x1: 195, y1: 120, x2: 298, y2: 182 },
  { id: "sesli", x1: 640, y1: 195, x2: 538, y2: 232 },
  { id: "yazilim", x1: 195, y1: 430, x2: 296, y2: 385 },
];

/* ── Bottom tabs ───────────────────────────────────────────────────────── */

const TABS = [
  { label: "Akıllı\nChatbot", nodeId: "chatbot" },
  { label: "Özel\nYazılım", nodeId: "yazilim" },
  { label: "Sesli\nAsistan", nodeId: "sesli" },
] as const;

/* ── Hover zones (percentage-based within diagram) ─────────────────────── */

const CIRCLE_ZONES = [
  { id: "chatbot", top: "18%", left: "10%", width: "35%", height: "65%" },
  { id: "sesli", top: "13%", left: "55%", width: "35%", height: "65%" },
  { id: "yazilim", top: "12%", left: "25%", width: "50%", height: "76%" },
];

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

  /* ── Derived hover ──────────────────────────────────────────── */
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
        style={{
          position: "relative",
          width: "100%",
          maxWidth: BASE_W,
          height: cH,
          zIndex: 1,
          overflow: "visible",
          x: parallaxX,
          y: parallaxY,
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
                    ? "rgba(255,45,120,0.6)"
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

        {/* ── PNG circle layers (positions/sizes UNTOUCHED) ────────── */}

        <AnimatedLayer
          src="/circles/elips3.png"
          entranceDelay={0.5}
          breatheScale={[1, 1.035, 1]}
          breatheDuration={3.5}
          transformOrigin="50% 44%"
          zIndex={1}
        />

        <AnimatedLayer
          src="/circles/elips2.png"
          entranceDelay={0.8}
          breatheScale={[1, 1.02, 1]}
          breatheDuration={5}
          breatheDelay={1.3}
          transformOrigin="62% 38%"
          zIndex={2}
        />

        <AnimatedLayer
          src="/circles/elips1.png"
          entranceDelay={0.7}
          breatheScale={[1, 1.02, 1]}
          breatheDuration={5}
          breatheDelay={0.8}
          transformOrigin="38% 50%"
          zIndex={3}
        />

        {/* ── Invisible hover zones ───────────────────────────────── */}
        {CIRCLE_ZONES.map((zone) => (
          <div
            key={zone.id}
            onMouseEnter={() => setHoveredCircle(zone.id)}
            onMouseLeave={() => setHoveredCircle(null)}
            style={{
              position: "absolute",
              top: zone.top,
              left: zone.left,
              width: zone.width,
              height: zone.height,
              zIndex: zone.id === "yazilim" ? 20 : 18,
              cursor: "pointer",
            }}
          />
        ))}

        {/* ── CENTER LABEL — Özel Yazılım (only on-circle text kept) ── */}
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
            fontSize: 17,
            fontWeight: 400,
            color: isHighlighted("yazilim")
              ? "rgba(255,255,255,1)"
              : "rgba(255,255,255,0.85)",
            letterSpacing: "0.1em",
            lineHeight: 1.6,
            textShadow: "0 0 20px rgba(255, 45, 120, 0.15)",
            transition: "color 0.4s ease",
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

        {/* ── Floating label 1 — top left (Chatbot) ───────────────── */}
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
            top: "10%",
            left: "0%",
            maxWidth: 240,
            zIndex: 20,
            cursor: "default",
            filter: isHighlighted("chatbot") ? "brightness(1.3)" : "none",
            transition: "filter 0.4s ease",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 700,
              color: isHighlighted("chatbot")
                ? "#FF7EB3"
                : "rgba(255,255,255,0.92)",
              lineHeight: 1.4,
              marginBottom: 0,
              transition: "color 0.4s ease",
            }}
          >
            Akıllı Chatbot
          </p>
          <TypingDots bright={isHighlighted("chatbot")} />
          <p
            style={{
              fontFamily: FONT,
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
            }}
          >
            <RichText text="**WhatsApp** hesabınıza entegre edilir, müşterilerinizle **7/24** iletişim kurar ve işletmenizin tüm yazışmalarını **profesyonelce** yönetir." />
          </p>
        </motion.div>

        {/* ── Floating label 2 — right (Sesli Asistan) ────────────── */}
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
            right: "-2%",
            maxWidth: 230,
            textAlign: "right",
            zIndex: 20,
            cursor: "default",
            filter: isHighlighted("sesli") ? "brightness(1.3)" : "none",
            transition: "filter 0.4s ease",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 700,
              color: isHighlighted("sesli")
                ? "#FF7EB3"
                : "rgba(255,255,255,0.92)",
              lineHeight: 1.4,
              marginBottom: 0,
              transition: "color 0.4s ease",
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
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
            }}
          >
            <RichText text="**Restoranlar, klinikler** ve işletmeler için telefon üzerinden **rezervasyon** alır, müşterilerinizle doğal bir şekilde konuşur ve size **anlık geri bildirim** sağlar." />
          </p>
        </motion.div>

        {/* ── Floating label 3 — bottom left (Özel Yazılım) ───────── */}
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
            left: "0%",
            maxWidth: 250,
            zIndex: 20,
            cursor: "default",
            filter: isHighlighted("yazilim") ? "brightness(1.3)" : "none",
            transition: "filter 0.4s ease",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 700,
              color: isHighlighted("yazilim")
                ? "#FF7EB3"
                : "rgba(255,255,255,0.92)",
              lineHeight: 1.4,
              marginBottom: 4,
              transition: "color 0.4s ease",
            }}
          >
            Özel Yazılım
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
            }}
          >
            <RichText text="**Chatbot ve sesli asistanın birleşimi** — işletmenizin tüm iletişim süreçlerini **tek bir akıllı sistem**de toplar, size sadece **sonuçları** sunar." />
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
                  fontSize: 12.5,
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
