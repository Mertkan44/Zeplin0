"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const leftLinks = [
  { href: "/", label: "ana sayfa" },
  { href: "/hizmetler", label: "hizmetler" },
  { href: "/operasyonlar", label: "operasyonlar" },
];

const rightLinks = [
  { href: "/blog", label: "zeplin blog" },
  { href: "/hakkimizda", label: "hakkımızda" },
  { href: "/galeri", label: "galeri" },
];

interface BlobState {
  left: number;
  width: number;
  opacity: number;
  scaleX: number;
  scaleY: number;
  velocityX: number;
}

const SPRING_STIFFNESS = 0.12;
const SPRING_DAMPING = 0.7;

function useSpringBlob() {
  const targetRef = useRef({ left: 0, width: 0, opacity: 0 });
  const currentRef = useRef({ left: 0, width: 0, opacity: 0 });
  const velocityRef = useRef({ left: 0, width: 0, opacity: 0 });
  const [blob, setBlob] = useState<BlobState>({
    left: 0, width: 0, opacity: 0, scaleX: 1, scaleY: 1, velocityX: 0,
  });
  const rafRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  const animate = useCallback(() => {
    const target = targetRef.current;
    const current = currentRef.current;
    const velocity = velocityRef.current;

    const keys = ["left", "width", "opacity"] as const;
    let settled = true;

    for (const key of keys) {
      const displacement = target[key] - current[key];
      const springForce = displacement * SPRING_STIFFNESS;
      velocity[key] = (velocity[key] + springForce) * SPRING_DAMPING;
      current[key] += velocity[key];

      if (Math.abs(displacement) > 0.5 || Math.abs(velocity[key]) > 0.5) {
        settled = false;
      }
    }

    const speed = Math.abs(velocity.left);
    const squishAmount = Math.min(speed * 0.015, 0.18);
    const scaleX = 1 + squishAmount;
    const scaleY = 1 - squishAmount * 0.5;

    setBlob({
      left: current.left, width: current.width, opacity: current.opacity,
      scaleX, scaleY, velocityX: velocity.left,
    });

    if (!settled) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      current.left = target.left;
      current.width = target.width;
      current.opacity = target.opacity;
      setBlob({
        left: target.left, width: target.width, opacity: target.opacity,
        scaleX: 1, scaleY: 1, velocityX: 0,
      });
      isAnimatingRef.current = false;
    }
  }, []);

  const setTarget = useCallback(
    (left: number, width: number, opacity: number) => {
      targetRef.current = { left, width, opacity };
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [animate]
  );

  const setImmediate = useCallback((left: number, width: number, opacity: number) => {
    targetRef.current = { left, width, opacity };
    currentRef.current = { left, width, opacity };
    velocityRef.current = { left: 0, width: 0, opacity: 0 };
    setBlob({ left, width, opacity, scaleX: 1, scaleY: 1, velocityX: 0 });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { blob, setTarget, setImmediate };
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const { blob, setTarget, setImmediate } = useSpringBlob();
  const initializedRef = useRef(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const getPosition = useCallback(
    (el: HTMLAnchorElement) => {
      if (!navRef.current) return null;
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      return { left: elRect.left - navRect.left, width: elRect.width };
    },
    []
  );

  useEffect(() => {
    const activeEl = linkRefs.current.get(pathname);
    if (activeEl && !initializedRef.current) {
      const pos = getPosition(activeEl);
      if (pos) {
        setImmediate(pos.left, pos.width, 1);
        initializedRef.current = true;
      }
    }
  }, [pathname, getPosition, setImmediate]);

  const handleMouseEnter = (href: string) => {
    setHoveredHref(href);
    const el = linkRefs.current.get(href);
    if (!el) return;
    const pos = getPosition(el);
    if (pos) setTarget(pos.left, pos.width, 1);
  };

  const handleMouseLeave = () => {
    setHoveredHref(null);
    const activeEl = linkRefs.current.get(pathname);
    if (activeEl) {
      const pos = getPosition(activeEl);
      if (pos) setTarget(pos.left, pos.width, 1);
    } else {
      setTarget(blob.left, blob.width, 0);
    }
  };

  const setLinkRef = (href: string, el: HTMLAnchorElement | null) => {
    if (el) linkRefs.current.set(href, el);
  };

  const skewDeg = Math.max(-8, Math.min(8, blob.velocityX * -0.6));

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    const isHovered = hoveredHref === href;
    if (isActive || isHovered) {
      return isDark ? "text-white" : "text-[#A01550]";
    }
    return isDark ? "text-white/60" : "text-white/90";
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>

          <filter id="glass-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              seed="5"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="white"
              surfaceScale="2"
              result="diffLight"
            >
              <feDistantLight azimuth="235" elevation="40" />
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" in2="diffLight" operator="arithmetic" k1="0.7" k2="0.35" k3="0.15" k4="0" />
          </filter>
        </defs>
      </svg>

      <div
        ref={navRef}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #9D174D 0%, #BE185D 40%, #DB2777 100%)"
            : "linear-gradient(135deg, #F472B6 0%, #EC4899 40%, #DB2777 100%)",
          boxShadow: isDark
            ? "0 8px 32px rgba(190, 24, 93, 0.35), 0 2px 8px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(219, 39, 119, 0.3), 0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* === LIQUID 3D BLOB === */}
        <div
          className="absolute top-1/2 h-[calc(100%-10px)] rounded-full pointer-events-none"
          style={{
            left: `${blob.left}px`,
            width: `${blob.width}px`,
            opacity: blob.opacity,
            transform: `translateY(-50%) scaleX(${blob.scaleX}) scaleY(${blob.scaleY}) skewX(${skewDeg}deg)`,
            filter: "url(#gooey)",
          }}
        >
          {/* Katman 1: Dış gölge */}
          <div
            className="absolute -inset-[1px] rounded-full"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.12) 100%)",
              filter: "blur(1px)",
            }}
          />

          {/* Katman 2: Ana cam gövde */}
          <div
            className="absolute inset-0 rounded-full border overflow-hidden transition-all duration-500"
            style={{
              borderColor: isDark ? "rgba(251,113,133,0.3)" : "rgba(255,255,255,0.5)",
              background: isDark
                ? "linear-gradient(145deg, rgba(251,113,133,0.2) 0%, rgba(244,63,94,0.12) 30%, rgba(190,24,93,0.08) 100%)"
                : "linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 30%, rgba(255,240,245,0.35) 70%, rgba(255,228,238,0.3) 100%)",
              backdropFilter: "blur(14px) saturate(1.6)",
              boxShadow: isDark
                ? "inset 0 2px 4px rgba(251,113,133,0.25), inset 0 -1px 3px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.1)"
                : "inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            {/* Cam texture overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-20 mix-blend-overlay"
              style={{ filter: "url(#glass-texture)" }}
            />
          </div>

          {/* Katman 3: Specular highlight */}
          <div
            className="absolute top-[2px] left-[8%] right-[8%] h-[45%] rounded-full"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 100%)",
            }}
          />

          {/* Katman 4: Rim light */}
          <div
            className="absolute bottom-[2px] left-[12%] right-[12%] h-[18%] rounded-full"
            style={{
              background: "linear-gradient(0deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
            }}
          />

          {/* Katman 5: Shimmer */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </div>

        {/* Sol menü */}
        <ul className="flex items-center gap-1 relative z-10">
          {leftLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                ref={(el) => setLinkRef(link.href, el)}
                onMouseEnter={() => handleMouseEnter(link.href)}
                className={`block rounded-full px-6 py-2.5 text-base font-medium lowercase transition-colors duration-300 ${getLinkClass(link.href)}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Ortadaki Zeplin Logo */}
        <div className="relative -my-5 z-10">
          <Link href="/">
            <Image
              src="/zeplin-logo.png"
              alt="Zeplin Media"
              width={80}
              height={80}
              className="drop-shadow-lg hover:scale-110 transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* Sağ menü */}
        <ul className="flex items-center gap-1 relative z-10">
          {rightLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                ref={(el) => setLinkRef(link.href, el)}
                onMouseEnter={() => handleMouseEnter(link.href)}
                className={`block rounded-full px-6 py-2.5 text-base font-medium lowercase transition-colors duration-300 ${getLinkClass(link.href)}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle - navbar'ın sağ dışında */}
      <div className="absolute -right-12 top-1/2 -translate-y-1/2">
        <ThemeToggle />
      </div>
    </nav>
  );
}
