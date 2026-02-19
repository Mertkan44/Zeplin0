"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/* ── Rich text: **bold** ─────────────────────────────────────────────────── */

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-white/85">{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── RingCanvas ──────────────────────────────────────────────────────────────
   Draws a rotating arc whose fade is baked into a conic gradient.

   WHY CANVAS:
   - ctx.createConicGradient(startAngle, cx, cy) ties the gradient's origin
     directly to startAngle. We increment startAngle every frame via rAF,
     so the transparent → opaque → transparent sweep literally ROTATES with
     the arc. No CSS transforms involved, no gradient-stays-static problem.

   HOW THE FADE WORKS:
   - The gradient goes:  0 % → transparent
                         8 % → half opacity
                        14 % → full opacity
                        86 % → full opacity
                        92 % → half opacity
                       100 % → transparent
   - We stroke the FULL circle (0 → 2π), so the visible arc covers ~72 %
     of the ring and both endpoints dissolve naturally into darkness.
──────────────────────────────────────────────────────────────────────────── */

interface RingCanvasProps {
  r: number;           // ring radius (px)
  rgb: string;         // colour as "r,g,b"
  maxOpacity: number;  // peak opacity of the stroke
  lineWidth: number;   // stroke width (px)
  speed: number;       // radians per frame (+CW  −CCW)
}

function RingCanvas({ r, rgb, maxOpacity, lineWidth, speed }: RingCanvasProps) {
  const pad  = lineWidth + 3;          // canvas padding so stroke isn't clipped
  const size = (r + pad) * 2;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef  = useRef(0);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* HiDPI — keeps rings crisp on retina screens */
    const dpr = window.devicePixelRatio || 1;
    canvas.width        = size * dpr;
    canvas.height       = size * dpr;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    function draw() {
      ctx.clearRect(0, 0, size, size);

      /* Conic gradient centred on the circle, starting at the current angle.
         Each frame angleRef.current shifts by `speed`, so the entire
         gradient — and thus the fade — rotates with the ring. */
      const grad = ctx.createConicGradient(angleRef.current, cx, cy);
      grad.addColorStop(0,    `rgba(${rgb}, 0)`);
      grad.addColorStop(0.08, `rgba(${rgb}, ${(maxOpacity * 0.5).toFixed(3)})`);
      grad.addColorStop(0.14, `rgba(${rgb}, ${maxOpacity})`);
      grad.addColorStop(0.86, `rgba(${rgb}, ${maxOpacity})`);
      grad.addColorStop(0.92, `rgba(${rgb}, ${(maxOpacity * 0.5).toFixed(3)})`);
      grad.addColorStop(1,    `rgba(${rgb}, 0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth   = lineWidth;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      angleRef.current += speed;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [r, rgb, maxOpacity, lineWidth, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        position: "absolute",
        top:  -(r + pad),
        left: -(r + pad),
        pointerEvents: "none",
      }}
    />
  );
}

/* ── Data ────────────────────────────────────────────────────────────────── */

interface Node {
  id: string; title: string; body: string;
  lx: number; ly: number; lw: number;
  angle: number; rfrac: number; side: "l" | "r";
}

const NODES: Node[] = [
  {
    id: "anaformik",
    title: "Anaformik Hikaye Anlatıcılığı",
    body: "ile beraber görselin hikayesini biz yazalım!",
    lx: 2, ly: 13, lw: 158, angle: 315, rfrac: 0.91, side: "r",
  },
  {
    id: "gerilla",
    title: "Gerilla Prodüksiyon",
    body: "hizmetimizle beraber **yapay zeka** ve gerçekçiliği basit yaratalım.",
    lx: 68, ly: 17, lw: 162, angle: 46, rfrac: 0.88, side: "l",
  },
  {
    id: "fotograf",
    title: "Sadece fotoğraf çekmiyoruz,",
    body: "modern dünyanın **dikeyliğini** **sinematik çerçeve** ile birleştiriyoruz.",
    lx: 2, ly: 54, lw: 168, angle: 256, rfrac: 0.65, side: "r",
  },
];

/* ── Layout constants ────────────────────────────────────────────────────── */

const R   = 200;  // outer ring radius (px)
const CX  = 50;   // circle centre X (% of container)
const CY  = 56;   // circle centre Y (% of container)
const H   = 620;  // diagram area height (px)

/* ── Main component ──────────────────────────────────────────────────────── */

export default function ServiceDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw]           = useState(960);
  const [hovered, setHovered] = useState<string | null>(null);
  const [par, setPar]         = useState({ x: 0, y: 0 });

  /* track container width so SVG line coords stay accurate */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((e) => setCw(e[0].contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* cursor → parallax offset, max ±15 px */
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const ny = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    setPar({ x: nx * 15, y: ny * 15 });
  }, []);

  const cx = cw * (CX / 100);
  const cy = H  * (CY / 100);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 65% at 50% 58%, rgba(130,25,68,0.55) 0%, rgba(30,6,22,0.97) 58%, #060207 100%)",
      }}
    >
      {/* ── Tagline ─────────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center font-semibold px-6 pt-14 pb-1"
        style={{
          color: "#FF2D78",
          fontSize: "clamp(0.9rem, 2vw, 1.35rem)",
          letterSpacing: "-0.01em",
        }}
      >
        Benzersiz kalite modernite dolu hizmetler ile birleşti.
      </motion.p>

      {/* ── Diagram area ────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-5xl select-none"
        style={{ height: H }}
        onMouseMove={onMove}
        onMouseLeave={() => setPar({ x: 0, y: 0 })}
      >

        {/* ── SVG overlay: connecting lines only ──────────────────────── */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height={H}
          viewBox={`0 0 ${cw} ${H}`}
          overflow="visible"
        >
          {NODES.map((node, i) => {
            const lLeft = cw * (node.lx / 100);
            const lTop  = H  * (node.ly / 100);
            const sx    = node.side === "r" ? lLeft + node.lw : lLeft;
            const sy    = lTop + 22;

            const θ  = ((node.angle - 90) * Math.PI) / 180;
            const ex = cx + R * node.rfrac * Math.cos(θ);
            const ey = cy + R * node.rfrac * Math.sin(θ);

            const isHov = hovered === node.id;

            return (
              <motion.path
                key={node.id}
                d={`M ${sx},${sy} L ${ex},${ey}`}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: {
                    duration: 0.85,
                    delay: 0.55 + i * 0.22,
                    ease: [0.4, 0, 0.2, 1],
                  },
                  opacity: { duration: 0.4, delay: 0.55 + i * 0.22 },
                }}
                style={{
                  stroke: isHov ? "#FF2D78" : "rgba(255,255,255,0.28)",
                  strokeWidth: isHov ? 1.5 : 0.8,
                  filter: isHov
                    ? "drop-shadow(0 0 5px rgba(255,45,120,0.6))"
                    : "none",
                  transition:
                    "stroke 0.25s ease, stroke-width 0.25s ease, filter 0.25s ease",
                }}
              />
            );
          })}
        </svg>

        {/* ── Rings + disc — parallax anchor (0×0 div at circle centre) ── */}
        <div
          className="absolute"
          style={{
            left: `${CX}%`,
            top:  `${CY}%`,
            transform: `translate(${par.x}px, ${par.y}px)`,
            transition: "transform 0.12s ease-out",
          }}
        >
          {/* Canvas rings — each runs its own rAF loop */}
          {/* Ghost: very faint, CCW, slowest */}
          <RingCanvas
            r={R + 32}
            rgb="200,45,85"
            maxOpacity={0.09}
            lineWidth={1}
            speed={-0.0027}
          />
          {/* Outer: CW, 20 s equivalent */}
          <RingCanvas
            r={R}
            rgb="255,255,255"
            maxOpacity={0.22}
            lineWidth={1.2}
            speed={0.003}
          />
          {/* Middle: CCW, 30 s equivalent */}
          <RingCanvas
            r={R * 0.74}
            rgb="255,255,255"
            maxOpacity={0.12}
            lineWidth={1}
            speed={-0.002}
          />

          {/* Inner filled disc — breathing */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width:  R * 0.94,
              height: R * 0.94,
              top:    -(R * 0.47),
              left:   -(R * 0.47),
              background:
                "radial-gradient(circle, rgba(160,38,85,0.52) 0%, rgba(100,18,54,0.26) 55%, transparent 100%)",
              border: "1px solid rgba(255,100,150,0.15)",
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Centre glow — slower breathe */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width:  R * 0.48,
              height: R * 0.48,
              top:    -(R * 0.24),
              left:   -(R * 0.24),
              background:
                "radial-gradient(circle, rgba(255,45,120,0.38) 0%, transparent 100%)",
            }}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Centre label */}
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span className="block text-white/40 text-xs tracking-widest">
              Çekim
            </span>
            <span className="block text-white/40 text-xs tracking-widest">
              Hizmetleri
            </span>
          </div>
        </div>

        {/* ── Service labels ──────────────────────────────────────────── */}
        {NODES.map((node, i) => {
          const isHov = hovered === node.id;
          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{ left: `${node.lx}%`, top: `${node.ly}%`, width: node.lw }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.65 + i * 0.2,
                ease: "easeOut",
              }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => console.log("service:", node.id)}
            >
              <p
                className="text-sm font-bold leading-tight mb-1.5"
                style={{
                  color: isHov ? "#FF2D78" : "rgba(255,255,255,0.9)",
                  textShadow: isHov
                    ? "0 0 14px rgba(255,45,120,0.5)"
                    : "none",
                  transition: "color 0.25s ease, text-shadow 0.25s ease",
                }}
              >
                {node.title}
              </p>
              <p className="text-xs leading-relaxed text-white/55">
                <RichText text={node.body} />
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="h-12" />
    </section>
  );
}
